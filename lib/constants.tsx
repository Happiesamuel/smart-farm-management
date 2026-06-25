import { createHash } from "crypto";
import { ReactElement } from "react";
import { BiCategory } from "react-icons/bi";
import { FaPersonDigging } from "react-icons/fa6";
import { GiPlantRoots } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import {
  MdDeleteOutline,
  MdOutlinePendingActions,
  MdTaskAlt,
} from "react-icons/md";
import { TbMoneybag, TbMoneybagMove } from "react-icons/tb";
import { HiUserAdd } from "react-icons/hi";
export function parseInviteDetails(userDetails: string) {
  if (!userDetails) return null;

  const parts = userDetails.split("-");

  if (parts.length < 3) return null;

  const [inviteCode, userId, signature] = parts;

  // basic validation
  if (!inviteCode || !userId || !signature) return null;

  return { inviteCode, userId, signature };
}

export function generateWorkspaceMemberId(userId: string, workspaceId: string) {
  return createHash("sha1")
    .update(`${userId}-${workspaceId}`)
    .digest("hex")
    .slice(0, 36);
}
export const getSalesStats = (
  sales: { [key: string]: string | number }[],
  period: "week" | "month" | "year" = "month", // 👈 add period param
) => {
  const subLabel =
    period === "week"
      ? "This Week"
      : period === "year"
        ? "This Year"
        : "This Month";

  const totalSalesCount = sales.length;

  const totalRevenue = sales.reduce(
    (acc, s) => (acc as number) + (+s.totalAmount || 0),
    0,
  );

  const paidAmount = sales
    .filter((s) => s.status === "completed")
    .reduce((acc, s) => (acc as number) + (+s.totalAmount || 0), 0);

  const pendingAmount = totalRevenue - paidAmount;

  return [
    {
      num: totalSalesCount.toString(),
      name: "Total Sales",
      sub: subLabel,
      icon: GrMoney,
      iconColor: "bg-[#fee7e7] text-[#e82a2d] ",
      bg: "bg-[#fef5f5]",
      border: "border-red-100",
    },
    {
      num: `₦${totalRevenue.toLocaleString()}`,
      name: "Total Revenue",
      sub: subLabel,
      icon: TbMoneybag,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      border: "border-green-100",
    },
    {
      num: `₦${paidAmount.toLocaleString()}`,
      name: "Paid Amount",
      sub: subLabel,
      icon: TbMoneybagMove,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      border: "border-blue-100",
    },
    {
      num: `₦${pendingAmount.toLocaleString()}`,
      name: "Pending Amount",
      sub: subLabel,
      icon: MdOutlinePendingActions,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-orange-100",
    },
  ];
};
export const getExpenseStats = (
  expenses: { [key: string]: string | number }[],
  period: "week" | "month" | "year" = "month",
) => {
  const subLabel =
    period === "week"
      ? "This Week"
      : period === "year"
        ? "This Year"
        : "This Month";

  const totalExpenses = expenses.reduce((acc, e) => acc + (+e.amount || 0), 0);

  const totalCategories = new Set(expenses.map((e) => e.category)).size;

  const paidExpenses = expenses
    .filter((e) => e.status === "paid")
    .reduce((acc, e) => acc + (+e.amount || 0), 0);

  const pendingExpenses = totalExpenses - paidExpenses;

  return [
    {
      num: `₦${totalExpenses.toLocaleString()}`,
      name: "Total Expenses",
      sub: subLabel,
      icon: GrMoney,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      border: "border-blue-100",
    },
    {
      num: totalCategories.toString(),
      name: "Total Categories",
      sub: subLabel,
      icon: BiCategory,
      iconColor: "bg-[#f1ecfd] text-[#5837e8] ",
      bg: "bg-[#f9f7fd]",
      border: "border-purple-100",
    },
    {
      num: `₦${paidExpenses.toLocaleString()}`,
      name: "Paid Expenses",
      sub: subLabel,
      icon: TbMoneybagMove,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      border: "border-green-100",
    },
    {
      num: `₦${pendingExpenses.toLocaleString()}`,
      name: "Pending Expenses",
      sub: subLabel,
      icon: MdOutlinePendingActions,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-orange-100",
    },
  ];
};

export const activityConfig: Record<
  string,
  {
    icon: ReactElement;
    color: string;
    bg: string;
    title: string;
  }
> = {
  created: {
    icon: <GiPlantRoots />,
    color: "text-green-600",
    bg: "bg-green-100",
    title: "Created",
  },
  updated: {
    icon: <FaPersonDigging />,
    color: "text-blue-600",
    bg: "bg-blue-100",
    title: "Updated",
  },
  deleted: {
    icon: <MdDeleteOutline />,
    color: "text-red-600",
    bg: "bg-red-100",
    title: "Deleted",
  },
  assigned: {
    icon: <HiUserAdd />,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    title: "Assignment",
  },
  completed: {
    icon: <MdTaskAlt />,
    color: "text-green-600",
    bg: "bg-green-100",
    title: "Completed",
  },
};
