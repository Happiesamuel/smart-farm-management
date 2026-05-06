import { FaEllipsisV } from "react-icons/fa";

const users = [
  {
    id: "EXP-128",
    name: "John Farmer",
    email: "johnfarmer@gmail.com",
    role: "Farm Manager",
    status: "Active",
    lastActive: "May 29, 2025",
  },
  {
    id: "EXP-129",
    name: "Mary Jane",
    email: "maryjane@gmail.com",
    role: "Field Manager",
    status: "Active",
    lastActive: "May 29, 2025",
  },
  {
    id: "EXP-127",
    name: "Peter Obi",
    email: "peterobi@gmail.com",
    role: "Worker",
    status: "Active",
    lastActive: "May 30, 2025",
  },
  {
    id: "EXP-126",
    name: "Susan Green",
    email: "susangreen@gmail.com",
    role: "Acountant",
    status: "Inactive",
    lastActive: "May 20, 2025",
  },
];

const statusStyles: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
};

export default function UserTable() {
  return (
    <div className="mt-4  overflow-hidden">
      {/* Desktop Table */}
      <div className="block overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
            <tr className="text-left ">
              <th className="py-2 truncate max-w-[50px] px-2">User</th>
              <th className="py-2 truncate max-w-[50px] pl-1">Email</th>
              <th className="py-2 truncate max-w-[50px] pl-4">Role</th>
              <th className="py-2 truncate max-w-[50px] px-4">Status</th>
              <th className="py-2 truncate max-w-[50px] pl-">Last Active</th>

              <th className="py-2 truncate max-w-[50px] px-2 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td
                  title={s.name}
                  className="py-3 truncate font-medium max-w-[150px] px-2 text-[13px] text-zinc-600"
                >
                  {s.name}
                </td>

                <td
                  title={`${s.email}`}
                  className="py-3 truncate font-medium max-w-[150px] pl-1 text-[13px] text-zinc-600 flex items-center gap-2"
                >
                  {s.email}
                </td>

                <td
                  title={s.role}
                  className="py-3 truncate font-medium max-w-[150px] pl-4 pr-1 text-[13px] text-zinc-600"
                >
                  {s.role}
                </td>
                <td
                  title={s.status}
                  className="py-3 truncate font-medium max-w-[150px] pl-4 text-[13px] text-zinc-600"
                >
                  <span
                    className={`px-2 py-0.5 text-[12px] rounded-full ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </td>

                <td
                  title={s.lastActive}
                  className="py-3 truncate font-medium max-w-[150px] px-2 pr-3 text-[13px] text-zinc-600"
                >
                  {s.lastActive}
                </td>

                <td className="py-3 px-2 truncate font-medium max-w-[150px] px- text-[13px] text-zinc-600 text-right">
                  <div className="flex justify-end gap-3 text-gray-500">
                    <FaEllipsisV className="cursor-pointer hover:text-black" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
