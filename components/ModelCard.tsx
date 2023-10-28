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
    <div className="card group">
      <Link
        href={`/dashboard/${user}/${model}`}
        className=" w-full h-full py-10"
      >
        <button className="w-full h-full">
          <div className="w-full h-full block">
            <p className="font-bold text-xl m-5">
              {t('modelName') + props.token}
            </p>
            <div className="h-0 border-b-[1px] border-black group-hover:border-white dark:group-hover:border-black dark:border-white transition-all" />
            <p className="m-1">{t('modelStatus') + translateStatus(status)}</p>
          </div>
        </button>
      </Link>
    </div>
  );
}
