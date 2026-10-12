import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const supabaseConfigMessage =
  'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file, then restart the development server.'

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export function getSupabaseErrorMessage(error) {
  const message = error?.message || 'The request could not be completed.'

  if (/row-level security|permission denied|not allowed|unauthorized|jwt/i.test(message)) {
    return `${message} Check Supabase authentication and RLS policies for this table.`
  }

  if (/fetch|network|failed to/i.test(message)) {
    return 'Could not connect to Supabase. Check your network and Supabase project URL.'
  }

  return message
}
