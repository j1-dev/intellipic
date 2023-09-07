'use client';
import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import translate from '@/app/core/utils/translateCategories';
import categories from '@/app/core/resources/categories';

interface SelectedOptions {
  medium: string;
  clothing: string;
  pose: string;
  scene: string;
  artist: string;
  settings: string;
}

const PromptBuilder = ({
  setPrompt,
  id
}: {
  setPrompt: Function;
  id: string;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    medium: 'portrait',
    clothing: '',
    pose: '',
    scene: '',
    artist: '',
    settings: ''
  });

  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');

  // Separate state for custom inputs
  const [customMedium, setCustomMedium] = useState<string>('');
  const [customClothing, setCustomClothing] = useState<string>('');
  const [customPose, setCustomPose] = useState<string>('');
  const [customScene, setCustomScene] = useState<string>('');
  const [customArtist, setCustomArtist] = useState<string>('');
  const [customSettings, setCustomSettings] = useState<string>('');

  const categoryOptions: { [key: string]: string[] } = categories;

  const getRandomOption = (category: string) => {
    const options = categoryOptions[category];
    const index = Math.floor(Math.random() * options.length);
    return options[index] === 'None' ? '' : options[index];
  };

  const generatePrompt = () => {
    const { medium, clothing, pose, scene, artist, settings } = selectedOptions;

    let generatedPrompt = `A ${
      medium === 'Other' ? customMedium : medium
    } of @me`;

    {
      clothing &&
        clothing !== 'None' &&
        (generatedPrompt += ` wearing ${
          clothing === 'Other' ? customClothing : clothing
        }`);
    }

    {
      pose &&
        pose !== 'None' &&
        (generatedPrompt += `, ${pose === 'Other' ? customPose : pose}`);
    }

    {
      scene &&
        scene !== 'None' &&
        (generatedPrompt += `, in a ${
          scene === 'Other' ? customScene : scene
        }`);
    }

    {
      artist &&
        artist !== 'None' &&
        (generatedPrompt += `, in the style of ${
          artist === 'Other' ? customArtist : artist
        }`);
    }

    {
      settings &&
        settings !== 'None' &&
        (generatedPrompt += `, ${
          settings === 'Other' ? customSettings : settings
        }`);
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

  const handleAddNewCategory = () => {
    // Add the new category to the customCategories list
    setCustomCategories([...customCategories, newCategory]);

    // Clear the newCategory input field
    setNewCategory('');
  };

  return (
    <div className="py-4 px-3 mx-auto mb-7 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white rounded-lg ">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-lg font-semibold">Generador de Prompts</h2>
        <BsChevronDown
          className={`${
            isCollapsed ? 'transform rotate-0' : 'transform rotate-180'
          } h-5 w-5 transition-transform`}
        />
      </div>
      <div
        className={`overflow-hidden ${
          isCollapsed ? 'max-h-0' : 'max-h-screen'
        } transition-max-height ease-in-out duration-[500ms]`}
      >
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md my-4"
          onClick={handleGeneratePrompt}
        >
          Generar Prompt
        </button>
        {Object.keys(selectedOptions).map((category) => (
          <div className="mb-4" key={category}>
            <label className="block text-gray-700 font-bold mb-2">
              {translate(category, 'es').charAt(0).toUpperCase() +
                translate(category, 'es').slice(1)}
              :
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
                      {translate(option, 'es')}
                    </option>
                  )
                )}
                <option value="Other">Otro</option>
              </select>
              {selectedOptions[category as keyof SelectedOptions] ===
                'Other' && (
                <input
                  type="text"
                  className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Ingrese su opción personalizada"
                  value={category === 'medium' ? customMedium : ''}
                  onChange={(e) =>
                    category === 'medium'
                      ? setCustomMedium(e.target.value)
                      : category === 'clothing'
                      ? setCustomClothing(e.target.value)
                      : category === 'pose'
                      ? setCustomPose(e.target.value)
                      : category === 'scene'
                      ? setCustomScene(e.target.value)
                      : category === 'artist'
                      ? setCustomArtist(e.target.value)
                      : setCustomSettings(e.target.value)
                  }
                />
              )}
            </label>
          </div>
        ))}
        <h3 className="text-base font-semibold">Prompt generado: </h3>
        <p>{generatePrompt()}</p>
      </div>
    </div>
  );
};

export default PromptBuilder;
