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
    <div className="rounded-md p-6 m-6 shadow dark:shadow-slate-300 hover:shadow-xl border border-black dark:border-white transition-all ease-in-out duration-100">
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
