// function to process commands
function processCommand(receivedMessage) {
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
    } else if (primary == "stats") {
        getStats(arguments[0], receivedMessage);
    } else {
      receivedMessage.channel.send('Please try using the command "rank"');
    }
  }

  // exports
  module.exports = {
      processCommand
  };