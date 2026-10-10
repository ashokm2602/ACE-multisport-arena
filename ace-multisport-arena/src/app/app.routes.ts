import { Routes } from '@angular/router';
import { HomeSelectorComponent } from './home-selector/home-selector.component';
import { TurfBookingComponent } from './turf-booking/turf-booking.component';
import { GymLandingComponent } from './gym/gym-landing.component';
import { GymLoginComponent } from './gym/gym-login.component';
import { GymMemberDashboardComponent } from './gym/gym-member-dashboard.component';
import { GymAdminDashboardComponent } from './gym/gym-admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeSelectorComponent, title: 'Ace Multisport Arena | Train. Play. Repeat.' },
  { path: 'gym/login', component: GymLoginComponent, title: 'Member login | ACE Gym' },
  { path: 'gym/member', component: GymMemberDashboardComponent, title: 'Member dashboard | ACE Gym' },
  { path: 'gym/admin', component: GymAdminDashboardComponent, title: 'Gym administration | ACE Gym' },
  { path: 'gym', component: GymLandingComponent, title: 'ACE Gym | Train with purpose' },
  { path: 'turf', component: TurfBookingComponent, title: 'Book Ace Turf | Ace Multisport Arena' },
  { path: '**', redirectTo: '' }
];
