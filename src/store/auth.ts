"use client";

import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/lib/types";

type AuthState = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;

  init: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  initialized: false,

  init: async () => {
    if (get().initialized) return;
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      set({ user, profile, loading: false, initialized: true });
    } else {
      set({ user: null, profile: null, loading: false, initialized: true });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      if (u) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", u.id)
          .single()
          .then(({ data: profile }) => {
            set({ user: u, profile: profile ?? null, loading: false });
          });
      } else {
        set({ user: null, profile: null, loading: false });
      }
    });
  },

  signIn: async (email, password) => {
    set({ loading: true });
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      set({ loading: false });
      return { error: error.message };
    }
    await get().init();
    set({ loading: false });
    return { error: null };
  },

  signUp: async (email, password, fullName) => {
    set({ loading: true });
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) {
      set({ loading: false });
      return { error: error.message };
    }
    set({ loading: false });
    return { error: null };
  },

  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },

  refreshProfile: async () => {
    const { user } = get();
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    set({ profile: data });
  },
}));