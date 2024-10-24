import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TypeofPipe } from '../@shared/pipes/typeof.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ValueDataPipe } from './pipes/value-data.pipe';
import { BooleanDataPipe } from './pipes/boolean-data.pipe';

@NgModule({
  declarations: [TypeofPipe, ValueDataPipe, BooleanDataPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    TypeofPipe,
    ValueDataPipe,
    BooleanDataPipe,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class SharedModule {}
