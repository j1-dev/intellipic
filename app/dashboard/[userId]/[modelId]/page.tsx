'use client';
import { useParams } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Menu, Transition } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';

import styles from '../../../Home.module.css';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import * as prompts from '../../../core/resources/prompts.json';
import { replacePromptToken } from '@/app/core/utils/predictions';
import { supabase } from '@/app/supabaseClient';

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

export default function ModelPage() {
  const params = useParams();
  const id = params.userId;
  const model = params.modelId;
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
  const [token, setToken] = useState<any | null>(
    localStorage.getItem(`tk${model}`) || ''
  );
  const [instanceClass, setInstanceClass] = useState<any | null>(
    localStorage.getItem(`ic${model}`) || ''
  );
  const [promptType, setPromptType] = useState('Prompt propio');

  const p = prompts.prompts;

  useEffect(() => {
    // Save state variables to localStorage
    localStorage.setItem(`ip${model}`, instancePrompt);
    localStorage.setItem(`iu${model}`, imageUrl);
    localStorage.setItem(`pi${model}`, predictionId);
    localStorage.setItem(`qp${model}`, queueingPrediction.toString());
    localStorage.setItem(`tk${model}`, token);
    localStorage.setItem(`ic${model}`, instanceClass);
  }, [
    instancePrompt,
    imageUrl,
    predictionId,
    queueingPrediction,
    model,
    token,
    instanceClass
  ]);

  useEffect(() => {
    const sub = async () => {
      await supabase
        .from('trainings')
        .select('*')
        .eq('run_id', model)
        .then((t) => {
          console.log(t);
          if (t && t.data) {
            setToken(t.data[0].prompt_token);
            setInstanceClass(t.data[0].instance_class);
          }
        });
    };
    sub();
  }, []);

  async function handleCallModel() {
    const prompt = replacePromptToken(instancePrompt, token, instanceClass);
    console.log(prompt);
    post(
      `/api/${id}/call-model`,
      {
        run_id: model,
        instance_prompt: prompt,
        user_id: id
      },
      (data: any) => {
        setPredictionId(data.prediction_id);
        setQueueingPrediction(true);
      }
    );
  }

  async function handleGetPrediction() {
    if (queueingPrediction) {
      post(
        `/api/${id}/get-prediction`,
        {
          prediction_id: predictionId
        },
        (data: any) => {
          console.log(data);
          if (data.status === 'succeeded') {
            setImageUrl(data.output);
            setQueueingPrediction(false);
          }
        }
      );
    }
  }

  useInterval(() => handleGetPrediction(), 3000);

  return (
    <div>
      <main className={styles.main}>
        <div className={classNames(styles.step, styles.columnstep)}>
          <div className={styles.prompt}>
            <Menu as="div" className="mb-8 relative">
              <div>
                <Menu.Button className="left-0 border-b-[1px] border-opacity-0 hover:border-opacity-100 hover:border-black hover:dark:border-white inline-flex w-full py-2 text-sm font-medium text-black dark:text-white transition-all">
                  {promptType}
                  <BsChevronDown
                    className="right-0 absolute h-5 w-5 text-black dark:text-white transition-all"
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
                <Menu.Items className="absolute m-auto mt-2 w-64 divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? 'bg-violet-500 text-white'
                              : 'text-gray-900',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                          )}
                          onClick={() => setPromptType('Prompt propio')}
                        >
                          <span className="mr-2">Prompt escrito</span>
                          <span className="ml-auto text-gray-500">
                            Crea tu prompt a tu manera
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? 'bg-violet-500 text-white'
                              : 'text-gray-900',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                          )}
                          onClick={() => setPromptType('Prompt pre-hecho')}
                        >
                          <span className="mr-2">Prompt predeterminado</span>
                          <span className="ml-auto text-gray-500">
                            Escoje uno de los prompts ya creados
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {promptType === 'Prompt pre-hecho' && (
              <div className="w-full m-auto">
                <Menu as="div" className="mb-8 relative">
                  <div>
                    <Menu.Button className="left-0 border-b-[1px] border-opacity-0 hover:border-opacity-100 hover:border-black hover:dark:border-white inline-flex w-full py-2 text-sm font-medium text-black dark:text-white transition-all">
                      Prompts disponibles
                      <BsChevronDown
                        className="right-0 absolute h-5 w-5 text-black dark:text-white transition-all"
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
                    <Menu.Items className="absolute m-auto mt-2 w-64 divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="px-1 py-1 ">
                        {p.map((prompt: any) => {
                          return (
                            <Menu.Item key="1">
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active
                                      ? 'bg-violet-500 text-white'
                                      : 'text-gray-900',
                                    'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                  )}
                                  onClick={() =>
                                    setInstancePrompt(prompt.prompt)
                                  }
                                >
                                  <span className="mr-2">{prompt.name}</span>
                                </button>
                              )}
                            </Menu.Item>
                          );
                        })}
                        {/* <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-900',
                                'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                              )}
                              onClick={() => setInstancePrompt('')}
                            >
                              <span className="mr-2">Vikingo</span>
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-900',
                                'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                              )}
                              onClick={() => setPromptType('Prompt pre-hecho')}
                            >
                              <span className="mr-2">
                                Prompt predeterminado
                              </span>
                              <span className="ml-auto text-gray-500">
                                Escoje uno de los prompts ya creados
                              </span>
                            </button>
                          )}
                        </Menu.Item> */}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
            {promptType === 'Prompt propio' && (
              <textarea
                className="w-full h-[125px] m-auto p-2 mb-4 border border-black rounded-md resize-none transition-all bg-white text-black dark:bg-black dark:text-white dark:border-white"
                value={instancePrompt}
                onChange={(e) => setInstancePrompt(e.target.value)}
                placeholder="' Retrato de primer plano de Davidrmk como un vikingo'"
              />
            )}
            <button
              onClick={handleCallModel}
              className={classNames(styles.button, styles.primary)}
              style={{ marginTop: 0 }}
            >
              Generar
            </button>
          </div>
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={classNames(styles.image, styles.modeloutput)}
              alt="Generated image"
              width={400}
              height={400}
              src={imageUrl}
            />
          )}
        </div>
      </main>
    </div>
  );
}
