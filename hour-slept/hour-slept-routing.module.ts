import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HourSleptPage } from './hour-slept.page';

const routes: Routes = [
  {
    path: '',
    component: HourSleptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HourSleptPageRoutingModule {}
