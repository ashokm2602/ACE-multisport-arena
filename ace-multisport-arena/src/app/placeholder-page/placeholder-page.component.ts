import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  imports: [RouterLink],
  template: `<main class="placeholder-page"><a class="back-link" routerLink="/">ACE MULTISPORT ARENA</a><p class="eyebrow">COMING SOON</p><h1>{{ title }}</h1><p>{{ message }}</p><div class="actions"><a class="button" routerLink="/">Back to arena</a>@if (showTurfLink) {<a class="button secondary" routerLink="/turf">Explore Turf</a>}</div></main>`,
  styleUrl: './placeholder-page.component.css'
})
export class PlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly title = this.route.snapshot.data['title'] ?? 'Coming soon';
  readonly message = this.route.snapshot.data['message'] ?? 'More information will be available soon.';
  readonly showTurfLink = this.route.snapshot.data['showTurfLink'] ?? false;
}
