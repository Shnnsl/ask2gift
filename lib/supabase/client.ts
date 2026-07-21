import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types/supabase.ts";

let browserClient: SupabaseClient<Database> | null = null;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function getSupabaseConfig() {
  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Add it to .env.local for local development and to your Vercel project environment variables."
    );
  }

  if (!supabasePublishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Add it to .env.local for local development and to your Vercel project environment variables."
    );
  }

  return {
    supabaseUrl,
    supabasePublishableKey
  };
}

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const { supabaseUrl, supabasePublishableKey } = getSupabaseConfig();

  browserClient = createClient<Database>(
    supabaseUrl,
    supabasePublishableKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    }
  );

  return browserClient;
}
