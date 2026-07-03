import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xznlbaqqxmmglaidridj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bmxiYXFxeG1tZ2xhaWRyaWRqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE3Nzg4MywiZXhwIjoyMDk2NzUzODgzfQ.RPRvVda1YCOC6-ysjJ6yvDk8jnJFIE0xXVQdpt0sMT0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
