import { create } from "zustand";

const authStore = create(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set(() => ({ user })),
      setAuth: (isAuthenticated) =>set(() => ({ isAuthenticated })),
      clearAuth: () => set(() => ({ isAuthenticated: false, user: null })),
    })
);



export default authStore;