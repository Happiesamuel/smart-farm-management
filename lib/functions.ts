import { createAdminClient } from "@/servers/appwrite";
import { appwriteConfig } from "@/servers/appwrite-client";
import { ID } from "appwrite";

export const fetchWeather = async (lat: number, lng: number) => {
  if (!lat || !lng) return null;

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&q=${lat},${lng}&days=3&aqi=no`,
    );

    if (!res.ok) throw new Error("Failed to fetch weather");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching weather:", err);
    return null;
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
    return { $id: uploaded.$id };
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

export const getGrowthStageData = (
  crops: { [key: string]: string | number }[],
) => {
  const map = new Map<string, { count: number; area: number }>();

  crops.forEach((crop) => {
    const stage = crop.growthStage || "unknown";
    const area = Number(crop.areaPlanted || 0);

    if (!map.has(stage as string)) {
      map.set(stage as string, { count: 0, area: 0 });
    }

    const current = map.get(stage as string)!;
    current.count += 1;
    current.area += area;
  });

  const COLORS: Record<string, string> = {
    seedling: "#22c55e",
    vegetative: "#4ade80",
    flowering: "#3b82f6",
    fruiting: "#f59e0b",
    harvesting: "#ef4444",
    unknown: "#6b7280",
  };

  return Array.from(map.entries()).map(([stage, data]) => ({
    food: stage,
    value: data.count,
    area: `${data.area}ac`,
    fill: COLORS[stage] || COLORS.unknown,
  }));
};

export function generateColors(count: number): string[] {
  const base = [
    "#03732b",
    "#4e8afd",
    "#fcb304",
    "#e45551",
    "#bfbfc0",
    "#ab75e0",
    "#ff8c42",
    "#00bcd4",
    "#e91e8c",
    "#8bc34a",
  ];

  if (count <= base.length) return base.slice(0, count);

  // generate extra colors by rotating hue
  const extras: string[] = [];
  for (let i = base.length; i < count; i++) {
    const hue = (i * 137.508) % 360; // golden angle — avoids similar adjacent colors
    extras.push(`hsl(${hue}, 65%, 50%)`);
  }

  return [...base, ...extras];
}

export function buildCropPieData(crops: { [key: string]: string | number }[]) {
  const map = new Map<string, number>();

  crops.forEach((crop) => {
    const name = crop.cropName || "Unknown";
    const area = Number(crop.areaPlanted || 0);
    map.set(name as string, (map.get(name as string) || 0) + area);
  });

  const total = Array.from(map.values()).reduce((a, b) => a + b, 0);
  const colors = generateColors(map.size); // 👈 generates exactly as many as needed

  const result = Array.from(map.entries())
    .map(([name, area], i) => ({
      food: name,
      value: total > 0 ? Math.round((area / total) * 100) : 0,
      fill: colors[i],
      area: `${area}ac`,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return { data: result, total };
}

export function toAcres(area: number, unit: string): number {
  switch (unit?.toLowerCase()) {
    case "hectares":
    case "hectare":
      return area * 2.47105;
    case "acres":
    case "acre":
      return area;
    case "square meters":
    case "square_meters":
    case "sqm":
    case "m2":
      return area * 0.000247105;
    default:
      return area;
  }
}

function toKg(qty: number, unit: string): number {
  switch (unit?.toLowerCase()) {
    case "tons":
    case "ton":
      return qty * 1000;
    case "bags":
    case "bag":
      return qty * 50;
    case "kg":
    default:
      return qty;
  }
}

export function buildHarvestPieData(
  harvests: { [key: string]: string | number }[],
  crops: { [key: string]: string | number }[],
) {
  const cropMap = new Map(crops.map((c) => [c.$id, c.cropName]));
  const map = new Map<string, number>();

  harvests.forEach((h) => {
    const cropName = cropMap.get(h.crops) || "Unknown";
    const qty = toKg(Number(h.quantity || 0), h.unit as string);

    map.set(cropName as string, (map.get(cropName as string) || 0) + qty);
  });

  const total = Array.from(map.values()).reduce((a, b) => a + b, 0);
  const colors = generateColors(map.size);

  const data = Array.from(map.entries()).map(([name, qty], i) => {
    const percent = total > 0 ? (qty / total) * 100 : 0;

    return {
      food: name,
      value: Number(percent.toFixed(1)),
      fill: colors[i],
      area: `${qty.toLocaleString()}kg`,
    };
  });
  return { data, total };
}

export function buildHarvestStats(
  harvests: { [key: string]: string | number }[],
  sales: { [key: string]: string | number }[],
) {
  if (!harvests?.length) {
    return {
      totalHarvests: 0,
      totalQty: 0,
      totalRevenue: 0,
      thisMonth: 0,
    };
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let totalQty = 0;
  let thisMonth = 0;

  harvests.forEach((h) => {
    const qty = toKg(Number(h.quantity || 0), h.unit as string);
    totalQty += qty;

    const d = new Date(h.date);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      thisMonth++;
    }
  });

  // 🔥 revenue comes from sales
  const totalRevenue = sales?.reduce(
    (acc, s) => acc + (+s.totalAmount || 0),
    0,
  );

  return {
    totalHarvests: harvests.length,
    totalQty,
    totalRevenue,
    thisMonth,
  };
}
