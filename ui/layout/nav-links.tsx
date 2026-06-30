'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/ui/button'
import { HiMenu, HiX } from 'react-icons/hi'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
]

const navLinkClass =
  'text-content hover:text-primary text-sm tracking-widest font-medium h-auto px-3 py-2'

export default function NavLinks() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden sm:flex items-center gap-0.5 sm:gap-1" aria-label="Main navigation">
        {links.map(({ href, label }) => (
          <Button key={href} variant="ghost" className={navLinkClass} asChild>
            <Link href={href}>{label}</Link>
          </Button>
        ))}
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="sm:hidden p-2 rounded-full hover:bg-accent text-content"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <HiX className="size-5" /> : <HiMenu className="size-5" />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-40 rounded-2xl bg-background/95 backdrop-blur border border-border/50 shadow-md py-2 flex flex-col">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 text-sm font-medium text-content hover:text-primary hover:bg-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
