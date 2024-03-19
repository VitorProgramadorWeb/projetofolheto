<?php
include "adm.folheto/actions/conn.php";
$conn = database_connection();

$username = $_POST["username"];
$password = $_POST["password"];

$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();

$db_response = $stmt->get_result()->fetch_assoc();

if($db_response != null) {
    // user found

    if (password_verify($password, $db_response["password"])) {
        // authenticated

        session_start();
        $_SESSION["id"]   = $db_response["id"];
        $_SESSION["username"] = $db_response["username"];
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