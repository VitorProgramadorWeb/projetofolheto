<?php
include "actions/conn.php";
$conn = database_connection();

$user     = $_POST["user"];
$password = $_POST["password"];

$sql = "SELECT id, password FROM users WHERE user = '$user'";
$stmt = $conn->prepare("SELECT id, user, password FROM users WHERE user = ?");
$stmt->bind_param("s", $user);
$stmt->execute();

$db_response = $stmt->get_result()->fetch_assoc();

if($db_response != null) {
    // user found

    if (password_verify($password, $db_response["password"])) {
        // authenticated

        session_start();
        $_SESSION["id"]   = $db_response["id"];
        $_SESSION["user"] = $db_response["user"];
        $_SESSION["hashed_password"] = $db_response["password"];

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