import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, MessageSquare, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/lib/utils';

export function DashboardActivity() {
    const activities = [
        { action: 'Task completed', item: 'Review Q4 roadmap', time: '2h ago', icon: CheckCircle2, color: 'text-status-success' },
        { action: 'New message', item: 'from Killan James', time: '3h ago', icon: MessageSquare, color: 'text-status-info' },
        { action: 'Idea captured', item: 'Mobile app feature', time: '5h ago', icon: Lightbulb, color: 'text-amber-500' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className={cn("p-1.5 rounded-lg bg-secondary/50", activity.color)}>
                                    <activity.icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-foreground">{activity.action}</p>
                                    <p className="text-xs text-muted-foreground truncate">{activity.item}</p>
                                </div>
                                <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
