import { createHash } from "crypto";
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
