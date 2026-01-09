import { useState } from 'react';
import {
  Search,
  MoreHorizontal,
  Paperclip,
  Send,
  Sparkles,
  Mail,
  MessageCircle,
  CheckCircle2,
  PenSquare,
  Bot,
  Clock,
  Settings2,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Link } from 'react-router-dom';
import ROUTE_PATH from '@/shared/constant/route';

// Types
type ThreadType = 'email' | 'whatsapp';
type Classification = 'sales' | 'support' | 'personal' | 'urgent';
type Urgency = 'high' | 'medium' | 'low';

interface Thread {
  id: string;
  contact: {
    name: string;
    avatar: string;
    role: string;
  };
  type: ThreadType;
  subject?: string;
  lastMessage: string;
  time: string;
  classification: Classification;
  urgency: Urgency;
  isUnread: boolean;
  aiDraft: string;
}

// Mock Data
const threads: Thread[] = [
  {
    id: '1',
    contact: { name: 'Killan James', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', role: 'Client' },
    type: 'email',
    subject: 'Project Scope Update',
    lastMessage: 'Hi, are we still on track for the web design updates? Would love to see...',
    time: '10:12 AM',
    classification: 'sales',
    urgency: 'high',
    isUnread: true,
    aiDraft: "Hi Killan, yes we are on track! I've attached the latest design previews below. Let me know if you have any feedback before we proceed to the next phase."
  },
  {
    id: '2',
    contact: { name: 'Design Team', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Team', role: 'Internal' },
    type: 'whatsapp',
    lastMessage: 'Do you need that design asset by EOD?',
    time: 'Yesterday',
    classification: 'support',
    urgency: 'medium',
    isUnread: false,
    aiDraft: "Yes, please send it over by 5 PM. Thanks!"
  },
  {
    id: '3',
    contact: { name: 'Ahmed Medi', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed', role: 'Vendor' },
    type: 'email',
    subject: 'Invoice #4022',
    lastMessage: 'Just following up on the invoice sent last week.',
    time: '2 days ago',
    classification: 'urgent',
    urgency: 'high',
    isUnread: true,
    aiDraft: "Hi Ahmed, apologies for the delay. I've processed the payment today, you should receive it within 24 hours."
  },
];



function Inbox() {
  const [activeThreadId, setActiveThreadId] = useState<string>('1');
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [draftContent, setDraftContent] = useState('');

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  // Initialize draft when thread changes
  if (activeThread && activeThread.aiDraft !== draftContent && !isEditingDraft) {
    setDraftContent(activeThread.aiDraft);
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT SIDEBAR - Thread List */}
        <div className="w-80 border-r border-border flex flex-col bg-background hidden md:flex">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Messages</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings2 className="w-4 h-4" />
              </Button>
            </div>

            {/* WhatsApp Connect Banner */}
            <Link to={ROUTE_PATH.INBOX.WHATSAPP}>
              <button
                className="w-full p-3 rounded-xl border border-platform-whatsapp/30 bg-platform-whatsapp/5 flex items-center gap-3 hover:bg-platform-whatsapp/10 transition-colors text-left mb-4 cursor-pointer"
              >
                <div className="p-2 bg-platform-whatsapp/20 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-platform-whatsapp" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Connect WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Sync your messages</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </Link>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 rounded-xl text-sm border border-border/50 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-2 custom-scrollbar">
            {threads.map(thread => (
              <button
                key={thread.id}
                onClick={() => { setActiveThreadId(thread.id); setIsEditingDraft(false); }}
                className={cn(
                  "w-full flex flex-col gap-2 p-3 rounded-xl cursor-pointer transition-all border text-left",
                  activeThreadId === thread.id
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
                          : <MessageCircle className="w-3 h-3 text-platform-whatsapp" />
                        }
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
                    thread.classification === 'support' && "bg-status-warning/10 text-status-warning",
                  )}>
                    {thread.classification}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN - Message Thread */}
        <div className="flex-1 flex flex-col bg-secondary/20">

          {/* Thread Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-border bg-background">
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
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* AI Analysis */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">AI Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Classified as <span className="font-medium text-foreground">{activeThread.classification}</span>.
                      {activeThread.urgency === 'high' && " Response recommended today."}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">Sentiment: Positive</Badge>
                      <Badge variant="outline" className="text-xs">Topic: Update</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Message */}
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-foreground">{activeThread.contact.name}</span>
                <span className="text-xs text-muted-foreground">{activeThread.time}</span>
              </div>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-foreground leading-relaxed">{activeThread.lastMessage}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Reply Area */}
          <div className="p-4 bg-background border-t border-border">
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
                  onChange={(e) => setDraftContent(e.target.value)}
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
                  <Button size="sm" className="gap-1.5 bg-status-success hover:bg-status-success/90 text-white">
                    <Send className="w-4 h-4" /> Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-72 border-l border-border bg-background hidden xl:flex flex-col p-4">
          <h3 className="font-semibold text-sm mb-4">Context</h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">Previous</h4>
              <div className="space-y-2">
                {[
                  { text: 'Invoice #4021 Paid', time: '2 weeks ago', icon: CheckCircle2 },
                  { text: 'Project Kickoff', time: '1 month ago', icon: Mail },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <item.icon className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-foreground">{item.text}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">AI Settings</h4>
              <Card className="border-border">
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-reply</span>
                    <Badge variant="outline" className="text-xs">On</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Working hours only</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


export default Inbox;