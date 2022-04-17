import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { DepositComponent } from './deposit/deposit.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { ProfileComponent } from './profile/profile.component';
import { SupplierComponent } from './supplier/supplier.component';
import { UserComponent } from './user/user.component';
import { IventoryComponent } from './iventory/iventory.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'deposit', component: DepositComponent },
    { path: 'merchandise', component: MerchandiseComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'supplier', component: SupplierComponent },
    { path: 'user', component: UserComponent },
    { path: 'iventory', component: IventoryComponent },
    { path: 'order', component: OrderComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }