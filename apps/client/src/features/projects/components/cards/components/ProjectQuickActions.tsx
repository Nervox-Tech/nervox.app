import { MoreHorizontal, Eye, Edit, Archive } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ProjectQuickActionsProps {
    onAction: (action: 'view' | 'edit' | 'archive') => void;
    className?: string;
    triggerClassName?: string;
}

export function ProjectQuickActions({
    onAction,
    className,
    triggerClassName
}: ProjectQuickActionsProps) {
    return (
        <div className={cn('flex items-start gap-2 flex-shrink-0', className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn('h-8 w-8 transition-opacity', triggerClassName)}
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onAction('view')}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction('edit')}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => onAction('archive')}
                        className="text-red-600 dark:text-red-400"
                    >
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
