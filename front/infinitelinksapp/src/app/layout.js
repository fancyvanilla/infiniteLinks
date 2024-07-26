import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/contexts/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "infiniteLinks",
  description: "Made by and for the community ❤️",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <WalletProvider>
        {children}
        </WalletProvider>
        </body>
    </html>
  );
}
