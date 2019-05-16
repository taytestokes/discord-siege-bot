const axios = require("axios");
const { baseURL } = require("../config/api");


//Service Function
const getRank = (username, receivedMessage) => {
    //make sure a username is entered
    if(!username) receivedMessage.channel.send('Please enter a user to rank search');
    //make a request to tabwire api to find the player
    axios.get(`${baseURL}?platform=uplay&search=${username}`)
        .then(response => {
            //check to see if there aren't any matches
            if(response.data.results === 0) receivedMessage.channel.send(`Player ${username} doesn't exists, please try again.`);
            //filter for the correct user
            let player = response.data.results.filter(user => user.p_name === username);
            //send the player information back
            receivedMessage.channel.send(`User: ${player[0].p_name} Current MMR: ${player[0].p_currentmmr} KD: ${player[0].kd}`);
        })
}

module.exports = {
    getRank
};