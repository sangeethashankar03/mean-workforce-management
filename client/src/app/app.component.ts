import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <span class="brand">🏢 EmployeeTracker</span>
      <div class="nav-links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
        <a routerLink="/employees" routerLinkActive="active">Employees</a>
        <a routerLink="/add" routerLinkActive="active">Add Employee</a>
      </div>
    </nav>
    <router-outlet />
  `,
  styles: [`
    nav {
      background: #3f51b5; color: #fff;
      padding: 0 32px; height: 56px;
      display: flex; align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 8px rgba(63,81,181,.4);
    }
    .brand { font-size: 1.2rem; font-weight: 700; }
    .nav-links { display: flex; gap: 24px; }
    .nav-links a {
      color: rgba(255,255,255,.85); text-decoration: none;
      font-size: .95rem; padding-bottom: 4px;
    }
    .nav-links a.active { color: #fff; border-bottom: 2px solid #fff; }
  `]
})
export class AppComponent {}
