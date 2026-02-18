"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { ThemeToggle } from "./theme-toggle";

const navLinkClass =
  "text-content hover:text-primary text-sm tracking-widest font-bold h-auto px-3 py-2";

export default function NavLinks() {
  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      <Button variant="ghost" className={navLinkClass} asChild>
        <Link href="/#about">About</Link>
      </Button>
      <Button variant="ghost" className={navLinkClass} asChild>
        <Link href="/#projects">Projects</Link>
      </Button>
      <Button variant="ghost" className={navLinkClass} asChild>
        <Link href="/#contact">Contact</Link>
      </Button>
      <Button variant="ghost" className={navLinkClass} asChild>
        <Link href="/blog">Blog</Link>
      </Button>
      <ThemeToggle />
    </nav>
  );
}
