'use client';
import Button from '@/components/Button';
import supabase from '@/app/core/clients/supabase';
import post from '@/app/core/utils/post';
import replacePromptToken from '@/app/core/utils/predictions';
import useInterval from '@/app/core/utils/useInterval';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { useParams, useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsChevronDown } from 'react-icons/bs';
import { ClipLoader } from 'react-spinners';
import { prompts } from '@/app/core/resources/prompts';
import { default as NextImage } from 'next/image';
import PromptBuilder from '@/components/PromptBuilder';
import { useTranslations } from 'next-intl';

export default function ModelPage() {
  const t = useTranslations('ModelPage');
  const router = useRouter();
  const params = useParams();
  const id = params.userId;
  const model = params.modelId;
  const [cancellingPrediction, setCancellingPrediction] = useState(false);
  const [instancePrompt, setInstancePrompt] = useState(
    localStorage.getItem(`ip${model}`) || ''
  );
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem(`iu${model}`) || ''
  );
  const [predictionId, setPredictionId] = useState(
    localStorage.getItem(`pi${model}`) || ''
  );
  const [queueingPrediction, setQueueingPrediction] = useState(
    localStorage.getItem(`qp${model}`) === 'true'
  );
  const [predictionStatus, setPredictionStatus] = useState(
    localStorage.getItem(`ps${model}`) || ''
  );
  const [token, setToken] = useState(localStorage.getItem(`tk${model}`) || '');
  const [instanceClass, setInstanceClass] = useState(
    localStorage.getItem(`ic${model}`) || ''
  );
  const [promptType, setPromptType] = useState(
    localStorage.getItem(`pt${model}`) || 'defaultPrompt'
  );
  const [promptName, setPromptName] = useState(
    localStorage.getItem(`pn${model}`) || 'availablePrompts'
  );
  const [modelStatus, setModelStatus] = useState(
    localStorage.getItem(`ms${model}`) || ''
  );
  const [userData, setUserData] = useState<any>(() =>
    JSON.parse(localStorage.getItem('userData') as string)
  );
  const [toastId, setToastId] = useState<string>('');

  const p = prompts;

  useEffect(() => {
    // Save state variables to localStorage
    localStorage.setItem(`ip${model}`, instancePrompt);
    localStorage.setItem(`iu${model}`, imageUrl);
    localStorage.setItem(`pi${model}`, predictionId);
    localStorage.setItem(`qp${model}`, queueingPrediction.toString());
    localStorage.setItem(`ps${model}`, predictionStatus);
    localStorage.setItem(`tk${model}`, token);
    localStorage.setItem(`ic${model}`, instanceClass);
    localStorage.setItem(`pt${model}`, promptType as string);
    localStorage.setItem(`ms${model}`, modelStatus);
  }, [
    instancePrompt,
    imageUrl,
    predictionId,
    queueingPrediction,
    predictionStatus,
    model,
    token,
    instanceClass,
    promptType,
    modelStatus
  ]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const { data: d, error: e } = await supabase
      .from('user-data')
      .select('*')
      .eq('id', userData.id);

    if (e) {
      console.error(e);
    } else {
      console.log(d);
      setUserData(d[0]);
      localStorage.setItem('userData', JSON.stringify(d[0] || {}));
    }
  };

  useEffect(() => {
    const sub = async () => {
      await supabase
        .from('trainings')
        .select('*')
        .eq('run_id', model)
        .then((t) => {
          if (t && t.data) {
            setToken(t.data[0].prompt_token);
            setInstanceClass(t.data[0].instance_class);
            setModelStatus(t.data[0].status);
          }
        });
    };
    sub();
  }, [model]);

  useEffect(() => {
    checkIfImageExists(imageUrl, (exists: any) => {
      if (!exists) {
        setImageUrl('');
      }
    });
  }, [imageUrl]);

  async function handleCallModel() {
    let tokens = userData.image_tokens;
    if (tokens > 0) {
      const prompt = replacePromptToken(instancePrompt, token);
      post(
        `/api/ai/${id}/call-model`,
        {
          run_id: model,
          instance_prompt: prompt,
          user: userData
        },
        async (data: any) => {
          fetchUserInfo();
          if (data.error_code === 'CLIENT_SERVER_TOKENS_DESYNC') {
            toast.error(t('token_desync_error'));
          } else {
            setPredictionId(data.prediction_id);
            setQueueingPrediction(true);
            setCancellingPrediction(false);
          }
        }
      );
    } else {
      toast.error('No te quedan tokens, puedes adquirir más en la tienda');
    }
  }

  async function handleGetPrediction() {
    if (queueingPrediction) {
      post(
        `/api/ai/${id}/get-prediction`,
        {
          prediction_id: predictionId
        },
        (data: any) => {
          if (data.status !== predictionStatus) {
            setPredictionStatus(data.status);
          }
          if (data.status === 'succeeded') {
            setImageUrl(data.output[0]);
            setQueueingPrediction(false);
          }
          if (data.status === 'failed') {
            setImageUrl('');
            setQueueingPrediction(false);
            fetchUserInfo();
            toast.error(
              'Ha habido un fallo con la generación, prueba otra vez'
            );
          }
          if (data.status === 'canceled') {
            setImageUrl('');
            setQueueingPrediction(false);
            fetchUserInfo();
            toast.dismiss(toastId);
            toast.success('Ha cancelado la generación, pruebe de nuevo');
          }
        }
      );
    }
  }

  async function handleDeleteModel() {
    if (window.confirm('Estas seguro que quieres eliminar el modelo?')) {
      try {
        await supabase.from('trainings').delete().eq('run_id', model);
        setToken('');
        setInstanceClass('');
        setModelStatus('');

        router.push(`/dashboard/${id}`);
      } catch (error) {
        console.error('Error deleting model:', error);
      }
    }
  }

  async function handleCancelPrediction() {
    if (queueingPrediction) {
      let succesful;
      await post(
        `/api/ai/${id}/cancel-prediction`,
        {
          prediction_id: predictionId
        },
        (data: any) => {
          succesful = data;
        }
      );

      if (succesful) {
        setToastId(toast.loading('Cancelando...'));
      } else {
        console.log('Cancellation failed.');
        toast.error('Algo ha fallado...');
      }
    }
  }

  function checkIfImageExists(url: any, callback: any) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };

      img.onerror = () => {
        callback(false);
      };
    }
  }

  async function downloadImage() {
    if (!!imageUrl) {
      const imageSrc = imageUrl;
      const image = await fetch(imageSrc);
      const imageBlog = await image.blob();
      const imageURL = URL.createObjectURL(imageBlog);

      const link = document.createElement('a');
      link.href = imageURL;
      link.download = instancePrompt + '.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  useInterval(() => handleGetPrediction(), 2000);

  return (
    <div className="max-w-screen-lg mx-auto px-8 py-8">
      <h2 className="text-4xl font-bold mb-2">{t('modelTitle')}</h2>
      <h3 className="text-2xl font-bold mb-2">
        {t('modelToken').replace('token', token)}
      </h3>
      <span>{t('tokenInfo')}</span>
      <div className="relative mb-24">
        <span className="absolute lef-0 my-7 font-semibold">
          {t('remainingTokens')} {userData.image_tokens}
        </span>
        <button
          onClick={handleDeleteModel}
          className="absolute right-0 bg-red-600 text-white border-red-600 hover:text-black dark:text-white dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-black border rounded py-2 px-4 transition-all"
          style={{ marginTop: '1rem' }}
        >
          {t('deleteModel')}
        </button>
      </div>
      <main className="max-w-screen-xs m-auto center">
        <div>
          <div>
            <Menu as="div" className="mb-8 relative w-full">
              <div>
                <Menu.Button className="left-0 border rounded-lg pl-3 border-black dark:border-white inline-flex w-full py-4 text-sm font-medium text-black dark:text-white transition-all">
                  <span className="font-semibold text-lg">{t(promptType)}</span>
                  <BsChevronDown
                    className="right-3 top-5 absolute h-5 w-5 text-black dark:text-white transition-all"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute m-auto mt-2 w-full divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? 'border text-white bg-black'
                              : 'text-black hover:font-bold',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                          )}
                          onClick={() => setPromptType('defaultPrompt')}
                        >
                          <span className="mr-2">{t('defaultPrompt')}</span>
                          <span className="ml-auto text-gray-500">
                            {t('defaultPromptInfo')}
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? 'border text-white bg-black'
                              : 'text-black hover:font-bold',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                          )}
                          onClick={() => setPromptType('generatedPrompt')}
                        >
                          <span className="mr-2">{t('generatedPrompt')}</span>
                          <span className="ml-auto text-gray-500">
                            {t('generatedPromptInfo')}
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? 'border text-white bg-black'
                              : 'text-black hover:font-bold',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                          )}
                          onClick={() => setPromptType('writtenPrompt')}
                        >
                          <span className="mr-2">{t('writtenPrompt')}</span>
                          <span className="ml-auto text-gray-500">
                            {t('writtenPromptInfo')}
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {promptType === 'defaultPrompt' && (
              <div className="w-full m-auto ">
                <Menu as="div" className="mb-8 relative">
                  <div>
                    <Menu.Button className="left-0 border rounded-lg pl-3 border-black dark:border-white inline-flex w-full py-2 text-sm font-medium text-black dark:text-white transition-all">
                      {t(promptName)}
                      <BsChevronDown
                        className="right-3 absolute h-5 w-5 text-black dark:text-white transition-all"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute m-auto mt-2 w-full divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="px-1 py-1 ">
                        {p.map((prompt: any) => {
                          return (
                            <Menu.Item key="1">
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active
                                      ? 'border text-white bg-black'
                                      : 'text-black hover:font-bold',
                                    'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                  )}
                                  onClick={() => {
                                    setInstancePrompt(prompt.prompt);
                                    setPromptName(prompt.name);
                                  }}
                                >
                                  <span className="mr-2">{t(prompt.name)}</span>
                                </button>
                              )}
                            </Menu.Item>
                          );
                        })}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}

            {promptType === 'writtenPrompt' && (
              <div>
                <textarea
                  className="max-w-screen-md w-full h-[125px] m-auto p-2 border border-black rounded-md resize-none transition-all bg-white text-black dark:bg-black dark:text-white dark:border-white"
                  value={instancePrompt}
                  onChange={(e) => setInstancePrompt(e.target.value)}
                  placeholder="'Retrato de primer plano de Davidrmk como un vikingo'"
                />
                <p className="text-sm mb-4">{t('advancedMethodWarning')}</p>
              </div>
            )}

            {promptType === 'generatedPrompt' && (
              <div>
                <PromptBuilder
                  setPrompt={(p: string) => {
                    setInstancePrompt(p);
                  }}
                  model={model as string}
                />
              </div>
            )}
            {imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <NextImage
                alt="Generated image"
                width={400}
                height={400}
                src={imageUrl}
                loading="eager"
                priority
                className="mb-4 w-full rounded-lg"
              />
            )}
            <div className="flex justify-center items-center">
              <Button
                onClick={handleCallModel}
                cooldownTime={4000}
                className=" bg-blue-600 text-white disabled:hover:text-white disabled:border-gray-400 border-blue-600 hover:text-black  dark:text-white dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-black border rounded py-2 px-4 transition-all disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:dark:bg-gray-400"
                disabled={queueingPrediction || modelStatus !== 'succeeded'}
              >
                {queueingPrediction ? t('generating') : t('generate')}
              </Button>
              {queueingPrediction && (
                <Button
                  onClick={handleCancelPrediction}
                  cooldownTime={5000}
                  className="w-max bg-red-600 text-white border-red-600 hover:text-black dark:text-white dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-black border rounded transition-all ml-2 py-2 px-4 "
                  disabled={!queueingPrediction || cancellingPrediction}
                >
                  {cancellingPrediction
                    ? t('cancelling')
                    : t('cancelGeneration')}
                </Button>
              )}
              {!!imageUrl && !queueingPrediction && (
                <Button
                  onClick={() => {
                    downloadImage();
                  }}
                  cooldownTime={5000}
                  className="w-max bg-green-600 text-white border-green-600 hover:text-black dark:text-white dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-black border rounded transition-all ml-2 py-2 px-4 "
                >
                  {t('downloadImage')}
                </Button>
              )}
            </div>
          </div>
          {queueingPrediction && (
            <div className="flex justify-center items-center mt-3">
              <ClipLoader className="m-3" color="blue" speedMultiplier={0.6} />
            </div>
          )}
          {modelStatus !== 'succeeded' && (
            <div className="pt-2 text-center">
              <span>{t('modelNotReady')}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
