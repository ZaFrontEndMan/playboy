"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Gift,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Logo from "../Logo";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Collapse sidebar on navigation
  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => {
      setIsCollapsed(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/drops", label: "Drops", icon: Gift },
    { href: "/admin/profile", label: "Profile", icon: User },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`h-screen p-6 transition-all duration-300 flex flex-col ${isCollapsed ? "w-20" : "w-64"
        }`}
      style={{
        backgroundColor: "var(--admin-card-bg)",
        borderRightColor: "var(--admin-border)",
        borderRightWidth: "1px",
        borderRightStyle: "solid",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 30,
      }}
    >


      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`p-2 relative self-start hover:scale-105 hover:text-brand-green duration-500 mb-2`}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>


      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href === "/admin" && pathname === "/admin");

          return (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? "bg-brand-green/20 text-brand-green border border-brand-green/30"
                  : ""
                  } ${isCollapsed ? "justify-center" : ""}`}
                style={
                  !isActive
                    ? {
                      color: "var(--admin-text-muted)",
                    }
                    : {}
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--admin-hover-bg)";
                    e.currentTarget.style.color = "var(--admin-text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--admin-text-muted)";
                  }
                }}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && (
                  <span className="font-heading uppercase text-sm">
                    {item.label}
                  </span>
                )}
              </Link>
              {/* Tooltip when collapsed */}
              {isCollapsed && (
                <div
                  className="absolute left-full ml-2 px-3 py-2 text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 whitespace-nowrap"
                  style={{
                    backgroundColor: "var(--admin-card-bg)",
                    color: "var(--admin-text)",
                    borderColor: "var(--admin-border)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                >
                  {item.label}
                  <div
                    className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent"
                    style={{
                      borderRightColor: "var(--admin-card-bg)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
