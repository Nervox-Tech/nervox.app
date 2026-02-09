import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/lib/utils';

interface QuickLinkItem {
    icon: React.ElementType;
    label: string;
    count: number;
    view: string;
    color: string;
    link: string;
}

interface DashboardQuickLinksProps {
    items: QuickLinkItem[];
    onNavigate: (view: string) => void;
}

export function DashboardQuickLinks({ items, onNavigate }: DashboardQuickLinksProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
        >
            <Card className="h-full">
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold">Quick Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {items.map((item) => (
                        <Link to={item.link} key={item.label}>
                            <button
                                onClick={() => onNavigate(item.view)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group text-left"
                            >
                                <div className={cn("p-2 rounded-lg", item.color.split(' ')[1])}>
                                    <item.icon className={cn("w-4 h-4", item.color.split(' ')[0])} />
                                </div>
                                <span className="flex-1 text-sm text-foreground font-medium">{item.label}</span>
                                <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                                    {item.count}
                                </span>
                                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    );
}
