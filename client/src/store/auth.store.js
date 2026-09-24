import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      user: null,
      setUser: (user) => set(() => ({ user })),
      setAuth: (auth) =>
        set(() => ({
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        })),
      setAccessToken: (accessToken) =>
        set((state) => ({
          ...state,
          accessToken,
        })),
      setRefreshToken: (refreshToken) =>
        set((state) => ({
          ...state,
          refreshToken,
        })),
      clearAuth: () => set(() => ({ accessToken: "", refreshToken: "", user: null })),
    //   hasHydrated: false,
    //   setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "_au",
      getStorage: () => (typeof window !== "undefined" ? localStorage : undefined),
    //   onRehydrateStorage: () => (state) => {
    //     state?.setHasHydrated(true);
    //   },
    }
  )
);



export default authStore;