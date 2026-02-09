import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface DashboardHeaderProps {
  greeting: string;
}

export function DashboardHeader({ greeting }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          {greeting}, <span className="text-gradient">Creator</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          Here's what's happening today
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className="sm:hidden">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </Button>
      </div>
    </motion.div>
  );
}
