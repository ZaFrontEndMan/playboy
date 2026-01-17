"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Moon, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Logo from "@/components/Logo";

interface AdminHeaderProps {
  sidebarWidth?: number;
}

export default function AdminHeader({ sidebarWidth = 256 }: AdminHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
  };

  return (
    <header
      className="px-6 py-2"
      style={{
        backgroundColor: "var(--admin-card-bg)",
        borderBottomColor: "var(--admin-border)",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        position: "fixed",
        top: 0,
        left: `${sidebarWidth}px`,
        right: 0,
        zIndex: 20,
        transition: "left 0.3s",
      }}
    >
      <div className="flex items-center justify-between">
        {/* Logo + Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 text-brand-green hover:text-brand-green/80 transition-colors"
        >
          <Logo size="md" priority />

        </Link>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 transition-colors rounded-lg"
            style={{ color: "var(--admin-text-muted)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--admin-text)";
              e.currentTarget.style.backgroundColor = "var(--admin-hover-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--admin-text-muted)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-2 transition-colors rounded-lg"
              style={{ color: "var(--admin-text-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--admin-text)";
                e.currentTarget.style.backgroundColor = "var(--admin-hover-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--admin-text-muted)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div className="w-8 h-8 rounded-full bg-brand-green/20 border border-brand-green/50 flex items-center justify-center">
                <User className="w-4 h-4 text-brand-green" />
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 rounded-lg shadow-2xl z-50 overflow-hidden"
                style={{
                  backgroundColor: "var(--admin-card-bg)",
                  borderColor: "var(--admin-border)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <div className="py-1">
                  <Link
                    href="/admin/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-heading uppercase transition-colors hover:bg-[var(--admin-hover-bg)] hover:text-[var(--admin-text)] text-[var(--admin-text-muted)]"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/admin/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-heading uppercase transition-colors hover:bg-[var(--admin-hover-bg)] hover:text-[var(--admin-text)] text-[var(--admin-text-muted)]"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <div className="my-1 border-t border-[var(--admin-border)]" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-heading uppercase transition-colors hover:bg-red-500/10 hover:text-red-400 w-full text-left text-[var(--admin-text-muted)]"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}