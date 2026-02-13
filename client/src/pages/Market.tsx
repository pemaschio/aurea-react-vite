import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, Globe, RefreshCw } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { formatNumber, formatPercent, cn } from "@/lib/utils";
import type { MarketIndicator } from "@/types";

export default function Market() {
  const { data: indicators, isLoading, refetch } = useQuery<MarketIndicator[]>({
    queryKey: ["market-indicators"],
    queryFn: () => apiRequest("/api/market/indicators"),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-text-muted text-sm">
          Indicadores macroeconômicos atualizados
        </p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-secondary font-medium text-sm hover:bg-border-light transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </button>
      </div>

      {indicators && indicators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {indicators.map((indicator) => {
            const change = indicator.value - indicator.previousValue;
            const changePct =
              indicator.previousValue !== 0
                ? (change / indicator.previousValue) * 100
                : 0;
            const isPositive = change >= 0;

            return (
              <div
                key={indicator.id}
                className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-text-muted">
                    {indicator.name}
                  </span>
                  <span className="text-xs text-text-muted bg-border-light px-2 py-0.5 rounded">
                    {indicator.source}
                  </span>
                </div>
                <p className="text-2xl font-bold text-text font-tabular">
                  {formatNumber(indicator.value)}
                  {indicator.unit && (
                    <span className="text-sm font-normal text-text-muted ml-1">
                      {indicator.unit}
                    </span>
                  )}
                </p>
                <div
                  className={cn(
                    "flex items-center gap-1 mt-2 text-sm font-tabular",
                    isPositive ? "text-success" : "text-error"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  {formatPercent(changePct)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border p-12 text-center shadow-card">
          <Globe className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text mb-2">
            Dados macroeconômicos indisponíveis
          </h3>
          <p className="text-text-muted text-sm">
            Os indicadores serão atualizados automaticamente quando o sistema de
            coleta estiver ativo.
          </p>
        </div>
      )}
    </div>
  );
}
