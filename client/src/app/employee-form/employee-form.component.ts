import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from '../record.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h2>{{isEdit ? 'Edit' : 'Add'}} Employee</h2>
      <div class="form-card">
        <div class="form-group">
          <label>Full Name</label>
          <input [(ngModel)]="record.name" placeholder="e.g. Jane Smith" />
        </div>
        <div class="form-group">
          <label>Position</label>
          <input [(ngModel)]="record.position" placeholder="e.g. Software Engineer" />
        </div>
        <div class="form-group">
          <label>Level</label>
          <select [(ngModel)]="record.level">
            <option value="">Select level…</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <button class="btn-primary" (click)="submit()">{{isEdit ? 'Update' : 'Save'}} Employee</button>
        <button class="btn-secondary" (click)="router.navigate(['/employees'])">Cancel</button>
      </div>
    </div>
  `,
  styles: [`
    .page { padding:32px; max-width:900px; margin:0 auto; }
    h2 { font-size:1.6rem; margin-bottom:24px; color:#3f51b5; }
    .form-card { background:#fff; border-radius:10px; padding:28px 32px; max-width:480px; box-shadow:0 1px 4px rgba(0,0,0,.08); }
    .form-group { margin-bottom:18px; }
    label { display:block; font-size:.85rem; font-weight:600; margin-bottom:6px; color:#444; }
    input, select {
      width:100%; padding:10px 14px; border:1.5px solid #d0d5e8;
      border-radius:7px; font-size:.95rem; outline:none;
    }
    input:focus, select:focus { border-color:#3f51b5; }
    .btn-primary {
      background:#3f51b5; color:#fff; border:none; padding:11px 28px;
      border-radius:7px; font-size:.95rem; cursor:pointer; font-weight:600;
    }
    .btn-secondary {
      background:#fff; color:#3f51b5; border:1.5px solid #3f51b5;
      padding:10px 22px; border-radius:7px; font-size:.95rem;
      cursor:pointer; font-weight:600; margin-left:10px;
    }
  `]
})
export class EmployeeFormComponent implements OnInit {
  record: Record = { name: '', position: '', level: '' };
  isEdit = false;
  id = '';

  constructor(
    private svc: RecordService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.isEdit = true;
      this.svc.getOne(this.id).subscribe(data => this.record = data);
    }
  }

  submit() {
    if (!this.record.name || !this.record.position || !this.record.level) {
      alert('Please fill in all fields.');
      return;
    }
    if (this.isEdit) {
      this.svc.update(this.id, this.record).subscribe(() => this.router.navigate(['/employees']));
    } else {
      this.svc.create(this.record).subscribe(() => this.router.navigate(['/employees']));
    }
  }
}
