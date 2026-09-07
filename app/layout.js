import "./globals.css";

export const metadata = {
  title: "Achadinhos 3D",
  description: "Produtos e ofertas selecionadas."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
