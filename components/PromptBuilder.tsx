'use client';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { Transition } from '@headlessui/react';
import categories from '@/app/core/resources/categories';

interface SelectedOptions {
  medium: string;
  clothing: string;
  pose: string;
  scene: string;
  artist: string;
  settings: string;
}

const PromptBuilder = ({ setPrompt }: { setPrompt: Function }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    medium: 'portrait',
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
      artist &&
        artist !== 'None' &&
        (generatedPrompt += `, in the style of ${artist}`);
    }

    {
      settings && settings !== 'None' && (generatedPrompt += `, ${settings}`);
    }

    generatedPrompt += '.';
    setPrompt(generatedPrompt);

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
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-lg font-semibold">Prompt Builder</h2>
        <BiChevronDown
          className={`${
            isCollapsed ? 'transform rotate-0' : 'transform rotate-180'
          } h-5 w-5 transition-transform`}
        />
      </div>
      <Transition
        show={!isCollapsed}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div>
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
                  onChange={(e) => {
                    setSelectedOptions({
                      ...selectedOptions,
                      [category as keyof SelectedOptions]: e.target.value
                    });
                  }}
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
          <p className="hidden">{generatePrompt()}</p>
        </div>
      </Transition>
    </div>
  );
};

export default PromptBuilder;