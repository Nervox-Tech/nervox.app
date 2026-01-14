import { create } from 'zustand';
import type { AppState, Document, Idea, KanbanColumn, Message, Project, Task, WeeklyStats, Priority } from '../types';
// Mock data
const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Chen',
    senderEmail: 'sarah.chen@company.com',
    platform: 'email',
    subject: 'Q4 Planning - Need your input',
    content: 'Hi! I wanted to follow up on the Q4 planning session. Could you share your thoughts on the proposed timeline for the new feature rollout? The team is waiting for your input before we finalize the roadmap.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'unread',
    aiReply: 'Hi Sarah,\n\nThank you for reaching out about the Q4 planning. I\'ve reviewed the proposed timeline and have a few thoughts:\n\n1. The feature rollout timeline looks ambitious but achievable\n2. I suggest we add a buffer week between phases\n3. Let\'s schedule a quick sync to discuss dependencies\n\nBest regards'
  },
  {
    id: '2',
    sender: 'Alex Rodriguez',
    platform: 'whatsapp',
    content: 'Hey! Quick question - did you get a chance to review the design mockups I sent yesterday? Client is asking for feedback by EOD.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'unread',
    aiReply: 'Hey Alex! Yes, I reviewed the mockups. Overall looking great! A few notes:\n\n• Love the new navigation layout\n• The color scheme aligns well with brand\n• Suggest increasing CTA button contrast\n\nI\'ll send detailed feedback within the hour.'
  },
  {
    id: '3',
    sender: 'Marketing Team',
    senderEmail: 'marketing@company.com',
    platform: 'email',
    subject: 'Campaign Performance Report - Week 47',
    content: 'Please find attached the weekly campaign performance report. Key highlights: 15% increase in engagement, 8% growth in conversions. Action items need your approval.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    status: 'pending'
  },
  {
    id: '4',
    sender: 'David Kim',
    platform: 'whatsapp',
    content: 'Lunch tomorrow? That new place on 5th opened up. Heard great things about their ramen! 🍜',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: 'replied'
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    displayId: 'TSK-1',
    title: 'Review Q4 roadmap proposal',
    description: 'Go through the proposed Q4 roadmap and provide feedback on timeline and resource allocation.',
    status: 'today',
    source: 'email',
    priority: 'high',
    energyLevel: 'high',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    tags: ['planning', 'q4'],
    aiSuggestions: {
      priority: 'high',
      subtasks: ['Review timeline', 'Check resource availability', 'Identify dependencies']
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: '2',
    displayId: 'TSK-2',
    title: 'Prepare presentation slides',
    description: 'Create slides for the upcoming stakeholder meeting.',
    status: 'today',
    source: 'manual',
    priority: 'medium',
    energyLevel: 'medium',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    tags: ['presentation', 'stakeholders'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
  },
  {
    id: '3',
    displayId: 'TSK-3',
    title: 'Update project documentation',
    description: 'Refresh the project documentation with latest changes and decisions.',
    status: 'parked',
    source: 'manual',
    priority: 'low',
    energyLevel: 'low',
    tags: ['documentation'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72)
  },
  {
    id: '4',
    displayId: 'TSK-4',
    title: 'Review design mockups',
    description: 'Provide feedback on the latest design mockups from Alex.',
    status: 'parked',
    source: 'whatsapp',
    priority: 'high',
    energyLevel: 'medium',
    dueDate: new Date(),
    tags: ['design', 'feedback'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: '5',
    displayId: 'TSK-5',
    title: 'Weekly team sync',
    description: 'Prepare agenda and lead the weekly team synchronization meeting.',
    status: 'done',
    source: 'manual',
    priority: 'medium',
    energyLevel: 'high',
    tags: ['meetings', 'team'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
  }
];

const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'Automated reporting dashboard',
    content: 'Build a dashboard that automatically pulls data from various sources and generates weekly reports. Could save 3-4 hours per week.',
    tags: ['automation', 'productivity'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  },
  {
    id: '2',
    title: 'Customer feedback loop improvement',
    content: 'Create a more structured way to collect and analyze customer feedback. Integrate with existing CRM and create actionable insights.',
    tags: ['customer', 'feedback', 'process'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
  },
  {
    id: '3',
    title: 'AI-powered email categorization',
    content: 'Use AI to automatically categorize incoming emails and suggest priority levels. Could integrate with existing workflow.',
    tags: ['ai', 'email', 'automation'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
  }
];

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Q4 Planning Strategy',
    content: '# Q4 Planning Strategy\n\n## Overview\nThis document outlines the strategic priorities for Q4...\n\n## Key Objectives\n1. Launch new feature set\n2. Improve customer retention\n3. Optimize operations\n\n## Timeline\n- Week 1-2: Planning and resource allocation\n- Week 3-6: Development phase\n- Week 7-8: Testing and QA\n- Week 9-10: Staged rollout',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    linkedTasks: ['1'],
    linkedIdeas: [],
    isAiGenerated: false
  },
  {
    id: '2',
    title: 'Weekly Report Template',
    content: 'Weekly Report\n\nCompleted Tasks\n- Task 1\n- Task 2\n\nIn Progress\n- Current work items\n\nBlockers\n- Any blockers or issues\n\nNext Week\n- Planned tasks',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    linkedTasks: [],
    linkedIdeas: [],
    isAiGenerated: true
  }
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Q4 Product Launch',
    description: 'Main project for Q4 product launch including all related tasks and documentation.',
    color: '#8B5CF6',
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60), // 60 days from now
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    aiRisk: 'Timeline at risk due to pending design approval'
  },
  {
    id: '2',
    name: 'Process Improvement',
    description: 'Ongoing initiative to improve internal processes and workflows.',
    color: '#10B981',
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), // 60 days ago
    endDate: undefined, // Ongoing project
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    aiRisk: 'Low activity in last 7 days'
  }
];

