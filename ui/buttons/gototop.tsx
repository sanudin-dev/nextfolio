"use client";

import { FaChevronUp } from "react-icons/fa6";
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
      <FaChevronUp />
    </Button>
  );
}
