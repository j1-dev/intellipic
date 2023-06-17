'use client';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from '../../../Home.module.css';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

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

  useEffect(() => {
    // Save state variables to localStorage
    localStorage.setItem(`ip${model}`, instancePrompt);
    localStorage.setItem(`iu${model}`, imageUrl);
    localStorage.setItem(`pi${model}`, predictionId);
    localStorage.setItem(`qp${model}`, queueingPrediction.toString());
  }, [instancePrompt, imageUrl, predictionId, queueingPrediction, model]);

  async function handleCallModel() {
    post(
      `/api/${id}/call-model`,
      {
        run_id: model,
        instance_prompt: instancePrompt,
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
            <textarea
              className="w-full h-[125px] m-auto p-2 mb-4 border border-black rounded-md resize-none transition-all bg-white text-black dark:bg-black dark:text-white dark:border-white"
              value={instancePrompt}
              onChange={(e) => setInstancePrompt(e.target.value)}
              placeholder="' Retrato de primer plano de Davidrmk como un vikingo'"
            />
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
