import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  Eye,
  MessageCircle,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/portfolio", icon: Briefcase, label: "Carteira" },
  { to: "/market", icon: TrendingUp, label: "Mercado" },
  { to: "/watchlist", icon: Eye, label: "Watchlist" },
  { to: "/assistant", icon: MessageCircle, label: "Assistente IA" },
  { to: "/analytics", icon: BarChart3, label: "Relatórios" },
  { to: "/profile", icon: User, label: "Perfil" },
  { to: "/settings", icon: Settings, label: "Configurações" },
];

interface SidebarProps {
  onSignOut: () => void;
}

export default function Sidebar({ onSignOut }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col z-50">
      <div className="p-6 border-b border-sidebar-hover">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-sidebar-text-active font-bold text-lg tracking-tight">
              Aurea
            </h1>
            <p className="text-sidebar-text text-xs opacity-60">
              Investimentos Inteligentes
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-sidebar-hover text-sidebar-text-active"
                  : "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active"
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-hover">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-text hover:bg-sidebar-hover hover:text-error transition-all duration-150 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
