import InboxSidebar from '../components/ui/sidebar/InboxSidebar';
import { RightSidebar } from '../components/ui/sidebar/RightSidebar';
import MessageThread from '../components/ui/thread/MessageThread';

function Inbox() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - Thread List */}
        <InboxSidebar />

        {/* MAIN - Message Thread */}
        <MessageThread />

        {/* RIGHT SIDEBAR */}
        <RightSidebar />
      </div>
    </div>
  );
}

export default Inbox;