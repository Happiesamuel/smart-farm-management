"use server";
import { Client, Account, Databases, Storage, Avatars } from "appwrite";
import { cookies } from "next/headers";
import { appwriteConfig } from "./appwrite-client";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);
  // .setKey(process.env.APPWRITE_API_KEY!);

  return {
    get avatar() {
      return new Avatars(client);
    },
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },

    get storage() {
      return new Storage(client);
    },
  };
}
