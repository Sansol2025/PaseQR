import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function checkSantiago() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", "santiago14vera@gmail.com")
    .single();

  console.log("Santiago Profile:", data, error);
  
  const { data: allProfiles } = await supabase.from("profiles").select("email, role");
  console.log("All Profiles:", allProfiles);
}

checkSantiago();
