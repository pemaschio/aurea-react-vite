import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/portfolio": "Minha Carteira",
  "/market": "Mercado & Macro",
  "/watchlist": "Watchlist",
  "/assistant": "Assistente IA",
  "/analytics": "Relatórios",
  "/profile": "Meu Perfil",
  "/settings": "Configurações",
};

interface MainLayoutProps {
  userEmail?: string;
  onSignOut: () => void;
}

export default function MainLayout({ userEmail, onSignOut }: MainLayoutProps) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Aurea";

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onSignOut={onSignOut} />
      <div className="ml-64">
        <Header title={title} userEmail={userEmail} />
        <main className="p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
