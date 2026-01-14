import { create } from 'zustand';
import type { AuthState, User, LoginCredentials, SignupData, AuthResponse, OnboardingData } from '@/shared/types/auth.types';
import { AuthUtils } from '@/shared/utils/auth.utils';

interface AuthActions {
  // Authentication actions
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;

  // User management
  updateUser: (updates: Partial<User>) => void;

  // Onboarding
  updateOnboarding: (data: Partial<OnboardingData>) => void;
  completeOnboarding: () => void;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Initialization
  initializeAuth: () => void;
}

interface AuthStore extends AuthState, AuthActions {
  onboardingData: OnboardingData;
}

// Mock API functions (replace with real API calls)
const mockAuthAPI = {
  async login({email, password}: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (email === 'demo@example.com' && password === 'password') {
      const user: User = {
        id: '1',
        email,
        name: 'Demo User',
        avatar: undefined,
        preferences: {
          theme: 'dark',
          notifications: {
            email: true,
            push: true,
            desktop: true,
            frequency: 'immediate',
            quietHours: {
              enabled: false,
              start: '22:00',
              end: '08:00'
            }
          },
          productivity: {
            workingHours: {
              start: '09:00',
              end: '17:00'
            },
            focusMode: false,
            autoScheduling: true,
            energyTracking: true
          },
          aiAssistant: {
            enabled: true,
            suggestions: true,
            autoResponses: false,
            contextSharing: true
          }
        },
        subscription: 'free',
        createdAt: new Date(),
        lastLoginAt: new Date()
      };

      return {
        user,
        token: AuthUtils.generateMockToken(user.id),
        refreshToken: AuthUtils.generateMockToken(user.id + '_refresh')
      };
    }

    throw new Error('Invalid credentials');
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Mock validation
    if ( 
      !data?.email ||
      !data?.password ||
      !data?.name ||
      !data?.acceptTerms ||
      !data?.acceptPrivacy
    ) throw new Error('Invalid signup data');
    
    const user: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      avatar: undefined,
      preferences: {
        theme: 'auto',
        notifications: {
          email: true,
          push: true,
          desktop: true,
          frequency: 'immediate',
          quietHours: {
            enabled: false,
            start: '22:00',
            end: '08:00'
          }
        },
        productivity: {
          workingHours: {
            start: '09:00',
            end: '17:00'
          },
          focusMode: false,
          autoScheduling: true,
          energyTracking: true
        },
        aiAssistant: {
          enabled: true,
          suggestions: true,
          autoResponses: false,
          contextSharing: true
        }
      },
      subscription: 'free',
      createdAt: new Date(),
      lastLoginAt: new Date()
    };

    return {
      user,
      token: AuthUtils.generateMockToken(user.id),
      refreshToken: AuthUtils.generateMockToken(user.id + '_refresh')
    };
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock refresh logic
    const user = AuthUtils.getStoredUser();
    if (!user || !refreshToken) {
      throw new Error('Invalid refresh token');
    }

    return {
      user,
      token: AuthUtils.generateMockToken(user.id),
      refreshToken: AuthUtils.generateMockToken(user.id + '_refresh')
    };
  }
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  token: null,
  isAuthenticated: !!localStorage.getItem('user_data'),
  isLoading: false,
  error: null,
  onboardingData: {
    preferences: {},
    completedSteps: [],
    isCompleted: false
  },

  // Authentication actions
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });

    try {
      const authResponse = await mockAuthAPI.login(credentials);

      // Store authentication data
      AuthUtils.storeAuthData(authResponse);

      set({
        user: authResponse.user,
        token: authResponse.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
      throw error;
    }
  },

  signup: async (data: SignupData) => {
    set({ isLoading: true, error: null });

    try {
      const authResponse = await mockAuthAPI.signup(data);

      // Store authentication data
      AuthUtils.storeAuthData(authResponse);

      set({
        user: authResponse.user,
        token: authResponse.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        // Reset onboarding for new user
        onboardingData: {
          preferences: {},
          completedSteps: [],
          isCompleted: false
        }
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed'
      });
      throw error;
    }
  },

  logout: () => {
    AuthUtils.clearAuthData();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      onboardingData: {
        preferences: {},
        completedSteps: [],
        isCompleted: false
      }
    });
  },

  refreshToken: async () => {
    const refreshToken = AuthUtils.getRefreshToken();
    if (!refreshToken) {
      get().logout();
      return;
    }

    try {
      const authResponse = await mockAuthAPI.refreshToken(refreshToken);

      // Store new authentication data
      AuthUtils.storeAuthData(authResponse);

      set({
        user: authResponse.user,
        token: authResponse.token,
        isAuthenticated: true
      });
    } catch (_error) {
      // console.error('Token refresh failed:', error);
      get().logout();
    }
  },

  // User management
  updateUser: (updates: Partial<User>) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };

    // Update localStorage
    localStorage.setItem('user_data', JSON.stringify(updatedUser));

    set({ user: updatedUser });
  },

  // Onboarding
  updateOnboarding: (data: Partial<OnboardingData>) => {
    set(state => ({
      onboardingData: { ...state.onboardingData, ...data }
    }));
  },

  completeOnboarding: () => {
    const { onboardingData, user } = get();

    // Update user preferences with onboarding data
    if (user && onboardingData.preferences) {
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...onboardingData.preferences }
      };
      get().updateUser(updatedUser);
    }

    // Mark onboarding as completed
    set(state => ({
      onboardingData: {
        ...state.onboardingData,
        isCompleted: true
      }
    }));
  },

  // State management
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),

  // Initialization
  initializeAuth: () => {
    const token = AuthUtils.getToken();
    const user = AuthUtils.getStoredUser();

    if (token && user && AuthUtils.isAuthenticated()) {
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      // Clear any invalid stored data
      AuthUtils.clearAuthData();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }
}));
