export type GymDemoRole = 'member' | 'admin';

export interface GymProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  startDate: string;
  expiryDate: string;
  attendanceDates: string[];
}

export interface WorkoutNote {
  id: number;
  date: string;
  activity: string;
  details: string;
}

export interface DemoSession {
  role: GymDemoRole;
  memberId?: string;
  name: string;
}
