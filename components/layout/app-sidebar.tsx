"use client";

import {
  BarChart3,
  CircleHelp,
  Command,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Sidebar, type SidebarSection } from "@/components/layout/sidebar";

const sections: SidebarSection[] = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Customers", href: "/", icon: Users },
      { title: "Orders", href: "/orders", icon: ShoppingCart, badge: 12 },
      { title: "Products", href: "/products", icon: Package },
      { title: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Settings", href: "/settings", icon: Settings },
      { title: "Help & Support", href: "/help", icon: CircleHelp },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      brand={{ title: "ComponentUI", icon: Command }}
      sections={sections}
      footer={(collapsed) =>
        collapsed ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            AS
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              AS
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-foreground">
                Abdulrahman
              </span>
              <span className="truncate text-xs text-muted-foreground">
                Pro plan
              </span>
            </div>
          </div>
        )
      }
    />
  );
}
