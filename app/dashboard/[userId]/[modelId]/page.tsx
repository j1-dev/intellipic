"use client"
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/supabaseClient";
import { useState } from "react";
import classNames from "classnames";

import styles from "../../../Home.module.css";

async function post(url: string, body: any, callback: any) {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(callback);
}

export default function ModelPage(){
  const params = useParams();
  const router = useRouter();
  const id = params.userId;
  const [instancePrompt, setInstancePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const [fineTuningData, setFinetuningData] = useState({
    dataset: null,
    run_id: null,
    run_data: {
      status: null,
    },
  });

  const [modelStatus, setModelStatus] = useState({
    healthy: null,
    modelId: null,
  });

  const [predictionId, setPredictionId] = useState("");
  const [queueingPrediction, setQueueingPrediction] = useState(false);

  async function getOrInsertUserData(id: any) {
    await fetch(`/api/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setFinetuningData(data)
    });
  }

  async function getModelStatus(id:any) {
    await fetch(`/api/${id}/status`)
      .then((response) => response.json())
      .then((data) => {
        setModelStatus({
          modelId: data.model_id,
          healthy: data.healthy,
        })
      });
  }

  async function handleCallModel() {
    post(
      `api/${id}/call-model`,
      {
        run_id: fineTuningData.run_id,
        instance_prompt: instancePrompt,
        user_id: id,
      },
      (data: any) => {
        setPredictionId(data.prediction_id);
        setQueueingPrediction(true);
      }
    );
  }

  async function handleGetPrediction(){
    if(queueingPrediction){
      post(
        `api/${id}/get-prediction`,
        {
          prediction_id: predictionId,
        },
        (data: any) => {
          console.log(data)
          if(data.status==="succeeded"){
            setImageUrl(data.output)
            setQueueingPrediction(false)
          }
        }
      )
    }
  }
  
  return(
    <div>
      {modelStatus.healthy && (
        <main className={styles.main}>
          <div className={classNames(styles.step, styles.columnstep)}>
            <div className={styles.prompt}>
              <input
                className={classNames(styles.input, styles.promptinput)}
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
      )}
    </div>

  )
}
