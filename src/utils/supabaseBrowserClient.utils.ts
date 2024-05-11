import { createBrowserClient } from "@supabase/ssr";
// import { Database } from "@/supabase.types";

export const makeBrowserClient = () => {
  // return createBrowserClient<Database>(
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
};
