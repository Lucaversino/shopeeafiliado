import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyAdminCookie } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req){
  try{
    const admin=new URL(req.url).searchParams.get("admin")==="1";
    if(admin){
      const c=await cookies();
      if(!verifyAdminCookie(c.get(COOKIE_NAME)?.value)) return NextResponse.json({error:"Não autorizado."},{status:401});
    }
    const db=getSupabaseAdmin();
    let q=db.from("products").select("*").order("created_at",{ascending:false});
    if(!admin) q=q.eq("active",true);
    const {data,error}=await q;
    if(error) throw error;
    return NextResponse.json(data||[]);
  }catch(e){return NextResponse.json({error:e.message},{status:500})}
}

export async function POST(req){
  const c=await cookies();
  if(!verifyAdminCookie(c.get(COOKIE_NAME)?.value)) return NextResponse.json({error:"Não autorizado."},{status:401});
  try{
    const body=await req.json();
    const db=getSupabaseAdmin();
    const {data,error}=await db.from("products").insert(body).select().single();
    if(error) throw error;
    return NextResponse.json(data);
  }catch(e){return NextResponse.json({error:e.message},{status:500})}
}
