import Image from "next/image";
import Link from "next/link";
import NavLinks from "./nav-links";
import { Separator } from "@/ui/separator";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-99 pt-4 pb-4 flex justify-center px-4">
      <div className="flex items-center gap-2 sm:gap-4 rounded-full bg-background/90 backdrop-blur border border-border/50 shadow-sm px-3 py-2">
        <Link aria-label="Home" className="shrink-0 rounded-full p-1 hover:bg-accent" href="/">
          <Image
            alt="Sanudin Logo"
            width={32}
            height={32}
            src="/sanudin-logo.svg"
            className="size-8"
          />
        </Link>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <NavLinks />
        <Separator orientation="vertical" className="mx-1 h-6" />
        <ThemeToggle />
      </div>
    </header>
  );
}
