import { supabase } from "@/lib/supabase";

export default async function SupabaseCheckPage() {
  const { error } = await supabase.from("_ping").select("*").limit(1);
  const connected = !error || error.code === "PGRST116" || error.code === "42P01";
  const status = connected ? "Supabase 接続OK" : `接続エラー: ${error?.message}`;

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Supabase 接続確認</h1>
      <p>{status}</p>
      {error && <pre style={{ color: "gray" }}>{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
}
