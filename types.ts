
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

// Declarações globais para calar os erros do compilador TypeScript no editor
// Como estamos usando Import Maps no navegador, o TS precisa dessas definições ambientais
// Fix: Using @ts-ignore to suppress "Invalid module name in augmentation" errors in a module file where the base modules aren't resolved by the compiler.
// @ts-ignore
declare module 'react';
// @ts-ignore
declare module 'react-dom/client';
// @ts-ignore
declare module 'react-router-dom';
// @ts-ignore
declare module 'lucide-react';
// @ts-ignore
declare module 'recharts';
// @ts-ignore
declare module '@supabase/supabase-js';
