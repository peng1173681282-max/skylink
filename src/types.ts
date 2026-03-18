export type LoanStatus = 'pending' | 'approved' | 'rejected' | 'disbursed' | 'paid';

export interface LoanApplication {
  id: string;
  amount: number;
  term: number; // in months
  purpose: string;
  status: LoanStatus;
  createdAt: string;
  monthlyRepayment: number;
  totalRepayment: number;
}

export interface UserProfile {
  title: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  occupation: string;
  dob: string;
  address: string;
  employmentStatus: string;
  monthlyIncome: number;
  bankAccount?: string;
}
