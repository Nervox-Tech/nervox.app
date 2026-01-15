import { Folder as FolderIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { EmptyState } from '@/shared/components/ui/empty-state';
import type { Folder } from '../types';

interface SpaceGridProps {
    folders: Folder[];
    onCreateFolder: () => void;
}

export function SpaceGrid({ folders, onCreateFolder }: SpaceGridProps) {
    return (
        <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FolderIcon className="w-5 h-5 text-blue-600" />
                    <span className="font-bold">Spaces</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {folders.map((folder, index) => (
                    <div
                        key={folder.id}
                        className="p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors cursor-pointer animate-fade-in group hover:shadow-md border border-transparent hover:border-border/50"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg ${folder.color} flex items-center justify-center bg-opacity-20`}>
                                <folder.icon className="w-5 h-5 text-white" />
                            </div>
                            {folder.members.length > 0 && (
                                <div className="flex -space-x-1">
                                    {folder.members.slice(0, 2).map((id) => (
                                        <Avatar key={id} className="w-6 h-6 border-2 border-card">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${id}`} />
                                            <AvatarFallback className="text-[10px]">U</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                            )}
                        </div>
                        <h3 className="font-medium text-foreground">{folder.name}</h3>
                        <p className="text-sm text-muted-foreground">{folder.files} thoughts</p>
                    </div>
                ))}

                {/* Empty State if no folders */}
                {folders.length === 0 && (
                    <div className="col-span-full py-6">
                        <EmptyState
                            icon={FolderIcon}
                            title="No spaces yet"
                            description="Create a space to organize your documents and thoughts."
                            action={{
                                label: "Create Folder",
                                onClick: onCreateFolder
                            }}
                            className="p-0 border-none"
                            iconClassName="w-12 h-12 p-3 mb-4"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
