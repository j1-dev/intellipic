'use client';
import supabase from '@/app/core/clients/supabase';
import classNames from 'classnames';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import styles from '../../../Home.module.css';

import JSZip from 'jszip';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FadeLoader } from 'react-spinners';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import { toast } from 'react-hot-toast';
import { AiOutlineUpload } from 'react-icons/ai';
import { BsExclamationLg } from 'react-icons/bs';
import Button from '@/app/components/Button';

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
  }, [
    ready,
    fineTuningData,
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
    });
  }

  async function handleCancelTraining(runId: string) {
    console.log(runId);
    if (runStatus === 'starting' || runStatus === 'processing') {
      let succesful;
      console.log('Cancelling training...');
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
        console.log('Cancellation successful.');
      } else {
        console.log('Cancellation failed.');
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
      if (runStatus === 'failed' || runStatus === 'canceled') {
        userData.model_tokens++;
      }
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
          instance_type: instanceType,
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
      <h2 className="text-4xl font-bold mb-4">Entrenar 🦾</h2>
      <h3 className="text-xl mb-4">
        Tokens para entrenar:{' '}
        {!!userData && userData.model_tokens !== undefined
          ? userData.model_tokens
          : '...'}
      </h3>
      {ready ? (
        <div>
          {!hasUploadedData && (
            <div>
              <div className="text-lg font-bold">1er paso: Subir imágenes</div>
              <div>
                Primero, asegúrate de tener entre 8 y 12 imágenes de alta
                calidad para entrenar a tu modelo. Asegúrate de que en cada
                imagen solo aparezca una persona, animal o cosa. También es
                crucial que el sujeto esté claramente separado del fondo para
                obtener los mejores resultados. ¡Selecciona tus imágenes
                favoritas!
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
                      <span>{!hasUploadedData ? 'Subir Imágenes' : ''}</span>
                    </div>
                  </button>
                </label>
              </div>
            </div>
          )}

          {hasUploadedData && !hasFinetunedModel && (
            <div>
              <div className="text-lg font-bold">2o paso: Nombra tu modelo</div>
              <div>
                Ahora es el momento de darle un nombre único y especial a tu
                modelo. Este nombre ayudará a identificar al sujeto con el que
                estás trabajando. Por ejemplo, si tu sujeto es <b>María</b>,
                podrías usar un nombre como <b>TOKMAR</b>. Recuerda que mientras
                más único y diferente sea el nombre, ¡mejor reconocerá el modelo
                a tu sujeto! También, por favor, selecciona el tipo de sujeto
                que estás utilizando: ¿es una persona, un coche, un animal, una
                planta u otra cosa? Esto asegurará que el modelo genere imágenes
                coherentes.
              </div>
              <div className="mt-4 max-w-screen-xs m-auto grid columns-2">
                <label className="font-bold text-xl my-1" htmlFor="name">
                  Nombre:{' '}
                </label>
                <input
                  className="my-1"
                  id="name"
                  value={instanceName}
                  onChange={(ev) => setInstanceName(ev.target.value)}
                  placeholder={'Nombre Único'}
                />

                <label className="font-bold text-xl my-1" htmlFor="ip">
                  Tipo
                </label>
                <select
                  name="instance_type"
                  id="ip"
                  className="my-1"
                  onChange={(ev) => setInstanceType(ev.target.value)}
                >
                  <option value="man">Hombre</option>
                  <option value="woman">Mujer</option>
                  <option value="dog">Perro</option>
                  <option value="cat">Gato</option>
                  <option value="thing">Cosa</option>
                </select>

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
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {fineTuningInProgress && (
            <div>
              <div className="text-lg font-bold">
                3er paso: Espera a que tu modelo se entrene
              </div>
              <div>
                Este proceso puede tomar alrededor de 15 a 20 minutos, así que
                tómate un respiro y aprovecha para hacer algo que disfrutes.
                Durante este tiempo, nuestro poderoso sistema está aprendiendo
                de tus imágenes y preparándose para generar imágenes
                personalizadas basadas en tus instrucciones.
              </div>
              <div className="mt-3">
                ¡Una vez que el entrenamiento esté completo, estarás listo para
                sumergirte en el emocionante mundo de la creación de imágenes
                personalizadas! Estamos emocionados de ser parte de tu viaje
                creativo y no podemos esperar para ver las asombrosas imágenes
                que crearás. ¡Disfruta de la anticipación y prepárate para dar
                vida a tus ideas!
              </div>
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
              <span>El modelo ha fallado, inténtelo de nuevo</span>
            </div>
          )}

          {fineTuningCanceled && (
            <div className="text-center">
              <BsExclamationLg size={140} color="red" className="w-50 m-auto" />
              <span>Ha cancelado el entrenamiento, inténtelo de nuevo</span>
            </div>
          )}

          {fineTuningSucceeded && (
            <div>
              <div className="text-lg font-bold">
                Paso 4: Genera Imágenes Mágicas a partir de Prompts
              </div>
              <div>
                ¡Felicidades! Tu modelo está entrenado y listo para desatar su
                creatividad. Ahora es el momento de generar imágenes
                personalizadas que te dejarán boquiabierto.
              </div>
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
                  Empezar de nuevo
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
                  Empezar de nuevo
                </button>
              </div>
            </main>
          )}

          {fineTuningData?.run_id && !fineTuningSucceeded && (
            <main className={styles.main}>
              <div className={styles.clear}>
                <button
                  onClick={() => handleCancelTraining(fineTuningData?.run_id)}
                  className={classNames(styles.button, styles.reset)}
                  style={{
                    width: 'max-content',
                    backgroundColor: 'red',
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  cancelar prediccion
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
