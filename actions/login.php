<?php
include "actions/conn.php";
$conn = database_connection();

$user     = $_POST["user"];
$password = password_verify($_POST["password"], PASSWORD_DEFAULT);
$json = [
    "status" => "failure",
    "message" => ""
];

$sql = "SELECT id, password FROM users WHERE user = '$user'";
$stmt = $conn->prepare("SELECT id, user, password FROM users WHERE user = ? AND password = ?");
$stmt->bind_param("ss", $user, $password);
$stmt->execute();

$db_response = $stmt->get_result()->fetch_assoc();

if($db_response != null) {
    // authenticated
        session_start();
        $_SESSION["id"]   = $db_response["id"];
        $_SESSION["user"] = $user;

        $server_response = [
            "status"  => "authenticated",
            "message" => "Usuário autenticado."
        ];

} else {
    $server_response = [
        "status"  => "failure",
        "message" => "Usuário ou/e senha incorreto(s)"
    ];
}

$stmt->close();
echo json_encode($server_response, JSON_PRETTY_PRINT);

$conn->close();
?>