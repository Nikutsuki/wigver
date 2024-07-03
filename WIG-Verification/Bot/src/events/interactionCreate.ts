import { Client, Interaction, Events, CommandInteraction } from "discord.js";
import verify_modal from "./modalSubmit";

const Event = {
    name: Events.InteractionCreate,
    execute: async (client: Client, interaction: Interaction) => {
        if (interaction.isCommand()) {
            const command = interaction.client.slashCommands.get(interaction.commandName);
            if (!command) return;
    
            try {
                await command.execute(client, interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Przy wykonywaniu komendy wystąpił błąd. Skontaktuj się z Administratorem.', ephemeral: true });
            }
        }

        if (interaction.isModalSubmit()) {
            if(interaction.customId === 'verify') {
                await verify_modal(client, interaction);
            }
        }

        if (interaction.user.bot) return;
    }
}

export default Event;