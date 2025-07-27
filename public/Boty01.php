<?php

$token = "8024363859:AAE0AI1EXq7jGcrjeih170mPgEsd60Xg8vo";
$apiURL = "https://api.telegram.org/bot$token/sendMessage";

$update = json_decode(file_get_contents('php://input'), true);

$chat_id = $update['message']['chat']['id'];
$message = $update['message']['text'] ?? "";

if ($message) {
    $respuesta = "Hola, soy un bot de Telegram. ¿En qué puedo ayudarte?";
    file_get_contents("$apiURL?chat_id=$chat_id&text=" . urlencode($respuesta));
}

// curl -X GET "https://api.telegram.org/bot8024363859:AAE0AI1EXq7jGcrjeih170mPgEsd60Xg8vo/setWebhook?url=https://telegram-bot-seven-pi.vercel.app/TelegramBot/Boty01.php"

// curl --request GET --url "https://api.telegram.org/bot8024363859:AAE0AI1EXq7jGcrjeih170mPgEsd60Xg8vo/getWebhookInfo"


