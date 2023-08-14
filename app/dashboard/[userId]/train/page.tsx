'use client';
import supabase from '@/app/core/clients/supabase';
import classNames from 'classnames';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import styles from '../../../Home.module.css';

import JSZip from 'jszip';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FadeLoader, PulseLoader } from 'react-spinners';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import { toast } from 'react-hot-toast';

async function post(url: string, body: any, callback: any) {
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then(callback);
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

// TODO: Change the styling of the training tab to fit the styling of the page
// TODO: Add better explanations to guide the user properly
export default function TrainPage() {
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
  const [modelStatus, setModelStatus] = useState(
    JSON.parse(localStorage.getItem('modelStatus') as string) || {
      healthy: null,
      modelId: null
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
    localStorage.getItem('instanceName') || 'man'
  );
  const [userData, setUserData] = useState<any>(() =>
    JSON.parse(localStorage.getItem('userData') as string)
  );

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        getOrInsertUserData(id);
        getModelStatus(id);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    localStorage.setItem('ready', ready.toString());
    localStorage.setItem('fineTuningData', JSON.stringify(fineTuningData));
    localStorage.setItem('modelStatus', JSON.stringify(modelStatus));
    localStorage.setItem('uploading', uploading.toString());
    localStorage.setItem('queueingFinetuning', queueingFinetuning.toString());
    localStorage.setItem('instanceName', instanceName);
    localStorage.setItem('instanceType', instanceType);
  }, [
    ready,
    fineTuningData,
    modelStatus,
    uploading,
    queueingFinetuning,
    instanceName,
    instanceType
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

  useInterval(() => getOrInsertUserData(id), 10000);
  useInterval(() => getModelStatus(id), 10000);

  async function clearUserData(id: any) {
    post(`/api/ai/${id}/clear`, {}, (data: any) => {
      setFinetuningData({
        dataset: null,
        run_id: null,
        run_data: {
          status: null
        }
      });
    });
  }

  async function getOrInsertUserData(id: any) {
    if (runStatus !== 'succeeded') {
      await fetch(`/api/ai/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFinetuningData(data);
        });

      setReady(true);
    }
  }

  async function getModelStatus(id: any) {
    if (runStatus !== 'succeeded') {
      await fetch(`/api/ai/${id}/status`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setModelStatus({
            modelId: data.model_id,
            healthy: data.healthy
          });
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
      if (dataFolder) {
        for (let file = 0; file < files.length; file++) {
          dataFolder.file(files[file].name, files[file]);
        }
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
        getOrInsertUserData(id);
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
          instance_type: instanceType,
          user_id: id
        },
        (data: any) => console.log(data)
      );
      getOrInsertUserData(id);
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
  const fineTuningSucceeded = runStatus === 'succeeded';

  return (
    <div className="py-8 max-w-screen-lg mx-auto px-8">
      <h2 className="text-4xl font-bold mb-4">Entrenar 🦾</h2>
      {ready ? (
        <div>
          <main className={styles.main}>
            <div
              className={classNames(styles.step, {
                [styles.complete]: hasUploadedData
              })}
            >
              <div>
                <div className={styles.stepheading}>Subir Imágenes</div>
                <div>
                  Selecciona algunas imágenes para entrenar a la IA con un
                  modelo
                </div>

                {!hasUploadedData && (
                  <>
                    <input
                      type="file"
                      id="files"
                      className={styles.hidden}
                      multiple
                      onChange={handleFileUpload}
                      ref={itemButton}
                    />
                    <label htmlFor="files">
                      <button
                        className="bg-blue-600 text-white disabled:hover:text-white disabled:border-gray-400 border-blue-600 hover:text-black  dark:text-white dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-black border rounded py-2 px-4 transition-all disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:dark:bg-gray-400 mt-6"
                        onClick={() =>
                          !uploading && itemButton.current?.click()
                        }
                        disabled={uploading}
                      >
                        Subir Imágenes
                      </button>
                    </label>
                  </>
                )}
              </div>
            </div>

            <div
              className={classNames(styles.step, {
                [styles.ineligible]: !hasUploadedData,
                [styles.complete]: hasFinetunedModel,
                [styles.blinker]: fineTuningInProgress,
                [styles.failed]: fineTuningFailed
              })}
              style={{ marginBottom: 0 }}
            >
              <div>
                <div className={styles.stepheading}>Ajustar el modelo</div>
                <div>
                  Para comenzar a entrenar la IA.
                  <br />
                  Dale un nombre único a tu modelo (Por ejemplo Davidrmk2)
                </div>
                <div
                  className={classNames(styles.finetuningsection, {
                    [styles.hidden]: hasFinetunedModel || !hasUploadedData
                  })}
                >
                  <input
                    className={styles.instance}
                    value={instanceName}
                    onChange={(ev) => setInstanceName(ev.target.value)}
                    placeholder={'Nombre Único'}
                  />
                  {/* New select for the instance type */}
                  <select
                    name="instance_type"
                    id="ip"
                    className={styles.instance}
                    onChange={(ev) => setInstanceType(ev.target.value)}
                  >
                    <option value="man">Hombre</option>
                    <option value="woman">Mujer</option>
                    <option value="dog">Perro</option>
                    <option value="cat">Gato</option>
                    <option value="thing">Cosa</option>
                  </select>
                  <button
                    disabled={
                      instanceName.length === 0 ||
                      hasFinetunedModel ||
                      queueingFinetuning
                    }
                    onClick={handleValidationAndFinetuningStart}
                    className={classNames(styles.button, styles.primary)}
                    style={{
                      marginLeft: '8px',
                      pointerEvents:
                        instanceName.length === 0 ||
                        hasFinetunedModel ||
                        queueingFinetuning
                          ? 'none'
                          : 'inherit'
                    }}
                  >
                    🪄 Continuar
                  </button>
                </div>
              </div>
            </div>
          </main>

          {fineTuningInProgress && (
            <div className="text-center">
              <FadeLoader
                className="w-1/5 m-auto my-4"
                color="#d3d3d3"
                height={26}
                margin={19}
                radius={36}
                speedMultiplier={0.6}
                width={13}
              />
              <span className="pt-10">
                El modelo se está entrenando, tardará unos 20 minutos
              </span>
            </div>
          )}

          {fineTuningSucceeded && (
            <div className="text-center">
              <AiOutlineCheckCircle
                size={140}
                color="green"
                className="w-50 m-auto"
              />
              <span>El modelo ha sido completado</span>
            </div>
          )}

          {fineTuningData?.dataset && (
            <main className={styles.main}>
              <div className={styles.clear}>
                <button
                  onClick={() => clearUserData(id)}
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
                  Empezar de nuevo
                </button>
              </div>
            </main>
          )}
        </div>
      ) : (
        <div className=" mt-24 text-center">
          <span className="text-xl text-gray-400">Loading...</span>
        </div>
      )}
    </div>
  );
}
