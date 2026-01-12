import { Button } from "@/shared/components/ui/button";
import ROUTE_PATH from "@/shared/constant/route";
import { ArrowRight, MessageSquare, Search, Settings2 } from "lucide-react";
import InboxCard from "../cards/InboxCard";
import { Link } from "react-router-dom";
import { useInboxStore } from "@/features/inbox/store/useInboxStore";

const InboxSidebar = () => {
    const threads = useInboxStore((state) => state.threads);

    return (
        <div className="h-full flex flex-col bg-background">
            <div className="p-4 space-y-4 shrink-0">
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
                        className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 rounded-xl text-sm border border-border/50 focus:outline-hidden focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-2 custom-scrollbar">
                {threads.map(thread => (
                    <InboxCard key={thread.id} thread={thread} />
                ))}
            </div>
        </div>
    );
};

export default InboxSidebar;