import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlineChat } from 'src/app/models/onlinechat';

@Component({
  selector: 'app-onlinechat',
  templateUrl: './onlinechat.component.html',
  styles: [':host { width: 100%; }'],
  imports: [CommonModule],
})
export class OnlineChatComponent implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  onlineChatId: string = '';
  onlineChat!: OnlineChat;

  constructor() {}

  ngOnInit(): void {
    this.onlineChatId = this.activatedRoute.snapshot.params['chatId'] ?? '';
    this.load();
  }

  async load() {
    if (!this.onlineChatId) return;

    try {
      //this.onlineChatId = await this.workSpaceService.getWorkSpace(this.workSpaceId);
    } catch (error) {
      console.log(error);
    }
  }
}
