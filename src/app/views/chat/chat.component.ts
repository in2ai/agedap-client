import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

type Message = {
  type: 'user' | 'model';
  message: string;
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [],
})
export class ChatComponent implements OnInit {
  @ViewChild('chat') chat!: ElementRef;
  public headerHeight: number =
    document.getElementById('header')?.offsetHeight || 0;
  public chatLoaded: boolean = false;
  public form!: FormGroup;
  public messages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      message: [''],
    });

    this.loadChatSession();
  }

  async loadChatSession() {
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'create-chat-session',
      });
      this.chatLoaded = response.chatSession.loaded;
    } catch (error) {
      console.error(error);
      this.chatLoaded = false;
    }
  }

  async sendMessage() {
    const message = this.form.get('message')?.value;
    this.form.get('message')?.setValue('');
    if (!message) return;
    this.messages.push({ type: 'user', message });
    this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;

    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'send-message',
        message: message,
      });
      this.messages = response.chatSession.simplifiedChat;
      this.changeDetector.detectChanges();
      this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
    } catch (error) {
      console.log(error);
    }
  }
}
