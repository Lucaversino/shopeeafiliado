"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, ShieldCheck, Zap } from "lucide-react";
import ProductCard from "./ProductCard";

export default function HomeClient({ products, siteName }) {
  const featured = products.filter(p => p.featured);
  const list = featured.length ? [...featured, ...products.filter(p => !p.featured)] : products;

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <div className="brand">
            <span className="brand-badge"><ShoppingBag size={20}/></span>
            {siteName}
          </div>
          <div className="nav-actions">
            <a className="btn btn-ghost" href="#ofertas">Explorar</a>
            <a className="btn btn-primary" href="#ofertas">Ver ofertas</a>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <motion.div className="eyebrow" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
                <Sparkles size={15}/> Achadinhos selecionados
              </motion.div>
              <motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.08}}>
                Produtos que <span className="gradient-text">saltam da tela.</span>
              </motion.h1>
              <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.14}}>
                Uma vitrine interativa, rápida e moderna para apresentar ofertas, novidades e produtos de afiliado com uma experiência visual 3D.
              </motion.p>
              <motion.div className="hero-cta" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.2}}>
                <a className="btn btn-primary" href="#ofertas"><Zap size={17}/> Ver ofertas agora</a>
                <span className="btn btn-ghost"><ShieldCheck size={17}/> Links de afiliado</span>
              </motion.div>
            </div>

            <motion.div className="hero-orbit" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{delay:.12}}>
              <div className="hero-core">
                <div className="hero-core-content">
                  <div className="hero-core-icon">🛍️</div>
                  <strong>OFERTAS 3D</strong>
                </div>
              </div>
              <span className="orbit-chip chip-a">⚡ Atualizações rápidas</span>
              <span className="orbit-chip chip-b">🔥 Destaques</span>
              <span className="orbit-chip chip-c">🧊 Interface 3D</span>
              <span className="orbit-chip chip-d">📱 Responsivo</span>
            </motion.div>
          </div>
        </section>

        <section className="section" id="ofertas">
          <div className="container">
            <div className="section-head">
              <div>
                <h2 className="section-title">Ofertas em destaque</h2>
                <div className="section-subtitle">Passe o mouse sobre os cards para ver o efeito 3D.</div>
              </div>
            </div>
            {list.length ? (
              <div className="grid">
                {list.map(p => <ProductCard key={p.id} product={p}/>)}
              </div>
            ) : (
              <div className="empty">Nenhum produto publicado ainda. Entre no painel administrativo e importe seu primeiro link.</div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          Alguns links podem ser de afiliado. Preços e disponibilidade podem mudar na loja.
        </div>
      </footer>
    </>
  );
}
