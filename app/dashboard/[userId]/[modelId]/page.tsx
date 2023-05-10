"use client"
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/supabaseClient";
import { useState } from "react";
import classNames from "classnames";

import styles from "../../../Home.module.css";


export default function ModelPage(){
  const params = useParams();
  const router = useRouter();
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
                    // onClick={handleCallModel}
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
