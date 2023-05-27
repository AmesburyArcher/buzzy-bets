import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buzzy Bets",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
