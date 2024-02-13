import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hvtjlffeippxnsjqjjgt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwaWp3amdnd2drbnZ1Y2Vrem1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NTE0MTUsImV4cCI6MjAyMzQyNzQxNX0.I32rwyK4CcK_YkpbgkJ21aeI0YYtBLnagNk2Ob3hy9w";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
