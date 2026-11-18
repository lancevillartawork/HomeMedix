import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uescuuavcrppeytaalln.supabase.co'
// Replace the string below with your actual publishable key from Supabase API Keys page
const supabaseAnonKey = 'sb_publishable_0tf2JQIjf7jVsbcHH5KzMw_emqCpj67'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)