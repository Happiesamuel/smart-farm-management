import { createAdminClient } from "@/servers/appwrite";
import { appwriteConfig } from "@/servers/appwrite-client";
import { ID } from "appwrite";

export const fetchWeather = async () => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&q=Benin%20City,Nigeria&days=3&aqi=no`,
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching weather:", err);
  }
};

export async function uploadImage(file: File) {
  try {
    const { storage } = await createAdminClient();
    const uploaded = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file,
    );
    return { ...uploaded };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function formatLocation(address?: string) {
  if (!address) return "Unknown location";

  const parts = address.split(",").map((p) => p.trim());

  if (parts.length >= 3) {
    // Normal case
    return `${parts[1]}, ${parts[2]}`;
  }

  if (parts.length === 2) {
    // Short address like Abuja Mosque
    return parts[0]; // 👈 use name instead of "Nigeria"
  }

  return parts[0];
}

export function filterChartDate<
  T extends { date?: string; saleDate?: string; expenseDate?: string },
>(data: T[], type: "year" | "month") {
  const now = new Date();

  return data.filter((item) => {
    const rawDate = item.saleDate || item.date || item.expenseDate;
    if (!rawDate) return false;

    const d = new Date(rawDate);

    if (type === "year") {
      return d.getFullYear() === now.getFullYear();
    }

    if (type === "month") {
      return (
        d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
      );
    }

    return true;
  });
}

export const filterByDate = (
  data: { [key: string]: string | number }[],
  type: "week" | "month" | "year",
  dateKey: string,
) => {
  const now = new Date();

  return data.filter((item) => {
    const d = new Date(item[dateKey]);

    if (type === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return d >= oneWeekAgo;
    }

    if (type === "month") {
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }

    if (type === "year") {
      return d.getFullYear() === now.getFullYear();
    }

    return true;
  });
};

export const filterByStatDate = (
  data: { [key: string]: string | number }[],
  type: "week" | "month" | "year",
) => {
  const now = new Date();

  return data.filter((item) => {
    const rawDate = item.saleDate || item.date || item.expenseDate;
    if (!rawDate) return false;

    const d = new Date(rawDate);

    if (type === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return d >= oneWeekAgo;
    }

    if (type === "month") {
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }

    if (type === "year") {
      return d.getFullYear() === now.getFullYear();
    }

    return true;
  });
};

export const getTopCropsAllFarms = ({
  sales,
  harvests,
  crops,
}: {
  sales: { [key: string]: string | number }[];
  harvests: { [key: string]: string | number }[];
  crops: { [key: string]: string | number }[];
}) => {
  const harvestMap = new Map(harvests.map((h) => [h.$id, h]));
  const cropMap = new Map(crops.map((c) => [c.$id, c]));

  const result = Object.values(
    sales.reduce(
      (acc, sale) => {
        const harvest = harvestMap.get(sale.harvests);
        if (!harvest) return acc;

        const crop = cropMap.get(harvest.crops);
        if (!crop) return acc;

        const key = crop.cropName;

        if (!acc[key]) {
          acc[key] = { name: key as string, value: 0 };
        }

        acc[key].value += Number(sale.totalAmount || 0);

        return acc;
      },
      {} as Record<string, { name: string; value: number }>,
    ),
  )
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return result.map((r) => ({
    name: r.name,
    value: `₦${r.value.toLocaleString()}`,
  }));
};

export const getTopExpenseCategories = (
  expenses: { [key: string]: string | number }[],
) => {
  const result = Object.values(
    expenses.reduce(
      (acc, exp) => {
        const key =
          (exp.category as string)?.charAt(0).toUpperCase() +
          (exp.category as string)?.slice(1).toLowerCase();

        if (!acc[key]) {
          acc[key] = { name: key, value: 0 };
        }

        acc[key].value += Number(exp.amount || 0);

        return acc;
      },
      {} as Record<string, { name: string; value: number }>,
    ),
  )
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return result.map((r) => ({
    name: r.name,
    value: `₦${r.value.toLocaleString()}`,
  }));
};

export const getSalesPieData = ({
  sales,
  harvests,
  crops,
}: {
  sales: { [key: string]: string | number }[];
  harvests: { [key: string]: string | number }[];
  crops: { [key: string]: string | number }[];
}) => {
  const harvestMap = new Map(harvests.map((h) => [h.$id, h]));
  const cropMap = new Map(crops.map((c) => [c.$id, c]));

  const COLORS = ["#3d8d54", "#e3a133", "#5c8de2", "#ab75e0", "#808692"];

  // 🔢 aggregate revenue by crop
  const grouped = sales.reduce(
    (acc, sale) => {
      const harvest = harvestMap.get(sale.harvests);
      if (!harvest) return acc;

      const crop = cropMap.get(harvest.crops);
      if (!crop) return acc;

      const key = crop.cropName;

      if (!acc[key]) acc[key] = 0;

      acc[key] = (acc[key] as number) + Number(sale.totalAmount || 0);

      return acc;
    },
    {} as Record<string, number>,
  );

  const total = Object.values(grouped).reduce(
    (a, b) => (a as number) + (b as number),
    0,
  );

  return Object.entries(grouped).map(([key, value], index) => ({
    food: key,
    value:
      (total as number) > 0
        ? Number((((value as number) / (total as number)) * 100).toFixed(1))
        : 0,
    fill: COLORS[index % COLORS.length],
    exp: `₦${value.toLocaleString()}`,
  }));
};

export const getExpensePieData = (
  expenses: { [key: string]: string | number }[],
) => {
  const COLORS = ["#e82a2d", "#ffab07", "#5c8de2", "#ab75e0", "#808692"];

  const grouped = expenses.reduce(
    (acc, exp) => {
      const key =
        (exp.category as string)?.charAt(0).toUpperCase() +
        (exp.category as string)?.slice(1).toLowerCase();

      if (!acc[key]) acc[key] = 0;

      acc[key] = (acc[key] as number) + Number(exp.amount || 0);

      return acc;
    },
    {} as Record<string, number>,
  );

  const total = Object.values(grouped).reduce(
    (a, b) => (a as number) + (b as number),
    0,
  );

  return Object.entries(grouped).map(([key, value], index) => ({
    food: key,
    value:
      (total as number) > 0
        ? Number((((value as number) / (total as number)) * 100).toFixed(1))
        : 0,
    fill: COLORS[index % COLORS.length],
    exp: `₦${value.toLocaleString()}`,
  }));
};
export const getTotal = (data: { exp: string }[]) =>
  data.reduce((sum, d) => sum + Number(d.exp.replace(/[₦,]/g, "")), 0);

export const getProgressColor = (progress: number) => {
  if (progress <= 25) return "bg-red-500";
  if (progress <= 50) return "bg-orange-500";
  if (progress <= 75) return "bg-yellow-500";
  return "bg-green-500";
};
