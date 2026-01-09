import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Bot, MoreHorizontal } from "lucide-react";
import { useInboxStore } from "@/features/inbox/store/useInboxStore";
import AIAnalysisCard from "../cards/AIAnalysisCard";
import MessageBubble from "../cards/MessageBubble";
import ReplyBox from "./ReplyBox";
import { useEffect, useRef } from "react";

const MessageThread = () => {
    const { getActiveThread, activeThreadId, getThreadMessages } = useInboxStore();
    const activeThread = getActiveThread();
    const messages = getThreadMessages(activeThreadId);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, activeThreadId]);

    return (
        <div className="flex-1 flex flex-col bg-secondary/20 h-full overflow-hidden">
            {/* Thread Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-border bg-background shrink-0">
                <div className="flex items-center gap-3">
                    <img src={activeThread.contact.avatar} className="w-10 h-10 rounded-full bg-secondary" alt="" />
                    <div>
                        <h2 className="font-semibold text-foreground">{activeThread.contact.name}</h2>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {activeThread.contact.role} •
                            Via {activeThread.type === 'email' ? 'Email' : 'WhatsApp'}
                            {activeThread.urgency === 'high' && (
                                <span className="text-priority-high font-medium ml-1">• Urgent</span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs gap-1 bg-primary/10 text-primary border-0">
                        <Bot className="w-3 h-3" /> AI Active
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar flex flex-col">
                <AIAnalysisCard activeThread={activeThread} />
                <div className="space-y-4 flex flex-col">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}
                </div>
            </div>

            {/* Reply Area (Fixed at bottom) */}
            <ReplyBox />
        </div>
    );
};

export default MessageThread;
