export interface Contact {
  id: string;
  name: string;
  type: 'client' | 'provider' | 'insurance' | 'other';
  email: string;
  phone: string;
  organization?: string;
  address?: string;
  notes?: string;
  dateOfBirth?: string;
  specialty?: string;
  contactPerson?: string;
  insuranceType?: string;
}

export interface Case {
  id: string;
  clientId: string;
  clientName: string;
  dateOfLoss: string;
  solDate: string;
  caseValue: number;
  status: 'active' | 'closed' | 'pending';
  type: string;
  insuranceInfo: {
    clientInsurance: string;
    defendantInsurance: string;
  };
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'attorney' | 'paralegal';
  email: string;
}