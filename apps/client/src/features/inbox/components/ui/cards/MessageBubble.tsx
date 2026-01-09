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
                    <p className="text-sm leading-relaxed">{message.text}</p>
                </CardContent>
            </Card>
            <span className="text-[10px] text-muted-foreground px-1">{message.timestamp}</span>
        </div>
    );
};

export default MessageBubble;
