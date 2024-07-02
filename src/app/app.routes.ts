import { Routes } from '@angular/router';
import { DefaultScreenComponent } from './components/default-screen/default-screen.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { DashHomeComponent } from './components/dash-home/dash-home.component';
import { TasksComponent } from './components/tasks/tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'navigate', pathMatch: 'full' },
  { path: 'navigate', component: DefaultScreenComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashHomeComponent },
      { path: 'task/:type/:index', component: AddTaskComponent },
      { path: 'tasks', component: TasksComponent },
      { path: '**', component: DashHomeComponent },
    ],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: DefaultScreenComponent },
];
