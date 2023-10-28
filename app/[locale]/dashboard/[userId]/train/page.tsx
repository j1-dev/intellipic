'use client';
import Button from '@/components/Button';
import supabase from '@/app/core/clients/supabase';
import post from '@/app/core/utils/post';
import useInterval from '@/app/core/utils/useInterval';
import JSZip from 'jszip';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineCheckCircle, AiOutlineUpload } from 'react-icons/ai';
import { BsExclamationLg } from 'react-icons/bs';
import { ClipLoader } from 'react-spinners';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/core/utils/ThemeContext';
import { decryptData, encryptData } from '@/app/core/utils/encrypt';

export default function TrainPage() {
  const router = useRouter();
  const t = useTranslations('TrainPage');
  // const ethnicities = [
  //   'none',
  //   'caucasian',
  //   'african',
  //   'asian',
  //   'hispanic',
  //   'native american',
  //   'middle eastern',
  //   'pacific islander',
  //   'mixed'
  // ];
  // const eyeColors = [
  //   'none',
  //   'blue',
  //   'brown',
  //   'green',
  //   'hazel',
  //   'gray',
  //   'amber'
  // ];
  const FINETUNING_BUCKET = 'training-bucket';
  const params = useParams();
  const id = params.userId;
  const [ready, setReady] = useState(decryptData('ready') === 'true');
  const [fineTuningData, setFinetuningData] = useState(
    // @ts-ignore
    JSON.parse(decryptData('fineTuningData')) || {
      dataset: null,
      run_id: null,
      run_data: {
        status: null
      }
    }
  );
  const [uploading, setUploading] = useState(
    decryptData('uploading') === 'true'
  );
  const [queueingFinetuning, setQueueingFinetuning] = useState(
    decryptData('queueingFinetuning') === 'true'
  );
  const [instanceName, setInstanceName] = useState(
    decryptData('instanceName') || ''
  );
  const [instanceType, setInstanceType] = useState(
    decryptData('instanceType') || 'man'
  );
  const [customInstanceType, setCustomInstanceType] = useState(
    decryptData('customInstanceType') || ''
  );
  const [userData, setUserData] = useState<any>(() =>
    // @ts-ignore
    JSON.parse(decryptData('userData'))
  );
  const [progress, setProgress] = useState(() => {
    const int = parseInt(JSON.parse(decryptData(`progress`) as string));
    if (!isNaN(int)) {
      return int;
    } else {
      return -1;
    }
  });
  const [ethnicity, setEthnicity] = useState('none');
  const [eyeColor, setEyeColor] = useState('none');
  const { theme, toggleTheme, enabled } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        getModelStatus();
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    encryptData('ready', ready.toString());
    encryptData('fineTuningData', JSON.stringify(fineTuningData));
    encryptData('uploading', uploading.toString());
    encryptData('queueingFinetuning', queueingFinetuning.toString());
    encryptData('instanceName', instanceName);
    encryptData('instanceType', instanceType);
    encryptData('customInstanceType', customInstanceType);
    encryptData('progress', progress.toString());
  }, [
    ready,
    fineTuningData,
    uploading,
    queueingFinetuning,
    instanceName,
    instanceType,
    customInstanceType,
    progress
  ]);

  useInterval(() => {
    getModelStatus();
    fetchUserInfo();
  }, 2000);

  const fetchUserInfo = async () => {
    const { data: d, error: e } = await supabase
      .from('user-data')
      .select('*')
      .eq('id', userData.id);

    if (e) {
      console.error(e);
    } else {
      console.log(d[0]);
      setUserData(d[0]);
      encryptData('userData', JSON.stringify(d[0] || {}));
    }
  };

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
      localStorage.removeItem('progress');
      setReady(false);
      setFinetuningData(null);
      setUploading(false);
      setQueueingFinetuning(false);
      setInstanceName('');
      setInstanceType('man');
      setCustomInstanceType('');
      setProgress(-1);
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
          if (data.run_data.status === 'failed') {
            fetchUserInfo();
          }
          const progString = data.run_data.progress;
          const progNum = parseInt(progString);
          console.log(progNum);
          console.log(progress);
          if (!isNaN(progNum)) {
            setProgress(progNum);
          } else {
            setProgress(-1);
          }

          setFinetuningData(data);
        });
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
        getModelStatus();
      }
      setUploading(false);
    });
  }

  async function handleValidationAndFinetuningStart() {
    let tokens = userData.model_tokens;
    if (tokens > 0) {
      const maxInstanceNameLength = 7; // Set your desired maximum length
      const truncatedInstanceName = instanceName.slice(
        0,
        maxInstanceNameLength
      );

      // const fullInstanceType =
      //   (ethnicity !== 'none' ? ethnicity : '') +
      //   ' ' +
      //   instanceType +
      //   ' ' +
      //   (eyeColor !== 'none' ? eyeColor + ' eyes' : '');
      setQueueingFinetuning(true);
      await post(
        `/api/ai/${id}/train`,
        {
          url: fineTuningData.dataset,
          prompt: truncatedInstanceName,
          instance_type:
            instanceType === 'other' ? customInstanceType : instanceType,
          user_id: id
        },
        (data: any) => {
          fetchUserInfo();
          getModelStatus();
          if (data.error_code === 'CLIENT_SERVER_TOKENS_DESYNC') {
            clearUserData();
            toast.error(t('token_desync_error'));
            router.push(`/dashboard/${userData.id}`);
          } else {
            setQueueingFinetuning(false);
          }
        }
      );
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
    <div className="py-8 max-w-screen-lg mx-auto px-8 pb-56">
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
                      <span>
                        {uploading ? (
                          <ClipLoader
                            size={30}
                            speedMultiplier={0.5}
                            color={`${enabled ? 'white' : 'black'}`}
                          />
                        ) : (
                          t('uploadLabel')
                        )}
                      </span>
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
                  maxLength={7}
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

                {/* {(instanceType === 'man' || instanceType === 'woman') && (
                  <div className="grid columns-2">
                    <label className="font-bold text-xl my-1" htmlFor="ip">
                      {t('ethnicityLabel')}
                    </label>
                    <select
                      name="instance_type"
                      id="ip"
                      className="my-1 bg-white text-black dark:bg-black dark:text-white transition-all"
                      onChange={(ev) => {
                        setEthnicity(ev.target.value);
                      }}
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
                      onChange={(ev) => setEyeColor(ev.target.value)}
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
                )} */}

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
              {progress === -1 ? (
                <div className="text-center flex flex-col">
                  <ClipLoader
                    className="w-1/2 m-auto mt-5"
                    size={30}
                    speedMultiplier={0.5}
                    color={`${enabled ? 'white' : 'black'}`}
                  />
                  <span className="mt-2">{t('starting')}</span>
                </div>
              ) : (
                <div className="w-36 m-auto my-8">
                  <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
                    styles={{
                      // Customize the root svg element
                      root: {},
                      // Customize the path, i.e. the "completed progress"
                      path: {
                        // Path color
                        stroke: `${enabled ? '#FFFFFF' : '#000000'}`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s'
                      },
                      // Customize the circle behind the path, i.e. the "total progress"
                      trail: {
                        // Trail color
                        stroke: `${enabled ? '#000000' : '#FFFFFF'}`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round'
                        // Rotate the trail
                      },
                      // Customize the text
                      text: {
                        // Text color
                        stroke: `${enabled ? '#FFFFFF' : '#000000'}`,
                        fill: `${enabled ? '#FFFFFF' : '#000000'}`,
                        // Text size
                        fontSize: '18px'
                      }
                    }}
                  />
                </div>
              )}
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
                color="#88FF62"
                className="w-50 m-auto"
              />
            </div>
          )}

          {fineTuningData?.dataset && !fineTuningData?.run_id && (
            <div className="w-full relative">
              <button
                onClick={() => clearUserData()}
                className="border border-black dark:border-white text-white rounded-md p-3 bg-indigo-600 hover:bg-indigo-800 dark:bg-indigo-900 dark:hover:bg-indigo-400 transition-all duratio-150 absolute left-1/2 -translate-x-1/2 mt-7"
              >
                {t('startOverButton')}
              </button>
            </div>
          )}

          {fineTuningSucceeded && (
            <div className="w-full relative">
              <button
                onClick={() => clearUserData()}
                className="border border-black dark:border-white text-white rounded-md p-3 bg-purple-600 hover:bg-purple-800 dark:bg-purple-900 dark:hover:bg-purple-400 transition-all duratio-150 absolute left-1/2 -translate-x-1/2 mt-7"
              >
                {t('startOverButton')}
              </button>
            </div>
          )}

          {fineTuningData?.run_id && !fineTuningSucceeded && (
            <div className="w-full relative">
              <Button
                onClick={() => handleCancelTraining(fineTuningData?.run_id)}
                className="bg-red-600 text-white border-red-600 hover:text-black dark:text-white dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-black border rounded py-2 px-4 transition-all absolute left-1/2 -translate-x-1/2 mt-7"
                cooldownTime={2000}
                disabled={false}
              >
                {t('cancelTrainingButton')}
              </Button>
            </div>
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
