/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';

const colorOptionsInternal = [
    '#8B5CF6', // Purple
    '#10B981', // Green
    '#3B82F6', // Blue
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#84CC16', // Lime
];

export { colorOptionsInternal as colorOptions };

interface ProjectColorPickerProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
    label?: string;
}

export function ProjectColorPicker({ selectedColor, onColorSelect, label }: ProjectColorPickerProps) {
    return (
        <div className="w-full">
            {label && <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">{label}</label>}
            <div className="flex gap-2.5 flex-wrap">
                {colorOptionsInternal.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => onColorSelect(c)}
                        className={cn(
                            'w-8 h-8 rounded-full transition-all duration-200 border-2 border-transparent',
                            selectedColor === c
                                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 border-white/20'
                                : 'hover:scale-110'
                        )}
                        style={{ backgroundColor: c }}
                        aria-label={`Select color ${c}`}
                    />
                ))}
            </div>
        </div>
    );
}
