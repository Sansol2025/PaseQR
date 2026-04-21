import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixProfiles() {
  console.log("Fixing profiles...");
  
  // 1. Insert missing profile for santiago14vera@gmail.com
  const { error: insertError } = await supabase
    .from("profiles")
    .upsert({
      id: "7fec6798-99a3-4cca-874f-10eb2c8830d3",
      role: "user", // The enum is likely 'user' from the migrations
      full_name: "santiago",
      email: "santiago14vera@gmail.com",
    });

  if (insertError) {
    console.error("Error inserting santiago:", insertError);
  } else {
    console.log("Successfully inserted santiago into profiles.");
  }

  // 2. Remove the dummy 'Socio PaseQR' that doesn't have an auth user
  const { error: deleteError } = await supabase
    .from("profiles")
    .delete()
    .eq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    console.error("Error deleting dummy profile:", deleteError);
  } else {
    console.log("Successfully deleted dummy admin@paseqr.com profile.");
  }
}

fixProfiles();
