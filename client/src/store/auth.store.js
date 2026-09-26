import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set(() => ({ user })),
      setAuth: (isAuthenticated) =>set(() => ({ isAuthenticated })),
      clearAuth: () => set(() => ({ isAuthenticated: false, user: null })),
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