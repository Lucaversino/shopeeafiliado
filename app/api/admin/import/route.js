import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyAdminCookie } from "@/lib/auth";
import { importProductFromUrl } from "@/lib/import-product";

export async function POST(req) {
  const c=await cookies();
  if(!verifyAdminCookie(c.get(COOKIE_NAME)?.value)) return NextResponse.json({error:"Não autorizado."},{status:401});
  try{
    const {url}=await req.json();
    if(!url || !/^https?:\/\//i.test(url)) return NextResponse.json({error:"Cole uma URL válida."},{status:400});
    const data=await importProductFromUrl(url);
    return NextResponse.json(data);
  }catch(e){
    return NextResponse.json({error:"A Shopee não liberou os dados automaticamente neste link. Você ainda pode preencher o produto manualmente.",detail:e?.message},{status:502});
  }
}
