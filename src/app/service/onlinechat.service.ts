import { Injectable } from '@angular/core';
import { OnlineChat } from '../models/onlinechat';

@Injectable({
  providedIn: 'root',
})
export class OnlineChatService {
  async getOnlineChats(): Promise<OnlineChat[]> {
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'getOnlineChats',
        page: 0,
        limit: 10,
      });
      const recoveredOnlineChats: OnlineChat[] =
        response.onlinechats?.map((ws: any) => {
          return {
            id: ws.id,
            recipientId: ws.recipientId ?? '-',
            createdAt: ws.createdAt,
            updatedAt: ws.updatedAt,
          };
        }) ?? [];
      return recoveredOnlineChats;
    } catch (error) {
      throw new Error(`Error getting onlinechats: ${error}`);
    }
  }
}
