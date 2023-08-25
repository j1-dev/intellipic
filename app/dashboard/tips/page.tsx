'use client';
import React, { useState } from 'react';
import TipsToggle from '@/app/components/TipsToggle';
import TipsMain from '@/app/components/TipsMain';

const TipsPage: React.FC = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="py-8">
      <div className="max-w-screen-lg mx-auto px-8">
        <h2 className="text-4xl font-bold mb-4">Consejos 📖</h2>
        <main className="flex justify-center items-center flex-col">
          <TipsToggle toggle={toggle} toggleHandler={setToggle} />
          <TipsMain toggle={toggle} />
        </main>
      </div>
    </div>
  );
};

export default TipsPage;
