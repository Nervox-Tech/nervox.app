import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Mail, Upload, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/shared/stores/authStore';
import { toast } from 'sonner';
import { useTheme } from '@/shared/components/common/theme-provider';

export function ProfileForm() {
    const { user, updateUser } = useAuthStore();
    const { theme: currentTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        role: 'Product Designer', // Mock role as it's not in User type yet
    });

    // Sync theme with user preferences when theme changes
    useEffect(() => {
        if (user && user.preferences && user.preferences.theme !== currentTheme) {
            updateUser({
                preferences: {
                    ...user.preferences,
                    theme: currentTheme,
                }
            });
        }
    }, [currentTheme , user , updateUser]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 800));
            updateUser({
                name: formData.name,
                email: formData.email,
                preferences: {
                    ...user?.preferences,
                    theme: currentTheme
                }
            });
            toast.success('Profile updated successfully');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12 max-w-4xl">
            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-xl bg-secondary/30 border border-transparent focus:bg-background focus:border-primary/50 outline-none transition-all"
                    />
                </div>

                <div className="col-span-2 space-y-2">
                    <label className="text-sm font-bold text-foreground">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary/30 border border-transparent focus:bg-background focus:border-primary/50 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center bg-secondary/10 group cursor-pointer hover:bg-secondary/20 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                </div>

                <div className="col-span-2 space-y-2">
                    <label className="text-sm font-bold text-foreground">Role</label>
                    <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full p-3 rounded-xl bg-secondary/30 border border-transparent focus:bg-background focus:border-primary/50 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button variant="outline" className="rounded-xl">Cancel</Button>
                <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}
