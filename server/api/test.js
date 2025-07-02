import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await supabase.schema('auth').from('users').select('*');
  return { data, error };
});