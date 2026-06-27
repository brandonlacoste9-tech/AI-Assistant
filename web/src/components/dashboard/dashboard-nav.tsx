"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Calendar, Contact, LayoutDashboard, LogOut, Phone, Settings, Users, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/dashboard", icon: LayoutDashboard, key: "today" as const },
  { href: "/dashboard/bookings", icon: Calendar, key: "bookings" as const },
  { href: "/dashboard/calls", icon: Phone, key: "calls" as const },
  { href: "/dashboard/leads", icon: Users, key: "leads" as const },
  { href: "/dashboard/customers", icon: Contact, key: "customers" as const },
  { href: "/dashboard/integrations", icon: Calendar, key: "integrations" as const },
  { href: "/dashboard/settings", icon: Settings, key: "settings" as const },
];

export function DashboardNav({
  dict,
  businessName,
}: {
  dict: Dictionary;
  businessName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function logout() {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const navContent = (
    <div className="flex h-full flex-col bg-[var(--surface)]">
      <div className="shrink-0 border-b border-[var(--border)] px-4 py-4 sm:px-5 sm:py-5 flex items-center justify-between lg:block">
        <div>
          <Logo href="/" size={32} className="w-fit" />
          <p
            className="mt-3 line-clamp-2 text-sm font-semibold leading-snug text-[var(--foreground)] sm:text-base"
            title={businessName}
          >
            {businessName}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden rounded-lg p-1.5 text-[var(--muted-fg)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-3 lg:py-4">
        {links.map(({ href, icon: Icon, key }) => {
          const active =
            href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--primary-light)] text-[var(--primary)]"
                  : "text-[var(--muted-fg)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{dict.dashboard.nav[key]}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto shrink-0 border-t border-[var(--border)] bg-[var(--surface)] p-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={logout}
            className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--muted-fg)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>{dict.dashboard.nav.logout}</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 sm:px-6">
        <Logo href="/" size={28} />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-[var(--muted-fg)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {navContent}
      </aside>

      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
        {navContent}
      </aside>
    </>
  );
}