interface ProjectPreviewProps {
    name: string;
    description: string;
    color: string;
}

export function ProjectPreview({ name, description, color }: ProjectPreviewProps) {
    return (
        <div className="p-4 rounded-xl bg-secondary/30 border border-border mt-2">
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm"
                    style={{ backgroundColor: color }}
                >
                    {name ? name.charAt(0).toUpperCase() : 'P'}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{name || 'Project Name'}</h4>
                    <p className="text-xs text-muted-foreground truncate">
                        {description || 'Project description...'}
                    </p>
                </div>
            </div>
        </div>
    );
}
