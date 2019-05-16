const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./config/token");
const { getRank } = require("./services/api");

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
    proccessCommand(receivedMessage);
  }
});

function proccessCommand(receivedMessage) {
  //this is the full command for the message
  let fullCommand = receivedMessage.content.substr(1);
  //this is the full command split up by every word and put into an array
  let splitCommand = fullCommand.split(" ");
  //this is the primary command
  let primary = splitCommand[0];
  //this is the arguments for the command
  let arguments = splitCommand.slice(1);

  //check for the command
  if (primary == "rank") {
      getRank(arguments[0], receivedMessage);
  }else {
      receivedMessage.channel.send('Please try using the command "rank"');
  }

}

// Login to the bot using the token
client.login(token);
