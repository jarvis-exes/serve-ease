import type { Roles } from "@/enums/roles.enum";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Roles;
  outlets: string[];
  outletName: string;
}

export type WeeklyData = {
  day: string;
  Revenue: number;
  Parcel: number;
  Table: number;
};

export interface Stats {
  todaySales: number;
  todayOrders: number;
  yesterdayOrders: number;
  weeklyData: WeeklyData[];
}

export interface Permissions {
  canCreateOrder: boolean;
  canViewKitchen: boolean;
}

export interface DashboardResponse {
  user: User;
  stats: Stats;
  permissions: Permissions;
}