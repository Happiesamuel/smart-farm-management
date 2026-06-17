"use server";
import { Client, Account, Databases, Storage, Avatars } from "appwrite";
import { cookies } from "next/headers";
import { appwriteConfig } from "./appwrite-client";

export async function createSessionClient() {
  const cookieStore = await cookies();

  const session = cookieStore
    .getAll()
    .find(
      (c) => c.name.startsWith("a_session") || c.name.startsWith("a_session_"),
    );
  if (!session) throw new Error("No session found");

  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setSession(session.value);

  return {
    account: new Account(client),
  };
}
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.appwriteApiKey);

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
