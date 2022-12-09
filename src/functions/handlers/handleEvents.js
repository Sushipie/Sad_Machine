const fs = require("fs");
const { connection } = require("mongoose");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventsFolders = fs.readdirSync("./src/events");
    for (const folder of eventsFolders) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      //make a switch case for each folder
      switch (folder) {
        case "client":
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once) {
              client.once(event.name, (...args) => event.execute(...args));
            }

            client.on(event.name, (...args) => event.execute(...args));
          }
          break;

        case "mongo":
          for (const file of eventFiles) {
            const mongo = require(`../../events/${folder}/${file}`);
            if (mongo.once) {
              connection.once(mongo.name, (...args) => mongo.execute(...args));
            }

            connection.on(mongo.name, (...args) => mongo.execute(...args));
          }
          break;
        default:
          break;
        // console.log(`[Events Handler]; No event folder found with name "${folder}"`);
      }
    }
  };
};