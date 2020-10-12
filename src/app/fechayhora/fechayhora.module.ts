import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FechayhoraPageRoutingModule } from './fechayhora-routing.module';

import { FechayhoraPage } from './fechayhora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FechayhoraPageRoutingModule
  ],
  declarations: [FechayhoraPage]
})
export class FechayhoraPageModule {}
