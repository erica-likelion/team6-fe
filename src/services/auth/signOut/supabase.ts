import supabase from '@utils/supabase/supabaseClient';

async function signOutWithSupabase() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export { signOutWithSupabase };
