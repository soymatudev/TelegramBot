let url = "https://telegram-bot-seven-pi.vercel.app/TelegramBot/Boty01.php";

let data = {
  update_id: 123456789,
  message: {
    message_id: 1,
    from: {
      id: 111111111,
      is_bot: false,
      first_name: "Juan",
      username: "juanuser",
    },
    chat: {
      id: 111111111,
      first_name: "Juan",
      username: "juanuser",
      type: "private",
    },
    date: 1689999999,
    text: "Hola bot",
  },
};

let options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
};

fetch(url, options)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
