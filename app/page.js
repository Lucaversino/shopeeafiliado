import HomeClient from "@/components/HomeClient";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Achadinhos 3D";
  return <HomeClient products={products} siteName={siteName}/>;
}
