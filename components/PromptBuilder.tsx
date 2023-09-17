'use client';
import { useState, useEffect } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import translate from '@/app/core/utils/translateCategories';
import categories from '@/app/core/resources/categories';
import { useTranslations } from 'next-intl';

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
  model
}: {
  setPrompt: Function;
  model: string;
}) => {
  const t = useTranslations('PromptBuilder');
  const [isCollapsed, setIsCollapsed] = useState(
    (localStorage.getItem(`cl${model}`) || 'true') === 'true'
  );
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    (JSON.parse(
      localStorage.getItem(`so${model}`) as string
    ) as SelectedOptions) || {
      medium: 'portrait',
      clothing: '',
      pose: '',
      scene: '',
      artist: '',
      settings: ''
    }
  );
  const [customOptions, setCustomOptions] = useState<SelectedOptions>(
    (JSON.parse(
      localStorage.getItem(`co${model}`) as string
    ) as SelectedOptions) || {
      medium: '',
      clothing: '',
      pose: '',
      scene: '',
      artist: '',
      settings: ''
    }
  );
  useEffect(() => {
    localStorage.setItem(`cl${model}`, isCollapsed.toString());
    localStorage.setItem(`so${model}`, JSON.stringify(selectedOptions));
    localStorage.setItem(`co${model}`, JSON.stringify(customOptions));
  }, [isCollapsed, selectedOptions, customOptions]);

  const categoryOptions: { [key: string]: string[] } = categories;

  const getRandomOption = (category: string) => {
    const options = categoryOptions[category];
    const index = Math.floor(Math.random() * options.length);
    return options[index] === 'None' ? '' : options[index];
  };

  const generatePrompt = () => {
    const { medium, clothing, pose, scene, artist, settings } = selectedOptions;

    let generatedPrompt = `A ${
      medium === 'Other' ? customOptions['medium'] || '' : medium
    } of @me`;

    {
      clothing &&
        clothing !== 'None' &&
        (generatedPrompt += ` wearing ${
          clothing === 'Other' ? customOptions['clothing'] || '' : clothing
        }`);
    }

    {
      pose &&
        pose !== 'None' &&
        (generatedPrompt += `, ${
          pose === 'Other' ? customOptions['pose'] || '' : pose
        }`);
    }

    {
      scene &&
        scene !== 'None' &&
        (generatedPrompt += `, in a ${
          scene === 'Other' ? customOptions['scene'] || '' : scene
        }`);
    }

    {
      artist &&
        artist !== 'None' &&
        (generatedPrompt += `, in the style of ${
          artist === 'Other' ? customOptions['artist'] || '' : artist
        }`);
    }

    {
      settings &&
        settings !== 'None' &&
        (generatedPrompt += `, ${
          settings === 'Other' ? customOptions['settings'] || '' : settings
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

  return (
    <div className="py-4 px-3 mx-auto mb-7 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white rounded-lg transition-all">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-lg font-semibold">{t('generatorTitle')}</h2>
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md my-4 transition-all"
          onClick={handleGeneratePrompt}
        >
          {t('generatePrompt')}
        </button>
        {Object.keys(selectedOptions).map((category) => (
          <div className="mb-4" key={category}>
            <label
              className="transition-all block text-black dark:text-white font-bold mb-2"
              transition-all
            >
              {t(category)}:
              <select
                value={selectedOptions[category as keyof SelectedOptions]}
                onChange={(e) => {
                  setSelectedOptions({
                    ...selectedOptions,
                    [category as keyof SelectedOptions]: e.target.value
                  });
                }}
                className="transition-all font-semibold mt-1 p-2 border text-black bg-white dark:text-white dark:bg-black border-gray-300 rounded-lg w-full"
              >
                {categoryOptions[category as keyof SelectedOptions].map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                      className="transition-all text-black bg-white dark:text-white dark:bg-black"
                    >
                      {t(option)}
                    </option>
                  )
                )}
                <option value="Other">{t('customOption')}</option>
              </select>
              {selectedOptions[category as keyof SelectedOptions] ===
                'Other' && (
                <input
                  type="text"
                  className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder={t('customOptionPlaceholder')}
                  value={customOptions[category as keyof SelectedOptions] || ''}
                  onChange={(e) => {
                    setCustomOptions({
                      ...customOptions,
                      [category]: e.target.value
                    });
                  }}
                />
              )}
            </label>
          </div>
        ))}
        <h3 className="text-base font-semibold">{t('promptGenerated')} </h3>
        <p>{generatePrompt()}</p>
      </div>
    </div>
  );
};

export default PromptBuilder;
