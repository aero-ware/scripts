import { utils } from "@aeroware/aeroclient";
import { Command } from "@aeroware/aeroclient/dist/types";
import { MessageEmbed } from "discord.js";
import guilds from "../database/guild";

export default {
    name: "scripts",
    description: "View all scripts.",
    usage: "[name]",
    cooldown: 2,
    async callback({ message, args, client }) {
        const scripts = (await guilds.findById(message.guild?.id))!.scripts;

        if (args[0]) {
            const script = scripts.find((s) => s.name === args[0]);

            if (!script) return message.channel.send(`No scripts with that name were found.`);

            return message.channel.send(
                new MessageEmbed()
                    .setTitle(script.name)
                    .setColor("RANDOM")
                    .setDescription(`\`\`\`\n${script.script}\n\`\`\``)
            );
        }

        const color = Math.floor(Math.random() * 16777215).toString(16);

        if (!scripts.length)
            return message.channel.send(`**${message.guild?.name}** doesn't have any scripts!`);

        const pages = scripts.map((s, i) =>
            new MessageEmbed()
                .setTitle("All Scripts")
                .setColor(color)
                .setDescription(`**${s.name}**\n\`\`\`\n${s.script}\n\`\`\``)
                .setFooter(`page ${i + 1} out of ${scripts.length}`)
        );

        return utils.paginate(message, pages, {
            fastForwardAndRewind: {
                time: 10000,
            },
            goTo: {
                time: 10000,
            },
            time: 120000,
        });
    },
} as Command;
