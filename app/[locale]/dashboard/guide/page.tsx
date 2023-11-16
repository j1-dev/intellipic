'use client';
import Guide from '@/components/Guide';

const GuidePage = () => {
  return (
    <div className="py-8">
      <div className="max-w-screen-lg mx-auto px-8">
        <main className="flex justify-center items-center flex-col">
          <Guide />
        </main>
      </div>
    </div>
  );
};

export default GuidePage;
