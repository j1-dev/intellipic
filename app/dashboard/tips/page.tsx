import FaqMain from '@/components/FaqMain';

const TipsPage = () => {
  return (
    <div className="py-8">
      <div className="max-w-screen-lg mx-auto px-8">
        <h2 className="text-4xl font-bold mb-4">Preguntas frecuentes 📖</h2>
        <main className="flex justify-center items-center flex-col">
          <FaqMain />
        </main>
      </div>
    </div>
  );
};

export default TipsPage;
