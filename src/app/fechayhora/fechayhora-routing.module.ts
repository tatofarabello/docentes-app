import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FechayhoraPage } from './fechayhora.page';

const routes: Routes = [
  {
    path: '',
    component: FechayhoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FechayhoraPageRoutingModule {}
