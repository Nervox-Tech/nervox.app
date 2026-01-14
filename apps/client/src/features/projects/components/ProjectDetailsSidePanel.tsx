import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Edit,
  Save,
  Calendar as CalendarIcon,
  FolderKanban,
  CheckSquare,
  FileText,
  Lightbulb,
  Clock,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Calendar } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { useAppStore } from '@/shared/stores/appStore';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { Project } from '@/shared/stores/appStore';

interface ProjectSidePanelProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const colorOptions = [
  '#8B5CF6',
  '#10B981',
  '#3B82F6',
  '#F59E0B',
  '#EF4444',
  '#EC4899',
  '#06B6D4',
  '#84CC16',
];

export function ProjectSidePanel({ project, isOpen, onClose }: ProjectSidePanelProps) {
  const { tasks, ideas, externalDocuments, updateProject } =
    useAppStore();
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(colorOptions[0]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Update form when project changes
  useEffect(() => {
    if (project) {
      if (project.name !== name) setName(project.name);
      if (project.description !== description) setDescription(project.description);
      if (project.color !== color) setColor(project.color);
      if (project.startDate !== startDate) setStartDate(project.startDate);
      if (project.endDate !== endDate) setEndDate(project.endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  if (!project) return null;

  // Calculate project metrics
  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const projectIdeas = ideas.filter((i) => i.projectId === project.id);
  const projectDocs = externalDocuments.filter((d) => d.projectId === project.id);

  const totalTasks = projectTasks.length;
  const completedTasks = projectTasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = projectTasks.filter((t) => t.status === 'today').length;
  // const overdueTasks = projectTasks.filter(
  //   (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
  // ).length;

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getStatusInfo = () => {
    if (progress === 100)
      return {
        label: 'Completed',
        color: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/20',
        icon: CheckSquare,
      };
    if (progress > 50)
      return {
        label: 'On Track',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/20',
        icon: TrendingUp,
      };
    if (progress > 0)
      return {
        label: 'In Progress',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
        icon: Clock,
      };
    return {
      label: 'Not Started',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100 dark:bg-gray-900/20',
      icon: AlertTriangle,
    };
  };

  const handleSave = () => {
    if (!project) return;

    updateProject(project.id, {
      name,
      description,
      color,
      startDate,
      endDate,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form to original values
    setName(project.name);
    setDescription(project.description);
    setColor(project.color);
    setStartDate(project.startDate);
    setEndDate(project.endDate);
    setIsEditing(false);
  };

  const status = getStatusInfo();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-background border-l border-border z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}15` }}
                  >
                    <FolderKanban className="w-5 h-5" style={{ color: project.color }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Project Details</h2>
                    <p className="text-sm text-muted-foreground">
                      Created {format(project.createdAt, 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Project Name</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter project name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter project description"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Color</label>
                      <div className="flex gap-2 flex-wrap">
                        {colorOptions.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            className={cn(
                              'w-8 h-8 rounded-full transition-all',
                              color === c
                                ? 'ring-2 ring-offset-2 ring-offset-background ring-primary scale-110'
                                : 'hover:scale-105'
                            )}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !startDate && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, 'PPP') : 'Pick a start date'}
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
                        <label className="text-sm font-medium">End Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !endDate && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, 'PPP') : 'Pick an end date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                              disabled={(date) => (startDate ? date < startDate : false)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancel} size="sm">
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>

                    {(project.startDate || project.endDate) && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Timeline</h4>
                        <div className="space-y-1 text-sm">
                          {project.startDate && (
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Start:</span>
                              <span>{format(project.startDate, 'MMM dd, yyyy')}</span>
                            </div>
                          )}
                          {project.endDate && (
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">End:</span>
                              <span>{format(project.endDate, 'MMM dd, yyyy')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <status.icon className={cn('w-4 h-4', status.color)} />
                    Project Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={cn('text-xs', status.bgColor, status.color)}
                    >
                      {status.label}
                    </Badge>
                    <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </CardContent>
              </Card>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckSquare className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{totalTasks}</p>
                    <p className="text-xs text-muted-foreground">Total Tasks</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">{inProgressTasks}</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Lightbulb className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                    <p className="text-2xl font-bold">{projectIdeas.length}</p>
                    <p className="text-xs text-muted-foreground">Ideas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <FileText className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">{projectDocs.length}</p>
                    <p className="text-xs text-muted-foreground">Documents</p>
                  </CardContent>
                </Card>
              </div>

              {/* AI Risk Alert */}
              {project.aiRisk && (
                <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-700 dark:text-red-400 mb-1">
                          AI Risk Alert
                        </h4>
                        <p className="text-sm text-red-600 dark:text-red-300">{project.aiRisk}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Tasks */}
              {projectTasks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {projectTasks.slice(0, 5).map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50"
                        >
                          <div
                            className={cn(
                              'w-2 h-2 rounded-full',
                              task.status === 'done' && 'bg-green-500',
                              task.status === 'today' && 'bg-blue-500',
                              task.status === 'later' && 'bg-gray-400',
                              task.status === 'parked' && 'bg-yellow-500'
                            )}
                          />
                          <span className="text-sm truncate flex-1">{task.title}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {task.priority}
                          </Badge>
                        </div>
                      ))}
                      {projectTasks.length > 5 && (
                        <p className="text-xs text-muted-foreground text-center pt-2">
                          +{projectTasks.length - 5} more tasks
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
