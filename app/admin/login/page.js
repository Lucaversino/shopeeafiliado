"use client";
import { useState } from "react";
import { LockKeyhole, ShoppingBag } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true); setError("");
    const r = await fetch("/api/admin/login", {
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({password})
    });
    const j = await r.json();
    setLoading(false);
    if (!r.ok) return setError(j.error || "Falha no login");
    location.href="/admin/dashboard";
  }

  return (
    <main className="admin-login">
      <form className="login-card" onSubmit={submit}>
        <div className="brand" style={{marginBottom:20}}>
          <span className="brand-badge"><ShoppingBag size={20}/></span>
          Painel de Afiliados
        </div>
        <h1 style={{fontSize:"2rem",lineHeight:1,margin:"0 0 10px"}}>Acesso administrativo</h1>
        <p style={{color:"#93a0b6",marginBottom:22}}>Entre com a senha definida no ambiente do projeto.</p>
        <div className="field">
          <label>Senha</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Sua senha"/>
        </div>
        {error && <p className="notice">{error}</p>}
        <button className="btn btn-primary" style={{width:"100%",marginTop:16}} disabled={loading}>
          <LockKeyhole size={17}/>{loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
