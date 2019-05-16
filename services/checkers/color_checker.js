// Rank Colors
const {
  copperColor,
  bronzeColor,
  silverColor,
  goldColor,
  platColor,
  diamondColor
} = require("../../assets/rank_colors");

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

module.exports = {
    rankColorChecker
};