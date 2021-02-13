import AeroClient from "@aeroware/aeroclient";
import { config as dotenv } from "dotenv";
import connect from "./database/connect";
import guilds from "./database/guild";

dotenv();

(async () => {
    try {
        await connect();

        const client = new AeroClient({
            token: process.env.TOKEN,
            prefix: "s!",
            commandsPath: "commands",
            allowSpaces: true,
            logChannel: "806540623850373180",
            disableStaffCooldowns: true,
            staff: ["508442553754845184"],
            responses: {},
        });

        client.use(async ({ message }, next, stop) => {
            if (!message.guild) return stop();

            const guild = await guilds.findById(message.guild.id);

            if (!guild)
                await guilds.create({
                    _id: message.guild.id,
                });

            return next();
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
