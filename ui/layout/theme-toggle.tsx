"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "@/ui/button";

const subscribe = () => () => {};

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-content rounded-full hover:text-primary hover:bg-accent size-8 hover:cursor-pointer"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleToggle}
    >
      {!mounted ? (
        <span className="size-4" aria-hidden />
      ) : isDark ? (
        <LuMoon className="size-4" />
      ) : (
        <LuSun className="size-4" />
      )}
    </Button>
  );
}
