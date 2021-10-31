import Discord from 'discord.js';
import sagiri from 'sagiri';

import Command from '../api/command';

const aliases = ['sauce', 's'];
const desc = 'finds sauce of an uploaded image or link';
const admin = false;

const sagiriAPI = 'ec20a4e8a7dbd6eaad4a07aa5c9f04d76a6e42b6';

export class Sauce extends Command {
  readonly aliases: string[] = ['sauce', 's'];
  readonly desc: string = 'finds sauce of a link';
  readonly admin: boolean = false;

  sauceClient = sagiri(sagiriAPI, { results: 1 });

  async run(
    args: string[],
    msg: Discord.Message,
    client: Discord.Client
  ): Promise<void> {
    let sim_filter = true
    let req_amount = 0;
    let req_link = '';
    if (!isNaN(parseInt(args[1]))) {
      req_amount = parseInt(args[1]);
      req_link = args[2];
      sim_filter = false
    } else {
      req_amount = 3;
      req_link = args[1] ? args[1] : msg.attachments.array()[0].url;
    }
    const results = await this.sauceClient(req_link);

    const embedMsg: Discord.RichEmbed = new Discord.RichEmbed()
      .setColor('DARK_BLUE');

    // change to while loop that checks similarity is greater than 50% and i < length of results
    let c = 0;
    let i = 0;
    while (i < results.length && i < req_amount) {
      const site = results[i].site;
      const url = results[i].url;
      const similarity = results[i].similarity;

      if (sim_filter && similarity < 50) {
        break;
      }
      embedMsg.addField(`${c + 1}. ${site} (${similarity}%):`, url);
      c++;
      i++;
    }

    if (c > 0) {
      embedMsg.setTitle('Sauce Found!');
      msg.channel.send(embedMsg);
    } else {
      msg.channel.send('No Sauce Found.');
    }
  }
}
