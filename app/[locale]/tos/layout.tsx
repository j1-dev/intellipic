import '@/app/globals.css';
import Logo from '@/app/core/resources/logo';
import Link from 'next/link';

export const metadata = {
  title: 'IntelliPic',
  description: 'IntelliPic app to make custom AI Portrait models'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="pb-20">
      <header className="py-8">
        <nav className="max-w-screen-lg mx-auto flex justify-between items-center px-8">
          <Link href="/">
            <Logo />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold hidden xs:block m-0">
            IntelliPic
          </h1>
          <button className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-1 xs:px-3 transition-all ml-auto float-none z-50">
            <Link href="/login">Inicia sesión</Link>
          </button>
          <button className=" bg-blue-600 text-white border-blue-600 hover:bg-white hover:text-black border rounded py-2 px-4 transition-all ml-1">
            <Link href="/register">Regístrate</Link>
          </button>
        </nav>
      </header>
      {children}
    </body>
  );
}
