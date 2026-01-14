import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";
import type { Message } from "@/features/inbox/types";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div className={cn("max-w-[75%] flex flex-col gap-1", message.isMe ? "ml-auto items-end" : "items-start")}>
      <Card className={cn(
        "border-none",
        message.isMe ? "bg-primary text-primary-foreground" : "bg-card"
      )}>
        <CardContent className="p-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {message.attachments.map((a, i) => (
                a.type === 'image' ? (
                  <img key={i} src={a.url} alt={a.name} className="w-32 h-32 object-cover rounded-md border" />
                ) : (
                  <div key={i} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-md border text-xs">
                    <span className="truncate max-w-[100px]">{a.name}</span>
                  </div>
                )
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <span className="text-[10px] text-muted-foreground px-1">{message.timestamp}</span>
    </div>
  );
};

export default MessageBubble;
