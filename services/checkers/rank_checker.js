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
  } = require("../../assets/rank_icons");

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

  module.exports = {
      rankChecker
  };