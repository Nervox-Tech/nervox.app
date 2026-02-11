import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Key, Trash2, Plus, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/shared/stores/authStore';
import { toast } from 'sonner';

export function APIKeysConfig() {
    const { user, addAPIKey, deleteAPIKey } = useAuthStore();
    const [newKeyName, setNewKeyName] = useState('');
    const [newKeyValue, setNewKeyValue] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

    const handleAddKey = () => {
        if (!newKeyName || !newKeyValue) {
            toast.error('Please provide both name and key');
            return;
        }
        addAPIKey({
            name: newKeyName,
            key: newKeyValue,
            provider: 'openrouter',
        });
        setNewKeyName('');
        setNewKeyValue('');
        toast.success('API key added successfully');
    };

    const handleCopy = (id: string, key: string) => {
        navigator.clipboard.writeText(key);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        toast.success('Key copied to clipboard');
    };

    const toggleVisibility = (id: string) => {
        setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const maskKey = (key: string) => {
        return `${key.slice(0, 4)}...${key.slice(-4)}`;
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="bg-secondary/20 p-6 rounded-2xl border border-border/50">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-600" />
                    Add New API Key
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Key Name (e.g., Personal, Team)</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                            className="w-full p-3 rounded-xl bg-background border border-border focus:border-primary/50 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">OpenRouter API Key</label>
                        <input
                            type="password"
                            placeholder="sk-or-v1-..."
                            value={newKeyValue}
                            onChange={(e) => setNewKeyValue(e.target.value)}
                            className="w-full p-3 rounded-xl bg-background border border-border focus:border-primary/50 outline-none transition-all"
                        />
                    </div>
                </div>
                <Button onClick={handleAddKey} className="mt-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto">
                    Add API Key
                </Button>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Key className="w-5 h-5 text-blue-600" />
                    Your API Keys
                </h3>
                {user?.apiKeys && user.apiKeys.length > 0 ? (
                    <div className="grid gap-3">
                        {user.apiKeys.map((apiKey) => (
                            <div key={apiKey.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/10 border border-border/50 group hover:border-blue-500/30 transition-all">
                                <div className="flex flex-col">
                                    <span className="font-bold text-foreground">{apiKey.name}</span>
                                    <span className="text-sm font-mono text-muted-foreground">
                                        {visibleKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => toggleVisibility(apiKey.id)} className="h-8 w-8 rounded-lg hover:bg-secondary/40">
                                        {visibleKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleCopy(apiKey.id, apiKey.key)} className="h-8 w-8 rounded-lg hover:bg-secondary/40">
                                        {copiedId === apiKey.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => deleteAPIKey(apiKey.id)} className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-500/10 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-12 rounded-2xl border-2 border-dashed border-border bg-secondary/5">
                        <p className="text-muted-foreground">No API keys added yet. Add one above to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
