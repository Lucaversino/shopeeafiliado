# Shopee Affiliate 3D — Next.js

Site moderno para divulgar produtos de afiliado Shopee com painel administrativo.

## Recursos

- Next.js 15 + React 19
- Landing page moderna
- Cards com efeito 3D/tilt
- Painel administrativo protegido por senha
- Importação por link de afiliado
- Extração automática de título, preço, imagem e descrição quando a página expõe metadados/JSON-LD
- Edição manual antes/depois de salvar
- Produtos em destaque
- Supabase como banco de dados
- Pronto para Vercel

## 1. Criar banco no Supabase

Abra o SQL Editor do Supabase e execute o conteúdo de:

`supabase/schema.sql`

## 2. Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
ADMIN_COOKIE_SECRET=
NEXT_PUBLIC_SITE_NAME=
```

ATENÇÃO: nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no navegador.

## 3. Instalar

```bash
npm install
npm run dev
```

Abra:

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

## 4. Deploy na Vercel

1. Envie este projeto para um repositório GitHub.
2. Importe o repositório na Vercel.
3. Cadastre todas as variáveis do `.env.example` em Project Settings > Environment Variables.
4. Faça Deploy.

## Importação Shopee

O importador tenta:
1. resolver redirecionamentos do link de afiliado;
2. ler JSON-LD;
3. ler Open Graph;
4. ler metatags comuns.

A Shopee pode mudar a página, bloquear automações ou esconder determinados dados. Por isso o painel permite corrigir os campos manualmente antes de salvar.

Para integração oficial com APIs da Shopee/Open Platform, substitua a função em `lib/import-product.js`.
