require('module-alias/register');
const Server = require('@modules/Server/Server')
const port = process.env.PORT || 80;

const instance = new Server(port);

instance.start();
/*
  Logs message to the console with timestamp
*/
function log(message) {
  var date = new Date();

  if (typeof message == "object") {
    console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " : ");
    console.log(message);
  } else {
      console.log(
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " : " + message
      );
  }

}
