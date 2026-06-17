import { WorkspaceChecker } from "@/components/auth/JoinWorkspaceForm";
export const metadata = {
  title: "Join Workspace",
};
export default function page() {
  return (
    <div className="flex flex-col h-full py-4 gap-2">
      <WorkspaceChecker />
    </div>
  );
}
