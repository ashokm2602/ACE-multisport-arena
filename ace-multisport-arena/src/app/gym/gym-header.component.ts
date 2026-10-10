import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GymMockService } from './gym-mock.service';

@Component({
  selector: 'app-gym-header', standalone: true, imports: [CommonModule, RouterLink],
  template: `<header class="gym-header"><a class="gym-brand" routerLink="/gym" aria-label="ACE Gym home">ACE <span>GYM</span></a><nav aria-label="Gym navigation"><a routerLink="/gym">Overview</a><a *ngIf="mock.session?.role === 'member'" routerLink="/gym/member">My dashboard</a><a *ngIf="mock.session?.role === 'admin'" routerLink="/gym/admin">Admin</a><a *ngIf="!mock.session" class="header-cta" routerLink="/gym/login">Member login</a><button *ngIf="mock.session" type="button" (click)="logout()">Log out</button><a class="turf-link" routerLink="/turf">ACE Turf ↗</a></nav></header>`,
  styles: [`.gym-header{min-height:72px;padding:12px clamp(18px,6vw,80px);display:flex;align-items:center;justify-content:space-between;gap:20px;background:#0B2E22;color:#fff;border-bottom:1px solid #ffffff20}.gym-brand{display:flex;align-items:center;gap:9px;color:#fff;text-decoration:none;font-weight:900;letter-spacing:.06em;font-size:1.05rem}.gym-brand span{color:#FFD52A;font-size:.7rem;letter-spacing:.18em}.gym-header nav{display:flex;align-items:center;gap:clamp(12px,2.5vw,30px)}.gym-header nav a,.gym-header nav button{border:0;background:none;color:#fff;text-decoration:none;font:600 .78rem Arial,sans-serif;cursor:pointer}.gym-header nav a:hover,.gym-header nav button:hover{color:#FFD52A}.gym-header nav .header-cta{background:#FFD52A;color:#0B2E22;padding:12px 16px}.gym-header nav .turf-link{color:#fff}@media(max-width:600px){.gym-header{align-items:flex-start}.gym-header nav{gap:10px;justify-content:flex-end;flex-wrap:wrap}.gym-header nav a,.gym-header nav button{font-size:.7rem}.gym-brand{font-size:.9rem}}`]
})
export class GymHeaderComponent {
  readonly mock = inject(GymMockService);
  private readonly router = inject(Router);
  logout(): void { this.mock.logout(); void this.router.navigate(['/gym']); }
}
