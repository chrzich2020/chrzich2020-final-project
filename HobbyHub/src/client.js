import { createClient } from '@supabase/supabase-js'

const URL = 'https://dgksipmtshtxdnnwhvsd.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRna3NpcG10c2h0eGRubndodnNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDA3NjExMSwiZXhwIjoyMDI5NjUyMTExfQ.KcyPsjeKxkxg56JUVo3sW3nLIaJi9hlBXTETJjGR3Hc';

export const supabase = createClient(URL, API_KEY);