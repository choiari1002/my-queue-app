import { Database } from '@/supabase.types'
import { createServerClient } from "@supabase/ssr";

export function createAdmin() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
      cookies: {
        get: undefined,
        set: undefined,
        remove: undefined,
      }
    }
  );
}