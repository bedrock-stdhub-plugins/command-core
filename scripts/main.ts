// Do not change this part - critical in plugin bundling
import { StdhubPluginApi } from 'stdhub-plugin-api';
export const pluginName = process.env.PLUGIN_NAME!;
export const api = new StdhubPluginApi(pluginName);

import { system, world } from '@minecraft/server';
import { initPermCommand } from './perm-command';

api.readRootConfig({
  commandPrefix: '.'
}).then(({ commandPrefix }) => {
  world.beforeEvents.chatSend.subscribe(event => {
    if (!event.message.startsWith(commandPrefix)) {
      return;
    }

    const commandString = event.message.slice(commandPrefix.length);
    const [ commandName ] = commandString.split(' ', 2);

    // The system.run is important here!
    // You cannot call any async functions in the event handling scope.
    system.run(() => {
      api.postJson(
        `${api.backendAddress}/command/submit`,
        {
          playerId: event.sender.id,
          playerName: event.sender.name,
          playerIsOp: event.sender.isOp(),
          commandString
        }
      ).then(({ response: { status } }) => {
        if (status === 404 || status === 403) {
          event.sender.sendMessage(
            `§cUnknown command: ${commandName}. Please check that the command exists and you have permission to use it.`
          );
        }
      });
    });
  });
});

initPermCommand();