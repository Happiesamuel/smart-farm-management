import { UserObjId, WorkspaceObjId } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type AppState = {
  currentUser: UserObjId | null;
  activeWorkspace: WorkspaceObjId | null;
  role: string | null;
  setUser: (user: UserObjId | null) => void;
  setWorkspace: (workspace: WorkspaceObjId | null) => void;
  setRole: (role: string | null) => void;
  clearAll: () => void;
};
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      activeWorkspace: null,
      role: null,

      setRole: (role) => set({ role }),
      setUser: (user: UserObjId | null) => set({ currentUser: user }),

      setWorkspace: (workspace: WorkspaceObjId | null) =>
        set({ activeWorkspace: workspace }),

      clearAll: () =>
        set({
          currentUser: null,
          activeWorkspace: null,
          role: null,
        }),
    }),
    {
      name: "app-storage",
      partialize: (state: AppState) => ({
        activeWorkspace: state.activeWorkspace,
        role: state.role,
      }),
    },
  ),
);

export function useApp() {
  const user = useAppStore((s) => s.currentUser);
  const workspace = useAppStore((s) => s.activeWorkspace);
  const setUser = useAppStore((s) => s.setUser);
  const role = useAppStore((s) => s.role);
  const setRole = useAppStore((s) => s.setRole);
  const setWorkspace = useAppStore((s) => s.setWorkspace);
  const clearAll = useAppStore((s) => s.clearAll);
  return { user, workspace, setUser, setWorkspace, clearAll, role, setRole };
}
