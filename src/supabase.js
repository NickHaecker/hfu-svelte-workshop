import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wgqzvuiaikonjawzohfe.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncXp2dWlhaWtvbmphd3pvaGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU0MTAyOTIsImV4cCI6MTk4MDk4NjI5Mn0.F3GzS5gTXj3xt-NjLYEwN3WOEb24xQgkfygTd1-QxiM';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
