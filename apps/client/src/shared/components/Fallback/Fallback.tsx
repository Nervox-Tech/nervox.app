import { MessageSquare } from 'lucide-react';

function Fallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl space-y-6">
        {/* Icon / Brand hint */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center animate-pulse">
            <MessageSquare className="w-7 h-7 text-primary" />
          </div>
        </div>

        {/* Skeleton card */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          {/* Title skeleton */}
          <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />

          {/* Content lines */}
          <div className="space-y-3">
            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
          </div>
        </div>

        {/* Secondary skeletons (list feel) */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 animate-pulse"
            />
          ))}
        </div>

        {/* Optional microcopy */}
        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
          Loading your workspace…
        </p>
      </div>
    </div>
  );
}

export default Fallback;
