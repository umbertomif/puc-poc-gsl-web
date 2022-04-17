import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { LayoutComponent } from './layouts/layout/layout.component';


const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
