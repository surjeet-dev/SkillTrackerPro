import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';

export const routes: Routes = [
  { path: '', component: Home },           // Home is now the landing page
  { path: 'users', component: Users },
  { path: 'department', loadComponent: () => import('./department/department').then(m => m.Departments) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
  { path: '**', redirectTo: '' }           // fallback route
];
