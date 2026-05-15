import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and anon key
// You can get these from your Supabase project dashboard: Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT_REF.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
