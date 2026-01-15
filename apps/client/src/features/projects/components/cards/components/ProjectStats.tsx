import { CheckSquare, Lightbulb, FileText } from 'lucide-react';

interface ProjectStatsProps {
  totalTasks: number;
  totalIdeas: number;
  totalDocs: number;
  variant?: 'compact' | 'regular';
}

export function ProjectStats({
  totalTasks,
  totalIdeas,
  totalDocs,
  variant = 'regular'
}: ProjectStatsProps) {
  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CheckSquare className="w-3.5 h-3.5" />
          <span className="font-medium text-foreground">{totalTasks}</span> tasks
        </span>
        <span className="flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5" />
          <span className="font-medium text-foreground">{totalIdeas}</span> ideas
        </span>
        <span className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          <span className="font-medium text-foreground">{totalDocs}</span> docs
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {[
        { label: 'Tasks', value: totalTasks, icon: CheckSquare },
        { label: 'Ideas', value: totalIdeas, icon: Lightbulb },
        { label: 'Docs', value: totalDocs, icon: FileText },
      ].map((item) => (
        <div
          key={item.label}
          className="text-center p-2.5 sm:p-3 rounded-lg bg-gradient-to-br from-secondary/60 to-secondary/40 border border-border/60 hover:border-border transition-colors"
        >
          <item.icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-lg sm:text-xl font-bold text-foreground">{item.value}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
