import { GymProfile, WorkoutNote } from './gym.models';

/** Sample-only data for the Angular UI prototype. Replace with API data later. */
export const DEMO_TODAY = '2026-10-10';
export const DEMO_MEMBERS: GymProfile[] = [
  {
    id: 'ACE-1042', name: 'Alex Morgan', email: 'alex@ace.demo', phone: '+91 98765 43210',
    startDate: '2026-06-01', expiryDate: '2026-10-25',
    attendanceDates: ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-05', '2026-10-06', '2026-10-08', '2026-10-09']
  },
  {
    id: 'ACE-1043', name: 'Maya Patel', email: 'maya@ace.demo', phone: '+91 98765 12345',
    startDate: '2026-02-15', expiryDate: '2026-10-20',
    attendanceDates: ['2026-10-02', '2026-10-04', '2026-10-07', '2026-10-09']
  },
  {
    id: 'ACE-1044', name: 'Jordan Lee', email: 'jordan@ace.demo', phone: '+91 91234 56780',
    startDate: '2025-12-01', expiryDate: '2026-10-08',
    attendanceDates: ['2026-10-01', '2026-10-03', '2026-10-06']
  }
];

export const DEMO_NOTES: WorkoutNote[] = [
  { id: 1, date: '2026-10-09', activity: 'Upper body strength', details: 'Bench press, seated row, shoulder press.' },
  { id: 2, date: '2026-10-06', activity: 'Leg day', details: 'Squats, Romanian deadlifts, calf raises.' },
  { id: 3, date: '2026-10-03', activity: 'Conditioning', details: 'Intervals on the bike and core work.' }
];
