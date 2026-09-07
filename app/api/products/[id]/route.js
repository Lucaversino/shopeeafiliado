import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyAdminCookie } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function DELETE(req,{params}){
  const c=await cookies();
  if(!verifyAdminCookie(c.get(COOKIE_NAME)?.value)) return NextResponse.json({error:"Não autorizado."},{status:401});
  const {id}=await params;
  try{
    const db=getSupabaseAdmin();
    const {error}=await db.from("products").delete().eq("id",id);
    if(error) throw error;
    return NextResponse.json({ok:true});
  }catch(e){return NextResponse.json({error:e.message},{status:500})}
}
