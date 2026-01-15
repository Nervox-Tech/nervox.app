import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft, Bot, Mail, MoreHorizontal, Trash2 } from 'lucide-react';
import { useInboxStore } from '@/features/inbox/store/useInboxStore';
import AIAnalysisCard from '../cards/AIAnalysisCard';
import MessageBubble from '../cards/MessageBubble';
import ReplyBox from './ReplyBox';
import { useEffect, useRef, useMemo } from 'react';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/components/ui/dropdown-menu';

const MessageThread = () => {
  const activeThreadId = useInboxStore((state) => state.activeThreadId);
  const threads = useInboxStore((state) => state.threads);
  const storeMessages = useInboxStore((state) => state.messages[state.activeThreadId]);

  // Memoize messages to prevent useEffect processing on every render due to new array reference
  const messages = useMemo(() => storeMessages || [], [storeMessages]);

  const setMobileView = useInboxStore((state) => state.setMobileView);

  // Get active thread from threads array
  const activeThread = threads.find((thread) => thread.id === activeThreadId);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeThreadId]);

  if (!activeThread) return <div className="flex-1 bg-background" />;

  return (
    <div className="flex-1 flex flex-col bg-secondary/20 h-full overflow-hidden">
      {/* Thread Header */}
      <div className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-border bg-background shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden -ml-2"
            onClick={() => setMobileView('list')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img
            src={activeThread.contact.avatar}
            className="w-10 h-10 rounded-full bg-secondary"
            alt=""
          />
          <div>
            <h2 className="font-semibold text-foreground text-sm md:text-base">
              {activeThread.contact.name}
            </h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {activeThread.contact.role} • Via{' '}
              {activeThread.type === 'email' ? 'Email' : 'WhatsApp'}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Mail className="w-4 h-4 mr-2" />
                Mark as Unread
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar flex flex-col"
      >
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
