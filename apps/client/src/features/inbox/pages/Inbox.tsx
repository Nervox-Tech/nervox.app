import InboxSidebar from '../components/ui/sidebar/InboxSidebar';
// import { RightSidebar } from '../components/ui/sidebar/RightSidebar';
import MessageThread from '../components/ui/thread/MessageThread';
import { useInboxStore } from '../store/useInboxStore';
import { cn } from '@/lib/utils';

function Inbox() {
  const mobileView = useInboxStore(s => s.mobileView);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - Thread List */}
        <div className={cn(
          "w-full md:w-80 border-r border-border bg-background transition-all h-full font-sans flex flex-col shrink-0",
          mobileView === 'list' ? 'flex' : 'hidden md:flex'
        )}>
          <InboxSidebar />
        </div>

        {/* MAIN - Message Thread */}
        <div className={cn(
          "flex-1 flex-col bg-secondary/20 w-full h-full transition-all font-sans min-w-0",
          mobileView === 'thread' ? 'flex' : 'hidden md:flex'
        )}>
          <MessageThread />
        </div>

        {/* RIGHT SIDEBAR */}
        {/*<RightSidebar />*/}
      </div>
    </div>
  );
}

export default Inbox;