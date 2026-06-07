import type { Metadata } from "next";
import { montserrat } from "@/ui/fonts";
import { ThemeProvider } from "@/ui/theme-provider";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: "Sanudin — Software Engineer & Frontend Enthusiast",
  description:
    "Software engineer and frontend enthusiast based in Indonesia. Strongest on the backend — APIs, integrations, and systems — but care about the full picture from database to UI. Writing about what I learn and build.",
  authors: [{ name: "Sanudin", url: "https://sanudin.dev" }],
  keywords: [
    "sanudin",
    "sanudin dev",
    "software engineer",
    "backend engineer",
    "frontend enthusiast",
    "web developer",
    "API developer",
    "Next.js",
    "TypeScript",
    "Python",
    "portfolio",
    "Indonesia",
  ],
  openGraph: {
    title: "Sanudin — Software Engineer & Frontend Enthusiast",
    description:
      "Backend-leaning software engineer with a frontend eye. Building systems, learning in public, writing for the long term.",
    images: "/og.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanudin — Software Engineer & Frontend Enthusiast",
    description:
      "Backend-leaning software engineer with a frontend eye. Building systems, learning in public, writing for the long term.",
    images: "/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
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
