"use client"
import { useParams } from "next/navigation";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/app/supabaseClient";

import { useIsomorphicLayoutEffect } from "usehooks-ts";
import JSZip from "jszip";

async function post(url: string, body: any, callback: any) {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
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

export default function TrainPage(){
  const FINETUNING_BUCKET = "fine-tuning-bucket"; 
  const SUPABASE_TABLE_NAME = "finetuningruns"
  const params = useParams(); 
  const id = params.userId;
  const [ready, setReady] = useState(false);
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
  const [instancePrompt, setInstancePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [queueingFinetuning, setQueueingFinetuning] = useState(false);
  const [instanceName, setInstanceName] = useState("");
  // Instance Type that defaults to "Man"
  const [instanceType, setInstanceType] = useState("Man");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        getOrInsertUserData(id);
        getModelStatus(id);
      }
    };

    fetchData();
  }, [id]);

  useInterval(() => getOrInsertUserData(id), 10000);
  useInterval(() => getModelStatus(id), 10000);
  
  async function clearUserData(id: any) {
    post(
      `/api/${id}/clear`,
      { },
      (data: any) => setFinetuningData(data.output)
    );
  }

  async function getOrInsertUserData(id: any) {
    await fetch(`/api/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setFinetuningData(data)
    });

    setReady(true);
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

    setReady(true);
  }

  async function handleFileUpload(ev: React.ChangeEvent<HTMLInputElement>) {
    setUploading(true);
    const files = ev.target.files || [];
    const zip = new JSZip();
    const dataFolder = zip.folder("data");

    if (dataFolder) {
      if (dataFolder) {
        for (let file = 0; file < files.length; file++) {
          dataFolder.file(files[file].name, files[file]);
        }
      }
    }

    zip.generateAsync({ type: "blob" }).then(async (content) => {
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
        await supabase
          .from("finetuningruns")
          .update({ dataset: `public/${id}/data.zip` })
          .eq("user_id", id)
          .select();
        getOrInsertUserData(id);
      }
      setUploading(false);
    });
  }

  // Include instanceType on the object sent to Blueprint with the name instance_type
  async function handleValidationAndFinetuningStart() {
    setQueueingFinetuning(true);
    await post(
      `/api/${id}/train`,
      {
        url: fineTuningData.dataset,
        prompt: instanceName,
        instance_type: instanceType,
      },
      (data: any) => console.log(data)
    );
    getOrInsertUserData(id);
    setQueueingFinetuning(false);
  }
  
}
