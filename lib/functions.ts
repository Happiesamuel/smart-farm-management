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
