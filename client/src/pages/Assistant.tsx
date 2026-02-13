import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import type { ConversationMessage } from "@/types";

export default function Assistant() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages } = useQuery<ConversationMessage[]>({
    queryKey: ["assistant-messages"],
    queryFn: () => apiRequest("/api/assistant/messages"),
  });

  const sendMessage = useMutation({
    mutationFn: (content: string) =>
      apiRequest("/api/assistant/chat", "POST", { message: content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assistant-messages"] });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sendMessage.isPending) return;
    sendMessage.mutate(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {!messages || messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">
              Assistente Financeiro IA
            </h3>
            <p className="text-text-muted text-sm max-w-md">
              Pergunte sobre seus investimentos, análises de mercado, estratégias
              de alocação ou qualquer dúvida financeira.
            </p>
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {[
                "Como diversificar minha carteira?",
                "Análise do cenário macro atual",
                "Qual a melhor estratégia para FIIs?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary hover:bg-border-light transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-3xl",
                msg.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  msg.role === "user"
                    ? "bg-primary/10"
                    : "bg-accent/10"
                )}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-primary" />
                ) : (
                  <Bot className="w-4 h-4 text-accent" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-text"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {sendMessage.isPending && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-accent" />
            </div>
            <div className="bg-card border border-border rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-3 pt-4 border-t border-border"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre seus investimentos..."
          className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-card text-text placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || sendMessage.isPending}
          className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
