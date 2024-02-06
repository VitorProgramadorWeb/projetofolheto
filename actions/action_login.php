<?php
include("actions/conn.php");

$user     = $_POST["user"];
$password = $_POST["password"];
$json = [
    "auth" => false,
    "message" => ""
];

$sql = "SELECT id, password FROM users WHERE user = '$user'";
$response = $conn->query($sql);

if($response->num_rows > 0) {
    //user found
    $user_data = $response->fetch_assoc();

    if($password == $user_data["password"]) {
        //correct password
        $json["auth"] = true;

        session_start();
        $_SESSION["user"] = $user;

    } else {
        $json["message"] = "Dados inválidos";
    }
} else {
    $json["message"] = "Dados inválidos";
}

echo json_encode($json);

$conn->close();
?>