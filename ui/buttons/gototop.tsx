"use client";

import { Button } from "@/ui/button";

export default function GoToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="text-primary animate-bounce hover:animate-none hover:translate-y-[-24%] mb-5 [&_svg]:size-8"
      onClick={scrollToTop}
      aria-label="Go to top"
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
      </svg>
    </Button>
  );
}
