<?php
include "actions/conn.php";

session_start();
// $user      = $_SESSION["user"];
// $privilege = 777;

$action = $_POST["action"];

switch ($action) {
    case "get":
        $table = $_POST["table"];
        $primary_key = $_POST["primary_key"];

        switch ($table) {
            case "users":
                if ($primary_key == "*") { // All
                    $sql = "SELECT * FROM $table"; // WHERE privilege = '$privilege'
                    $response = $conn->query($sql);
    
                    echo json_encode($response->fetch_all(MYSQLI_ASSOC));

                } else {
                    $sql = "SELECT * FROM $table WHERE id = '$primary_key'";
                    $response = $conn->query($sql);
    
                    echo json_encode($response->fetch_assoc());
                }
                break;
            
            case "suppliers":
                if ($primary_key == "*") { // All
                    $sql = "SELECT * FROM $table"; // WHERE privilege = '$privilege'
                    $response = $conn->query($sql);
    
                    echo json_encode($response->fetch_all(MYSQLI_ASSOC));

                } else {
                    $sql = "SELECT * FROM $table WHERE id = '$primary_key'";
                    $response = $conn->query($sql);
    
                    echo json_encode($response->fetch_assoc());
                }
                break;
            
            case "customers":
                if ($primary_key == "*") { // All
                    $sql = "SELECT * FROM $table"; // WHERE privilege = '$privilege'
                    $response = $conn->query($sql);
    
                    echo json_encode($response->fetch_all(MYSQLI_ASSOC));

                } else {
                    $sql = "SELECT * FROM $table WHERE id = '$primary_key'";
                    $response = $conn->query($sql);
    
                    echo json_encode($response->fetch_assoc());
                }
                break;
            
            default:
                echo json_encode([
                    "error" => "Table does not exists"
                ]);
        }
        break;

    default:
        echo json_encode([
            "error" => "Action does not exists"
        ]);
}

// switch ($action) {
//     case "create":
//         $user      = $_POST["user"];
//         $password  = $_POST["password"];
//         $name      = $_POST["name"];
//         $birthdate = $_POST["birthdate"] == "" ? null : $_POST["birthdate"];
//         $address   = $_POST["address"];
//         $email     = $_POST["email"];
//         $phone     = $_POST["phone"];
//         $cpf       = $_POST["cpf"];

//         // Verifying if username already exists
//         $sql = "SELECT id, user FROM users WHERE user = '$user'"; // WHERE privilege = '$privilege'
//         $response = $conn->query($sql);
//         if ($response->num_rows > 0) {

//             echo json_encode(["invalidUser" => true]);

//         } else {
//             // Creating
//             $sql = "INSERT INTO users(user, password, name,".($birthdate == null ? "" : " birthdate,")." address, email, phone, cpf) " . 
//             "values('$user', '$password', '$name',".($birthdate == null ? "" : " 'birthdate',")." '$address', '$email', '$phone', '$cpf')";
//             $conn->query($sql);
    
//             // getting id
//             $sql = "SELECT id, name, user FROM users WHERE user='$user'";
//             $response = $conn->query($sql);
    
//             if ($response != false) {
//                 $response = $response->fetch_assoc();
    
//                 echo json_encode([
//                     "created" => true,
//                     "id" => $response["id"],
//                     "name" => $response["name"],
//                     "user" => $response["user"]
//                 ]);
//             } else {
//                 echo json_encode(["created" => false]);
//             }
//         }
        
//         break;
        
//     case "list":
//         $sql = "SELECT id, name, user FROM users"; // WHERE privilege = '$privilege'
//         $response = $conn->query($sql);
        
//         echo json_encode($response->fetch_all(MYSQLI_ASSOC));
//         break;

//     case "edit":
//         $id      = $_POST["id"];
//         $user      = $_POST["user"];
//         $password  = $_POST["password"];
//         $name      = $_POST["name"];
//         $birthdate = $_POST["birthdate"] == "" ? null : $_POST["birthdate"];
//         $address   = $_POST["address"];
//         $email     = $_POST["email"];
//         $phone     = $_POST["phone"];
//         $cpf       = $_POST["cpf"];

//         $sql = "UPDATE users SET user = '$user', password = '$password', name = '$name', ".($birthdate == null ? "" :  "birthdate = '$birthdate', ")."address = '$address', email = '$email', phone = '$phone', cpf = '$cpf' WHERE id = '$id'";

//         echo json_encode([
//             "edited" => $conn->query($sql),
//             "id" => $id,
//             "name" => $name,
//             "user" => $user
//         ]);
//         break;

//     case "delete":
//         $id = $_POST["id"];

//         $sql = "DELETE FROM users WHERE id='$id'";
//         $response = $conn->query($sql);

//         if ($response != false) {
//             echo json_encode(["deleted" => true, "id" => $id, "sessionId" => $_SESSION["id"]]);
//         } else {
//             echo json_encode(["deleted" => false]);
//         }
//         break;
    
//     case "read":
//         $id = $_POST["id"];
//         $sql = "SELECT * FROM users WHERE id = '$id'";
//         $response = $conn->query($sql);

//         echo json_encode($response->fetch_assoc());
//         break;
// }

$conn->close();
?>