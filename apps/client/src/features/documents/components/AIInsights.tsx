import { FileText, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export function AIInsights() {
    return (
        <div className="bg-secondary/50 rounded-3xl p-8 border border-border/50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-32 h-32" />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
                    <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Insights</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {/* Insight Card 1 */}
                <div className="bg-background rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer group/card flex flex-col items-start gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-1 line-clamp-2 text-foreground">You have 3 documents related to 'Roadmap 2024'.</p>
                        <Button variant="link" className="p-0 h-auto text-xs text-blue-500 font-bold group-hover/card:underline">Consolidate them?</Button>
                    </div>
                </div>

                {/* Insight Card 2 */}
                <div className="bg-background rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer group/card flex flex-col items-start gap-4">
                    <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-xl text-orange-600">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-1 line-clamp-2 text-foreground">Project Ideas has not been updated in 9 days.</p>
                        <Button variant="link" className="p-0 h-auto text-orange-500 font-bold group-hover/card:underline">Schedule review?</Button>
                    </div>
                </div>

                {/* Insight Card 3 */}
                <div className="bg-background rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer group/card flex flex-col items-start gap-4">
                    <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-xl text-red-600">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-1 line-clamp-2 text-foreground">Marketing Assets does not link to any roadmap.</p>
                        <Button variant="link" className="p-0 h-auto text-red-500 font-bold group-hover/card:underline">Fix disconnect</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
