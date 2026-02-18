"use client";

import Link from "next/link";
import { Button } from "@/ui/button";

const navLinkClass =
  "text-content hover:text-primary text-sm tracking-widest font-medium h-auto px-3 py-2";

export default function NavLinks() {
  return (
    <nav className="flex items-center gap-0.5 sm:gap-1" aria-label="Main navigation">
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
    </nav>
  );
}
