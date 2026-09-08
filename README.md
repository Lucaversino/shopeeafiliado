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


## v1.2 — Importador reforçado

Esta versão acrescenta uma etapa nova:

1. resolve o link curto de afiliado;
2. extrai `shop_id` e `item_id`;
3. tenta consultar os dados estruturados do item na Shopee;
4. se não houver resposta, tenta Open Graph/HTML;
5. se ainda assim falhar, mostra os IDs para diagnóstico e permite edição manual.

Também tenta obter:
- nome;
- descrição;
- foto principal;
- galeria;
- preço;
- preço anterior;
- avaliação;
- vendas;
- nome da loja.

Observação: endpoints internos da Shopee podem mudar ou aplicar bloqueios. Para produção em grande escala, a integração oficial da Shopee Affiliate/Open Platform continua sendo a opção mais estável.
