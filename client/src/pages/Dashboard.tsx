import { useQuery } from "@tanstack/react-query";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import type { DashboardSummary } from "@/types";

export default function Dashboard() {
  const { data: summary, isLoading } = useQuery<DashboardSummary>({
    queryKey: ["dashboard"],
    queryFn: () => apiRequest("/api/dashboard"),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    {
      label: "Patrimônio Total",
      value: formatCurrency(summary?.totalPatrimony ?? 0),
      icon: Wallet,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Retorno Total",
      value: formatPercent(summary?.totalReturnPercent ?? 0),
      subValue: formatCurrency(summary?.totalReturn ?? 0),
      icon: summary?.totalReturn && summary.totalReturn >= 0 ? TrendingUp : TrendingDown,
      color:
        summary?.totalReturn && summary.totalReturn >= 0
          ? "text-success"
          : "text-error",
      bg:
        summary?.totalReturn && summary.totalReturn >= 0
          ? "bg-success/10"
          : "bg-error/10",
    },
    {
      label: "Retorno Mensal",
      value: formatPercent(summary?.monthlyReturnPercent ?? 0),
      subValue: formatCurrency(summary?.monthlyReturn ?? 0),
      icon: summary?.monthlyReturn && summary.monthlyReturn >= 0 ? ArrowUpRight : ArrowDownRight,
      color:
        summary?.monthlyReturn && summary.monthlyReturn >= 0
          ? "text-success"
          : "text-error",
      bg:
        summary?.monthlyReturn && summary.monthlyReturn >= 0
          ? "bg-success/10"
          : "bg-error/10",
    },
    {
      label: "Ativos na Carteira",
      value: String(summary?.assetCount ?? 0),
      icon: BarChart3,
      color: "text-info",
      bg: "bg-info/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-text-muted">{stat.label}</span>
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold text-text font-tabular">
              {stat.value}
            </p>
            {stat.subValue && (
              <p className={cn("text-sm mt-1 font-tabular", stat.color)}>
                {stat.subValue}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-card">
          <h3 className="text-lg font-semibold text-text mb-4">
            Evolução do Patrimônio
          </h3>
          <div className="h-64 flex items-center justify-center text-text-muted">
            <BarChart3 className="w-12 h-12 opacity-30" />
            <span className="ml-3 text-sm">Gráfico em breve</span>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Alertas Recentes
          </h3>
          {summary?.alerts && summary.alerts.length > 0 ? (
            <div className="space-y-3">
              {summary.alerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-3 rounded-lg text-sm",
                    alert.severity === "success" && "bg-success-light text-success",
                    alert.severity === "error" && "bg-error-light text-error",
                    alert.severity === "warning" && "bg-warning-light text-warning",
                    alert.severity === "info" && "bg-info-light text-info"
                  )}
                >
                  <p className="font-medium">{alert.title}</p>
                  <p className="opacity-80 mt-0.5">{alert.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-sm">Nenhum alerta no momento.</p>
          )}
        </div>
      </div>
    </div>
  );
}
