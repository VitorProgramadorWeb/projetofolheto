<?php
include "actions/conn.php";

// session_start();
// $user      = $_SESSION["user"];
// $privilege = 777;

$action = $_GET["action"];

switch ($action) {
    case "create":
        # code...
        break;
        
    case "list":
        $sql = "SELECT id, name, user FROM users"; // WHERE privilege = '$privilege'
        $response = $conn->query($sql);
        
        echo json_encode($response->fetch_all(MYSQLI_ASSOC));
        break;

    case "edit":
        # code...
        break;

    case "delete":
        # code...
        break;
    
    default:
        # code...
        break;
}

$conn->close();
?>