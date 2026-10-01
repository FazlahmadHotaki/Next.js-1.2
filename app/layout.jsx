import "./globals.css";

export const metadata = {
  title: "Afghan_Sneaker — Product Showcase",
  description:
    "Premium motorcycle product showcase built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <meta property="og:title" content="د سپورټي بوټانو پلورنځی" />
     <meta property="og:description" content="لوړ کیفیت سپورټي بوټان — محدوده عرضه" />
       <link rel="icon" type="image/png" href="https://img.icons8.com/?size=100&id=4JwsXUHOUSm2&format=png&color=000000" />
{/* lk; */}
      <body>{children}</body>
    </html>
  );
}