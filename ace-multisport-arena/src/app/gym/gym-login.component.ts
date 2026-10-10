import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GymHeaderComponent } from './gym-header.component';
import { GymMockService } from './gym-mock.service';

@Component({
  selector: 'app-gym-login', standalone: true, imports: [CommonModule, FormsModule, RouterLink, GymHeaderComponent],
  template: `<app-gym-header/><main class="login-page"><section class="login-card"><div class="card-brand">ACE <span>GYM MEMBER PORTAL</span></div><p class="eyebrow">WELCOME BACK</p><h1>Sign in to<br><em>your progress.</em></h1><p class="intro">Access your membership, attendance and workout journal.</p><form (ngSubmit)="submit()" #loginForm="ngForm"><label for="username">Email or username</label><input id="username" name="username" type="text" autocomplete="username" required [(ngModel)]="username" #usernameField="ngModel" [class.invalid]="usernameField.invalid && usernameField.touched"><small class="field-error" *ngIf="usernameField.invalid && usernameField.touched">Enter your email or username.</small><label for="password">Password</label><div class="password-wrap"><input id="password" name="password" [type]="showPassword ? 'text' : 'password'" autocomplete="current-password" required minlength="6" [(ngModel)]="password" #passwordField="ngModel"><button type="button" (click)="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }}</button></div><small class="field-error" *ngIf="passwordField.invalid && passwordField.touched">Enter at least 6 characters.</small><p class="error-message" *ngIf="error">{{ error }}</p><button class="submit" type="submit" [disabled]="loginForm.invalid">Sign in <span>→</span></button></form><aside class="demo-credentials"><strong>Prototype access</strong><p>Member: alex@ace.demo · Password: demo123</p><p>Admin UI: admin@ace.demo · Password: demo123</p><small>These sample credentials are not secure authentication.</small></aside><a class="back-link" routerLink="/gym">← Back to ACE Gym</a></section><aside class="logo-panel" aria-label="ACE Gym logo pending"><span>ACE GYM SHIELD LOGO</span><small>Awaiting supplied image asset</small></aside></main>`,
  styles: [`.login-page{min-height:calc(100vh - 72px);display:grid;grid-template-columns:minmax(360px,530px) 1fr;background:#fff;color:#0B2E22;font-family:Arial,sans-serif}.login-card{padding:clamp(28px,5vw,60px);max-width:630px;width:100%;margin:auto}.card-brand{font-size:.95rem;font-weight:900;letter-spacing:.07em;margin-bottom:34px}.card-brand span{display:block;color:#0B2E22;font-size:.57rem;letter-spacing:.16em;margin-top:5px}.eyebrow{font-size:.65rem;letter-spacing:.14em;color:#0B2E22;font-weight:800}.login-card h1{font-size:clamp(2.5rem,4vw,3.5rem);letter-spacing:-.04em;line-height:.98;margin:10px 0}.login-card h1 em{color:#0B2E22;font-style:normal}.intro{color:#53665a;font-size:.86rem;line-height:1.6;margin:15px 0 22px}.login-card form label{display:block;font-size:.72rem;font-weight:700;margin:15px 0 7px}.login-card form input{width:100%;padding:13px 12px;border:1px solid #cbd5cc;background:#fff;border-radius:2px;color:#0B2E22;font:inherit}.login-card form input:focus{outline:2px solid #0B2E22;outline-offset:1px}.login-card form input.invalid{border-color:#a74635}.password-wrap{display:flex;border:1px solid #cbd5cc;background:#fff}.password-wrap input{border:0!important}.password-wrap button{padding:0 12px;background:#fff;border:0;color:#0B2E22;font-weight:700;cursor:pointer}.field-error,.error-message{display:block;color:#a74635;font-size:.68rem;margin-top:6px}.error-message{padding:10px;background:#fff0ed}.submit{display:flex;justify-content:space-between;width:100%;margin-top:20px;padding:14px;background:#FFD52A;border:0;color:#0B2E22;font-weight:800;text-transform:uppercase;letter-spacing:.06em;cursor:pointer}.submit:disabled{opacity:.55;cursor:not-allowed}.demo-credentials{margin-top:18px;padding:13px;background:#f5f7f3;border-left:3px solid #FFD52A;font-size:.68rem}.demo-credentials p{margin:7px 0;color:#40564a}.demo-credentials small{color:#68796e}.back-link{display:inline-block;margin-top:18px;color:#0B2E22;text-decoration:none;font-size:.72rem}.logo-panel{margin:20px;background:#0B2E22;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:#FFD52A;text-align:center}.logo-panel span{font-weight:800;font-size:.76rem;letter-spacing:.14em}.logo-panel small{color:#fff;font-size:.67rem}@media(max-width:800px){.login-page{grid-template-columns:1fr}.login-card{max-width:560px}.logo-panel{min-height:220px;margin:0 18px 18px}}`]
})
export class GymLoginComponent {
  username = '';
  password = '';
  error = '';
  showPassword = false;
  private readonly mock = inject(GymMockService);
  private readonly router = inject(Router);

  submit(): void {
    const session = this.mock.login(this.username, this.password);
    if (!session) { this.error = 'Those demo credentials were not recognized. Check the sample details below.'; return; }
    void this.router.navigate([session.role === 'admin' ? '/gym/admin' : '/gym/member']);
  }
}
