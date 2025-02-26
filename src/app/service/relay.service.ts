import { Injectable } from '@angular/core';
import { Relay } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RelayService {
  async getRelays(): Promise<Relay[]> {
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'getRelays',
        page: 0,
        limit: 10,
      });
      const recoveredRelays: Relay[] =
        response.relays?.map((relay: any) => {
          return {
            id: relay.id,
            name: relay.name ?? '-',
            description: relay.description ?? '-',
            url: relay.url,
          };
        }) ?? [];
      return recoveredRelays;
    } catch (error) {
      throw new Error(`Error getting relays : ${error}`);
    }
  }
}
