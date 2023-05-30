import Link from 'next/link';

export default function ModelCard({
  props
}: {
  props: { userId: string; modelId: string; token: string; status: string };
}) {
  const user = props.userId;
  const model = props.modelId;
  const status = props.status;

  return (
    <div className="rounded-2xl p-6 m-6 shadow-pink-400 shadow border border-slate-200 ">
      <button>
        <Link href={`/dashboard/${user}/${model}`}>
          <span className="font-bold">{props.token}</span>
          <br />
          <span>{status}</span>
        </Link>
      </button>
    </div>
  );
}
