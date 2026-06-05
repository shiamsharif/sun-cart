import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SunCart - Summer Essentials Store",
  description:
    "A fresh summer essentials storefront with curated care, beach, and travel products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="suncart" className="h-full antialiased">
      <body className="min-h-full">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
