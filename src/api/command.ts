import Discord from 'discord.js';
import * as config from '../config.json';

class HelpMessage {
  readonly aliases: string[];
  readonly desc: string;
  readonly admin: boolean;

  constructor(aliases: string[], desc: string, admin: boolean) {
    this.aliases = aliases;
    this.desc = desc;
    this.admin = admin;
  }
}

export default abstract class Command {
  abstract readonly aliases: string[];
  abstract readonly desc: string;
  abstract readonly admin: boolean;

  abstract run(args: string[], msg: Discord.Message, client: Discord.Client): void;

  help(): HelpMessage {
    return new HelpMessage(this.aliases, this.desc, this.admin);
  }

  isTargetCommand(targetCommand: string): boolean {
    return this.aliases.includes(targetCommand);
  }

  canUseCommand(id: string): boolean {
    return config.ids.admins.includes(id);
  }
}
