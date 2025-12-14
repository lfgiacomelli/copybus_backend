import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://mvhiehhyevrrnkylgmuv.supabase.co",
  process.env.SUPABASE_SERVICE_KEY 
);
