import "./globals.css";

export const metadata = {
  title: "Afghan_Shosee — Product Showcase",
  description:
    "Premium motorcycle product showcase built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}