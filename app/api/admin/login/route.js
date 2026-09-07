import { NextResponse } from "next/server";
import { COOKIE_NAME, signAdminCookie } from "@/lib/auth";

export async function POST(req) {
  const { password } = await req.json();
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({error:"Senha inválida."},{status:401});
  }
  const res = NextResponse.json({ok:true});
  res.cookies.set(COOKIE_NAME, signAdminCookie(), {
    httpOnly:true,
    sameSite:"lax",
    secure:process.env.NODE_ENV==="production",
    path:"/",
    maxAge:60*60*24*7
  });
  return res;
}
