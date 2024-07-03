import {Client, Collection, Events, GatewayIntentBits, CommandInteraction, Partials, SlashCommandBuilder, REST, Routes} from "discord.js";
import {readdirSync} from "fs";
import * as path from "path";
import Config from "./config";

interface SlashCommand {
    data: SlashCommandBuilder;
    execute: (client: Client, interaction: CommandInteraction) => Promise<void>;
}

declare module "discord.js" {
    interface Client {
        slashCommands: Collection<string, SlashCommand>;
        slashDatas: any[];
    }
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.User],
    shards: "auto"
});

let commands : any = [];

const prepareSlashCommands = async () => {
    for (const file of readdirSync(path.join(__dirname, `./slash-commands`))) {
        if(file.endsWith(".d.ts")) continue;
        const command = await import(path.join(__dirname, `./slash-commands/${file}`));
        commands.push(command.default.data.toJSON());
    }
}

const prepareEvents = async () => {
    for (const file of readdirSync(path.join(__dirname, `./events`))) {
        if(file.endsWith(".d.ts")) continue;
        const event = await import(path.join(__dirname, `./events/${file}`));
        client.on(event.default.name, (...args) => event.default.execute(client, ...args));
    }
}

const rest = new REST().setToken(Config.DISCORD_BOT_TOKEN);

const registerSlashCommands = async () => {
    try {
        const data = await rest.put(
            Routes.applicationCommands(Config.DISCORD_CLIENT_ID),
            { body: commands },
        );

        console.log('Slash commands registered globally!');
      } catch (error) {
        console.error('Error registering slash commands globally:', error);
      }
}

const start = async () => {
    await prepareSlashCommands();
    await prepareEvents();
    await registerSlashCommands();
    await client.login(Config.DISCORD_BOT_TOKEN);
}

export default start;
export {
    SlashCommand,
};