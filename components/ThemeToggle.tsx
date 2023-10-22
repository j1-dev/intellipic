'use client';
import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from '@/app/core/utils/ThemeContext';

const ColorSchemeToggleButton = () => {
  const { theme, toggleTheme, enabled } = useTheme();
  return (
    <div className="inline-flex z-40 bg-opacity-50 mb-6 rounded-full scale-75">
      <SunIcon className="my-3 mr-3 scale-[2]" />

      <Switch
        onChange={toggleTheme}
        className={`${theme === 'light' ? 'bg-black' : 'bg-white'}
          transition-all hover:shadow-lg relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white dark:bg-black shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>

      <MoonIcon className="my-3 ml-3 scale-[2]" />
    </div>
  );
};

export default ColorSchemeToggleButton;
