import { Message } from "discord.js";

const Event = {
    name: "messageCreate",
    execute: async (message : Message) => {
        if (message.author.bot) return;

        if (message.channelId !== "1258156105159147533") return;
    }
};

export default Event;