import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured } from "./env";

export function createClient() {
  if (!isSupabaseConfigured) {
    return createBrowserClient("https://placeholder.supabase.co", "placeholder-key-placeholder-placeholder");
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}