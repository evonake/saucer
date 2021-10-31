import Discord from 'discord.js';

import Command from '../api/command';

const aliases = ['shutdown'];
const desc = 'shutdowns the bot';
const admin = true;

// function run(
//   args: string[],
//   msg: Discord.Message,
//   client: Discord.Client
// ): void {
//   msg.channel.send('shutting down bot');

//   client
//     .destroy()
//     .then(() => console.log(`${msg.author.username} shutdown the bot`));
// }

// export const shutdownCommand = new Command(aliases, desc, admin, run);

export class Shutdown extends Command {
  readonly aliases: string[] = aliases;
  readonly desc: string = desc;
  readonly admin: boolean = admin;

  run(args: string[], msg: Discord.Message, client: Discord.Client): void {
    msg.channel.send('shutting down bot');

    client
      .destroy()
      .then(() => console.log(`${msg.author.username} shutdown the bot`));
  }
}
