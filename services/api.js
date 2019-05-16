const axios = require("axios");
const Discord = require("discord.js");
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
  if (!currentMMR) return "ERROR: currentMMR not found!";
  //check for the players current mmr to return the rank color
  if (currentMMR < 1700) {
    return copperColor;
  } else if (currentMMR < 2099 && currentMMR > 1699) {
    return bronzeColor;
  } else if (currentMMR < 2499 && currentMMR > 2098) {
    return silverColor;
  } else if (currentMMR < 3299 && currentMMR > 2498) {
    return goldColor;
  } else if (currentMMR < 4500 && currentMMR > 3298) {
    return platColor;
  } else if (currentMMR > 4499) {
    return diamondColor;
  } else {
    return;
  }
};

const rankChecker = currentMMR => {
  //check if there isn't a currentMMR
  if (!currentMMR) return "ERROR: currentMMR not found!";
  //check for the players current mmr and return their rank
  if (currentMMR < 1400) {
    return copperFour;
  } else if (currentMMR < 1500 && currentMMR > 1399) {
    return copperThree;
  } else if (currentMMR < 1600 && currentMMR > 1499) {
    return copperTwo;
  } else if (currentMMR < 1700 && currentMMR > 1599) {
    return copperOne;
  } else if (currentMMR < 1800 && currentMMR > 1699) {
    return bronzeFour;
  } else if (currentMMR < 1900 && currentMMR > 1799) {
    return bronzeThree;
  } else if (currentMMR < 2000 && currentMMR > 1899) {
    return bronzeTwo;
  } else if (currentMMR < 2100 && currentMMR > 1999) {
    return bronzeOne;
  } else if (currentMMR < 2200 && currentMMR > 2099) {
    return silverFour;
  } else if (currentMMR < 2300 && currentMMR > 2199) {
    return silverThree;
  } else if (currentMMR < 2400 && currentMMR > 2299) {
    return silverTwo;
  } else if (currentMMR < 2500 && currentMMR > 2399) {
    return silverOne;
  } else if (currentMMR < 2700 && currentMMR > 2499) {
    return goldFour;
  } else if (currentMMR < 2900 && currentMMR > 2699) {
    return goldThree;
  } else if (currentMMR < 3100 && currentMMR > 2899) {
    return goldTwo;
  } else if (currentMMR < 3300 && currentMMR > 3099) {
    return goldOne;
  } else if (currentMMR < 3700 && currentMMR > 3299) {
    return platThree;
  } else if (currentMMR < 4100 && currentMMR > 3699) {
    return platTwo;
  } else if (currentMMR < 4500 && currentMMR > 4099) {
    return platOne;
  } else if (currentMMR > 4499) {
    return diamond;
  }
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
