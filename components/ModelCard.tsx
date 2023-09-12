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
    <div className="card">
      <button className=" w-full h-full py-6">
        <Link
          href={`/dashboard/${user}/${model}`}
          className=" w-full h-full py-10"
        >
          <span className="font-bold text-xl mb-2">{props.token}</span>
          <br />
          <span>{status}</span>
        </Link>
      </button>
    </div>
  );
}
