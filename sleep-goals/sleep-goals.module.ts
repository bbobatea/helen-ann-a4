import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SleepGoalsComponent } from './sleep-goals.component';



@NgModule({
  declarations: [SleepGoalsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class SleepGoalsModule {}