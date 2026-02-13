import { useQuery } from "@tanstack/react-query";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Crown,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface SettingsData {
  notifications: boolean;
  emailAlerts: boolean;
  whatsappAlerts: boolean;
  theme: "light" | "dark" | "system";
  plan: string;
}

export default function Settings() {
  const { data: settings, isLoading } = useQuery<SettingsData>({
    queryKey: ["settings"],
    queryFn: () => apiRequest("/api/settings"),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const sections = [
    {
      title: "Notificações",
      icon: Bell,
      items: [
        { label: "Notificações push", value: settings?.notifications ? "Ativo" : "Inativo" },
        { label: "Alertas por e-mail", value: settings?.emailAlerts ? "Ativo" : "Inativo" },
        { label: "Alertas por WhatsApp", value: settings?.whatsappAlerts ? "Ativo" : "Inativo" },
      ],
    },
    {
      title: "Aparência",
      icon: Palette,
      items: [
        { label: "Tema", value: settings?.theme === "dark" ? "Escuro" : settings?.theme === "light" ? "Claro" : "Sistema" },
      ],
    },
    {
      title: "Assinatura",
      icon: CreditCard,
      items: [
        { label: "Plano atual", value: settings?.plan ?? "Free" },
      ],
    },
    {
      title: "Segurança",
      icon: Shield,
      items: [
        { label: "Autenticação", value: "E-mail + Senha" },
        { label: "2FA", value: "Desativado" },
      ],
    },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      {sections.map((section) => (
        <div
          key={section.title}
          className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border-light flex items-center gap-3">
            <section.icon className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text">{section.title}</h3>
          </div>
          <div className="divide-y divide-border-light">
            {section.items.map((item) => (
              <div
                key={item.label}
                className="px-6 py-4 flex items-center justify-between"
              >
                <span className="text-sm text-text-secondary">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-text font-mono">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Crown className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-text">Upgrade para Premium</h3>
        </div>
        <p className="text-sm text-text-muted mb-4">
          Acesse análises avançadas com IA, alertas ilimitados e suporte
          prioritário.
        </p>
        <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors shadow-gold">
          Ver planos
        </button>
      </div>
    </div>
  );
}
