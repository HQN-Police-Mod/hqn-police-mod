// ===================================================
// HQN POLICE MOD — Global TypeScript Types
// ===================================================

// ─── Server Status ───────────────────────────────
export interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
  ping?: number;
  lastUpdated: string;
  isMock: boolean; // Always true until real API is connected
}

// ─── Application / تقديم ─────────────────────────
export type ApplicationStatus = "pending" | "accepted" | "rejected" | "review";

export interface Application {
  id: string;
  name: string;
  age: number;
  discord: string;
  sector: string;
  rank: string;
  experience: string;
  reason: string;
  additionalInfo?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationFormData {
  name: string;
  age: number;
  discord: string;
  sector: string;
  rank: string;
  experience: string;
  reason: string;
  additionalInfo?: string;
}

// ─── Sectors / القطاعات ───────────────────────────
export interface SectorRank {
  name: string;
  nameAr: string;
  level: number;
}

export interface Sector {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  icon: string;
  color: string;
  ranks: SectorRank[];
  duties: string[];
  requirements: string[];
  isOpen: boolean;
  memberCount?: number;
}

// ─── Products / المنتجات ──────────────────────────
export type ProductCategory = "vip" | "rank" | "vehicle" | "item" | "bundle";

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  currency: "SAR" | "USD";
  category: ProductCategory;
  image: string;
  features: string[];
  isAvailable: boolean;
  isFeatured?: boolean;
  discount?: number;
}

// ─── Cart ────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Staff / الإدارة ──────────────────────────────
export type StaffRole =
  | "owner"
  | "co-owner"
  | "admin"
  | "moderator"
  | "developer"
  | "support";

export interface StaffMember {
  id: string;
  name: string;
  nameAr: string;
  role: StaffRole;
  position: string;
  positionAr: string;
  discord: string;
  discordId?: string;
  avatar?: string;
  isActive: boolean;
  joinedAt: string;
}

// ─── Rules / القوانين ─────────────────────────────
export interface Rule {
  id: string;
  number: number;
  title: string;
  titleAr: string;
  description: string;
  severity: "info" | "warning" | "critical";
}

export interface RuleCategory {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  rules: Rule[];
}

// ─── API Responses ───────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── Navigation ──────────────────────────────────
export interface NavItem {
  label: string;
  labelAr: string;
  href: string;
  icon?: string;
}

// ─── Admin ───────────────────────────────────────
export interface AdminStats {
  totalApplications: number;
  pendingApplications: number;
  totalPlayers: number;
  totalProducts: number;
  totalOrders: number;
  totalStaff: number;
}
