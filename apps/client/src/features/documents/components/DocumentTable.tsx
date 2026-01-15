import { MoreHorizontal } from 'lucide-react';
import type { FileData } from '../types';

interface DocumentTableProps {
    files: FileData[];
}

export function DocumentTable({ files }: DocumentTableProps) {
    return (
        <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Recent Thoughts</h3>
            </div>

            <div className="space-y-1">
                <div className="grid grid-cols-12 text-sm text-muted-foreground font-medium pb-4 px-4 border-b border-border/50">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-3">Last Modified</div>
                    <div className="col-span-2">Members</div>
                </div>
                {files.map(file => (
                    <div key={file.id} className="grid grid-cols-12 items-center py-4 px-4 hover:bg-secondary/20 rounded-xl transition-colors cursor-pointer group">
                        <div className="col-span-5 flex items-center gap-3">
                            <div className={`p-2 rounded bg-secondary/30 ${file.color}`}>
                                <file.icon className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-foreground">{file.name}</span>
                        </div>
                        <div className="col-span-2 text-sm text-muted-foreground">{file.size}</div>
                        <div className="col-span-3 text-sm text-muted-foreground">{file.date}</div>
                        <div className="col-span-2 flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <img
                                        key={i}
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${file.id}${i}`}
                                        className="w-6 h-6 rounded-full border-2 border-background"
                                        alt={`User avatar ${i}`}
                                    />
                                ))}
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
