import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import sendNickname from "../utils/plugin";

const Command = {
    data: new SlashCommandBuilder()
        .setName('whitelist_add')
        .setDescription('Add a user to the whitelist.')
        .addStringOption(option => option.setName('nickname').setDescription('User nickname.').setRequired(true)),
    execute: async (client: Client, interaction: CommandInteraction) => {
        sendNickname(interaction.options.get('nickname')?.value as string);
    }
}

export default Command;