"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  scrollToPlatformTab,
  scrollToSection,
  useActiveSection,
  type PlatformTabId,
  type SectionId,
} from "@/hooks/useActiveSection";
import { Container } from "./Container";

const navItems: {
  label: string;
  id: SectionId | PlatformTabId;
  type: "section" | "tab";
}[] = [
  { label: "MobiQ", id: "mobiq", type: "tab" },
  { label: "RE-LITH", id: "relith", type: "tab" },
  { label: "Harita", id: "map", type: "tab" },
  { label: "Süreç Haritası", id: "milestones", type: "section" },
  { label: "Hakkımızda", id: "about", type: "section" },
  { label: "İletişim", id: "contact", type: "section" },
];

function navigate(id: SectionId | PlatformTabId, type: "section" | "tab") {
  if (type === "tab") {
    scrollToPlatformTab(id as PlatformTabId);
  } else {
    scrollToSection(id as SectionId);
  }
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-glass-border bg-[linear-gradient(180deg,rgba(242,247,252,0.96),rgba(232,238,246,0.9))] shadow-[0_4px_24px_rgba(26,68,148,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 data-[visible=true]:opacity-100"
        data-visible={scrolled}
        aria-hidden
      />

      <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="group flex shrink-0 items-center gap-3 font-display text-lg font-bold tracking-tight md:text-xl"
        >
          <Image
            src="/cyclion-logo.png"
            alt="CYCLION"
            width={1024}
            height={823}
            className="h-10 w-auto rounded-md md:h-11 transition-opacity group-hover:opacity-90"
            priority
          />
          <span className="hidden sm:inline text-foreground-subtle">|</span>
          <span className="hidden sm:inline text-base font-semibold text-foreground md:text-lg">
            MobiQ <span className="text-primary">×</span> RE-LITH
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.id, item.type);
                }}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            className="!min-h-9 !px-4 text-xs"
            onClick={() => scrollToPlatformTab("map")}
          >
            Prototipi Dene
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-glass-border bg-surface-container lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <nav
        className={cn(
          "border-t border-glass-border bg-charcoal-surface/95 backdrop-blur-xl lg:hidden",
          open ? "block" : "hidden",
        )}
        aria-label="Mobil menü"
      >
        <Container className="flex flex-col gap-1 py-4">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  navigate(item.id, item.type);
                }}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm transition-colors",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-foreground hover:bg-surface-container hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button
            className="mt-2 w-full"
            onClick={() => {
              setOpen(false);
              scrollToPlatformTab("map");
            }}
          >
            Prototipi Dene
          </Button>
        </Container>
      </nav>
    </header>
  );
}
