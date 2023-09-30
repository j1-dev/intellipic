import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ModelCard({
  props
}: {
  props: { userId: string; modelId: string; token: string; status: string };
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
      return t('processing');
    }
    if (status === 'succeeded') {
      return t('succeeded');
    }
  }

  return (
    <div className="card">
      <Link
        href={`/dashboard/${user}/${model}`}
        className=" w-full h-full py-10"
      >
        <button className=" w-full h-full py-6">
          <span className="font-bold text-xl mb-2">{props.token}</span>
          <br />
          <span>{translateStatus(status)}</span>
        </button>
      </Link>
    </div>
  );
}
