
import { createClient } from '@supabase/supabase-js';

// ATENÇÃO: UTILIZANDO VARIÁVEIS DE AMBIENTE VITE (COM FALLBACK)
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://esghzkxwngbxpmxgsges.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZ2h6a3h3bmdieHBteGdzZ2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4ODg5NjksImV4cCI6MjA4NjQ2NDk2OX0.Vt8Z2WHFFc85ka-JnbJb26ZOetMeQuNFsIm_hvayaeI';

console.log('Conectando ao Supabase:', SUPABASE_URL);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const ADMIN_CONFIG = {
  name: "Efraim",
  email: "marcosefraimrodrigues9@gmail.com",
  password: "mollynick2026",
  role: "ADMIN" as const
};
