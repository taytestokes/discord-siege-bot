const axios = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();
const { baseURL, playerBaseURL } = require("../config/api");

// Rank Images
const {
  copperFour,
  copperThree,
  copperTwo,
  copperOne,
  bronzeFour,
  bronzeThree,
  bronzeTwo,
  bronzeOne,
  silverFour,
  silverThree,
  silverTwo,
  silverOne,
  goldFour,
  goldThree,
  goldTwo,
  goldOne,
  platThree,
  platTwo,
  platOne,
  diamond
} = require("../assets/rank_icons");

// Rank Colors
const {
  copperColor,
  bronzeColor,
  silverColor,
  goldColor,
  platColor,
  diamondColor
} = require("../assets/rank_colors");

// Rank Color Checker
const rankColorChecker = currentMMR => {
  //check if there isn't a currentMMR passed
  if(!currentMMR) return 'ERROR: currentMMR not found!'
  //check for the players current mmr to return the rank color
  if (currentMMR < 1700) {
    return copperColor;
  } else if (currentMMR < 2099 && currentMMR > 1699) {
      return bronzeColor;
  } else if(currentMMR < 2499 && currentMMR > 2098){
      return silverColor;
  } else if(currentMMR < 3299 && currentMMR > 2498){
      return goldColor;
  } else if (currentMMR < 4500 && currentMMR > 3298){
      return platColor;
  } else if(currentMMR > 4499){
      return diamondColor
  };
};

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
        .setColor(rankColorChecker(playerInfo.data.p_currentmmr));
      //send the response from the bot
      receivedMessage.channel.send({ embed });
    });
};

module.exports = {
  getRank
};
