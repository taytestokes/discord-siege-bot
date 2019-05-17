const axios = require("axios");
const Discord = require("discord.js");
const { baseURL, playerBaseURL } = require("../config/api");
const { rankColorChecker } = require("./checkers/color_checker");
const { rankChecker } = require("./checkers/rank_checker");

// Get Player Rank Information
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
        .setTitle(`Seasonal rank for: ${playerInfo.data.p_name}`)
        .setAuthor(`Player: ${playerInfo.data.p_name}`)
        .setColor(rankColorChecker(playerInfo.data.p_currentmmr))
        .setTimestamp()
        .setFooter("Thank you for using my siege discord bot")
        .setThumbnail(rankChecker(playerInfo.data.p_currentmmr))
        .addField("Current NA MMR:", `${playerInfo.data.p_NA_currentmmr}`, true)
        .addField("Current EU MMR:", `${playerInfo.data.p_EU_currentmmr}`, true)
        .addField("Current AS MMR:", `${playerInfo.data.p_AS_currentmmr}`, true)
        .addField("Max MMR:", `${playerInfo.data.p_maxmmr}`);
      //send the response from the bot
      receivedMessage.channel.send({ embed });
    })
    .catch(error => {
      if (error) throw error;
    });
};

// Get Player Stats Information
const getStats = (username, receivedMessage) => {
  // make user name exists
  if (!username) return "ERROR: user does not exist";
  // make a request to tabwire to get the players statistics
  axios
    .get(`${baseURL}?platform=uplay&search=${username}`)
    .then(response => {
      //filter through the results to only receive the player
      const player = response.data.results.filter(user => {
        if (user.p_name == username) {
          return user;
        }
      });
      // make another call to get more information about the player
      return axios.get(`${playerBaseURL}?p_id=${player[0].p_id}`);
    })
    .then(playerInfo => {
      //transform the kd into a decimal value
      const kdRating = JSON.stringify(playerInfo.data.kd)
        .split("")
        .map((num, index) => (index === 0 ? (num += ".") : num))
        .join("");
      // create an embeded message to send in discord
      const embed = new Discord.RichEmbed()
        .setTitle(`Seasonal stats for: ${playerInfo.data.p_name}`)
        .setAuthor(`Player: ${playerInfo.data.p_name}`)
        .setColor(rankColorChecker(playerInfo.data.p_currentmmr))
        .setTimestamp()
        .setFooter("Thank you for using my siege discord bot")
        .addField('Platform:', `${playerInfo.data.p_platform}`, true)
        .addField('Level:', `${playerInfo.data.p_level}`, true)
        .addField('Skill Rating:', `${playerInfo.data.p_skillrating}`, true)
        .addField('Total Games Played:', ` ${playerInfo.data.seasonal.total_rankedtotal}`, true)
        .addField('Ranked Wins:', `${playerInfo.data.seasonal.total_rankedwins}`, true)
        .addField('Ranked Losses:', `${playerInfo.data.seasonal.total_rankedlosses}`, true)
        .addField('Total Ranked Kills:', `${playerInfo.data.seasonal.total_rankedkills}`, true)
        .addField('Total Ranked Deaths:', `${playerInfo.data.seasonal.total_rankeddeaths}`, true)
        .addField('KD Ratio:', `${kdRating}`, true)
      // send a message back from the bot
      receivedMessage.channel.send({embed});  
    });
};

module.exports = {
  getRank,
  getStats
};
