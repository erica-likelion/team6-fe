import type { SignInProps } from './type';
import supabase from '@utils/supabase/supabaseClient';

async function signInWithSupabase({ email, password }: SignInProps) {
  const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password });
  return { data, error };
}

export { signInWithSupabase };
