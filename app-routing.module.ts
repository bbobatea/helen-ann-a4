// app routing module

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogSleepComponent } from './log-sleep/log-sleep.component';
import { SettingsComponent } from './settings/settings.component';
import { DataViewComponent } from './data-view/data-view.component';
import { SleepGoalsComponent } from './sleep-goals/sleep-goals.component';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'log-sleep',
    loadChildren: () => import('./log-sleep/log-sleep.module').then( m => m.LogSleepModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsModule),
  },
  {
    path: 'data-view',
    loadChildren: () => import('./data-view/data-view.module').then( m => m.DataViewModule),
  },
  {
    path: 'sleep-goals',
    loadChildren: () => import('./sleep-goals/sleep-goals.module').then( m => m.SleepGoalsModule),
  },
  { path: 'log-sleep-component', component: LogSleepComponent },
  { path: 'settings-component', component: SettingsComponent },
  { path: 'data-view-component', component: DataViewComponent },
  { path: 'sleep-goals-component', component: SleepGoalsComponent },
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
