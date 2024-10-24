import { NgModule } from '@angular/core';
import { ViewsComponent } from './views.component';
import { CommonModule } from '@angular/common';
import { ViewsRoutingModule } from './views-routing.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [ViewsComponent],
  imports: [CommonModule, LayoutModule, ViewsRoutingModule],
})
export class ViewsModule {}
