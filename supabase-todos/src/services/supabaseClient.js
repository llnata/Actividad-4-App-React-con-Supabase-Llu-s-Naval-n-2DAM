import { createClient } from '@supabase/supabase-js';

// Importar variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Crear cliente de conexión
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

