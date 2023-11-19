'use client';
import Guide from '@/components/Guide';

const GuidePage = () => {
  return (
    <div className="py-6">
      <div className="max-w-screen-lg mx-auto">
        <main className="flex justify-center items-center flex-col">
          <Guide />
        </main>
      </div>
    </div>
  );
};

export default GuidePage;
