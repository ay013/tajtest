export type UserRole = "admin" | "employee";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  assignedCompany: string;
  status: "active" | "inactive" | "on-leave";
  joinDate: string;
  salary: number;
  skills: string[];
}

export interface Payment {
  id: string;
  workerId: string;
  workerName: string;
  assignedCompany: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  type: "salary" | "bonus" | "reimbursement";
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  workersAssigned: number;
  contactPerson: string;
  email: string;
  status: "active" | "inactive";
}

export interface DashboardStats {
  totalWorkers: number;
  activeCompanies: number;
  pendingPayments: number;
  totalRevenue: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
