import { motion } from 'framer-motion';
import { Card, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

interface StatItem {
    label: string;
    value: number;
    icon: LucideIcon;
    color: string;
    bg: string;
}

interface DashboardStatsProps {
    stats: StatItem[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
            {stats.map((stat) => (
                <Card key={stat.label} className="border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className={cn("p-2 sm:p-2.5 rounded-xl", stat.bg)}>
                                <stat.icon className={cn("w-4 h-4 sm:w-5 sm:h-5", stat.color)} />
                            </div>
                            <div>
                                <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </motion.div>
    );
}
