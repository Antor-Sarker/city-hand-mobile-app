import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextValue {
  userToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

//Secure Storage Keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const segments = useSegments();
  const router = useRouter();

  // initial loging state
  useEffect(() => {
    async function loadToken(): Promise<void> {
      try {
        const token = await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
        setUserToken(token ?? null);
      } catch (error) {
        console.error(
          "[Auth] Failed to load token from secure storage:",
          error,
        );
        setUserToken(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadToken();
  }, []);

  // Protected Route Guard
  useEffect(() => {
    if (isLoading) return;

    const isProfileScreen = segments[1] === "profile";
    const isBookingTab = segments[1] === "myBooking";
    const isBookingConfirmScreen = segments[2] === "booking";
    const isAuthScreen = segments[2] === "auth";
    if(isAuthScreen) return
    
    if (!userToken && isBookingTab) {
      router.replace("/(tabs)/profile/auth");
    } else if (!userToken && isBookingConfirmScreen) {
      router.replace("/(tabs)/profile/auth");
    } else if (!userToken && isProfileScreen) {
      router.replace("/(tabs)/profile/auth");
    }
  }, [userToken, segments, isLoading, router]);

  const login = useCallback(
    async (accessToken: string, refreshToken: string): Promise<void> => {
      try {
        await Promise.all([
          SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
          SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken),
        ]);
        setUserToken(accessToken);
        router.replace("/(tabs)/profile");
      } catch (error) {
        console.error("[Auth] Failed to persist tokens:", error);
        throw new Error("Login failed: could not save credentials securely.");
      }
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
        SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
      ]);
    } catch (error) {
      console.error(
        "[Auth] Failed to clear tokens from secure storage:",
        error,
      );
    } finally {
      setUserToken(null);
    }
  }, []);

  const value: AuthContextValue = {
    userToken,
    isLoading,
    isAuthenticated: userToken !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an <AuthProvider>.");
  }

  return context;
}
