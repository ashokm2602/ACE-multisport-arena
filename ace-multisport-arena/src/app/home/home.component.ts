import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../site-header/site-header.component';

@Component({
  selector: 'app-home', standalone: true, imports: [RouterLink, SiteHeaderComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  readonly gymLocations = [
    { name: 'Gym Location 1', description: 'Your space to focus on movement and progress.', address: 'Address coming soon', hours: 'Hours coming soon' },
    { name: 'Gym Location 2', description: 'A second place to make training part of your routine.', address: 'Address coming soon', hours: 'Hours coming soon' }
  ];
  readonly sports = [
    { name: 'Football', icon: '◉', description: 'Sport availability and details coming soon.' },
    { name: 'Cricket', icon: '╱', description: 'Sport availability and details coming soon.' },
    { name: 'Other Sports', icon: '＋', description: 'More sport options to be confirmed.' }
  ];
  readonly values = [
    { icon: '▧', title: 'Quality Facilities', description: 'Spaces designed for fitness and sport.' },
    { icon: '◎', title: 'Multiple Sports', description: 'More ways to get moving in one place.' },
    { icon: '⌖', title: 'Convenient Locations', description: 'Two gym locations to choose from.' },
    { icon: '↗', title: 'Easy Booking', description: 'A simple way to plan your next game.' }
  ];
}
