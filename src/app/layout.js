import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "Meu portifólio",
    icons: {
    icon: "/icon/favicon.ico.png",
  },
    description: "Projeto pra mostrar tudo que eu sei",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}
