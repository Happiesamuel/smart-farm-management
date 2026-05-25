// "use client";
// import { Client, Account } from "appwrite";

// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

// export const account = new Account(client);
export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  appwriteApiKey: process.env.APPWRITE_API_KEY!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERCOLLECTION_ID!,
  otpCollectionId: process.env.NEXT_PUBLIC_APPWRITE_OTPCOLLECTION_ID!,
  workspaceCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_WORKSPACECOLLECTION_ID!,
  workspaceMembersCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_WORKSPACEMEMBERSCOLLECTION_ID!,
  farmCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FARMCOLLECTION_ID!,
};
