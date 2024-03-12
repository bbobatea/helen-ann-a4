import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayLoggedMoodsPage } from './display-logged-moods.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayLoggedMoodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayLoggedMoodsPageRoutingModule {}
