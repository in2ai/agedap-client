import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [SharedModule, InputTextModule],
  declarations: [ChatComponent],
  exports: [ChatComponent],
})
export class ChatModule {}
