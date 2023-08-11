import { createClient } from '@supabase/supabase-js';

const supabaseURL: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey: string = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseURL, supabaseAnonKey);

export default supabase;
