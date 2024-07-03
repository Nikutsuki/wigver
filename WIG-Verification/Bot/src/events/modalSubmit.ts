import { CacheType, Client, Interaction, ModalSubmitInteraction } from "discord.js";
import Student from "../models/Student";
import SendVerificationMail from "../utils/mail";

async function verify_modal(client: Client<boolean>, interaction : ModalSubmitInteraction<CacheType>) {
    const minecraft_username = interaction.fields.getTextInputValue('minecraft_username');
    const email = interaction.fields.getTextInputValue('email');
    const name = interaction.fields.getTextInputValue('imie');
    const surname = interaction.fields.getTextInputValue('nazwisko');

    if(!minecraft_username || !email) return await interaction.reply({
        content: `Wystąpił błąd. Spróbuj ponownie.`,
        ephemeral: true
    });

    if(!(email.valueOf() as string).toLowerCase().endsWith("@student.pb.edu.pl")) {
        return await interaction.reply({
            content: `Mozesz uzyc tylko swojego uczelnianego e-maila w domenie @student.pb.edu.pl`,
            ephemeral: true
        });
    }

    const student = await Student.findOne({ discord_uid: interaction.user.id });
    if (student && !student.verified) {
        return await interaction.reply({
            content: `Już wysłałeś prośbę o weryfikację (e-mail: ${student.email}, minecraft_username: ${student.minecraft_username}). Sprawdź swoją skrzynkę pocztową.`,
            ephemeral: true
        });
    }

    if (student && student.verified) {
        return await interaction.reply({
            content: `Już zweryfikowałeś swoje konto.`,
            ephemeral: true
        });
    }

    const alreadyExists = await Student.findOne({
        $or: [
            { minecraft_username: (minecraft_username.valueOf() as string).toLowerCase() },
            { email: (email.valueOf() as string).toLowerCase()  },
        ]
    });

    if (alreadyExists) {
        return await interaction.reply({
            content: `Użytkownik o podanym nicku lub adresie e-mail już istnieje.`,
            ephemeral: true
        });
    }

    try {
        const code = Math.random().toString(36).substring(7);
        const newStudent = new Student({
            discord_uid: interaction.user.id,
            minecraft_username: (minecraft_username.valueOf() as string).toLowerCase(),
            email: (email.valueOf() as string).toLowerCase(),
            name: (name.valueOf() as string).toLowerCase(),
            surname: (surname.valueOf() as string).toLowerCase(),
            verified: false,
            verification_code: code,
        });

        await newStudent.save();

        try {
            await SendVerificationMail((email.valueOf() as string).toLowerCase(), code);
        } catch(err) {
            return await interaction.reply({
                content: `Wystąpił błąd przy wysyłaniu e-maila. Skontaktuj się z Administratorem.`,
                ephemeral: true
            });
        }

        await interaction.reply({
            content: `Wysłano prośbę o weryfikację. Sprawdź swoją skrzynkę pocztową.`,
            ephemeral: true
        });
    } catch (error) {
        return await interaction.reply({
            content: `Wystąpił błąd. Upewnij się, że podane przez Ciebie dane są poprawne i spróbuj ponownie.`,
            ephemeral: true
        });
    }
}

export default verify_modal;