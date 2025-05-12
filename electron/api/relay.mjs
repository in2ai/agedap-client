import { useWebSocketImplementation } from 'nostr-tools/relay';
import WebSocket from 'ws';
useWebSocketImplementation(WebSocket);

import { Relay } from 'nostr-tools/relay';

export const getWorkOffers = async (relayUrl, lastTimeStamp /*, selectedIndustry*/) => {
  let timestamp = 0;
  //timestamp 10 characters
  if (lastTimeStamp) {
    timestamp = new Date(lastTimeStamp).getTime() / 1000;
    timestamp = Math.floor(timestamp);
    if (timestamp.toString().length > 10) {
      timestamp = timestamp.toString().slice(0, 10);
      timestamp = parseInt(timestamp);
    }
  }

  console.log('Fetching work offers from relay:', timestamp, relayUrl);
  return new Promise(async (resolve, reject) => {
    try {
      const relay = await Relay.connect(relayUrl);
      const workOffers = [];
      const sub = relay.subscribe(
        [
          {
            kinds: [30023],
            since: timestamp + 1,
            //'#t': [selectedIndustry],
          },
        ],
        {
          onevent(event) {
            console.log('Event received:', event);
            const newWorkOffer = JSON.parse(event.content);
            newWorkOffer.createdAt = event.created_at;
            newWorkOffer.nostrId = event.id;
            //newWorkOffer.industry = selectedIndustry;
            newWorkOffer.authorPublicKey = event.pubkey;
            workOffers.push(newWorkOffer);
          },
          oneose() {
            resolve(workOffers);
            sub.close();
          },
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
