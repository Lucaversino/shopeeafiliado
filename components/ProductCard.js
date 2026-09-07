"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";

function money(v, currency = "BRL") {
  if (v == null || Number.isNaN(Number(v))) return "Confira o preço";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "BRL"
  }).format(Number(v));
}

export default function ProductCard({ product }) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-4px)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <article ref={ref} className="card" onMouseMove={onMove} onMouseLeave={reset}>
      <div className="card-media">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} />
        ) : (
          <div style={{height:"100%",display:"grid",placeItems:"center",fontSize:"3rem"}}>🛍️</div>
        )}
        {product.badge && <span className="badge">{product.badge}</span>}
      </div>
      <div className="card-body">
        <h3>{product.title}</h3>
        <div>
          <span className="price">{money(product.price, product.currency)}</span>
          {product.old_price && <span className="old-price">{money(product.old_price, product.currency)}</span>}
        </div>
        <div className="card-footer">
          <a className="btn btn-primary" href={product.affiliate_url} target="_blank" rel="noopener noreferrer sponsored">
            Ver oferta <ExternalLink size={16}/>
          </a>
        </div>
      </div>
    </article>
  );
}
