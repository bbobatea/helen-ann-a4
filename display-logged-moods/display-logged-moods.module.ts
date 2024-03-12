import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayLoggedMoodsPageRoutingModule } from './display-logged-moods-routing.module';

import { DisplayLoggedMoodsPage } from './display-logged-moods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayLoggedMoodsPageRoutingModule
  ],
  declarations: [DisplayLoggedMoodsPage]
})
export class DisplayLoggedMoodsPageModule {}
