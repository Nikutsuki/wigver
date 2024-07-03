import {ActionRowBuilder, CacheType, ChatInputCommandInteraction, Client, ModalActionRowComponentBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import {SlashCommand} from "../bot";
import Student from "../models/Student";
import SendVerificationMail from "../utils/mail";

const Command = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify your account.'),
    execute: async (client: Client, interaction: ChatInputCommandInteraction<CacheType>) => {
        try {
            const modal = new ModalBuilder().setCustomId('verify').setTitle('Weryfikacja konta');

            const minecraft_username = new TextInputBuilder().setCustomId('minecraft_username').setLabel('Nazwa użytkownika').setPlaceholder('Nazwa użytkownika').setRequired(true).setStyle(TextInputStyle.Short);
            const email = new TextInputBuilder().setCustomId('email').setLabel('E-mail').setPlaceholder("E-mail z domeny '@student.pb.edu.pl'").setRequired(true).setStyle(TextInputStyle.Short);
            const imie = new TextInputBuilder().setCustomId('imie').setLabel('Imię').setPlaceholder('Imię').setRequired(true).setStyle(TextInputStyle.Short);
            const nazwisko = new TextInputBuilder().setCustomId('nazwisko').setLabel('Nazwisko').setPlaceholder('Nazwisko').setRequired(true).setStyle(TextInputStyle.Short);
            
            const firstRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(minecraft_username);
            const secondRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(email);
            const thirdRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(imie);
            const fourthRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(nazwisko);
    
            modal.addComponents(firstRow, secondRow, thirdRow, fourthRow);
    
            const returnedModal = modal.toJSON();

            return await interaction.showModal(returnedModal);
        } catch(error) {
            console.error(error);
            await interaction.reply({ content: 'Przy wykonywaniu komendy wystąpił błąd. Skontaktuj się z Administratorem.', ephemeral: true });
        }
    }
} as SlashCommand;

export default Command;