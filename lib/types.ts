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
  createdAt?: string;
}

export interface WorkerWorspace {
  role: string;
  id: string;
  name: string;
  users: string;
  workspaceId: string;
  inviteCode: string;
  createdAt: string;
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
export interface FarmInfo {
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
export interface FieldInfo {
  fieldName: string;
  size: number;
  fieldImage?: string | File;
  sizeUnit: "hectares" | "acres" | "square.m";
  soilType: "sandy" | "loamy" | "clay" | "silty" | "peaty" | "chalky";
  irrigationType?:
    | "drip"
    | "sprinkler"
    | "rain-fed"
    | "manual"
    | "flood"
    | "pivot";
  description?: string;
  status: "active" | "inactive";
  farms: string;
  id: string;
  workspaces: string;
  users: string;
}
export interface CropInfo {
  cropName: string;
  plantedDate: string | Date;
  expectedHarvestDate: string | Date;
  irrigationType?: string;
  expectedYield: number;
  yieldUnit: string;
  seedQuantity: number;
  seedUnit: string;
  areaPlanted: number;
  areaUnit: string;
  status: string;
  description?: string;
  farms: string;
  fields: string;
  id: string;
  workspaces: string;
  users: string;
}
export interface HarvestInfo {
  cropName: string;
  buyer?: string;
  date: string;
  farm: string;
  field: string;
  quantity: string;
  unit: string;
  status: string;
  quality: string;
  amount: string;
  description: string;
  farmId: string;
  id: string;
  workspaces: string;
  users: string;
}
export interface TaskInfo {
  taskTitle: string;
  farm: string;
  field: string;
  priority: string;
  assignTo: string;
  description: string;
  dueDate: string;
  farmId: string;
  id: string;
  workspaces: string;
  users: string;
}
export interface SalesInfo {
  crop: string;
  field: string;
  farm: string;
  quantity: string;
  unit: string;
  unitPrice: string;
  totalAmount: string;
  saleDate: string;
  buyer: string;
  paymentMethod: string;
  notes?: string;
  farmId: string;
  id: string;
  workspaces: string;
  users: string;
}
export interface ExpenseInfo {
  category: string;
  farm: string;
  amount: string;
  date: string;
  paymentMethod: string;
  notes?: string;
  description: string;
  receipt?: File;
  farmId: string;
  id: string;
  workspaces: string;
  users: string;
}
