import { createClient } from "@supabase/supabase-js";

const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYmNtcGthZmdncnh3aXVlaGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3Mzk4NTUsImV4cCI6MjA3MTMxNTg1NX0.cPUN0kvHVuyNSPikaGU4EDaqp3Dr36OKvR9oY_Og-YE";
const url = "https://sabcmpkafggrxwiuehcp.supabase.co";

export const supabase = createClient(url, api_key);

