function decodeHtml(s = "") {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function meta(html, key, attr = "property") {
  const patterns = [
    new RegExp(`<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${key}["'][^>]*>`, "i")
  ];
  for (const rx of patterns) {
    const m = html.match(rx);
    if (m?.[1]) return decodeHtml(m[1].trim());
  }
  return "";
}

function firstJsonLd(html) {
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const s of scripts) {
    try {
      const parsed = JSON.parse(s[1].trim());
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      const product = arr.find(x => x?.["@type"] === "Product" || x?.["@type"]?.includes?.("Product"));
      if (product) return product;
      if (parsed?.["@graph"]) {
        const gp = parsed["@graph"].find(x => x?.["@type"] === "Product");
        if (gp) return gp;
      }
    } catch {}
  }
  return null;
}

function numberFrom(value) {
  if (value == null || value === "") return null;
  if (typeof value === "number") return value;
  let s = String(value).trim().replace(/[^\d,.-]/g, "");
  if (s.includes(",") && s.includes(".")) s = s.replace(/\./g, "").replace(",", ".");
  else if (s.includes(",")) s = s.replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export async function importProductFromUrl(inputUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(inputUrl, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; ProductImporter/1.0)",
        "accept-language": "pt-BR,pt;q=0.9,en;q=0.7"
      }
    });

    const finalUrl = res.url || inputUrl;
    const html = await res.text();
    const json = firstJsonLd(html);

    const offer = Array.isArray(json?.offers) ? json.offers[0] : json?.offers;
    const image = Array.isArray(json?.image) ? json.image[0] : json?.image;

    const title =
      json?.name ||
      meta(html, "og:title") ||
      meta(html, "twitter:title", "name") ||
      (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");

    const description =
      json?.description ||
      meta(html, "og:description") ||
      meta(html, "description", "name");

    const imageUrl =
      image ||
      meta(html, "og:image") ||
      meta(html, "twitter:image", "name");

    const price =
      numberFrom(offer?.price) ??
      numberFrom(meta(html, "product:price:amount")) ??
      numberFrom(meta(html, "og:price:amount"));

    const currency =
      offer?.priceCurrency ||
      meta(html, "product:price:currency") ||
      "BRL";

    return {
      title: decodeHtml(String(title || "")).replace(/\s+/g, " ").trim(),
      description: decodeHtml(String(description || "")).replace(/\s+/g, " ").trim(),
      image_url: imageUrl || "",
      affiliate_url: inputUrl,
      source_url: finalUrl,
      price,
      old_price: null,
      currency,
      category: "",
      badge: "Oferta",
      featured: false,
      active: true
    };
  } finally {
    clearTimeout(timeout);
  }
}
