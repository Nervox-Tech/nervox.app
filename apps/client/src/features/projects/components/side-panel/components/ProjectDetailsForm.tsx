import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Calendar } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Button } from '@/shared/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/shared/stores/appStore';
import { ProjectColorPicker } from '@/features/projects/components/create/ProjectColorPicker';

interface ProjectDetailsFormProps {
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (desc: string) => void;
    status: ProjectStatus;
    setStatus: (status: ProjectStatus) => void;
    color: string;
    setColor: (color: string) => void;
    startDate: Date | undefined;
    setStartDate: (date: Date | undefined) => void;
    endDate: Date | undefined;
    setEndDate: (date: Date | undefined) => void;
    setHasBeenManuallyStatused: (val: boolean) => void;
}

export function ProjectDetailsForm({
    name,
    setName,
    description,
    setDescription,
    status,
    setStatus,
    color,
    setColor,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setHasBeenManuallyStatused
}: ProjectDetailsFormProps) {
    return (
        <div className="space-y-6 pb-20">
            <div className="space-y-2.5 focus-within:text-primary transition-colors">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Project Name</label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter project name"
                    className="h-11 bg-secondary/20 border-border focus:ring-2 focus:ring-primary/20 transition-all rounded-xl shadow-sm"
                />
            </div>

            <div className="space-y-2.5 focus-within:text-primary transition-colors">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Description</label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this project about?"
                    className="min-h-[100px] bg-secondary/20 border-border focus:ring-2 focus:ring-primary/20 transition-all rounded-xl resize-none shadow-sm"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Status</label>
                    <Select
                        value={status}
                        onValueChange={(v: ProjectStatus) => {
                            setStatus(v);
                            setHasBeenManuallyStatused(true);
                        }}
                    >
                        <SelectTrigger className="h-11 bg-secondary/20 border-border rounded-xl shadow-sm">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl border-border">
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2.5">
                    <div className="flex items-center px-1">
                        <ProjectColorPicker
                            selectedColor={color}
                            onColorSelect={setColor}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Start Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    'w-full justify-start text-left font-normal h-11 bg-secondary/20 border-border rounded-xl shadow-sm',
                                    !startDate && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, 'PPP') : 'Start date'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-xl overflow-hidden border-border shadow-2xl" align="start">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-2.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">End Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    'w-full justify-start text-left font-normal h-11 bg-secondary/20 border-border rounded-xl shadow-sm',
                                    !endDate && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, 'PPP') : 'End date'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-xl overflow-hidden border-border shadow-2xl" align="start">
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
        </div>
    );
}
