import Image from 'next/image';
import Link from 'next/link';
import TipsToggle from '@/app/components/TipsToggle';

export default function TipsPage() {
  return (
    <div className="py-8">
      <div className="max-w-screen-lg mx-auto px-8">
        <h2 className="text-4xl font-bold mb-4">Consejos 📖</h2>
        <main>
          <TipsToggle />
        </main>
      </div>
    </div>
  );
}
