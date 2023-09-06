'use client';
import { useState } from 'react';

const PromptBuilder = () => {
  const [medium, setMedium] = useState<string>('photo');
  const [clothing, setClothing] = useState<string>('');
  const [pose, setPose] = useState<string>('');
  const [scene, setScene] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [settings, setSettings] = useState<string>('');

  const mediumOptions = [
    'portrait',
    'painting',
    'digital art',
    'sculpture',
    'photograph',
    'collage',
    'illustration',
    'animation',
    'mixed media',
    'watercolor'
  ];

  const clothingOptions = [
    'None',
    'red hoodie',
    'formal suit',
    'casual jeans and t-shirt',
    'superhero costume',
    'bohemian dress',
    'sports uniform',
    'vintage attire',
    'business attire',
    'punk outfit',
    'swimwear'
  ];

  const posesOptions = [
    'None',
    'flexing',
    'standing tall',
    'sitting gracefully',
    'dancing',
    'jumping',
    'reading',
    'meditating',
    'running',
    'yoga',
    'cartwheel'
  ];

  const sceneOptions = [
    'None',
    'mountain',
    'beach',
    'cityscape',
    'fantasy realm',
    'underwater',
    'outer space',
    'countryside',
    'urban street',
    'desert',
    'jungle'
  ];

  const artistOptions = [
    'None',
    'Leonardo Da Vinci',
    'Pablo Picasso',
    'Frida Kahlo',
    'Vincent van Gogh',
    'Georgia O Keeffe',
    'Salvador Dali',
    'Rembrandt',
    'Claude Monet',
    'Andy Warhol',
    'Yayoi Kusama'
  ];

  const settingsOptions = [
    'None',
    'cinematic',
    'surreal',
    'minimalistic',
    'vibrant',
    'nostalgic',
    'futuristic',
    'dreamy',
    'grunge',
    'romantic',
    'ethereal'
  ];

  const getRandomOption = (options: string[]) => {
    const index = Math.floor(Math.random() * options.length);
    return options[index] === 'None' ? '' : options[index];
  };

  const generatePrompt = () => {
    let generatedPrompt = `A ${medium} of @me`;

    {
      clothing &&
        clothing !== 'None' &&
        (generatedPrompt += ` wearing ${clothing}`);
    }

    {
      pose && pose !== 'None' && (generatedPrompt += `, ${pose}`);
    }

    {
      scene && scene !== 'None' && (generatedPrompt += `, in a ${scene}`);
    }

    {
      artist && artist !== 'None' && (generatedPrompt += `, made by ${artist}`);
    }

    {
      settings && settings !== 'None' && (generatedPrompt += `, ${settings}`);
    }

    generatedPrompt += '.';

    return generatedPrompt;
  };

  const handleGeneratePrompt = () => {
    const newMedium = getRandomOption(mediumOptions);
    const newClothing = getRandomOption(clothingOptions);
    const newPose = getRandomOption(posesOptions);
    const newScene = getRandomOption(sceneOptions);
    const newArtist = getRandomOption(artistOptions);
    const newSettings = getRandomOption(settingsOptions);

    setMedium(newMedium);
    setClothing(newClothing);
    setPose(newPose);
    setScene(newScene);
    setArtist(newArtist);
    setSettings(newSettings);
  };

  return (
    <div>
      <button onClick={handleGeneratePrompt}>Generate Prompt</button>
      <div>
        <label>
          Medium:
          <select value={medium} onChange={(e) => setMedium(e.target.value)}>
            {mediumOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Clothing:
          <select
            value={clothing}
            onChange={(e) => setClothing(e.target.value)}
          >
            {clothingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Pose:
          <select value={pose} onChange={(e) => setPose(e.target.value)}>
            {posesOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Scene:
          <select value={scene} onChange={(e) => setScene(e.target.value)}>
            {sceneOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Artist:
          <select value={artist} onChange={(e) => setArtist(e.target.value)}>
            {artistOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Settings:
          <select
            value={settings}
            onChange={(e) => setSettings(e.target.value)}
          >
            {settingsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p>{generatePrompt()}</p>
    </div>
  );
};

export default PromptBuilder;
