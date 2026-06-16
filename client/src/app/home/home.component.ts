import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page">
      <div class="hero">
        <h1>MEAN Stack Employee Tracker</h1>
        <p>Manage your workforce — MongoDB · Express · Angular · Node.js</p>
        <a routerLink="/add" class="btn-white">+ Add Employee</a>
      </div>
      <div class="stats">
        <div class="stat-card"><div class="number">{{total}}</div><div class="label">Total Employees</div></div>
        <div class="stat-card"><div class="number">{{junior}}</div><div class="label">Junior</div></div>
        <div class="stat-card"><div class="number">{{mid}}</div><div class="label">Mid-Level</div></div>
        <div class="stat-card"><div class="number">{{senior}}</div><div class="label">Senior</div></div>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 32px; max-width: 900px; margin: 0 auto; }
    .hero {
      background: linear-gradient(135deg,#3f51b5,#5c6bc0);
      color:#fff; border-radius:14px; padding:48px 40px; margin-bottom:28px;
    }
    .hero h1 { font-size:2rem; margin-bottom:10px; }
    .hero p  { opacity:.85; margin-bottom:20px; }
    .btn-white {
      background:#fff; color:#3f51b5; padding:10px 24px;
      border-radius:7px; font-weight:700; text-decoration:none;
    }
    .stats { display:flex; gap:16px; flex-wrap:wrap; }
    .stat-card {
      background:#fff; border-radius:10px; padding:20px 28px;
      flex:1; min-width:140px; text-align:center;
      box-shadow:0 1px 4px rgba(0,0,0,.08);
    }
    .number { font-size:2rem; font-weight:700; color:#3f51b5; }
    .label  { font-size:.8rem; color:#888; margin-top:4px; }
  `]
})
export class HomeComponent implements OnInit {
  total = 0; junior = 0; mid = 0; senior = 0;
  constructor(private svc: RecordService) {}
  ngOnInit() {
    this.svc.getAll().subscribe(data => {
      this.total  = data.length;
      this.junior = data.filter(r => r.level?.toLowerCase() === 'junior').length;
      this.mid    = data.filter(r => r.level?.toLowerCase() === 'mid').length;
      this.senior = data.filter(r => r.level?.toLowerCase() === 'senior').length;
    });
  }
}
