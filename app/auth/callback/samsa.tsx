// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Client, Account } from "appwrite";
// import { appwriteConfig } from "@/servers/appwrite-client";
// import { handleOAuthCallback } from "@/servers/user-action"; // server action
// import GeneralLoader from "@/components/loader/GeneralLoader";

// export default function CallbackPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const run = async () => {
//       try {
//         const client = new Client()
//           .setEndpoint(appwriteConfig.endpoint)
//           .setProject(appwriteConfig.projectId);
//         const account = new Account(client);

//         const users = await account.get();
//         console.log(users, "slsl");
//         const session = await account.getSession("current");
//         console.log(session, "sama");
//         const user = await account.get();

//         const sessionToken = btoa(
//           JSON.stringify({
//             id: session.$id,
//             secret: session.secret,
//           }),
//         );
//         console.log("full session object:", session, sessionToken); // check what fields are available

//         const result = await handleOAuthCallback({
//           userId: user.$id,
//           email: user.email,
//           name: user.name,
//           sessionSecret: sessionToken, // ✅ try $id instead of secret
//         });

//         router.replace(result.redirectTo);
//       } catch (err) {
//         console.error(err);
//         router.replace("/owner/login");
//       }
//     };

//     run();
//   }, []);

//   return <GeneralLoader>Signing you in...</GeneralLoader>;
// }
