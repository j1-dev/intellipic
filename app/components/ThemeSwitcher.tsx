'use client';

import { useEffect, useState } from 'react';

const ColorSchemeToggleButton = () => {
  const [colorScheme, setColorScheme] = useState('light');

  useEffect(() => {
    const localColorScheme = localStorage.getItem('colorScheme');
    if (localColorScheme) {
      document.documentElement.classList.add(localColorScheme);
      document.documentElement.dataset.theme = localColorScheme;
      setColorScheme(localColorScheme);
    }
  }, []);

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove(colorScheme);
    document.documentElement.classList.add(newColorScheme);
    document.documentElement.dataset.theme = newColorScheme;
    localStorage.setItem('colorScheme', newColorScheme);
    setColorScheme(newColorScheme);
  };

  return (
    <button onClick={toggleColorScheme}>
      Toggle Color Scheme ({colorScheme})
    </button>
  );
};

export default ColorSchemeToggleButton;
