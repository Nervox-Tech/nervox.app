import { Button } from "@/shared/components/ui/button";
import { Sparkles, Clock, Paperclip, PenSquare, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInboxStore } from "@/features/inbox/store/useInboxStore";

const ReplyBox = () => {
    const { isEditingDraft, setIsEditingDraft, activeThreadId, drafts, setDraft, sendMessage } = useInboxStore();
    const draftContent = drafts[activeThreadId] || '';

    const handleSend = () => {
        if (!draftContent.trim()) return;
        sendMessage(activeThreadId, draftContent);
    };

    return (
        <div className="p-4 bg-background border-t border-border shrink-0 z-10 relative">
            <div className="max-w-3xl mx-auto space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-primary">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">AI Suggested Reply</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Confidence: 94%</span>
                </div>

                <div className={cn(
                    "rounded-xl p-4 border transition-all",
                    isEditingDraft
                        ? "border-primary bg-background ring-2 ring-primary/20"
                        : "border-border bg-secondary/30"
                )}>
                    <textarea
                        value={draftContent}
                        onChange={(e) => setDraft(activeThreadId, e.target.value)}
                        onClick={() => setIsEditingDraft(true)}
                        className="w-full bg-transparent border-none focus:outline-hidden text-sm resize-none min-h-[80px]"
                        placeholder="Write your reply..."
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1.5">
                            <Clock className="w-4 h-4" /> Schedule
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1.5">
                            <Paperclip className="w-4 h-4" /> Attach
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setIsEditingDraft(!isEditingDraft)}>
                            <PenSquare className="w-4 h-4" /> Edit
                        </Button>
                        <Button
                            size="sm"
                            className="gap-1.5 bg-primary hover:bg-primary/90 text-white z-50 relative cursor-pointer"
                            onClick={handleSend}
                        >
                            <Send className="w-4 h-4" /> Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplyBox;
