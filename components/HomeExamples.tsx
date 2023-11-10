import Mask from '@/public/Images/Mask.png';
import F1Driver from '@/public/Images/f1driver.png';
import Clown from '@/public/Images/dvid1.png';
import Dua1 from '@/public/Images/dua1.png';
import Hercules from '@/public/Images/Hercules1.jpg';
import Monster from '@/public/Images/monster.png';
import Messi from '@/public/Images/missi.png';
import Business from '@/public/Images/bussiness.webp';
import Image from 'next/image';

export const HomeExamples = () => {
  const images = [
    Mask,
    F1Driver,
    Clown,
    Dua1,
    Hercules,
    Monster,
    Messi,
    Business
  ];
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-4 xl:gap-x-8 ">
      {/* Example 1 */}
      {images.map((image) => {
        return (
          <div
            key={Math.random()}
            className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-8 xl:aspect-h-8"
          >
            <Image
              alt=""
              src={image}
              className="group-hover:opacity-75  transition-all"
            />
          </div>
        );
      })}
    </div>
  );
};
