import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyPageRoutingModule } from './privacy-routing.module';

import { PrivacyPage } from './privacy.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PrivacyPageRoutingModule,
    TranslateModule,
    FormsModule,
  ],
  declarations: [PrivacyPage]
})
export class PrivacyPageModule {}
