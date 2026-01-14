import { create } from 'zustand';
import type { Thread, Message } from '../types/index';

interface InboxState {
  threads: Thread[];
  activeThreadId: string;
  isEditingDraft: boolean;
  drafts: Record<string, string>;
  messages: Record<string, Message[]>;
  attachments: Record<string, File[]>;

  setActiveThreadId: (id: string) => void;
  setIsEditingDraft: (isEditing: boolean) => void;
  setDraft: (threadId: string, content: string) => void;
  sendMessage: (threadId: string, text: string) => void;
  getActiveThread: () => Thread;
  getThreadMessages: (threadId: string) => Message[];
  addAttachment: (threadId: string, files: File[]) => void;
  removeAttachment: (threadId: string, index: number) => void;
  mobileView: 'list' | 'thread';
  setMobileView: (view: 'list' | 'thread') => void;
}

// Mock Data
const MOCK_THREADS: Thread[] = [
  {
    id: '1',
    contact: {
      name: 'Killan James',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      role: 'Client',
    },
    type: 'email',
    subject: 'Project Scope Update',
    lastMessage: 'Hi, are we still on track for the web design updates? Would love to see...',
    time: '10:12 AM',
    classification: 'sales',
    urgency: 'high',
    isUnread: true,
    aiDraft:
      "Hi Killan, yes we are on track! I've attached the latest design previews below. Let me know if you have any feedback before we proceed to the next phase.",
  },
  {
    id: '2',
    contact: {
      name: 'Design Team',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Team',
      role: 'Internal',
    },
    type: 'whatsapp',
    lastMessage: 'Do you need that design asset by EOD?',
    time: 'Yesterday',
    classification: 'support',
    urgency: 'medium',
    isUnread: false,
    aiDraft: 'Yes, please send it over by 5 PM. Thanks!',
  },
  {
    id: '3',
    contact: {
      name: 'Ahmed Medi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      role: 'Vendor',
    },
    type: 'email',
    subject: 'Invoice #4022',
    lastMessage: 'Just following up on the invoice sent last week.',
    time: '2 days ago',
    classification: 'urgent',
    urgency: 'high',
    isUnread: true,
    aiDraft:
      "Hi Ahmed, apologies for the delay. I've processed the payment today, you should receive it within 24 hours.",
  },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      senderId: '1',
      text: 'Hi, are we still on track for the web design updates?',
      timestamp: '10:00 AM',
      isMe: false,
    },
    {
      id: 'm2',
      senderId: '1',
      text: 'Would love to see the progress.',
      timestamp: '10:05 AM',
      isMe: false,
    },
  ],
  '2': [
    {
      id: 'm3',
      senderId: '2',
      text: 'Do you need that design asset by EOD?',
      timestamp: 'Yesterday',
      isMe: false,
    },
  ],
  '3': [
    {
      id: 'm4',
      senderId: '3',
      text: 'Just following up on the invoice sent last week.',
      timestamp: '2 days ago',
      isMe: false,
    },
  ],
};

export const useInboxStore = create<InboxState>((set, get) => ({
  threads: MOCK_THREADS,
  activeThreadId: '1',
  isEditingDraft: false,
  drafts: {},
  messages: INITIAL_MESSAGES,
  attachments: {},

  mobileView: 'list' as 'list' | 'thread',

  setMobileView: (view: 'list' | 'thread') => set({ mobileView: view }),

  setActiveThreadId: (id) =>
    set({ activeThreadId: id, isEditingDraft: false, mobileView: 'thread' }),
  setIsEditingDraft: (isEditing) => set({ isEditingDraft: isEditing }),

  setDraft: (threadId, content) =>
    set((state) => ({
      drafts: { ...state.drafts, [threadId]: content },
    })),

  sendMessage: (threadId, text) =>
    set((state) => {
      // Process attachments
      const pendingFiles = state.attachments[threadId] || [];
      const processedAttachments = pendingFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: (file.type.startsWith('image/') ? 'image' : 'file') as 'image' | 'file',
      }));

      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        attachments: processedAttachments,
      };

      const threadMessages = state.messages[threadId] || [];

      return {
        messages: { ...state.messages, [threadId]: [...threadMessages, newMessage] },
        drafts: { ...state.drafts, [threadId]: '' }, // Clear draft
        attachments: { ...state.attachments, [threadId]: [] }, // Clear attachments
        isEditingDraft: false,
      };
    }),

  getActiveThread: () => {
    const { threads, activeThreadId } = get();
    return threads.find((t) => t.id === activeThreadId) || threads[0];
  },

  getThreadMessages: (threadId) => {
    const { messages } = get();
    return messages[threadId] || [];
  },

  addAttachment: (threadId, files) =>
    set((state) => ({
      attachments: {
        ...state.attachments,
        [threadId]: [...(state.attachments[threadId] || []), ...files],
      },
    })),

  removeAttachment: (threadId, index) =>
    set((state) => ({
      attachments: {
        ...state.attachments,
        [threadId]: state.attachments[threadId].filter((_, i) => i !== index),
      },
    })),
}));
