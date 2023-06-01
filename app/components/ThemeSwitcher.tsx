'use client';

import { useEffect, useState } from 'react';

const ColorSchemeToggleButton = () => {
  const [colorScheme, setColorScheme] = useState('light');

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove(colorScheme);
    document.documentElement.classList.add(newColorScheme);
    document.documentElement.dataset.theme = newColorScheme;
    setColorScheme(newColorScheme);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleColorSchemeChange = (e: any) => {
      const newColorScheme = e.matches ? 'light' : 'dark';
      document.documentElement.classList.remove(colorScheme);
      document.documentElement.classList.add(newColorScheme);
      setColorScheme(newColorScheme);
    };

    // Initially set the color scheme based on the media query
    handleColorSchemeChange(mediaQuery);

    // Listen for changes in the prefers-color-scheme media query
    mediaQuery.addListener(handleColorSchemeChange);

    // Cleanup listener when component unmounts
    return () => {
      mediaQuery.removeListener(handleColorSchemeChange);
    };
  }, []);

  return (
    <button onClick={toggleColorScheme}>
      Toggle Color Scheme ({colorScheme})
    </button>
  );
};

export default ColorSchemeToggleButton;
