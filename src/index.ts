import * as config from './config.json';
import { commands } from './commands/index';

import * as Discord from 'discord.js';

const client: Discord.Client = new Discord.Client();

// bot startup
client.on('ready', async (): Promise<void> => {
  console.log('bot is ready');
});

let blockList: string[] = [];
// on message
client.on('message', async (message: Discord.Message): Promise<void> => {
  // runs handleCommand if is a command
  if (message.content.startsWith(config.prefix)) {
    return handleCommand(message);
  }
});

function handleCommand(message: Discord.Message): void {
  // sets requested command and requested args
  const reqCommand: string = message.content
    .split(' ')[0]
    .slice(config.prefix.length)
    .toLowerCase();
  const reqArgs: string[] = message.content.split(' ');
  reqArgs[0] = reqCommand;

  // whether or not any command executed
  let commandCalled = false;

  // loops through all commands in ./commands to find correct command
  for (const commandName of commands) {
    // continues to next commandName if is not correct command
    if (!commandName.isTargetCommand(reqCommand)) {
      continue;
    }
    commandCalled = true;

    // checks if author can use target command
    if (!commandName.canUseCommand(message.author.id)) {
      message.channel.send('you do not have permissions to use that command');

      // breaks loop if can't use command
      return;
    }

    // tries to run
    try {
      commandName.run(reqArgs, message, client);
    } catch (err) {
      console.log(err);
    }
  }

  if (!commandCalled) {
    message.channel.send('command not found');
  }
}

client.login(config.token);
