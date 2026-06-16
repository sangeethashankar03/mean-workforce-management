import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from '../record.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page">
      <h2>All Employees</h2>
      <p *ngIf="loading" class="empty">Loading…</p>
      <p *ngIf="!loading && records.length === 0" class="empty">
        No employees yet. <a routerLink="/add">Add one →</a>
      </p>
      <div *ngFor="let r of records" class="card">
        <div class="card-info">
          <div class="name">{{r.name}}</div>
          <div class="meta">{{r.position}}</div>
        </div>
        <div class="right">
          <span class="badge" [ngClass]="r.level ? r.level.toLowerCase() : ''">{{r.level}}</span>
          <a [routerLink]="['/edit', r._id]" class="btn-icon" title="Edit">✏️</a>
          <button class="btn-icon" (click)="delete(r._id!)" title="Delete">🗑️</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { padding:32px; max-width:900px; margin:0 auto; }
    h2 { font-size:1.6rem; margin-bottom:24px; color:#3f51b5; }
    .empty { text-align:center; padding:60px 0; color:#aaa; }
    .card {
      background:#fff; border-radius:10px; padding:20px 24px;
      margin-bottom:14px; display:flex; align-items:center;
      justify-content:space-between; box-shadow:0 1px 4px rgba(0,0,0,.08);
    }
    .name { font-weight:600; }
    .meta { font-size:.85rem; color:#666; margin-top:3px; }
    .right { display:flex; align-items:center; gap:12px; }
    .badge {
      font-size:.75rem; padding:3px 10px; border-radius:20px;
      font-weight:600; text-transform:uppercase;
    }
    .badge.junior { background:#e8f5e9; color:#2e7d32; }
    .badge.mid    { background:#fff3e0; color:#e65100; }
    .badge.senior { background:#e3f2fd; color:#1565c0; }
    .btn-icon {
      border:none; background:none; cursor:pointer;
      font-size:1.1rem; padding:6px; border-radius:6px;
      text-decoration:none;
    }
    .btn-icon:hover { background:#f0f4ff; }
  `]
})
export class EmployeeListComponent implements OnInit {
  records: Record[] = [];
  loading = true;
  constructor(private svc: RecordService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.svc.getAll().subscribe(data => {
      this.records = data;
      this.loading = false;
    });
  }
  delete(id: string) {
    if (!confirm('Delete this employee?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }
}
