export type ThreadType = 'email' | 'whatsapp';
export type Classification = 'sales' | 'support' | 'personal' | 'urgent';
export type Urgency = 'high' | 'medium' | 'low';

export interface Thread {
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

export interface Message {
  id: string;
  senderId: string; // 'me' or contact/thread id
  text: string;
  timestamp: string;
  isMe: boolean;
  attachments?: { name: string; url: string; type: 'image' | 'file' }[];
}
