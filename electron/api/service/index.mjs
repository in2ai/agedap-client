import { workOffersService } from './workOffers/service.mjs';

let chatController = {
  started: false,
  chat: null,
  workspace: null,
  event: null,
  interval: null,
};

export async function startChatService(event, chat) {
  if (chatController.started) return;

  chatController = {
    started: true,
    chat: chat,
    event: event,
    interval: null,
  };

  if (chat && chat.type && chat.type === 'plugin' && chat.plugin) {
    switch (chat.plugin) {
      case 'workOffers': {
        const timer = await workOffersService(chatController);
        chatController.interval = timer;
        break;
      }
    }
  }
}

export async function stopChatService() {
  if (chatController.interval) clearInterval(chatController.interval);

  chatController = {
    started: false,
    chat: null,
    workspace: null,
    event: null,
    interval: null,
  };
}