const mockStats: WeeklyStats = {
  tasksCompleted: 12,
  tasksDelayed: 2,
  avgResponseTime: 2.4,
  focusTimeHours: 28,
  insights: [
    'You completed 20% more tasks this week compared to last week',
    'Email response time improved by 15 minutes on average',
    'Most productive hours: 9-11 AM and 2-4 PM',
    'Consider batching similar tasks to improve focus time'
  ]
};

// Default kanban columns to match existing task statuses
const defaultKanbanColumns: KanbanColumn[] = [
  {
    id: 'today',
    title: 'Today',
    color: 'text-blue-600',
    isDefault: true
  },
  {
    id: 'later',
    title: 'Later',
    color: 'text-orange-600',
    isDefault: true
  },
  {
    id: 'parked',
    title: 'Parked',
    color: 'text-gray-600',
    isDefault: true
  },
  {
    id: 'done',
    title: 'Done',
    color: 'text-green-600',
    isDefault: true
  }
];

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  activeView: 'dashboard',
  setActiveView: (view) => set({ activeView: view }),

  // Messages
  messages: mockMessages,
  selectedMessage: null,
  setSelectedMessage: (message) => set({ selectedMessage: message }),
  updateMessageStatus: (id, status) => set((state) => ({
    messages: state.messages.map((m) => m.id === id ? { ...m, status } : m)
  })),

  // Tasks
  tasks: mockTasks,
  addTask: (task) => set((state) => {
    // Auto-calculate priority based on due date
    let priority: Priority = 'low';
    if (task.dueDate) {
      const now = new Date();
      const diffTime = new Date(task.dueDate).getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 3) priority = 'high';
      else if (diffDays <= 7) priority = 'medium';
    }

    const newTask = {
      ...task,
      priority, // Override any passed priority
      id: crypto.randomUUID(),
      displayId: `TSK-${state.tasks.length + 1}`,
      createdAt: new Date()
    };

    return {
      tasks: [...state.tasks, newTask]
    };
  }),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t)
  })),
  moveTask: (id, status) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, status } : t)
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id)
  })),

  // Ideas
  ideas: mockIdeas,
  addIdea: (idea) => set((state) => ({
    ideas: [...state.ideas, { ...idea, id: crypto.randomUUID(), createdAt: new Date() }]
  })),

  // Documents
  documents: mockDocuments,
  selectedDocument: null,
  setSelectedDocument: (doc) => set({ selectedDocument: doc }),
  addDocument: (doc) => set((state) => ({
    documents: [...state.documents, {
      ...doc,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]
  })),
  updateDocument: (id, updates) => set((state) => ({
    documents: state.documents.map((d) => d.id === id ? { ...d, ...updates, updatedAt: new Date() } : d)
  })),

  // Projects
  projects: mockProjects,
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  addProject: (project) => {
    const newProject = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };

    set((state) => ({
      projects: [...state.projects, newProject]
    }));

    return newProject.id;
  },
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map((p) => p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p)
  })),
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter(p => p.id !== id)
  })),

  // Stats
  weeklyStats: mockStats,

  // Command Menu
  isCommandMenuOpen: false,
  setCommandMenuOpen: (isOpen) => set({ isCommandMenuOpen: isOpen }),
  toggleCommandMenu: () => set((state) => ({ isCommandMenuOpen: !state.isCommandMenuOpen })),

  // Dialogs
  isCreateTaskOpen: false,
  setCreateTaskOpen: (isOpen) => set({ isCreateTaskOpen: isOpen }),

  // Kanban Columns
  kanbanColumns: defaultKanbanColumns,
  addKanbanColumn: (column) => set((state) => ({
    kanbanColumns: [...state.kanbanColumns, {
      ...column,
      id: column.title.toLowerCase().replace(/\s+/g, '-'),
      isDefault: false
    }]
  })),
  updateKanbanColumn: (id, updates) => set((state) => ({
    kanbanColumns: state.kanbanColumns.map((c) => c.id === id ? { ...c, ...updates } : c)
  })),
  deleteKanbanColumn: (id) => set((state) => ({
    kanbanColumns: state.kanbanColumns.filter(c => c.id !== id)
  })),
  reorderKanbanColumns: (columns) => set({ kanbanColumns: columns })
}));