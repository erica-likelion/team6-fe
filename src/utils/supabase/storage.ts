// utils/storage.ts
import supabase from '@utils/supabase/supabaseClient';

export async function toSignedUrl(path: string, expires = 3600) {
  const { data, error } = await supabase.storage
    .from('images')            // ← 버킷명
    .createSignedUrl(path, expires);
  if (error || !data) throw error ?? new Error('Signed URL 발급 실패');
  return data.signedUrl;
}