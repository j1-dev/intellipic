'use client';
import { Switch } from '@headlessui/react';
import { useState } from 'react';

const TipsToggle = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      onChange={() => setEnabled(!enabled)}
      className="bg-black dark:bg-white transition-all hover:shadow-lg relative inline-flex h-[74px] w-[316px] shrink-0 cursor-pointer rounded-lg border-2 border-transparent duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <div
        aria-hidden="true"
        className={`${enabled ? 'translate-x-[156px]' : 'translate-x-0'}
            pointer-events-none inline-block h-[70px] w-[156px] transform rounded-xl bg-white dark:bg-black shadow-lg ring-0 transition duration-200 ease-in-out py-[20px]`}
      >
        <span className="font-bold text-xl">
          {enabled ? 'Entrenar' : 'Generar'}
        </span>
      </div>
    </Switch>
  );
};

export default TipsToggle;
