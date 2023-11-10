import React, { FC, ReactNode, useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ content, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current!); // Clear any existing timeouts
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 200); // Add a delay before hiding the tooltip
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cursor-pointer">
        {children}
        <Transition
          show={isOpen}
          enter="transition duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute z-10 bg-black dark:bg-white text-white dark:text-black transition-all py-1 px-2 rounded-md text-sm top-3 left-1/2 transform -translate-x-1/2 mt-3">
            {content}
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Tooltip;
