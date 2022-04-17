import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { LanguageService } from '../../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { HorizontalnavbarComponent } from './horizontalnavbar/horizontalnavbar.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [TopbarComponent, FooterComponent, SidebarComponent, RightsidebarComponent, HorizontaltopbarComponent, HorizontalnavbarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    PerfectScrollbarModule,
    NgbDropdownModule,
    ClickOutsideModule,
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [TopbarComponent, FooterComponent, SidebarComponent, RightsidebarComponent, HorizontaltopbarComponent, HorizontalnavbarComponent],
  providers: [LanguageService]
})
export class SharedModule { }
