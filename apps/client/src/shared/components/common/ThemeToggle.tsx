import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string, variant?: 'compact' | 'full' }) {
    const { theme, setTheme } = useTheme();

    const themes = [
        { id: 'light', icon: Sun, label: 'Light' },
        { id: 'dark', icon: Moon, label: 'Dark' },
    ] as const;

   return (
            <div className={cn("flex items-center gap-1 bg-secondary/30 p-1 rounded-xl border border-border/50", className)}>
                {themes.map((t) => {
                    const Icon = t.icon;
                    const isActive = theme === t.id;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={cn(
                                "p-1.5 rounded-lg transition-all flex items-center justify-center",
                                isActive
                                    ? "bg-background shadow-sm text-blue-600 border border-border/50"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            )}
                            title={t.label}
                        >
                            <Icon className="w-4 h-4" />
                        </button>
                    );
                })}
            </div>
        );
}
