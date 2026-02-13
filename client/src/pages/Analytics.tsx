import { useQuery } from "@tanstack/react-query";
import { BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface AnalyticsData {
  totalInvested: number;
  currentValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  bestAsset: { ticker: string; returnPercent: number };
  worstAsset: { ticker: string; returnPercent: number };
  sectorAllocation: { sector: string; percent: number }[];
  monthlyReturns: { month: string; returnPercent: number }[];
}

export default function Analytics() {
  const { data, isLoading } = useQuery<AnalyticsData>({
    queryKey: ["analytics"],
    queryFn: () => apiRequest("/api/analytics"),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center shadow-card">
        <BarChart3 className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-text mb-2">
          Sem dados para análise
        </h3>
        <p className="text-text-muted text-sm">
          Adicione ativos à sua carteira para gerar relatórios.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <span className="text-sm text-text-muted">Total Investido</span>
          <p className="text-xl font-bold text-text font-tabular mt-1">
            {formatCurrency(data.totalInvested)}
          </p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <span className="text-sm text-text-muted">Valor Atual</span>
          <p className="text-xl font-bold text-text font-tabular mt-1">
            {formatCurrency(data.currentValue)}
          </p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <span className="text-sm text-text-muted">Melhor Ativo</span>
          <p className="text-xl font-bold text-success font-tabular mt-1">
            {data.bestAsset.ticker} {formatPercent(data.bestAsset.returnPercent)}
          </p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <span className="text-sm text-text-muted">Pior Ativo</span>
          <p className="text-xl font-bold text-error font-tabular mt-1">
            {data.worstAsset.ticker}{" "}
            {formatPercent(data.worstAsset.returnPercent)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            Alocação por Setor
          </h3>
          {data.sectorAllocation.length > 0 ? (
            <div className="space-y-3">
              {data.sectorAllocation.map((sector) => (
                <div key={sector.sector}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">{sector.sector}</span>
                    <span className="font-tabular text-text font-medium">
                      {sector.percent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-border-light rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${sector.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-sm">Sem dados de alocação.</p>
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Retorno Mensal
          </h3>
          {data.monthlyReturns.length > 0 ? (
            <div className="space-y-2">
              {data.monthlyReturns.map((month) => (
                <div
                  key={month.month}
                  className="flex items-center justify-between py-2 border-b border-border-light last:border-0"
                >
                  <span className="text-sm text-text-secondary">
                    {month.month}
                  </span>
                  <span
                    className={`text-sm font-tabular font-medium ${
                      month.returnPercent >= 0 ? "text-success" : "text-error"
                    }`}
                  >
                    {formatPercent(month.returnPercent)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-text-muted">
              <TrendingUp className="w-12 h-12 opacity-30" />
              <span className="ml-3 text-sm">Dados em breve</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
