import Cookies from 'js-cookie';
import type { AuthResponse, User, UserToken } from '@/shared/types/auth.types';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

export class AuthUtils {
  /**
   * Store authentication data in cookies and localStorage
   */
  static storeAuthData(authResponse: AuthResponse): void {
    // Store tokens in httpOnly-like cookies (secure in production)
    Cookies.set(TOKEN_KEY, authResponse.token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    Cookies.set(REFRESH_TOKEN_KEY, authResponse.refreshToken, {
      expires: 30, // 30 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    // Store user data in localStorage for easy access
    localStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
  }

  /**
   * Retrieve stored authentication token
   */
  static getToken(): string | null {
    return Cookies.get(TOKEN_KEY) || null;
  }

  /**
   * Retrieve stored refresh token
   */
  static getRefreshToken(): string | null {
    return Cookies.get(REFRESH_TOKEN_KEY) || null;
  }

  /**
   * Retrieve stored user data
   */
  static getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem(USER_KEY);
      if (!userData) return null;

      const user = JSON.parse(userData);
      // Convert date strings back to Date objects
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        lastLoginAt: new Date(user.lastLoginAt)
      };
    } catch (_error) {
      // console.error('Error parsing stored user data:', error);
      return null;
    }
  }

  /**
   * Clear all authentication data
   */
  static clearAuthData(): void {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Helper to decode JWT parts
   */
  private static decodeToken(token: string): UserToken | null {
    try {
      // Handle mock tokens that might just be base64 (legacy)
      if (!token.includes('.')) {
        try {
          return JSON.parse(atob(token));
        } catch {
          return null;
        }
      }

      // Handle real JWT structure
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (_e) {
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) return true;

      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (_error) {
      return true;
    }
  }

  /**
   * Validate token format and structure
   */
  static isValidToken(token: string): boolean {
    const decoded = this.decodeToken(token);
    return decoded !== null && typeof decoded === 'object';
  }

  /**
   * Extract user ID from token
   */
  static getUserIdFromToken(token: string): string | null {
    const decoded = this.decodeToken(token);
    return decoded?.userId || decoded?.sub || null;
  }

  /**
   * Check if user is authenticated based on stored data
   */
  static isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getStoredUser();

    if (!token || !user) return false;
    if (!this.isValidToken(token)) return false;
    if (this.isTokenExpired(token)) return false;

    return true;
  }

  /**
   * Generate a mock JWT token for development/testing
   */
  static generateMockToken(userId: string): string {
    const payload : UserToken = {
      userId,
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days
      iat: Math.floor(Date.now() / 1000)
    };

    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify(payload));
    const signature = "mock_signature";

    return `${header}.${body}.${signature}`;
  }
}