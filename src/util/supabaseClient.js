import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY; // Use the secret key for server-side access

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);
