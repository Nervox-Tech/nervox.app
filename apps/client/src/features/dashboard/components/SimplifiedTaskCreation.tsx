import { useState } from 'react';
import { Plus, Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '../store/useAppStore';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Textarea } from '@/shared/components/ui/textarea';

interface SimplifiedTaskCreationProps {
  onTaskCreated?: () => void;
  defaultProjectId?: string;
  className?: string;
  placeholder?: string;
}

export function SimplifiedTaskCreation({
  onTaskCreated,
  defaultProjectId,
  className,
}: SimplifiedTaskCreationProps) {
  const { addTask } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [newSubtask, setNewSubtask] = useState('');

  // Smart defaults based on context
  const getSmartDefaults = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // If no start date set, default to today
    if (!startDate) {
      setStartDate(now);
    }

    // If no end date set and we have a start date, default to 3 days later
    if (!endDate && startDate) {
      const defaultEnd = new Date(startDate);
      defaultEnd.setDate(defaultEnd.getDate() + 3);
      setEndDate(defaultEnd);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Apply smart defaults
    getSmartDefaults();

    addTask({
      title: title.trim(),
      description: description.trim(),
      status: 'today',
      startDate,
      dueDate: endDate,
      source: 'manual',
      tags: subtasks.length > 0 ? ['has-subtasks'] : [],
      displayId: 'TSK-New', // Will be overridden by store
      priority: 'medium', // Smart default - will be calculated by store based on dates
      projectId: defaultProjectId,
    });

    // Reset form
    resetForm();
    onTaskCreated?.();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate(undefined);
    setEndDate(undefined);
    setSubtasks([]);
    setNewSubtask('');
    setIsExpanded(false);
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, newSubtask.trim()]);
      setNewSubtask('');
    }
  };

  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-3", className)}>

      {/* Expanded Form */}
      {isExpanded && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 bg-card border border-border rounded-lg"
        >
          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Description (Optional)
            </label>
            <Textarea
              placeholder="Add more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none min-h-[80px]"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    {startDate ? format(startDate, 'MMM d') : <span>Today</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    {endDate ? format(endDate, 'MMM d') : <span>+3 days</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Subtasks */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Subtasks (Optional)</label>

            {/* Existing Subtasks */}
            {subtasks.length > 0 && (
              <div className="space-y-1">
                {subtasks.map((subtask, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md"
                  >
                    <span className="flex-1 text-sm">{subtask}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubtask(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Subtask */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
                placeholder="Add a subtask..."
                className="flex-1 bg-secondary/30 border border-border/30 rounded-md px-3 py-1.5 text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addSubtask}
                disabled={!newSubtask.trim()}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Create Task
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
