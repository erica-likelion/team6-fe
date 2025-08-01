import { createClient, SupabaseClientOptions } from '@supabase/supabase-js';

type SupabaseConfig<
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database ? 'public' : string & keyof Database,
> = {
  supabaseUrl: string;
  supabaseKey: string;
  option?: SupabaseClientOptions<SchemaName>;
};

const supabaseConfig: SupabaseConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_SITE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY,
};

console.log(supabaseConfig.supabaseUrl)
const supabase = createClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey, supabaseConfig.option);

export default supabase;
