"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Tags, HelpCircle, Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/categories", label: "Kategori", icon: Tags },
  { href: "/help", label: "Bantuan", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[260px] flex flex-col z-50 bg-white"
      style={{ borderRight: "1px solid #E8ECF4", boxShadow: "2px 0 12px rgba(0,0,0,0.04)" }}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-6 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #4F46E5, #818CF8)", boxShadow: "0 4px 12px rgba(79,70,229,0.35)" }}
        >
          <Snowflake size={20} className="text-white" />
        </div>
        <div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">Frozeria</span>
          <p className="text-[10px] text-indigo-500 tracking-widest uppercase font-semibold mt-0.5">Stok Opname</p>
        </div>
      </div>

      <div className="mx-5 h-px bg-slate-100 mb-5" />

      <p className="px-5 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Menu Utama</p>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <Icon
                size={18}
                className={cn(isActive ? "text-indigo-600" : "text-slate-400")}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 mx-3 mb-4 rounded-xl bg-indigo-50 border border-indigo-100">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #4F46E5, #818CF8)" }}
          >
            F
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 leading-tight">Frozeria v1.0</p>
            <p className="text-[11px] text-slate-400 mt-0.5">BNSP 2026</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
