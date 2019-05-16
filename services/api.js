const axios = require("axios");
const Discord = require("discord.js");
const { baseURL, playerBaseURL } = require("../config/api");
const { rankColorChecker } = require("./checkers/color_checker");
const { rankChecker } = require("./checkers/rank_checker");

// Get Player Rank Iformation
const getRank = (username, receivedMessage) => {
  //make sure a username is entered
  if (!username)
    receivedMessage.channel.send("Please enter a user to rank search");
  //make a request to tabwire api to find the player
  axios
    .get(`${baseURL}?platform=uplay&search=${username}`)
    .then(response => {
      //check to see if there aren't any matches
      if (response.data.results === 0)
        receivedMessage.channel.send(
          `Player ${username} doesn't exists, please try again.`
        );
      //filter for the correct user
      let player = response.data.results.filter(
        user => user.p_name === username
      );
      //make another request to get more user information based off of their id
      return axios.get(`${playerBaseURL}?p_id=${player[0].p_id}`);
    })
    .then(playerInfo => {
      //infomormation about the user is now stored in playerInfo.data
      console.log(playerInfo.data);
      //create an embeded object to send as a styled message
      const embed = new Discord.RichEmbed()
        .setTitle(`Seasonal rank stats for: ${playerInfo.data.p_name}`)
        .setAuthor(`Player: ${playerInfo.data.p_name}`)
        .setColor(rankColorChecker(playerInfo.data.p_currentmmr))
        .setTimestamp()
        .setFooter("Thank you for using my siege discord bot");

      //send the response from the bot
      receivedMessage.channel.send({ embed });
    });
};

module.exports = {
  getRank
};
