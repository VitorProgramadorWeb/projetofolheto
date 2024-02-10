<?php
include "actions/conn.php";

// session_start();
// $user      = $_SESSION["user"];
// $privilege = 777;

$action = $_GET["action"];

switch ($action) {
    case "create":
        $user      = $_POST["user"];
        $name      = $_POST["name"];
        $birthdate = $_POST["birthdate"] == "" ? null : $_POST["birthdate"];
        $address   = $_POST["address"];
        $email     = $_POST["email"];
        $phone     = $_POST["phone"];
        $cpf       = $_POST["cpf"];

        // Verifying if username already exists
        $sql = "SELECT id, user FROM users WHERE user = '$user'"; // WHERE privilege = '$privilege'
        $response = $conn->query($sql);
        if ($response->num_rows > 0) {

            echo json_encode(["invalidUser" => true]);

        } else {
            // Creating
            $sql = "INSERT INTO users(user, name,".($birthdate == null ? "" : " birthdate,")." address, email, phone, cpf) " . 
            "values('$user', '$name',".($birthdate == null ? "" : " 'birthdate',")." '$address', '$email', '$phone', '$cpf')";
            $conn->query($sql);
    
            // getting id
            $sql = "SELECT id, name, user FROM users WHERE user='$user'";
            $response = $conn->query($sql);
    
            if ($response != false) {
                $response = $response->fetch_assoc();
    
                echo json_encode([
                    "created" => true,
                    "id" => $response["id"],
                    "name" => $response["name"],
                    "user" => $response["user"]
                ]);
            } else {
                echo json_encode(["created" => false]);
            }
        }
        
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
        $id = $_GET["id"];

        $sql = "DELETE FROM users WHERE id='$id'";
        $response = $conn->query($sql);

        if ($response != false) {
            echo json_encode(["deleted" => true, "id" => $id]);
        } else {
            echo json_encode(["deleted" => false]);
        }
        break;
    
    default:
        # code...
        break;
}

$conn->close();
?>