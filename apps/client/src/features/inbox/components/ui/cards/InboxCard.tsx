import { cn } from "@/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import { Mail, MessageCircle } from "lucide-react";
import type { Thread } from "@/features/inbox/types";
import { useInboxStore } from "@/features/inbox/store/useInboxStore";

interface InboxCardProps {
  thread: Thread;
}

const InboxCard = ({ thread }: InboxCardProps) => {
  const { activeThreadId, setActiveThreadId } = useInboxStore();
  const isActive = activeThreadId === thread.id;

  return (
    <button
      onClick={() => setActiveThreadId(thread.id)}
      className={cn(
        "w-full flex flex-col gap-2 p-3 rounded-xl cursor-pointer transition-all border text-left",
        isActive
          ? "bg-secondary border-border"
          : "bg-transparent border-transparent hover:bg-secondary/50"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={thread.contact.avatar} className="w-10 h-10 rounded-full bg-secondary" alt="" />
            <div className="absolute -bottom-0.5 -right-0.5 bg-background rounded-full p-0.5">
              {thread.type === 'email'
                ? <Mail className="w-3 h-3 text-platform-email" />
                : <MessageCircle className="w-3 h-3 text-platform-whatsapp" />}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-sm text-foreground truncate">{thread.contact.name}</h3>
            <p className="text-xs text-muted-foreground">{thread.time}</p>
          </div>
        </div>
        {thread.urgency === 'high' && (
          <span className="w-2 h-2 rounded-full bg-priority-high shrink-0" />
        )}
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2">{thread.lastMessage}</p>

      <div className="flex gap-1.5">
        <Badge variant="outline" className={cn(
          "text-[10px] h-5 px-1.5 font-normal border-0",
          thread.classification === 'sales' && "bg-platform-email/10 text-platform-email",
          thread.classification === 'urgent' && "bg-priority-high/10 text-priority-high",
          thread.classification === 'support' && "bg-status-warning/10 text-status-warning"
        )}>
          {thread.classification}
        </Badge>
      </div>
    </button>
  );
};

export default InboxCard;