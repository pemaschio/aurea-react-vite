import { useQuery } from "@tanstack/react-query";
import { Briefcase, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import type { PortfolioAsset } from "@/types";

const assetTypeLabels: Record<string, string> = {
  acao: "Ação",
  fii: "FII",
  etf: "ETF",
  renda_fixa: "Renda Fixa",
  cripto: "Cripto",
};

export default function Portfolio() {
  const { data: assets, isLoading } = useQuery<PortfolioAsset[]>({
    queryKey: ["portfolio"],
    queryFn: () => apiRequest("/api/portfolio"),
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
          {assets?.length ?? 0} ativos na carteira
        </p>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary-hover transition-colors">
          <Plus className="w-4 h-4" />
          Adicionar Ativo
        </button>
      </div>

      {assets && assets.length > 0 ? (
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-border-light/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Ativo
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Qtd
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Preço Médio
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Preço Atual
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Retorno
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => {
                  const returnPct =
                    ((asset.currentPrice - asset.averagePrice) /
                      asset.averagePrice) *
                    100;
                  const total = asset.quantity * asset.currentPrice;
                  const isPositive = returnPct >= 0;

                  return (
                    <tr
                      key={asset.id}
                      className="border-b border-border-light hover:bg-border-light/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-accent">
                              {asset.ticker.slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-text text-sm">
                              {asset.ticker}
                            </p>
                            <p className="text-xs text-text-muted">
                              {assetTypeLabels[asset.type] ?? asset.type} · {asset.sector}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-tabular text-sm text-text">
                        {asset.quantity}
                      </td>
                      <td className="px-6 py-4 text-right font-tabular text-sm text-text">
                        {formatCurrency(asset.averagePrice)}
                      </td>
                      <td className="px-6 py-4 text-right font-tabular text-sm text-text">
                        {formatCurrency(asset.currentPrice)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div
                          className={cn(
                            "inline-flex items-center gap-1 text-sm font-medium font-tabular",
                            isPositive ? "text-success" : "text-error"
                          )}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                          )}
                          {formatPercent(returnPct)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-tabular text-sm font-semibold text-text">
                        {formatCurrency(total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border p-12 text-center shadow-card">
          <Briefcase className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text mb-2">
            Nenhum ativo na carteira
          </h3>
          <p className="text-text-muted text-sm">
            Adicione seus ativos para começar a monitorar sua carteira.
          </p>
        </div>
      )}
    </div>
  );
}
