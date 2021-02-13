import { Command } from "@aeroware/aeroclient/dist/types";
import guilds from "../database/guild";

export default {
    name: "new",
    description: "Create a new script!",
    minArgs: 2,
    usage: "<name> <code>",
    cooldown: 10,
    async callback({ message, args, client, text }) {
        const scripts = (await guilds.findById(message.guild?.id))!.scripts;

        if (scripts.length >= 25) {
            message.channel.send(
                `Oops! Your guild already has 25 scripts! Delete one to make a new script.`
            );
            return "invalid";
        }

        const name = args[0];

        if (!/[a-zA-Z0-9-]+/.test(name)) {
            message.channel.send(`Names can only contain alphanumeric characters and hypens.`);
            return "invalid";
        }

        const code = text
            .replace(new RegExp(`${client.defaultPrefix}${this.name}`, "sim"), "")
            .replace(/\w+/, "")
            .trim();

        console.log(code);

        if (!code.startsWith("```")) {
            message.channel.send(`Your code should be in a codeblock:
\\\`\\\`\\\`
code here
\\\`\\\`\\\``);
            return "invalid";
        }

        return;
    },
} as Command;
