import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zfyrhpvpwmvgjkqqmioy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmeXJocHZwd212Z2prcXFtaW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NjQzNDYsImV4cCI6MjA3NDM0MDM0Nn0.hTaYAKoaZfk8_pPYHduB0d5fas5bmTTbwUugx9IPkGI'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase