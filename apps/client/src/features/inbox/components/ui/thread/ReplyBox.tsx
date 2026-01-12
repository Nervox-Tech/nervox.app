import { Button } from "@/shared/components/ui/button";
import { Sparkles, Paperclip, PenSquare, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInboxStore } from "@/features/inbox/store/useInboxStore";
import { useEffect, useRef, useState } from "react";

const ReplyBox = () => {
  const isEditingDraft = useInboxStore(s => s.isEditingDraft);
  const setIsEditingDraft = useInboxStore(s => s.setIsEditingDraft);
  const activeThreadId = useInboxStore(s => s.activeThreadId);
  const drafts = useInboxStore(s => s.drafts);
  const setDraft = useInboxStore(s => s.setDraft);
  const sendMessage = useInboxStore(s => s.sendMessage);
  const addAttachment = useInboxStore(s => s.addAttachment);
  const removeAttachment = useInboxStore(s => s.removeAttachment);

  const [isAiLoading, setIsAiLoading] = useState(false);

  const threadAttachments = useInboxStore((s) => s.attachments[s.activeThreadId]);
  const attachments = threadAttachments || [];

  const draftContent = drafts[activeThreadId] || '';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate AI loading on thread change
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // Defer the state update to avoid synchronous validation error
    const startTimer = setTimeout(() => {
      setIsAiLoading(true);
      timer = setTimeout(() => setIsAiLoading(false), 1500);
    }, 0);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [activeThreadId]);

  const handleSend = () => {
    if (!draftContent.trim() && attachments.length === 0) return;
    sendMessage(activeThreadId, draftContent);
  };

  return (
    <div className="sticky bottom-0 p-2 bg-background border-t border-border z-20 mb-16">
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-between h-5">
          {isAiLoading ? (
            <div className="flex items-center gap-2 text-sm text-primary/70 animate-in fade-in">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="font-medium">AI is analyzing conversation...</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-primary transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">AI Suggested Reply</span>
              </div>
              <span className="text-xs text-muted-foreground transition-all duration-500 animate-in fade-in">Confidence: 94%</span>
            </>
          )}
        </div>

        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-xs border"
              >
                <span className="truncate max-w-[120px]">{file.name}</span>
                <button
                  onClick={() => removeAttachment(activeThreadId, idx)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={cn(
          "rounded-xl p-4 border transition-all relative overflow-hidden",
          isEditingDraft
            ? "border-primary bg-background ring-2 ring-primary/20"
            : "border-border bg-secondary/30",
          isAiLoading && "opacity-50 pointer-events-none"
        )}>
          {isAiLoading && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
          <textarea
            value={draftContent}
            onChange={(e) => setDraft(activeThreadId, e.target.value)}
            onClick={() => setIsEditingDraft(true)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            className="w-full bg-transparent border-none focus:outline-hidden text-sm resize-none h-fit"
            placeholder="Write your reply..."
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="gap-1.5"
            >
              <Paperclip className="w-4 h-4" /> Attach
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={(e) => {
                if (e.target.files) {
                  addAttachment(activeThreadId, Array.from(e.target.files));
                }
              }}
            />
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
