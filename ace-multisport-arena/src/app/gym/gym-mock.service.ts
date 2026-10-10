import { Injectable } from '@angular/core';
import { DEMO_MEMBERS, DEMO_NOTES, DEMO_TODAY } from './gym-mock-data';
import { DemoSession, GymProfile, WorkoutNote } from './gym.models';

/** In-memory prototype only. Replace this adapter with HTTP services in the backend phase. */
@Injectable({ providedIn: 'root' })
export class GymMockService {
  readonly today = DEMO_TODAY;
  readonly members: GymProfile[] = DEMO_MEMBERS.map((member) => ({ ...member, attendanceDates: [...member.attendanceDates] }));
  private readonly notes = new Map<string, WorkoutNote[]>([['ACE-1042', DEMO_NOTES.map((note) => ({ ...note }))]]);
  private nextNoteId = 4;
  private readonly sessions = new Map<string, DemoSession>([
    ['alex@ace.demo', { role: 'member', memberId: 'ACE-1042', name: 'Alex Morgan' }],
    ['admin@ace.demo', { role: 'admin', name: 'ACE Admin' }]
  ]);
  session?: DemoSession;

  login(username: string, password: string): DemoSession | undefined {
    if (password !== 'demo123') return undefined;
    const session = this.sessions.get(username.trim().toLowerCase());
    this.session = session;
    return session;
  }

  logout(): void { this.session = undefined; }

  get currentMember(): GymProfile {
    return this.members.find((member) => member.id === this.session?.memberId) ?? this.members[0];
  }

  getMember(memberId: string): GymProfile | undefined { return this.members.find((member) => member.id === memberId); }

  getNotes(memberId: string): WorkoutNote[] { return [...(this.notes.get(memberId) ?? [])].sort((a, b) => b.date.localeCompare(a.date)); }

  saveNote(memberId: string, note: Omit<WorkoutNote, 'id'>, id?: number): void {
    const memberNotes = this.notes.get(memberId) ?? [];
    if (id) {
      const index = memberNotes.findIndex((entry) => entry.id === id);
      if (index >= 0) memberNotes[index] = { ...note, id };
    } else {
      memberNotes.push({ ...note, id: this.nextNoteId++ });
    }
    this.notes.set(memberId, memberNotes);
  }

  deleteNote(memberId: string, id: number): void {
    this.notes.set(memberId, (this.notes.get(memberId) ?? []).filter((note) => note.id !== id));
  }

  checkIn(memberId: string): boolean {
    const member = this.getMember(memberId);
    if (!member || member.attendanceDates.includes(this.today)) return false;
    member.attendanceDates.push(this.today);
    return true;
  }

  updateMembership(memberId: string, startDate: string, expiryDate: string): void {
    const member = this.getMember(memberId);
    if (member && startDate <= expiryDate) Object.assign(member, { startDate, expiryDate });
  }

  createMember(id: string, name: string, email: string, startDate: string, expiryDate: string): GymProfile | undefined {
    const normalizedId = id.trim().toUpperCase();
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^ACE-\d{4,}$/.test(normalizedId) || !name.trim() || !normalizedEmail ||
        this.members.some((member) => member.id.toUpperCase() === normalizedId || member.email.toLowerCase() === normalizedEmail)) return undefined;
    const member: GymProfile = {
      id: normalizedId, name: name.trim(), email: email.trim(), phone: '', startDate, expiryDate, attendanceDates: []
    };
    if (startDate > expiryDate) return undefined;
    this.members.push(member);
    return member;
  }
}
