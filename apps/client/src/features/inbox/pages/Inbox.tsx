import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Smartphone,
  Shield,
  ArrowRight,
  QrCode,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { TopBar } from '@/shared/layout/NavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

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

// WhatsApp Setup Component
function WhatsAppSetup({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  
  const steps = [
    { num: 1, title: 'Connect', desc: 'Link your WhatsApp' },
    { num: 2, title: 'Verify', desc: 'Scan QR code' },
    { num: 3, title: 'Configure', desc: 'Set preferences' },
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center pb-2">
        <div className="w-16 h-16 rounded-2xl bg-platform-whatsapp/10 flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-platform-whatsapp" />
        </div>
        <CardTitle className="text-xl">Connect WhatsApp</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Sync your WhatsApp messages to manage conversations with AI
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                step >= s.num 
                  ? "bg-platform-whatsapp text-white" 
                  : "bg-secondary text-muted-foreground"
              )}>
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  "w-12 h-0.5 mx-1",
                  step > s.num ? "bg-platform-whatsapp" : "bg-border"
                )} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-border bg-secondary/30 flex items-start gap-3">
                <Shield className="w-5 h-5 text-platform-whatsapp shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">End-to-end Encrypted</p>
                  <p className="text-xs text-muted-foreground">Your messages stay private</p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-secondary/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">AI-Powered Replies</p>
                  <p className="text-xs text-muted-foreground">Smart response suggestions</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <h4 className="text-sm font-medium mb-2">What you'll get:</h4>
              <ul className="space-y-2">
                {[
                  'View all WhatsApp messages in one place',
                  'AI-generated reply suggestions',
                  'Convert messages to tasks instantly',
                  'Auto-organize by priority and sender',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-platform-whatsapp" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              className="w-full gap-2 bg-platform-whatsapp hover:bg-platform-whatsapp/90" 
              onClick={() => setStep(2)}
            >
              <Smartphone className="w-4 h-4" />
              Connect WhatsApp
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Open WhatsApp on your phone and scan this QR code
              </p>
              
              {/* Mock QR Code */}
              <div className="w-48 h-48 mx-auto bg-white rounded-2xl p-4 border border-border flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-500" />
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Go to WhatsApp → Settings → Linked Devices → Link a Device
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1 gap-2 bg-platform-whatsapp hover:bg-platform-whatsapp/90" onClick={() => setStep(3)}>
                I've Scanned
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-platform-whatsapp/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-platform-whatsapp" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Connected!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your WhatsApp is now linked to your inbox
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                <span className="text-sm text-foreground">Enable AI suggestions</span>
                <div className="w-10 h-6 bg-platform-whatsapp rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                <span className="text-sm text-foreground">Auto-categorize messages</span>
                <div className="w-10 h-6 bg-platform-whatsapp rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={onComplete}>
              Start Using Inbox
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function Inbox() {
  const [activeThreadId, setActiveThreadId] = useState<string>('1');
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [draftContent, setDraftContent] = useState('');
  const [showWhatsAppSetup, setShowWhatsAppSetup] = useState(false);
  const [whatsAppConnected, setWhatsAppConnected] = useState(false);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  // Initialize draft when thread changes
  if (activeThread && activeThread.aiDraft !== draftContent && !isEditingDraft) {
    setDraftContent(activeThread.aiDraft);
  }

  if (showWhatsAppSetup) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <TopBar title="Inbox" />
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <WhatsAppSetup onComplete={() => {
            setWhatsAppConnected(true);
            setShowWhatsAppSetup(false);
          }} />
        </div>
      </div>
    );
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
            {!whatsAppConnected && (
              <button
                onClick={() => setShowWhatsAppSetup(true)}
                className="w-full p-3 rounded-xl border border-platform-whatsapp/30 bg-platform-whatsapp/5 flex items-center gap-3 hover:bg-platform-whatsapp/10 transition-colors text-left"
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
            )}

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 rounded-xl text-sm border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                  className="w-full bg-transparent border-none focus:outline-none text-sm resize-none min-h-[80px]"
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