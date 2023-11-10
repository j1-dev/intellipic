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
      return t('starting');
    }
    if (status === 'processing') {
      if (props.progress >= 0) {
        return props.progress + '%';
      } else {
        return t('processing') + '';
      }
    }
    if (status === 'succeeded') {
      return t('succeeded');
    }
  }

  return (
    <div className="bg-white dark:bg-black rounded-md p-4 border border-black dark:border-white dark:shadow-gray-300 hover:shadow-sm hover:drop-shadow-lg transform hover:scale-[1.02] transition-all duration-75">
      <Link href={`/dashboard/${user}/${model}`} passHref>
        <div className="block w-full h-full cursor-pointer">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="font-bold text-xl mb-3">
              {t('modelName') + props.token}
            </p>
            <div className="w-16 border-b-[1px] border-blue-500 mb-3 "></div>
            <div className="inline-flex">
              <p className="text-sm">{t('modelStatus')}</p>
              <p
                className={`text-sm ml-1 rounded-full px-2 ${
                  status === 'starting' && 'bg-blue-200 text-blue-900'
                } ${
                  status === 'processing' && 'bg-yellow-200 text-yellow-900'
                } ${status === 'succeeded' && 'bg-green-200 text-green-900'}`}
              >
                {translateStatus(status)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
