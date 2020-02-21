import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
//import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
		MatButtonModule,
		MatStepperModule,
		//MatFormFieldModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatCheckboxModule,
		MatButtonModule,
		MatStepperModule,
		//MatFormFieldModule
  ]
})
export class MaterialDesignModule { }
