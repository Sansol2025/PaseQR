import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixSantiagoRole() {
  console.log("Updating Santiago's role...");
  
  const { error } = await supabase
    .from("profiles")
    .update({ role: 'admin' })
    .eq("id", "7fec6798-99a3-4cca-874f-10eb2c8830d3");

  if (error) {
    console.error("Error updating role:", error);
  } else {
    console.log("Successfully updated Santiago to admin.");
  }
}

fixSantiagoRole();
