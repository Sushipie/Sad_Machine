const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("stop").setDescription("Stops the current track and clears the queue."),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guild.id);

        const embed = new EmbedBuilder();
        embed.setColor("Random");

        if (!queue || !queue.playing) {
            embed.setDescription(`There isn't currently any music playing.`);
        } else {
            queue.destroy();
            embed.setDescription("The music has been stopped.");
        }

        return await interaction.reply({ embeds: [embed] });
    },
};