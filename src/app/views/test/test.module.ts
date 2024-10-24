import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';
import { TestComponent } from './test.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [SharedModule, InputTextModule],
  declarations: [TestComponent],
  exports: [TestComponent],
})
export class TestModule {}
