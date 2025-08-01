import supabase from '@utils/supabase/supabaseClient';
import type { SignUpProps } from './type';

async function signUpWithSupabase({ email, password, userName }: SignUpProps) {
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username: userName } } });
  return { data, error };
}

export { signUpWithSupabase };
