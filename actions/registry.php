<?php
include "actions/conn.php";

session_start();
// $user      = $_SESSION["user"];
// $privilege = 777;

$action = $_POST["action"];
switch ($action) {
    case "get":
        $table = $_POST["table"];
        $id = $_POST["id"];

        echo getRegistry($table, $id);
        break;
    
    case "set":
        $table = $_POST["table"];

        echo setRegistry($table);
        break;
    
    case "delete":
        $table = $_POST["table"];
        $id = $_POST["id"];

        echo deleteRegistry($table, $id);
        break;
    
    default:
        echo json_encode([
            "status"  => "failure",
            "message" => "Action does not exists."
        ], JSON_PRETTY_PRINT);
        break;
}





function getRegistry($table, $id) {
    $conn = database_connection();

    switch ($table) {
        case "users":
            if ($id == "*") { // All
                $sql = "SELECT * FROM $table"; // WHERE privilege = '$privilege'
                $response = $conn->query($sql);

                return json_encode($response->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);

            } else {
                $sql = "SELECT * FROM $table WHERE id = '$id'";
                $response = $conn->query($sql);

                return json_encode($response->fetch_assoc(), JSON_PRETTY_PRINT);

            }
            break;
        
        case "suppliers":
            if ($id == "*") { // All
                $sql = "SELECT * FROM $table"; // WHERE privilege = '$privilege'
                $response = $conn->query($sql);

                return json_encode($response->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);

            } else {
                $sql = "SELECT * FROM $table WHERE id = '$id'";
                $response = $conn->query($sql);

                return json_encode($response->fetch_assoc(), JSON_PRETTY_PRINT);

            }
            break;
        
        case "customers":
            if ($id == "*") { // All
                $sql = "SELECT * FROM $table"; // WHERE privilege = '$privilege'
                $response = $conn->query($sql);

                return json_encode($response->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);

            } else {
                $sql = "SELECT * FROM $table WHERE id = '$id'";
                $response = $conn->query($sql);

                return json_encode($response->fetch_assoc(), JSON_PRETTY_PRINT);

            }
            break;
        
        default:
            return json_encode([
                "status"  => "failure",
                "message" => "Table does not exists."
            ], JSON_PRETTY_PRINT);
            break;
    }

    $conn->close();
}

function setRegistry($table) {
    $conn = database_connection();

    switch ($table) {
        case "users":
            $id        = $_POST["id"];
            $user      = $_POST["user"];
            $password  = $_POST["password"];
            $name      = $_POST["name"];
            $birthdate = $_POST["birthdate"];
            $address   = $_POST["address"];
            $email     = $_POST["email"];
            $phone     = $_POST["phone"];
            $cpf       = $_POST["cpf"];
            
            // Update (Edit)
            if ($id != "") {

                $sql = "UPDATE users SET user = '$user', password = '$password', name = '$name', ".($birthdate == "" ? "" :  "birthdate = '$birthdate', ")."address = '$address', email = '$email', phone = '$phone', cpf = '$cpf' WHERE id = '$id'";
                $db_response = $conn->query($sql);

                $server_response = [
                    "status"  => $db_response ? "edited": "failure",
                    "message" => $db_response ? "Usuário editado com sucesso.": "Falha ao editar usuário."
                ];
                if ($db_response) {
                    $sql = "SELECT * FROM $table WHERE user = '$user'";
                    $db_response = $conn->query($sql)->fetch_assoc();

                    // append user info:
                    $server_response["registry"] = [
                        "id"        => $db_response["id"],
                        "user"      => $db_response["user"],
                        "password"  => $db_response["password"],
                        "name"      => $db_response["name"],
                        "birthdate" => $db_response["birthdate"],
                        "address"   => $db_response["address"],
                        "email"     => $db_response["email"],
                        "phone"     => $db_response["phone"],
                        "cpf"       => $db_response["cpf"]
                    ];
                }

                return json_encode($server_response, JSON_PRETTY_PRINT);

            // Insert (Create)
            } else {
                //Verifying if username already exists
                $sql = "SELECT id, user FROM users WHERE user = '$user'"; // WHERE privilege = '$privilege'
                $db_response = $conn->query($sql);
                if ($db_response->num_rows > 0) {

                    return json_encode([
                        "status"  => "failure",
                        "message" => "Nome de usuário já existe."
                    ], JSON_PRETTY_PRINT);

                } else {
                    $sql = "INSERT INTO users(user, password, name,".($birthdate == "" ? "" : " birthdate,")." address, email, phone, cpf) " . 
                    "values('$user', '$password', '$name',".($birthdate == "" ? "" : " 'birthdate',")." '$address', '$email', '$phone', '$cpf')";
                    $db_response = $conn->query($sql);
                    
                    $server_response = [
                        "status"  => $db_response ? "created": "failure",
                        "message" => $db_response ? "Usuário criado com sucesso.": "Falha ao criar usuário."
                    ];
                    if ($db_response) {
                        $sql = "SELECT * FROM $table WHERE user = '$user'";
                        $db_response = $conn->query($sql)->fetch_assoc();
    
                        // append user info:
                        $server_response["registry"] = [
                            "id"        => $db_response["id"],
                            "user"      => $db_response["user"],
                            "password"  => $db_response["password"],
                            "name"      => $db_response["name"],
                            "birthdate" => $db_response["birthdate"],
                            "address"   => $db_response["address"],
                            "email"     => $db_response["email"],
                            "phone"     => $db_response["phone"],
                            "cpf"       => $db_response["cpf"]
                        ];
                    }
    
                    return json_encode($server_response, JSON_PRETTY_PRINT);
                }
            }

            break;
        
        default:
            return json_encode([
                "status"  => "failure",
                "message" => "Table does not exists"
            ], JSON_PRETTY_PRINT);
            break;
    }

    $conn->close();
}

function deleteRegistry($table, $primary_key) {
    $conn = database_connection();

    switch ($table) {
        case "users":
            $id = $primary_key;

            $sql = "DELETE FROM users WHERE id='$id'";
            $response = $conn->query($sql);

            if ($response) {
                return json_encode([
                    "status"  => "deleted",
                    "message" => "Usuário excluido com sucesso."
                ], JSON_PRETTY_PRINT);

            } else {
                return json_encode([
                    "status"  => "failure",
                    "message" => "Não foi possível excluir o usuário."
                ], JSON_PRETTY_PRINT);

            }
            break;
        
        default:
            return json_encode([
                "status"  => "failure",
                "message" => "Table does not exists"
            ], JSON_PRETTY_PRINT);
            break;
    }
    
    $conn->close();
}

?>