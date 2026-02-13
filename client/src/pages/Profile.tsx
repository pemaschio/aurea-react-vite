import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Save, Crown, Check } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { UserProfile } from "@/types";

const planLabels: Record<string, { label: string; color: string }> = {
  free: { label: "Free", color: "bg-border text-text-secondary" },
  premium: { label: "Premium", color: "bg-primary/10 text-primary" },
  advisory: { label: "Advisory", color: "bg-accent/10 text-accent" },
};

export default function Profile() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { data: profile, isLoading } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await apiRequest<UserProfile>("/api/profile");
      setName(data.name || "");
      setPhone(data.phone || "");
      return data;
    },
  });

  const updateProfile = useMutation({
    mutationFn: (data: { name: string; phone: string }) =>
      apiRequest("/api/profile", "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const plan = planLabels[profile?.plan ?? "free"];

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text">
              {profile?.name || profile?.email}
            </h3>
            <p className="text-sm text-text-muted">{profile?.email}</p>
            <span
              className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-xs font-medium ${plan.color}`}
            >
              <Crown className="w-3 h-3" />
              Plano {plan.label}
            </span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile.mutate({ name, phone });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Nome completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-4 py-2.5 rounded-lg border-2 border-border bg-surface text-text placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Telefone (WhatsApp)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-2.5 rounded-lg border-2 border-border bg-surface text-text placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={updateProfile.isPending}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Salvo!
              </>
            ) : updateProfile.isPending ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
