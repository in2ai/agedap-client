import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { ConfigComponent } from './config.component';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  imports: [SharedModule, InputTextModule, TagModule, FileUploadModule],
  declarations: [ConfigComponent],
  exports: [ConfigComponent],
})
export class ConfigModule {}
