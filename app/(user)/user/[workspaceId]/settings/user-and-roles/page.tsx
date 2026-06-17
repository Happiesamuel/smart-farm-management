import AddUserModal from "@/components/manager-settings/user-and-roles/AddUserModal";
import RolesBox from "@/components/manager-settings/user-and-roles/RolesBox";
import UserTable from "@/components/manager-settings/user-and-roles/UserTable";

export const metadata = {
  title: "Users & Roles",
};
export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Users & Roles</h6>
          <p className="text-dark/80 text-sm">
            Manage users, their roles and permission.
          </p>
        </div>
        <AddUserModal />
      </div>

      <UserTable />
      <RolesBox />
    </div>
  );
}
// http://localhost:3000/worker/join-workspace/invitecode-workerId
