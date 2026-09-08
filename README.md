# Mega Ofertas Shopee — Next.js

Projeto React/Next.js com:
- site público responsivo;
- cards com efeito 3D;
- painel administrativo;
- login por senha;
- Supabase;
- importador de links de afiliado Shopee;
- resolução de links curtos `s.shopee.com.br`;
- detecção de `shop_id` e `item_id`;
- tentativa de leitura por JSON-LD, Open Graph e dados embutidos no HTML;
- edição manual caso a Shopee esconda algum campo.

## Supabase
Execute `supabase/schema.sql` no SQL Editor.

## Vercel
Cadastre:
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- ADMIN_PASSWORD
- ADMIN_COOKIE_SECRET
- NEXT_PUBLIC_SITE_NAME

Depois faça Redeploy.

## Importação Shopee
O importador resolve o link curto e reconhece formatos como:

- `/nome-do-produto-i.123.456`
- `/product/123/456`
- `/qualquer-coisa/123/456`

Isso inclui links de afiliado que redirecionam para páginas com `shop_id` e `item_id` nos últimos segmentos da URL.

A Shopee pode bloquear a leitura de preço/foto/título em alguns links. Nesse caso o painel mostra o link resolvido e os IDs encontrados, e permite completar os campos manualmente.
