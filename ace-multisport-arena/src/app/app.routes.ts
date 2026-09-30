import { Routes } from '@angular/router';
import { HomeSelectorComponent } from './home-selector/home-selector.component';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';
import { TurfBookingComponent } from './turf-booking/turf-booking.component';

export const routes: Routes = [
  { path: '', component: HomeSelectorComponent, title: 'Ace Multisport Arena | Train. Play. Repeat.' },
  { path: 'gym', component: PlaceholderPageComponent, data: { title: 'ACE GYM', message: 'The Gym experience is coming soon.', showTurfLink: true }, title: 'Ace Gym | Ace Multisport Arena' },
  { path: 'turf', component: TurfBookingComponent, title: 'Book Ace Turf | Ace Multisport Arena' },
  { path: '**', redirectTo: '' }
];
