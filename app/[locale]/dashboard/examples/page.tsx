import Prompts from '@/components/Prompts';
import { useTranslations } from 'next-intl';

export default function ExamplesPage() {
  const t = useTranslations('Home');
  return (
    <div className="py-6">
      <div className="max-w-screen-lg mx-auto px-6">
        <h2 className="text-5xl font-bold mb-4">{t('examples.title')}</h2>
        <Prompts />
      </div>
    </div>
  );
}
