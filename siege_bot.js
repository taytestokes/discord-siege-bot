const { token } = require("./config/token");

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);

  //Set the bots activity
  client.user.setActivity("for commands", { type: "WATCHING" });

  //Get the general channel
  let generalChannel = client.channels.get("578378241614807042");
});

client.on("message", receivedMessage => {
  //this will make sure the bot doesn't reply to itself
  if (receivedMessage.author.id == client.user.id) return;

  receivedMessage.channel.send("Nice");
});

client.login(token);
