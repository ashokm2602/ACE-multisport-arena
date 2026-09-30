import { Routes } from '@angular/router';
import { HomeSelectorComponent } from './home-selector/home-selector.component';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';
import { TurfBookingComponent } from './turf-booking/turf-booking.component';
import { PortalComponent } from './portal/portal.component';
import { authGuard, roleGuard } from './core/guards';

export const routes: Routes = [
  { path: '', component: HomeSelectorComponent, title: 'Ace Multisport Arena | Train. Play. Repeat.' },
  { path: 'gym', component: PlaceholderPageComponent, data: { title: 'ACE GYM', message: 'The Gym experience is coming soon.', showTurfLink: true }, title: 'Ace Gym | Ace Multisport Arena' },
  { path: 'turf', component: TurfBookingComponent, title: 'Book Ace Turf | Ace Multisport Arena' },
  { path: 'turf/booking', component: TurfBookingComponent, title: 'Book Ace Turf | Ace Multisport Arena' },
  { path: 'login', component: PortalComponent, title: 'Sign in | Ace Multisport Arena' },
  { path: 'register', component: PortalComponent, title: 'Register | Ace Multisport Arena' },
  { path: 'my-bookings', component: PortalComponent, canActivate: [authGuard, roleGuard], data: { roles: ['CUSTOMER', 'ADMIN', 'STAFF'] }, title: 'My Bookings | Ace Multisport Arena' },
  { path: 'booking/confirmation', component: PortalComponent, canActivate: [authGuard], title: 'Booking Status | Ace Multisport Arena' },
  { path: 'admin', component: PortalComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'STAFF'] }, title: 'Admin Dashboard | Ace Multisport Arena' },
  { path: 'admin/bookings', component: PortalComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'STAFF'] }, title: 'Booking Management | Ace Multisport Arena' },
  { path: 'admin/slots', component: PortalComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN', 'STAFF'] }, title: 'Slot Management | Ace Multisport Arena' },
  { path: 'admin/pricing', component: PortalComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] }, title: 'Pricing | Ace Multisport Arena' },
  { path: 'admin/users', component: PortalComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] }, title: 'Users | Ace Multisport Arena' },
  { path: 'contact', component: PlaceholderPageComponent, data: { title: 'Contact ACE', message: 'Contact details coming soon.', showTurfLink: true }, title: 'Contact | Ace Multisport Arena' },
  { path: '**', redirectTo: '' }
];
