import Discord from 'discord.js';

import Command from '../api/command';

import { commands } from './index';

const aliases = ['help', 'h'];
const desc = 'sends help message';
const admin = false;

export class Help extends Command {
  readonly aliases: string[] = aliases;
  readonly desc: string = desc;
  readonly admin: boolean = admin;

  run(args: string[], msg: Discord.Message, client: Discord.Client): void {
    const embedMsg: Discord.RichEmbed = new Discord.RichEmbed()
      .setColor('DARK_RED')
      .setTitle('Help Message');

    for (const command of commands) {
      const helpMsg = command.help();
      const perms = helpMsg.admin;

      // admin commands are italicized
      embedMsg.addField(
        `${perms ? '_' : ''}${helpMsg.aliases.join(', ')}${perms ? '_' : ''}`,
        helpMsg.desc
      );
    }

    msg.channel.send(embedMsg);
  }
}
