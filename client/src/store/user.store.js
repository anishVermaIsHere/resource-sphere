import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

export default userStore;
