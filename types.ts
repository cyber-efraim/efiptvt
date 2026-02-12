
export type UserRole = 'ADMIN' | 'RESELLER';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'RESELLER';
  password?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Client {
  id: string;
  resellerId: string;
  name: string;
  monthlyValue: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  notes: string;
  createdAt: string;
}

export interface AccessKey {
  id: string;
  key: string;
  createdBy: string;
  used: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  role: UserRole;
}

export interface DashboardStats {
  totalClients: number;
  paidClients: number;
  pendingClients: number;
  overdueClients: number;
  monthlyRevenue: number;
  netProfit: number;
}

// Note: Redundant ambient declarations were removed as node_modules are present.

