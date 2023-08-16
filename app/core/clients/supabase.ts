import { createClient, SupabaseClient } from '@supabase/supabase-js';

// interface CustomStorage {
//   getItem: (key: string) => any | null;
//   setItem: (key: string, value: any) => void;
//   removeItem: (key: string) => void;
// }

// interface DataStore {
//   [key: string]: any;
// }

// const myCustomStorage: CustomStorage & DataStore = {
//   getItem: (key) => {
//     return myCustomStorage[key] || null;
//   },
//   setItem: (key, value) => {
//     myCustomStorage[key] = value;
//   },
//   removeItem: (key) => {
//     delete myCustomStorage[key];
//   }
// };

const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

export default supabase;
