const axios = require("axios");
const Discord = require('discord.js');
const client = new Discord.Client();
const { baseURL, playerBaseURL } = require("../config/api");

// Rank Images
const copperFour = 'https://i.imgur.com/deTjm7V.png';
const copperThree = 'https://i.imgur.com/zx5KbBO.png';
const copperTwo = 'https://i.imgur.com/RTCvQDV.png';
const copperOne = 'https://i.imgur.com/SN55IoP.png';

const bronzeFour = 'https://i.imgur.com/DmfZeRP.png';
const bronzeThree = 'https://i.imgur.com/QOuIDW4.png';
const bronzeTwo = 'https://i.imgur.com/ry1KwLe.png';
const bronzeOne = 'https://i.imgur.com/64eQSbG.png';

const silverFour = 'https://i.imgur.com/fOmokW9.png';
const silverThree = 'https://i.imgur.com/e84XmHl.png';
const silverTwo = 'https://i.imgur.com/f68iB99.png';
const silverOne = 'https://i.imgur.com/iQGr0yz.png';

const goldFour = 'https://i.imgur.com/DelhMBP.png';
const goldThree = 'https://i.imgur.com/5fYa6cM.png';


//Service Function
const getRank = (username, receivedMessage) => {
    //make sure a username is entered
    if(!username) receivedMessage.channel.send('Please enter a user to rank search');
    //make a request to tabwire api to find the player
    axios.get(`${baseURL}?platform=uplay&search=${username}`)
        .then(response => {
            console.log(response.data)
            //check to see if there aren't any matches
            if(response.data.results === 0) receivedMessage.channel.send(`Player ${username} doesn't exists, please try again.`);
            //filter for the correct user
            let player = response.data.results.filter(user => user.p_name === username);
            //make another request to get more user information based off of their id
            return axios.get(`${playerBaseURL}?p_id=${player[0].p_id}`);
        })
        .then(playerInfo => {
            //infomormation about the user is now stored in playerInfo.data
            console.log(playerInfo.data)
            //create an embeded object to send as a styled message
            const embed = new Discord.RichEmbed()
                .setTitle(`Seasonal Rank Stats for ${playerInfo.data.p_name}`)
                .setAuthor(`Siege Bot`, ``)
            
            //send the response from the bot
            receivedMessage.channel.send({embed});
        });
};

module.exports = {
    getRank
};