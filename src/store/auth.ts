"use client";

import { create } from "zustand";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Profile } from "@/lib/types";

type AuthState = {
  user: { email?: string | null; id: string; created_at: string; user_metadata?: Record<string, unknown> } | null;
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
  loading: false,
  initialized: false,

  init: async () => {
    if (get().initialized) return;
    // Without Supabase configured, just mark as initialized with no user
    if (!isSupabaseConfigured) {
      set({ user: null, profile: null, loading: false, initialized: true });
      return;
    }
    try {
      const { createClient } = await import("@/lib/supabase/client");
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
    } catch {
      set({ user: null, profile: null, loading: false, initialized: true });
    }
  },

  signIn: async (email, password) => {
    if (!isSupabaseConfigured) {
      return { error: "Autenticação não configurada. Configure as variáveis do Supabase no .env" };
    }
    set({ loading: true });
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        set({ loading: false });
        return { error: error.message };
      }
      await get().init();
    } catch {
      set({ loading: false });
      return { error: "Erro ao conectar com o servidor de autenticação." };
    }
    set({ loading: false });
    return { error: null };
  },

  signUp: async (email, password, fullName) => {
    if (!isSupabaseConfigured) {
      return { error: "Autenticação não configurada. Configure as variáveis do Supabase no .env" };
    }
    set({ loading: true });
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) {
        set({ loading: false });
        return { error: error.message === "User already registered" ? "Este e-mail já está registrado." : error.message };
      }
    } catch {
      set({ loading: false });
      return { error: "Erro ao conectar com o servidor de autenticação." };
    }
    set({ loading: false });
    return { error: null };
  },

  signOut: async () => {
    if (!isSupabaseConfigured) {
      set({ user: null, profile: null });
      return;
    }
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
    set({ user: null, profile: null });
  },

  refreshProfile: async () => {
    const { user } = get();
    if (!user || !isSupabaseConfigured) return;
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      set({ profile: data });
    } catch {}
  },
}));