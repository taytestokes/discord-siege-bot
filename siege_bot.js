const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./config/token");
const { processCommand } = require('./services/commands');


//On Connection
client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
  //Set the bots activity
  client.user.setActivity("for commands", { type: "WATCHING" });
});

//On Messages
client.on("message", receivedMessage => {
  //this will make sure the bot doesn't reply to itself
  if (receivedMessage.author.id == client.user.id) return;
  //check to see if the message is a command
  if (receivedMessage.content.startsWith("!")) {
    processCommand(receivedMessage);
  }
});

// Login to the bot using the token
client.login(token);
