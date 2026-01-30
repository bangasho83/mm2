"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "mm2_user_profile";

type UserProfile = Record<string, unknown> | null;

interface UserContextValue {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(null);

  useEffect(() => {
    if (profile) return;
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      setProfileState(JSON.parse(raw));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [profile]);

  const setProfile = (value: UserProfile) => {
    setProfileState(value);
    if (typeof window === "undefined") return;
    if (value) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const ctx = useMemo(() => ({ profile, setProfile }), [profile]);

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider");
  }
  return ctx;
}
