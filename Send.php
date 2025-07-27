<?php
$url = "https://telegram-bot-seven-pi.vercel.app/TelegramBot/public/Boty01.php";

$data = [
    "update_id" => 123456789,
    "message" => [
        "message_id" => 1,
        "from" => [
            "id" => 111111111,
            "is_bot" => false,
            "first_name" => "Juan",
            "username" => "juanuser"
        ],
        "chat" => [
            "id" => 111111111,
            "first_name" => "Juan",
            "username" => "juanuser",
            "type" => "private"
        ],
        "date" => time(),
        "text" => "Hola bot desde PHP"
    ]
];

$options = [
    CURLOPT_URL => $url,
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
    CURLOPT_POSTFIELDS => json_encode($data),
];

$ch = curl_init();
curl_setopt_array($ch, $options);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "User-Agent: Mozilla/5.0"
]);
$response = curl_exec($ch);
curl_close($ch);

echo __LINE__ . " Respuesta del bot: " . $response;
?>
