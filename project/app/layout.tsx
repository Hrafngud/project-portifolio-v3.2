import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'sonner';
import { LanguageProvider } from "@/context/language-context";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Barlow_Condensed, Montserrat } from "next/font/google"

const inter = Inter({ subsets: ["latin"] });

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My professional portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <style id="initial-loader">{`
          :root {
            background-color: black;
          }
          body {
            display: none;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <LoadingScreen />
            <div 
              id="hexagon-bg"
              className="fixed inset-0 -z-10 bg-center bg-contain bg-no-repeat opacity-0 transition-opacity duration-300" 
              style={{
                backgroundImage: 'url("/images/hexagon.svg")',
                backgroundSize: '100vw',
              }}
            />
            <main className="container mx-auto px-4 pt-20 pb-8">
              {children}
            </main>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}