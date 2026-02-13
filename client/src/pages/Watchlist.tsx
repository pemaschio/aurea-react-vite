import { useQuery } from "@tanstack/react-query";
import { Eye, Plus, TrendingUp, TrendingDown, Target } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import type { WatchlistItem } from "@/types";

export default function Watchlist() {
  const { data: items, isLoading } = useQuery<WatchlistItem[]>({
    queryKey: ["watchlist"],
    queryFn: () => apiRequest("/api/watchlist"),
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
          {items?.length ?? 0} ativos monitorados
        </p>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary-hover transition-colors">
          <Plus className="w-4 h-4" />
          Adicionar Ativo
        </button>
      </div>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-accent">
                        {item.ticker.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-text text-sm">
                        {item.ticker}
                      </p>
                      <p className="text-xs text-text-muted">{item.name}</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm font-tabular font-medium",
                      isPositive ? "text-success" : "text-error"
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {formatPercent(item.changePercent)}
                  </div>
                </div>

                <p className="text-xl font-bold text-text font-tabular">
                  {formatCurrency(item.currentPrice)}
                </p>

                {item.targetPrice && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-text-muted">
                    <Target className="w-3 h-3" />
                    Alvo: {formatCurrency(item.targetPrice)}
                  </div>
                )}

                {item.notes && (
                  <p className="text-xs text-text-muted mt-2 line-clamp-2">
                    {item.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border p-12 text-center shadow-card">
          <Eye className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text mb-2">
            Sua watchlist está vazia
          </h3>
          <p className="text-text-muted text-sm">
            Adicione ativos para monitorar seus preços e variações.
          </p>
        </div>
      )}
    </div>
  );
}
