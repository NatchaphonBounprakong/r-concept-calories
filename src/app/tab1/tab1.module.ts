import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [Tab1Page,PopoverComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1PageModule {}
