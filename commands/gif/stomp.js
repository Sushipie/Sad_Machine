const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stomp")
    .setDescription("Responds with stomping gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to stomp on")
        .setRequired(true)
    ),
  async execute(interaction) {
    await tenor.Search.Query("anime stomp on someone", "10").then((Results) => {
      const response = Results[Math.floor(Math.random() * Results.length)].url;

      // interaction.user is the object representing the User who ran the command
      // interaction.member is the GuildMember object, which represents the user in the specific guild
      interaction.reply(
        `${interaction.user} stomps on ${interaction.options.getUser(
          "user"
        )} ${response}`
      );
    });
  },
};
