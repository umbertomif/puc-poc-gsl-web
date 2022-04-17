import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';


import { DropzoneModule } from 'ngx-dropzone-wrapper';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    AuthModule,
    DropzoneModule,
    NgSelectModule,
    NgxSpinnerModule
  ],
})
export class AccountModule { }
