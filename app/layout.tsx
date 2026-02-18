import type { Metadata } from "next";
import { montserrat } from "@/ui/fonts";
import { ThemeProvider } from "@/ui/theme-provider";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: "Sanudin | Software Engineer and Developer",
  description:
    "A software engineer and developer passionate about helping entrepreneurs create great products.",
  authors: [{ name: "Sanudin", url: "https://sanudin.dev" }],
  keywords: [
    "sanudin",
    "sanudin-dev",
    "software engineer",
    "developer",
    "web developer",
    "nextjs",
    "portfolio website",
    "portfolio site",
  ],
  openGraph: {
    title: "Sanudin | Software Engineer and Developer",
    description:
      "Passionate about helping entrepreneurs create great products.",
    images: "/og.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanudin | Software Engineer and Developer",
    description:
      "Passionate about helping entrepreneurs create great products.",
    images: "/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
