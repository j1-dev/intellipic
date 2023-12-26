'use client';
import Logo from '@/app/core/resources/logo';
import FaqMain from '@/components/FaqMain';
import { useRouter } from 'next/navigation';
import { BsArrowReturnLeft } from 'react-icons/bs';

const Faq = () => {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-screen-lg px-10 rounded-lg w-full bg-white text-black dark:bg-black dark:text-white transition-all my-4">
      <header className="py-8">
        <nav className="max-w-screen-lg mx-auto flex justify-between items-center">
          <button onClick={router.back} className="inline-flex">
            <BsArrowReturnLeft size={40} />
          </button>
          <Logo />
        </nav>
      </header>
      <FaqMain />
    </div>
  );
};

export default Faq;
