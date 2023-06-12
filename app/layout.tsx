import './globals.css';
import SupabaseProvider from './supabase-provider';
import ThemeSwitcher from './components/ThemeSwitcher';
import { Toaster } from 'react-hot-toast';

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
    <html lang="en">
      <body>
        <SupabaseProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
          <ThemeSwitcher />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
