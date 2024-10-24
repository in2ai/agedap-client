import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

    this.execNode('create-chat-session');
    (window as any).electronAPI.onNodeCodeResponse(
      (event: any, response: any) => {
        switch (response.func) {
          case 'create-chat-session':
            console.log(response);
            alert('created chat session: ' + response.chatSession.loaded);

            this.chatLoaded = response.chatSession.loaded;
            this.changeDetector.detectChanges();
            break;
          case 'send-message':
            this.messages = response.chatSession.simplifiedChat;
            this.changeDetector.detectChanges();
            break;
          default:
            break;
        }
      }
    );
  }

  execNode(func: string = 'test') {
    (window as any).electronAPI.runNodeCode({ func: func });
  }

  sendMessage() {
    const message = this.form.get('message')?.value;
    console.log('message: ', message);
    (window as any).electronAPI.runNodeCode({
      func: 'send-message',
      message: message,
    });
    this.form.get('message')?.setValue('');
  }
}
