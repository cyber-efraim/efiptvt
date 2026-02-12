
import { createClient } from '@supabase/supabase-js';

// No navegador (Vite/ESM), as variáveis são acessadas via import.meta.env
// Em desenvolvimento, o sistema usará os fallbacks se definidos aqui ou em .env.local
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://seu-projeto.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sua-chave-anon-aqui';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const ADMIN_CONFIG = {
  name: "Efraim",
  email: "marcosefraimrodrigues9@gmail.com",
  password: "mollynick2026",
  role: "ADMIN" as const
};
