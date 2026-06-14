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
  avatar?: string;
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
  description?: string;
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
  growthStage:
    | "seedling"
    | "vegetative"
    | "flowering"
    | "fruiting"
    | "harvesting";
  description?: string;
  farms: string;
  fields: string;
  id: string;
  workspaces: string;
  users: string;
}
export interface HarvestInfo {
  buyer?: string;
  harvestDate: string | Date;
  quantity: number;
  unit: "kg" | "tons" | "bags";
  status: "sold" | "stored" | "wasted";
  quality: "excellent" | "good" | "average" | "poor";
  totalAmount: number;
  pricePerUnit: number;
  description?: string;
  farms: string;
  crops: string;
  fields: string;
  id: string;
  workspaces: string;
  users: string;
}
export interface TaskInfo {
  taskTitle: string;
  farms: string;
  fields: string;
  priority: "low" | "high" | "medium";
  assignTo: string;
  description: string;
  status: "pending" | "in_progress" | "cancelled" | "delayed" | "completed";
  dueDate: string | Date;
  id: string;
  workspaces: string;
  users: string;
}
export interface SalesInfo {
  quantity: number;
  unit: "kg" | "tons" | "bags";
  unitPrice: number;
  totalAmount: number;
  saleDate: string | Date;
  buyer: string;
  description?: string;
  paymentMethod: "cash" | "transfer" | "card" | "mobile-money";
  status: "completed" | "pending" | "cancelled";
  farms: string;
  harvests: string;
  id: string;
  workspaces: string;
  users: string;
}
export interface ExpenseInfo {
  category:
    | "labor"
    | "seeds"
    | "fertilizer"
    | "pesticide"
    | "equipment"
    | "transport"
    | "maintenance"
    | "other";
  amount: number;
  expenseDate: string | Date;
  paymentMethod: "cash" | "transfer" | "card" | "mobile-money";
  description?: string;
  status: "paid" | "pending";
  vendor?: string;
  farms?: string;
  crops?: string;
  fields?: string;
  id: string;
  workspaces: string;
  users: string;
}
