import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DepartmentService, Department } from '../department.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './department.html',
  styleUrls: ['./department.css']
})
export class Departments {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  departments = new MatTableDataSource<Department>();
  loading = true;
  error = '';
  form!: FormGroup;
  selectedDepartment: Department | null = null;

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //  Initialize the form FIRST
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    //  Then fetch departments
    this.departmentService.getDepartments().subscribe({
      next: (data: Department[]) => {
        console.log('Departments fetched:', data);
        this.departments.data = data;
        console.log('Assigned to table:', this.departments.data);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.error = 'Failed to load departments';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onCreate(): void {
    if (this.form.valid) {
      this.departmentService.createDepartment(this.form.value).subscribe({
        next: dept => {
          this.departments.data = [...this.departments.data, dept];
          this.form.reset();
          this.cdr.detectChanges();
        },
        error: err => console.error('Create failed', err)
      });
    }
  }

  onEdit(dept: Department): void {
    this.selectedDepartment = dept;
    this.form.patchValue({ name: dept.name });
  }

  onUpdate(): void {
    if (this.form.valid && this.selectedDepartment) {
      this.departmentService.updateDepartment(this.selectedDepartment.id, this.form.value).subscribe({
        next: updated => {
          this.departments.data = this.departments.data.map(d =>
            d.id === updated.id ? updated : d
          );
          this.selectedDepartment = null;
          this.form.reset();
          this.cdr.detectChanges();
        }
      });
    }
  }

  onDelete(id: number): void {
    this.departmentService.deleteDepartment(id).subscribe({
      next: () => {
        this.departments.data = this.departments.data.filter(d => d.id !== id);
        this.cdr.detectChanges();
      },
      error: err => console.error('Delete failed', err)
    });
  }
}
