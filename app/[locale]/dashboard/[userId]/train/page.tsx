'use client';
import Button from '@/components/Button';
import supabase from '@/app/core/clients/supabase';
import post from '@/app/core/utils/post';
import useInterval from '@/app/core/utils/useInterval';
import classNames from 'classnames';
import JSZip from 'jszip';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineCheckCircle, AiOutlineUpload } from 'react-icons/ai';
import { BsExclamationLg } from 'react-icons/bs';
import { FadeLoader } from 'react-spinners';
import styles from '../../../Home.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function TrainPage() {
  const t = useTranslations('TrainPage');
  const ethnicities = [
    'caucasian',
    'african',
    'asian',
    'hispanic',
    'native american',
    'middle eastern',
    'pacific islander',
    'mixed',
    'other'
  ];
  const eyeColors = [
    'blue',
    'brown',
    'green',
    'hazel',
    'gray',
    'amber',
    'other'
  ];
  const FINETUNING_BUCKET = 'training-bucket';
  const params = useParams();
  const id = params.userId;
  const [ready, setReady] = useState(localStorage.getItem('ready') === 'true');
  const [fineTuningData, setFinetuningData] = useState(
    JSON.parse(localStorage.getItem('fineTuningData') as string) || {
      dataset: null,
      run_id: null,
      run_data: {
        status: null
      }
    }
  );
  const [uploading, setUploading] = useState(
    localStorage.getItem('uploading') === 'true'
  );
  const [queueingFinetuning, setQueueingFinetuning] = useState(
    localStorage.getItem('queueingFinetuning') === 'true'
  );
  const [instanceName, setInstanceName] = useState(
    localStorage.getItem('instanceName') || ''
  );
  const [instanceType, setInstanceType] = useState(
    localStorage.getItem('instanceType') || 'man'
  );

  const [customInstanceType, setCustomInstanceType] = useState(
    localStorage.getItem('customInstanceType') || ''
  );
  const [userData, setUserData] = useState<any>(() =>
    JSON.parse(localStorage.getItem('userData') as string)
  );

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        getModelStatus();
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    localStorage.setItem('ready', ready.toString());
    localStorage.setItem('fineTuningData', JSON.stringify(fineTuningData));
    localStorage.setItem('uploading', uploading.toString());
    localStorage.setItem('queueingFinetuning', queueingFinetuning.toString());
    localStorage.setItem('instanceName', instanceName);
    localStorage.setItem('instanceType', instanceType);
    localStorage.setItem('customInstanceType', customInstanceType);
  }, [
    ready,
    fineTuningData,
    uploading,
    queueingFinetuning,
    instanceName,
    instanceType,
    customInstanceType
  ]);

  useEffect(() => {
    const updateDatabase = async () => {
      await supabase
        .from('user-data')
        .update({ model_tokens: userData.model_tokens as number })
        .eq('id', userData.id);
      localStorage.setItem('userData', JSON.stringify(userData));
    };
    updateDatabase();
  }, [userData.model_tokens]);

  useInterval(() => {
    getModelStatus();
  }, 2000);

  async function clearUserData() {
    post(`/api/ai/${id}/clear`, {}, (data: any) => {
      setFinetuningData({
        dataset: null,
        run_id: null,
        run_data: {
          status: null
        }
      });
      localStorage.removeItem('ready');
      localStorage.removeItem('fineTuningData');
      localStorage.removeItem('modelStatus');
      localStorage.removeItem('uploading');
      localStorage.removeItem('queueingFinetuning');
      localStorage.removeItem('instanceName');
      localStorage.removeItem('instanceType');
      localStorage.removeItem('customInstanceType');
      setReady(false);
      setFinetuningData(null);
      setUploading(false);
      setQueueingFinetuning(false);
      setInstanceName('');
      setInstanceType('');
      setCustomInstanceType('');
    });
  }

  async function handleCancelTraining(runId: string) {
    if (runStatus === 'starting' || runStatus === 'processing') {
      let succesful;
      await post(
        `/api/ai/${id}/cancel-training`,
        {
          run_id: runId
        },
        (data: any) => {
          console.log(data);
          succesful = data;
        }
      );
      if (succesful) {
        setFinetuningData(null);
        userData.model_tokens++;
        toast.success('Entrenamiento cancelado con éxito');
      } else {
        console.log('Cancellation failed.');
        toast.error('Algo ha fallado...');
      }
    }
  }

  async function getModelStatus() {
    if (runStatus !== 'succeeded') {
      await fetch(`/api/ai/${id}/status`, { cache: 'no-store' })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFinetuningData(data);
        });
      console.log(runStatus);
      setReady(true);
    }
  }

  async function handleFileUpload(ev: React.ChangeEvent<HTMLInputElement>) {
    setUploading(true);
    const files = ev.target.files || [];
    const zip = new JSZip();
    const dataFolder = zip.folder('data');

    if (dataFolder) {
      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const file = files[fileIndex];
        const fileExtension = file.name.split('.').pop() || '';
        const newFileName = `${fileIndex}.src.${fileExtension}`;
        dataFolder.file(newFileName, file);
      }
    }

    zip.generateAsync({ type: 'blob' }).then(async (content) => {
      try {
        await supabase.storage
          .from(FINETUNING_BUCKET)
          .remove([`public/${id}/data.zip`]);
      } catch (error) {
        console.log(error);
      }
      const { data } = await supabase.storage
        .from(FINETUNING_BUCKET)
        .upload(`public/${id}/data.zip`, content);
      if (data) {
        const { data, error } = await supabase
          .from('user-data')
          .update({ dataset: `public/${id}/data.zip` })
          .eq('id', id)
          .select();

        console.log(id);
        console.log(data);
        getModelStatus();
      }
      setUploading(false);
    });
  }

  // Include instanceType on the object sent to Blueprint with the name instance_type
  async function handleValidationAndFinetuningStart() {
    let tokens = userData.model_tokens;
    if (tokens > 0) {
      setQueueingFinetuning(true);
      await post(
        `/api/ai/${id}/train`,
        {
          url: fineTuningData.dataset,
          prompt: instanceName,
          instance_type:
            instanceType === 'other' ? customInstanceType : instanceType,
          user_id: id
        },
        (data: any) => console.log(data)
      );
      getModelStatus();
      setQueueingFinetuning(false);
      userData.model_tokens--;
    } else {
      toast.error('No te quedan tokens, ve a la tienda a por más');
    }
  }

  const hasUploadedData = !!fineTuningData?.dataset;
  const hasFinetunedModel = !!fineTuningData?.run_id;
  const runStatus = fineTuningData?.run_data?.status;
  const itemButton = useRef<HTMLInputElement>(null);
  const fineTuningInProgress =
    runStatus === 'starting' ||
    runStatus === 'processing' ||
    runStatus === 'queued';
  const fineTuningFailed = runStatus === 'failed';
  const fineTuningCanceled = runStatus === 'canceled';
  const fineTuningSucceeded = runStatus === 'succeeded';

  return (
    <div className="py-8 max-w-screen-lg mx-auto px-8">
      <h2 className="text-4xl font-bold mb-4">{t('trainLabel')}</h2>
      <h3 className="text-xl mb-4">
        {t('tokensLabel')}:{' '}
        {!!userData && userData.model_tokens !== undefined
          ? userData.model_tokens
          : '...'}
      </h3>
      {ready ? (
        <div>
          {!hasUploadedData && (
            <div>
              <div className="text-lg font-bold">{t('step1Label')}</div>
              <div>
                {t('step1Description')}
                <Link href="/dashboard/faq" className="hover:underline">
                  {t('faqLink')}
                </Link>
              </div>

              <div className="relative">
                <input
                  type="file"
                  id="files"
                  className="border border-black w-full h-48 opacity-0 absolute top-0"
                  multiple
                  onChange={handleFileUpload}
                  ref={itemButton}
                />
                <label htmlFor="files">
                  <button
                    className="hover:scale-[1.02] bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black w-full h-48 border rounded-lg my-4 transition-all top-0 absolute"
                    onClick={() => !uploading && itemButton.current?.click()}
                    disabled={uploading}
                  >
                    <div>
                      <div>
                        {!hasUploadedData ? (
                          <AiOutlineUpload
                            size={100}
                            className="w-1/2 m-auto"
                          />
                        ) : (
                          <AiOutlineCheckCircle
                            size={100}
                            className="w-1/2 m-auto"
                          />
                        )}
                      </div>
                      <span>{!hasUploadedData ? t('uploadLabel') : ''}</span>
                    </div>
                  </button>
                </label>
              </div>
            </div>
          )}

          {hasUploadedData && !hasFinetunedModel && (
            <div>
              <div className="text-lg font-bold">{t('step2Label')}</div>
              <div>{t('step2Description')}</div>
              <div className="mt-4 max-w-screen-xs m-auto grid columns-2">
                <label className="font-bold text-xl my-1" htmlFor="name">
                  {t('nameLabel')}{' '}
                </label>
                <input
                  className="my-1  bg-white text-black dark:bg-black dark:text-white transition-all"
                  id="name"
                  value={instanceName}
                  onChange={(ev) => setInstanceName(ev.target.value)}
                  placeholder={t('uniqueNamePlaceholder')}
                />

                <label className="font-bold text-xl my-1" htmlFor="ip">
                  {t('subjectTypeLabel')}
                </label>
                <select
                  name="instance_type"
                  id="ip"
                  className="my-1 bg-white text-black dark:bg-black dark:text-white transition-all"
                  onChange={(ev) => setInstanceType(ev.target.value)}
                >
                  <option value="man">{t('manOption')}</option>
                  <option value="woman">{t('womanOption')}</option>
                  <option value="dog">{t('dogOption')}</option>
                  <option value="cat">{t('catOption')}</option>
                  <option value="other">{t('otherOption')}</option>
                </select>

                {(instanceType === 'man' || instanceType === 'woman') && (
                  <div className="grid columns-2">
                    <label className="font-bold text-xl my-1" htmlFor="ip">
                      {t('ethnicityLabel')}
                    </label>
                    <select
                      name="instance_type"
                      id="ip"
                      className="my-1 bg-white text-black dark:bg-black dark:text-white transition-all"
                      onChange={(ev) => setInstanceType(ev.target.value)}
                    >
                      {ethnicities.map((e: string) => {
                        return (
                          <option value={e} key={e}>
                            {t(e)}
                          </option>
                        );
                      })}
                    </select>
                    <label className="font-bold text-xl my-1" htmlFor="ip">
                      {t('eyeColorLabel')}
                    </label>
                    <select
                      name="instance_type"
                      id="ip"
                      className="my-1 bg-white text-black dark:bg-black dark:text-white transition-all"
                      onChange={(ev) => setInstanceType(ev.target.value)}
                    >
                      {eyeColors.map((e: string) => {
                        return (
                          <option value={e} key={e}>
                            {t(e)}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}

                {instanceType === 'other' && (
                  <input
                    className="my-1 ml-1 bg-white text-black dark:bg-black dark:text-white transition-all"
                    value={customInstanceType}
                    onChange={(ev) => setCustomInstanceType(ev.target.value)}
                    placeholder={t('otherTypePlaceholder')}
                  />
                )}

                <Button
                  disabled={
                    instanceName.length === 0 ||
                    hasFinetunedModel ||
                    queueingFinetuning
                  }
                  cooldownTime={5000}
                  onClick={handleValidationAndFinetuningStart}
                  className="mt-3 bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all float-"
                >
                  {t('continueButton')}
                </Button>
              </div>
            </div>
          )}

          {fineTuningInProgress && (
            <div>
              <div className="text-lg font-bold">{t('step3Label')}</div>
              <div>{t('step3Description')}</div>
              <div className="mt-3">{t('step3CompletionText')}</div>
              <FadeLoader
                className="w-1/5 m-auto my-4"
                color="#d3d3d3"
                height={26}
                margin={19}
                radius={36}
                speedMultiplier={0.6}
                width={13}
              />
            </div>
          )}

          {fineTuningFailed && (
            <div className="text-center">
              <BsExclamationLg size={140} color="red" className="w-50 m-auto" />
              <span>{t('trainingFailed')}</span>
            </div>
          )}

          {fineTuningCanceled && !!fineTuningData && (
            <div className="text-center">
              <BsExclamationLg size={140} color="red" className="w-50 m-auto" />
              <span>{t('trainingCanceled')}</span>
            </div>
          )}

          {fineTuningSucceeded && (
            <div>
              <div className="text-lg font-bold">{t('step4Label')}</div>
              <div>{t('step4Description')}</div>
              <AiOutlineCheckCircle
                size={140}
                color="green"
                className="w-50 m-auto"
              />
            </div>
          )}

          {fineTuningData?.dataset && !fineTuningData?.run_id && (
            <main className={styles.main}>
              <div className={styles.clear}>
                <button
                  onClick={() => clearUserData()}
                  className={classNames(styles.button, styles.reset)}
                  style={{
                    width: 'max-content',
                    backgroundColor: '#e0e0e0',
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {t('startOverButton')}
                </button>
              </div>
            </main>
          )}

          {fineTuningSucceeded && (
            <main className={styles.main}>
              <div className={styles.clear}>
                <button
                  onClick={() => clearUserData()}
                  className={classNames(styles.button, styles.reset)}
                  style={{
                    width: 'max-content',
                    backgroundColor: '#e0e0e0',
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {t('startOverButton')}
                </button>
              </div>
            </main>
          )}

          {fineTuningData?.run_id && !fineTuningSucceeded && (
            <main className={styles.main}>
              <div className={styles.clear}>
                <Button
                  onClick={() => handleCancelTraining(fineTuningData?.run_id)}
                  className="bg-red-600 text-white border-red-600 hover:text-black dark:text-white dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-black border rounded py-2 px-4 transition-all"
                  cooldownTime={2000}
                  disabled={false}
                >
                  {t('cancelTrainingButton')}
                </Button>
              </div>
            </main>
          )}
        </div>
      ) : (
        <div className=" mt-24 text-center">
          <span className="text-xl text-gray-400">{t('loadingText')}</span>
        </div>
      )}
    </div>
  );
}
