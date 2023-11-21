import Navbar from '@/components/Navbar';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="pt-20">{children}</div>
    </div>
  );
}
