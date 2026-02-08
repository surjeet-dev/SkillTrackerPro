import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { UserService, User } from '../user.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgIf, MatCardModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users implements OnInit {
  users: User[] = [];
  loading = true;
  error = '';

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        console.log('Raw users fetched:', data);
        this.users = data.data;
        console.log('Assigned users:', this.users);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error('API error:', err);
      }
    });
  }
  
}
