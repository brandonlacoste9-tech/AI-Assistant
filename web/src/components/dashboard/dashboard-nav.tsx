"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Calendar, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/dashboard", icon: LayoutDashboard, key: "today" as const },
  { href: "/dashboard/bookings", icon: Calendar, key: "bookings" as const },
  { href: "/dashboard/leads", icon: Users, key: "leads" as const },
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

  async function logout() {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-b border-[var(--border)] bg-[var(--surface)] lg:fixed lg:inset-y-0 lg:w-64 lg:border-b-0 lg:border-r">
      <div className="border-b border-[var(--border)] px-5 py-5">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted-fg)]">
          RendezVous AI
        </p>
        <p className="mt-1 truncate font-semibold text-[var(--foreground)]">{businessName}</p>
      </div>
      <nav className="flex flex-1 gap-1 overflow-x-auto px-3 py-4 lg:flex-col lg:overflow-visible">
        {links.map(({ href, icon: Icon, key }) => {
          const active =
            href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                active
                  ? "bg-[var(--primary-light)] text-[var(--primary)]"
                  : "text-[var(--muted-fg)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {dict.dashboard.nav[key]}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[var(--border)] p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--muted-fg)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
        >
          <LogOut className="h-4 w-4" />
          {dict.dashboard.nav.logout}
        </button>
      </div>
    </aside>
  );
}