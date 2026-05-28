export interface UserObj {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

export interface User extends UserObj {
  avatar: string;
  isVerified: boolean;
  userId: string;
}

export interface WorkspaceObj {
  name: string;
  users?: string;
  inviteCode: string;
  workspaceId: string;
}
export interface UserObjId extends UserObj {
  id: string;
}
export interface WorkspaceObjId extends WorkspaceObj {
  id: string;
}
export interface WorkspaceMemberObj {
  users: string;
  workspaces: string;
  joinedAt: string;
  role: "worker" | "owner" | "manager";
}

export interface FarmObj {
  description: string;
  farmName: string;
  farmImage?: string | File;
  address: string;
  lat: number;
  lng: number;
  size: number;
  unit: string;
  soilType: string;
  status: string;
  users: string;
  workspaces: string;
}
