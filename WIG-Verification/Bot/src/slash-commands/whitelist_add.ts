import { Client, CommandInteraction, PermissionFlagsBits, PermissionsBitField, Role, SlashCommandBuilder, Snowflake } from "discord.js";
import sendNickname from "../utils/plugin";

const Command = {
    data: new SlashCommandBuilder()
        .setName('whitelist_add')
        .setDescription('Add a user to the whitelist.')
        .addStringOption(option => option.setName('nickname').setDescription('User nickname.').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    execute: async (client: Client, interaction: CommandInteraction) => {
        sendNickname(interaction.options.get('nickname')?.value as string);
        console.log(interaction.options.get('nickname')?.value as string);

        await interaction.reply({
            content: `User has been added to the whitelist.`,
            ephemeral: true
        });
    }
}

export default Command;