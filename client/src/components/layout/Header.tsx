import { Bell, User } from "lucide-react";

interface HeaderProps {
  title: string;
  userEmail?: string;
}

export default function Header({ title, userEmail }: HeaderProps) {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <h2 className="text-lg font-semibold text-text">{title}</h2>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-border-light transition-colors">
          <Bell className="w-5 h-5 text-text-muted" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          {userEmail && (
            <span className="text-sm text-text-muted hidden md:block">
              {userEmail}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
