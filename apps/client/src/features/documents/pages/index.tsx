import { useState } from 'react';
import { DocumentHeader } from '../components/DocumentHeader';
import { QuickImportCards } from '../components/QuickImportCards';
import { DocumentList } from '../components/DocumentList';
import { Dialog } from '@/shared/components/ui/dialog';
import { ImportDialog } from '../components/ImportDialog';
import type { ImportSource } from '../types';

function Documents() {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [initialSource, setInitialSource] = useState<ImportSource>('notion');

  const handleQuickImport = (source: ImportSource) => {
    setInitialSource(source);
    setShowImportDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <DocumentHeader
            showImportDialog={showImportDialog}
            setShowImportDialog={setShowImportDialog}
          />

          <QuickImportCards onImport={handleQuickImport} />

          <DocumentList onImportClick={() => setShowImportDialog(true)} />
        </div>
      </div>

      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <ImportDialog
          onClose={() => setShowImportDialog(false)}
          initialSource={initialSource}
        />
      </Dialog>
    </div>
  );
}

export default Documents;
