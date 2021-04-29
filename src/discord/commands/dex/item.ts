import {Permissions, MessageEmbed} from "discord.js";
import type {ICommand} from "../../../types/commands";
import * as dex from "@pkmn/dex";
import {Generations} from "@pkmn/data";

module.exports = {
  desc: "Gets the information about a Pok\u{00e9}mon Item. Items without competitive" +
    " implications may not be included.",
  commandPermissions: [Permissions.FLAGS.SEND_MESSAGES],
  aliases: ["pokeitem"],
  usage: "<Pok\u{00e9}mon Item Name>",
  async command(message, args) {
    const [gen, newArgs] = Utilities.getGen(args);
    args = newArgs;

    const gens = new Generations(dex.Dex);
    const Dex = gens.get(gen as dex.GenerationNum);

    const item = Dex.items.get(args[0]);

    if (!item?.exists) {
      return message.channel.send(
        Utilities.failureEmoji(
          message,
          `Unable to find any Item matching "${
            args[0]
          }" for Generation ${gen}! (Check your spelling?)`
        )
      ).catch(e => console.error(e));
    }

    if (Utilities.checkBotPermissions(message, Permissions.FLAGS.EMBED_LINKS)) {
      const embed = new MessageEmbed()
        .setTitle(`[Gen ${gen}] ${item.name}`)
        .setDescription(`${item.desc || item.shortDesc}\n\nIntroduced in Gen ${item.gen}`)
        .setFooter(await Utilities.getFullVersionString());


      message.channel.send({embed: embed}).catch(console.error);
    } else {
      // Can't send embed, fall back to text only
      return message.channel.send(
        `\`\`\`${
          Utilities.generateDashes(`[Gen ${gen}] ${item.name}`)
        }\n\n${item.desc || item.shortDesc}\n\nIntroduced in Gen ${item.gen}\`\`\``
      ).catch(e => console.error(e));
    }
  },
} as ICommand;
