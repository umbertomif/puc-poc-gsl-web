import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '../shared/ui/ui.module';
import { WidgetModule } from '../shared/widget/widget.module';

import { MainRoutingModule } from './main-routing.module';

import {
  NgbAlertModule, NgbCarouselModule,  NgbModalModule, NgbProgressbarModule,
   NgbPopoverModule, NgbPaginationModule, NgbAccordionModule,
  NgbCollapseModule, NgbButtonsModule
} from '@ng-bootstrap/ng-bootstrap';

import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DndModule } from 'ngx-drag-drop';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { DepositComponent } from './deposit/deposit.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { ProfileComponent } from './profile/profile.component';
import { SupplierComponent } from './supplier/supplier.component';
import { UserComponent } from './user/user.component';
import { IventoryComponent } from './iventory/iventory.component';
import { OrderComponent } from './order/order.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3
};



@NgModule({
  declarations: [DashboardComponent, CustomerComponent, DepositComponent, MerchandiseComponent, ProfileComponent, SupplierComponent, UserComponent, IventoryComponent, OrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule,
    ReactiveFormsModule,
    MainRoutingModule,
    UiModule,
    Ng2SearchPipeModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    DndModule,
    FullCalendarModule,
    LeafletModule,
    WidgetModule,

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class MainModule { }
