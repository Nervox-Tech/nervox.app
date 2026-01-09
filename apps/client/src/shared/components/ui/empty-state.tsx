import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
        variant?: "default" | "destructive" | "secondary" | "ghost" | "link" | "outline" | null | undefined
    };
    className?: string;
    iconClassName?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
    iconClassName
}: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in-95 duration-300", className)}>
            <div className={cn("p-4 rounded-full bg-secondary/50 mb-4 ring-1 ring-border/50", iconClassName)}>
                <Icon className="w-8 h-8 text-muted-foreground/80" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground max-w-[280px] mb-6">
                {description}
            </p>
            {action && (
                <Button
                    variant={action.variant || "default"}
                    onClick={action.onClick}
                    className="gap-2"
                >
                    {action.label}
                </Button>
            )}
        </div>
    );
}
