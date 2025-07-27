/* curl -X POST https://telegram-bot-seven-pi.vercel.app/TelegramBot/Boty01.php \ 
  -H "Content-Type: application/json" \
  -d '{
    "update_id": 123456789,
    "message": {
      "message_id": 1,
      "from": {
        "id": 111111111,
        "is_bot": false,
        "first_name": "Juan",
        "username": "juanuser"
      },
      "chat": {
        "id": 111111111,
        "first_name": "Juan",
        "username": "juanuser",
        "type": "private"
      },
      "date": 1689999999,
      "text": "Hola bot"
    }
  }'
 */
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/TelegramBot/Boty01.php", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
module.exports = app;
// To run this server, use the command: node Send.js
// You can test it with the provided curl command or any HTTP client.
// Make sure to have express and body-parser installed in your project:
// npm install express body-parser
// This server will log the incoming request body to the console and respond with "OK".
// You can modify the response or add more functionality as needed.
// Note: Ensure that your server is accessible from the internet if you want to use it with Telegram.
// You may need to deploy it on a platform like Heroku, Vercel, or any other cloud service.
// Remember to replace the URL in your Telegram bot settings with the URL of this server.
// This code is a simple Express.js server that listens for POST requests at the specified endpoint.
// It is designed to handle incoming updates from a Telegram bot, logging the request body to the console.
// You can expand this code to handle different types of updates, such as messages, commands, etc.
// Make sure to handle errors and edge cases in a production environment.
// This code is a basic starting point for building a Telegram bot using Node.js and Express.
// You can enhance it by adding features like command handling, message processing, etc.
