export type MessageStatus = 'unread' | 'replied' | 'pending' | 'ignored';
export type Platform = 'email' | 'whatsapp';
export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'today' | 'later' | 'parked' | 'done' | string; // Allow custom statuses
export type TaskSource = 'manual' | 'email' | 'whatsapp' | 'idea';
export type EnergyLevel = 'low' | 'medium' | 'high';

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  isDefault: boolean;
}

export interface Message {
  id: string;
  sender: string;
  senderEmail?: string;
  platform: Platform;
  subject?: string;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  aiReply?: string;
}

export interface Task {
  id: string;
  displayId: string;
  title: string;
  description: string;
  status: TaskStatus;
  source: TaskSource;
  priority: Priority;
  energyLevel?: EnergyLevel;
  startDate?: Date;
  dueDate?: Date;
  tags: string[];
  aiSuggestions?: {
    priority?: Priority;
    deadline?: Date;
    subtasks?: string[];
  };
  createdAt: Date;
  projectId?: string;
}

export interface Idea {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  projectId?: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  linkedTasks: string[];
  linkedIdeas: string[];
  isAiGenerated: boolean;
  projectId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
  aiRisk?: string;
}

export interface WeeklyStats {
  tasksCompleted: number;
  tasksDelayed: number;
  avgResponseTime: number;
  focusTimeHours: number;
  insights: string[];
}

export interface AppState {
  // Navigation
  activeView: string;
  setActiveView: (view: string) => void;

  // Messages
  messages: Message[];
  selectedMessage: Message | null;
  setSelectedMessage: (message: Message | null) => void;
  updateMessageStatus: (id: string, status: MessageStatus) => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;

  // Ideas
  ideas: Idea[];
  addIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;

  // Documents
  documents: Document[];
  selectedDocument: Document | null;
  setSelectedDocument: (doc: Document | null) => void;
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;

  // Projects
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Stats
  weeklyStats: WeeklyStats;

  // Command Menu
  isCommandMenuOpen: boolean;
  setCommandMenuOpen: (isOpen: boolean) => void;
  toggleCommandMenu: () => void;

  // Dialogs
  isCreateTaskOpen: boolean;
  setCreateTaskOpen: (isOpen: boolean) => void;

  // Kanban Columns
  kanbanColumns: KanbanColumn[];
  addKanbanColumn: (column: Omit<KanbanColumn, 'id' | 'isDefault'>) => void;
  updateKanbanColumn: (id: string, updates: Partial<KanbanColumn>) => void;
  deleteKanbanColumn: (id: string) => void;
  reorderKanbanColumns: (columns: KanbanColumn[]) => void;
}
