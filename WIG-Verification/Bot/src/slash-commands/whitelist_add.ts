import { Client, CommandInteraction, PermissionFlagsBits, PermissionsBitField, Role, SlashCommandBuilder, Snowflake } from "discord.js";
import sendNickname from "../utils/plugin";

const Command = {
    data: new SlashCommandBuilder()
        .setName('whitelist_add')
        .setDescription('Add a user to the whitelist.')
        .addStringOption(option => option.setName('nickname').setDescription('User nickname.').setRequired(true)),
    execute: async (client: Client, interaction: CommandInteraction) => {
        const member_roles = interaction.member?.roles as Array<Snowflake>;

        if(member_roles.find(role => role === '1176280926112723025') === undefined) {
            await interaction.reply({
                content: `You do not have permission to use this command.`,
                ephemeral: true
            });
            return;
        }

        sendNickname(interaction.options.get('nickname')?.value as string);
        console.log(interaction.options.get('nickname')?.value as string);

        await interaction.reply({
            content: `User has been added to the whitelist.`,
            ephemeral: true
        });
    }
}

export default Command;