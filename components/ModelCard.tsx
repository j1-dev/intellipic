import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ModelCard({
  props
}: {
  props: {
    userId: string;
    modelId: string;
    token: string;
    status: string;
    progress: number;
  };
}) {
  const t = useTranslations('ModelCard');
  const user = props.userId;
  const model = props.modelId;
  const status = props.status;

  function translateStatus(status: string) {
    if (status === 'starting') {
      return t('starting') + ' 🆕';
    }
    if (status === 'processing') {
      if (props.progress >= 0) {
        return props.progress + '%';
      } else {
        return t('processing') + '';
      }
    }
    if (status === 'succeeded') {
      return t('succeeded') + ' ✅';
    }
  }

  return (
    
      <div className="bg-white  rounded-md p-4 border border-black hover:shadow-md transition-transform transform hover:scale-105">
      <Link href={`/dashboard/${user}/${model}`} passHref>
        <div className="block w-full h-full cursor-pointer">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="font-bold text-xl mb-3 text-gray-800">
              {t('modelName') + props.token}
            </p>
            <div className="w-16 border-b-2 border-blue-500 mb-3 "></div>
            <p className="text-sm text-gray-600">{t('modelStatus') + translateStatus(status)}</p>
          </div>
        </div>
      </Link>
    </div>
  
);
}
