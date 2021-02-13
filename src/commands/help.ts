import { Command } from "@aeroware/aeroclient/dist/types";
import { MessageEmbed } from "discord.js";
import ms from "ms";

export default {
    name: "help",
    description: "Help yourself!",
    usage: "[command]",
    cooldown: 1,
    async callback({ message, args, client }) {
        const prefix = message.guild
            ? (await client.prefixes.get(message.guild?.id)) ||
              client.clientOptions.prefix ||
              client.defaultPrefix
            : client.clientOptions.prefix || client.defaultPrefix;

        if (!args.length) {
            return message.channel.send(
                new MessageEmbed()
                    .setTitle("Help")
                    .setColor("RANDOM")
                    .setDescription(
                        `Use \`${prefix}help <command>\` for info on a specific command!\n\`\`\`\n${client.commands
                            .map((c) => c.name)
                            .join(
                                "\n"
                            )}\n\`\`\`\nJoin [AeroWare](https://discord.gg/Vs4rfsfd4q) for updates, news, and support.`
                    )
                    .setTimestamp(message.createdAt)
            );
        }

        const name = args[0].toLowerCase();
        const command =
            client.commands.get(name) ||
            client.commands.find((c) => !!(c.aliases && c.aliases.includes(name)));

        if (!command) {
            message.channel.send(`I couldn't find the command \`${name}\`!`);
            return "invalid";
        }

        return message.channel.send(
            new MessageEmbed()
                .setTitle(command.name)
                .addField("Description", command.description || "None")
                .addField(
                    "Usage",
                    `\`${prefix}${command.name}${command.usage ? " " + command.usage : ""}\``
                )
                .addField(
                    "Cooldown",
                    ms((command.cooldown || 0) * 1000, {
                        long: true,
                    })
                )
                .setColor("RANDOM")
                .setTimestamp(message.createdAt)
        );
    },
} as Command;
