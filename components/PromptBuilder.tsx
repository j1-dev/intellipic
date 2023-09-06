'use client';
import { useState } from 'react';
import categories from '@/app/core/resources/categories';

interface SelectedOptions {
  medium: string;
  clothing: string;
  pose: string;
  scene: string;
  artist: string;
  settings: string;
}

const PromptBuilder = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    medium: '',
    clothing: '',
    pose: '',
    scene: '',
    artist: '',
    settings: ''
  });

  const categoryOptions: { [key: string]: string[] } = categories;

  const getRandomOption = (category: string) => {
    const options = categoryOptions[category];
    const index = Math.floor(Math.random() * options.length);
    return options[index] === 'None' ? '' : options[index];
  };

  const generatePrompt = () => {
    const { medium, clothing, pose, scene, artist, settings } = selectedOptions;
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
    const newSelectedOptions = {
      medium: getRandomOption('medium'),
      clothing: getRandomOption('clothing'),
      pose: getRandomOption('pose'),
      scene: getRandomOption('scene'),
      artist: getRandomOption('artist'),
      settings: getRandomOption('settings')
    };

    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mb-4"
        onClick={handleGeneratePrompt}
      >
        Generate Prompt
      </button>
      {Object.keys(selectedOptions).map((category) => (
        <div className="mb-4" key={category}>
          <label className="block text-gray-700 font-bold mb-2">
            {category.charAt(0).toUpperCase() + category.slice(1)}:
            <select
              value={selectedOptions[category as keyof SelectedOptions]}
              onChange={(e) =>
                setSelectedOptions({
                  ...selectedOptions,
                  [category as keyof SelectedOptions]: e.target.value
                })
              }
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            >
              {categoryOptions[category as keyof SelectedOptions].map(
                (option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>
          </label>
        </div>
      ))}
      <p className="text-gray-800">{generatePrompt()}</p>
    </div>
  );
};

export default PromptBuilder;
