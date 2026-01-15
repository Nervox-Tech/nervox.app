import { useState } from 'react';
import {
  Folder as FolderIcon,
  Plus,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import type { DocumentSource, Folder, FileData } from '../types';
import { AIInsights } from '../components/AIInsights';
import { SpaceGrid } from '../components/SpaceGrid';
import { DocumentTable } from '../components/DocumentTable';
import { CreateDocumentDialog } from '../components/CreateDocumentDialog';
import { CreateFolderForm } from '../components/CreateFolderForm';

// Initial mock folders
const initialFolders: Folder[] = [
  { id: 1, name: 'Project Ideas', files: 5, color: 'bg-blue-500', icon: FolderIcon, members: [1, 2, 3] },
  { id: 2, name: 'Roadmap 2024', files: 12, color: 'bg-purple-500', icon: FolderIcon, members: [4, 5] },
  { id: 3, name: 'Marketing Assets', files: 8, color: 'bg-orange-500', icon: FolderIcon, members: [1] },
];

const recentFiles: FileData[] = [
  { id: 1, name: 'Proposal.docx', size: '2.9 MB', date: 'Feb 25, 2022', icon: FileText, color: 'text-blue-500' },
  { id: 2, name: 'Background.jpg', size: '3.5 MB', date: 'Feb 24, 2022', icon: ImageIcon, color: 'text-blue-400' },
  { id: 3, name: 'Apex website.fig', size: '23.5 MB', date: 'Feb 22, 2022', icon: FileText, color: 'text-purple-500' },
  { id: 4, name: 'Illustration.ai', size: '7.2 MB', date: 'Feb 20, 2022', icon: ImageIcon, color: 'text-orange-500' },
];

function Documents() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showDocumentOptions, setShowDocumentOptions] = useState(false);
  const [selectedDocSource, setSelectedDocSource] = useState<DocumentSource>(null);
  const [externalLink, setExternalLink] = useState('');

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: Folder = {
      id: Date.now(),
      name: newFolderName,
      files: 0,
      color: 'bg-blue-500',
      icon: FolderIcon,
      members: [1]
    };

    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsCreatingFolder(false);
  };

  const handleExternalLinkSubmit = () => {
    if (externalLink.trim()) {
      setExternalLink('');
      setSelectedDocSource(null);
      setShowDocumentOptions(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 p-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 flex flex-col gap-8">

          {/* Header Controls */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Files</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCreatingFolder(true)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-colors border border-border"
              >
                <Plus className="w-4 h-4" /> Create Folder
              </button>
              <button
                onClick={() => setShowDocumentOptions(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <FileText className="w-4 h-4" /> New Document
              </button>
            </div>
          </div>

          <CreateDocumentDialog
            open={showDocumentOptions}
            onOpenChange={setShowDocumentOptions}
            selectedDocSource={selectedDocSource}
            onSourceSelect={setSelectedDocSource}
            externalLink={externalLink}
            onExternalLinkChange={setExternalLink}
            onExternalLinkSubmit={handleExternalLinkSubmit}
            onEditorOpen={() => { }}
          />

          <CreateFolderForm
            isVisible={isCreatingFolder}
            folderName={newFolderName}
            onFolderNameChange={setNewFolderName}
            onCancel={() => setIsCreatingFolder(false)}
            onSubmit={handleCreateFolder}
          />

          <AIInsights />

          <SpaceGrid
            folders={folders}
            onCreateFolder={() => setIsCreatingFolder(true)}
          />

          <DocumentTable files={recentFiles} />

        </div>
      </div>
    </div>
  );
}

export default Documents;
