import { Switch } from '@headlessui/react';
import { useState } from 'react';

interface TipsToggleProps {
  toggle: boolean;
  toggleHandler: (newToggleValue: boolean) => void;
}

const TipsToggle: React.FC<TipsToggleProps> = ({ toggle, toggleHandler }) => {
  const [enabled, setEnabled] = useState(toggle);

  const handleToggleChange = () => {
    setEnabled(!enabled);
    toggleHandler(!enabled);
  };

  return (
    <Switch
      onChange={handleToggleChange}
      className="bg-black dark:bg-white transition-all hover:shadow-lg relative inline-flex h-[74px] w-[158px] xs:w-[316px] cursor-pointer rounded-lg border-2 border-transparent duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <div
        aria-hidden="true"
        className={`${
          enabled
            ? 'xs:translate-x-[156px] translate-x-[77px]'
            : 'translate-x-0'
        }
            pointer-events-none inline-block h-[70px] w-[77px] xs:w-[156px] transform rounded-xl bg-white dark:bg-black shadow-lg ring-0 transition duration-200 ease-in-out py-[24px] xs:py-[20px] `}
      >
        <span className="font-bold xs:text-xl text-md">
          {enabled ? 'Entrenar' : 'Generar'}
        </span>
      </div>
    </Switch>
  );
};

export default TipsToggle;
