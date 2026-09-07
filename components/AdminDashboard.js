"use client";

import { useEffect, useState } from "react";
import { ExternalLink, LogOut, PackagePlus, RefreshCw, Save, ShoppingBag, Trash2 } from "lucide-react";

const empty = {
  title:"",description:"",image_url:"",affiliate_url:"",source_url:"",
  price:"",old_price:"",currency:"BRL",category:"",badge:"Oferta",featured:false,active:true
};

export default function AdminDashboard() {
  const [url,setUrl]=useState("");
  const [form,setForm]=useState(empty);
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState("");

  async function load() {
    const r=await fetch("/api/products?admin=1");
    if(r.ok) setProducts(await r.json());
  }
  useEffect(()=>{load()},[]);

  async function importUrl() {
    if(!url) return;
    setLoading(true);setMessage("");
    const r=await fetch("/api/admin/import",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({url})});
    const j=await r.json();setLoading(false);
    if(!r.ok) return setMessage(j.error||"Não foi possível importar");
    setForm({...empty,...j,affiliate_url:url});
    setMessage("Dados encontrados. Revise e clique em salvar.");
  }

  async function save(e){
    e.preventDefault();setLoading(true);setMessage("");
    const payload={...form,price:form.price===""?null:Number(form.price),old_price:form.old_price===""?null:Number(form.old_price)};
    const r=await fetch("/api/products",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
    const j=await r.json();setLoading(false);
    if(!r.ok) return setMessage(j.error||"Erro ao salvar");
    setMessage("Produto salvo com sucesso.");
    setForm(empty);setUrl("");load();
  }

  async function remove(id){
    if(!confirm("Excluir este produto?")) return;
    await fetch(`/api/products/${id}`,{method:"DELETE"});
    load();
  }

  async function logout(){
    await fetch("/api/admin/logout",{method:"POST"});
    location.href="/admin/login";
  }

  return (
    <div className="admin-shell">
      <div className="admin-grid">
        <aside className="sidebar">
          <div className="brand"><span className="brand-badge"><ShoppingBag size={20}/></span> Afiliado 3D</div>
          <a className="side-link active" href="#importar">Importar produto</a>
          <a className="side-link" href="#produtos">Produtos</a>
          <a className="side-link" href="/" target="_blank">Ver site <ExternalLink size={14} style={{marginLeft:8}}/></a>
        </aside>
        <main className="admin-main">
          <div className="admin-top">
            <div><h2 style={{margin:0}}>Painel administrativo</h2><div style={{color:"#93a0b6",marginTop:4}}>Gerencie a vitrine por links de afiliado.</div></div>
            <button className="btn btn-ghost" onClick={logout}><LogOut size={16}/> Sair</button>
          </div>

          <section className="panel" id="importar">
            <h3 style={{marginTop:0}}>1. Cole o link do produto</h3>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <input style={{flex:1,minWidth:260}} value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://s.shopee.com.br/..."/>
              <button className="btn btn-primary" onClick={importUrl} disabled={loading}>
                {loading?<RefreshCw size={16}/>:<PackagePlus size={16}/>} Puxar dados
              </button>
            </div>
            <p style={{color:"#8995aa",fontSize:".86rem"}}>O sistema tenta encontrar título, preço, imagem e descrição. Você sempre pode corrigir manualmente.</p>
          </section>

          <form className="panel" onSubmit={save} style={{marginTop:18}}>
            <h3 style={{marginTop:0}}>2. Revise os dados</h3>
            <div className="form-grid">
              <div className="field full"><label>Título</label><input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
              <div className="field full"><label>Descrição</label><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
              <div className="field full"><label>URL da imagem</label><input value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})}/></div>
              <div className="field full"><label>Link de afiliado</label><input required value={form.affiliate_url} onChange={e=>setForm({...form,affiliate_url:e.target.value})}/></div>
              <div className="field"><label>Preço</label><input type="number" step="0.01" value={form.price ?? ""} onChange={e=>setForm({...form,price:e.target.value})}/></div>
              <div className="field"><label>Preço antigo</label><input type="number" step="0.01" value={form.old_price ?? ""} onChange={e=>setForm({...form,old_price:e.target.value})}/></div>
              <div className="field"><label>Categoria</label><input value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></div>
              <div className="field"><label>Selo</label><input value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})}/></div>
              <div className="field"><label><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})} style={{width:"auto",marginRight:8}}/>Produto em destaque</label></div>
              <div className="field"><label><input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})} style={{width:"auto",marginRight:8}}/>Ativo</label></div>
            </div>
            {message && <p className="notice">{message}</p>}
            <button className="btn btn-primary" style={{marginTop:16}} disabled={loading}><Save size={16}/> Salvar produto</button>
          </form>

          <section className="panel" style={{marginTop:18}} id="produtos">
            <h3 style={{marginTop:0}}>Produtos cadastrados</h3>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Produto</th><th>Preço</th><th>Destaque</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {products.map(p=><tr key={p.id}>
                    <td style={{maxWidth:420}}>{p.title}</td>
                    <td>{p.price ? `R$ ${Number(p.price).toFixed(2)}` : "-"}</td>
                    <td>{p.featured?"Sim":"Não"}</td>
                    <td>{p.active?"Ativo":"Oculto"}</td>
                    <td><button className="btn btn-ghost" onClick={()=>remove(p.id)}><Trash2 size={15}/></button></td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
