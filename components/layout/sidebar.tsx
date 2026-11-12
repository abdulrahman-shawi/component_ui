"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface SidebarNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface SidebarSection {
  label?: string;
  items: SidebarNavItem[];
}

export interface SidebarProps {
  brand?: { title: string; icon?: LucideIcon };
  sections: SidebarSection[];
  footer?: React.ReactNode | ((collapsed: boolean) => React.ReactNode);
  defaultCollapsed?: boolean;
  className?: string;
}

function isItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({
  brand,
  sections,
  footer,
  defaultCollapsed = false,
  className,
}: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const BrandIcon = brand?.icon;

  React.useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-4 z-40 inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r bg-card text-card-foreground transition-[width,transform] duration-300 lg:sticky lg:top-0 lg:translate-x-0",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          {BrandIcon && (
            <BrandIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          )}
          {!collapsed && brand?.title && (
            <span className="truncate text-sm font-semibold tracking-tight">
              {brand.title}
            </span>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav
          aria-label="Main navigation"
          className="flex-1 overflow-y-auto px-3 py-4"
        >
          {sections.map((section, sectionIndex) => (
            <div key={section.label ?? sectionIndex} className="mb-5 last:mb-0">
              {section.label && !collapsed && (
                <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.label}
                </p>
              )}
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const active = isItemActive(pathname, item.href);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        title={collapsed ? item.title : undefined}
                        onClick={() => setMobileOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          collapsed && "justify-center px-0",
                          active
                            ? "bg-accent font-medium text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {!collapsed && (
                          <>
                            <span className="truncate">{item.title}</span>
                            {item.badge !== undefined && (
                              <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                        {active && (
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                          />
                        )}
                        {collapsed && item.badge !== undefined && (
                          <span
                            aria-hidden="true"
                            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {footer && (
          <div
            className={cn(
              "shrink-0 border-t p-3",
              collapsed && "flex justify-center"
            )}
          >
            {typeof footer === "function" ? footer(collapsed) : footer}
          </div>
        )}

        <div className="hidden shrink-0 border-t p-2 lg:block">
          <Button
            variant="ghost"
            size="sm"
            className={cn("w-full", collapsed && "justify-center px-0")}
            onClick={() => setCollapsed((current) => !current)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </>
  );
}
