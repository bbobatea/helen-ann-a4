import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HourSleptPageRoutingModule } from './hour-slept-routing.module';

import { HourSleptPage } from './hour-slept.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HourSleptPageRoutingModule
  ],
  declarations: [HourSleptPage]
})
export class HourSleptPageModule {}
