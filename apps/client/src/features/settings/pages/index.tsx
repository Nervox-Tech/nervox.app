import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { ProfileForm } from '../components/ProfileForm';
import { APIKeysConfig } from '../components/APIKeysConfig';
import { useAuthStore } from '@/shared/stores/authStore';

type TabType = 'Profile' | 'API KEYS';

function ProfileView() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<TabType>('Profile');

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="flex-1 p-8 grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                    <div className="bg-background rounded-3xl overflow-hidden shadow-sm border border-border/50">
                        {/* Cover Image */}
                        <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 relative">
                        </div>

                        {/* Profile Header */}
                        <div className="px-8 pb-8 relative">
                            <div className="flex items-end justify-between -mt-12 mb-6">
                                <div className="flex items-end gap-6">
                                    <div className="w-32 h-32 rounded-full border-4 border-background bg-secondary relative overflow-hidden group">
                                        <img
                                            src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`}
                                            className="w-full h-full object-cover"
                                            alt="Profile Avatar"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                            <Camera className="text-white w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex items-center gap-8 border-b border-border mb-8">
                                {(['Profile', 'API KEYS'] as TabType[]).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-blue-600' : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="mt-4">
                                {activeTab === 'Profile' ? <ProfileForm /> : <APIKeysConfig />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileView;
