import type { Metadata } from "next";
import "./globals.css";
import { MuseoModerno } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/ui/footer";
import Header from "@/components/ui/Header";
import { HeaderProvider } from "../context/HeaderContext";
import { ClerkProvider } from "@clerk/nextjs";

const museoModerno = MuseoModerno({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "FutbolSurvey",
  icons: {
    icon: [
      { url: "/fslogoBig.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/fslogoBig.png?v=2", sizes: "16x16", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={museoModerno.className}>
      <head>
        <Script
          src="https://kit.fontawesome.com/d4ba08446e.js"
          crossOrigin="anonymous"
        ></Script>
      </head>
      <body
        className={` bg-[url('../public/images/futbolbackground.jpg')] bg-center bg-no-repeat bg-cover bg-fixed flex flex-col items-center h-[100dvh]`}
      >
        <HeaderProvider>
          <ClerkProvider>
            <Header />

            <main className="flex-1 flex flex-col justify-center items-center w-5/6 sm:w-3/4 xl:w-[900px]">
              <div className="w-full max-w-5xl text-center">{children}</div>
            </main>

            <Footer />
          </ClerkProvider>
        </HeaderProvider>
      </body>
    </html>
  );
}
