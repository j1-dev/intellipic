'use client';
import { Dialog } from '@headlessui/react';
import PromptCard from './PromptCard';
import { useState } from 'react';
import Image from 'next/image';

export default function Prompts() {
  const [SelectedPhoto, setSelectedPhoto] = useState(null);
  const handlePhotoClick = (photo: any) => {
    console.log(photo);
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const promptInfo = [
    {
      img: '/Images/messVik.png',
      text1: 'Vikingo'
    },
    {
      img: '/Images/lebJedi.png',
      text1: 'Jedi'
    },
    {
      img: '/Images/davJedi.png',
      text1: 'Jedi'
    },
    {
      img: '/Images/hercPixar.jpg',
      text1: 'Pixar'
    },
    {
      img: '/Images/juanHodor.JPG',
      text1: 'Hodor'
    },
    {
      img: '/Images/juanSnow.JPG',
      text1: 'Snow'
    },
    {
      img: '/Images/dvid1.png',
      text1: 'Payaso'
    },
    {
      img: '/Images/dmetal.png',
      text1: 'Metal Gear Solid'
    },
    {
      img: '/Images/davWiz.png',
      text1: 'Hechicero'
    },
    {
      img: '/Images/f1driver.png',
      text1: 'F1'
    },
    {
      img: '/Images/davKnight.png',
      text1: 'Knight'
    },
    {
      img: '/Images/dua1.png',
      text1: 'Paladin'
    },
    {
      img: '/Images/weloclown.png',
      text1: 'Payaso'
    },
    {
      img: '/Images/missi.png',
      text1: 'Hobbit'
    },
    {
      img: '/Images/weloMonster.png',
      text1: 'Monstruo'
    }
  ];

  return (
    <div className="flex justify-center">
      <div className="hover:cursor-pointer grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {promptInfo.map((data, index) => (
          <div onClick={() => handlePhotoClick(data.img)} key={index}>
            <PromptCard img={data.img} text={data.text1} key={index} />
          </div>
        ))}
        {SelectedPhoto && (
          <Dialog
            open={true}
            onClose={closeModal}
            className="fixed inset-0 z-40 overflow-y-auto"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white dark:bg-black border border-black dark:border-white z-50 w-full max-w-lg p-2 rounded-lg transition-all">
                <Image
                  src={SelectedPhoto}
                  alt="Selected Photo"
                  width={512}
                  height={512}
                  className="inset-0 z-40 overflow-y-auto"
                />
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
}
