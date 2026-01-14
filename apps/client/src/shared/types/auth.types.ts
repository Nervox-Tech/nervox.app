export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  subscription: SubscriptionTier;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationSettings;
  productivity: ProductivitySettings;
  aiAssistant: AISettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  desktop: boolean;
  frequency: 'immediate' | 'hourly' | 'daily';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface ProductivitySettings {
  workingHours: {
    start: string;
    end: string;
  };
  focusMode: boolean;
  autoScheduling: boolean;
  energyTracking: boolean;
}

export interface AISettings {
  enabled: boolean;
  suggestions: boolean;
  autoResponses: boolean;
  contextSharing: boolean;
}

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface OnboardingData {
  preferences: Partial<UserPreferences>;
  completedSteps: string[];
  isCompleted: boolean;
}

export interface UserToken {
  userId: string;
  sub?: string;
  exp: number;
  iat: number;
}
