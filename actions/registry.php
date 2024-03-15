<?php
include "actions/conn.php";

session_start();
// $username      = $_SESSION["username"];
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
                $sql = "SELECT * FROM users"; // WHERE privilege = '$privilege'
                $db_response = $conn->query($sql);

                return json_encode($db_response->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);

            } else {
                $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $db_response = $stmt->get_result();

                $stmt->close();
                return json_encode($db_response->fetch_assoc(), JSON_PRETTY_PRINT);

            }
            break;
        
        case "suppliers":
            if ($id == "*") { // All
                $sql = "SELECT * FROM suppliers"; // WHERE privilege = '$privilege'
                $db_response = $conn->query($sql);

                return json_encode($db_response->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);

            } else {
                $stmt = $conn->prepare("SELECT * FROM suppliers WHERE id = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $db_response = $stmt->get_result();

                $stmt->close();
                return json_encode($db_response->fetch_assoc(), JSON_PRETTY_PRINT);

            }
            break;
        
        case "customers":
            if ($id == "*") { // All
                $sql = "SELECT * FROM customers"; // WHERE privilege = '$privilege'
                $db_response = $conn->query($sql);

                return json_encode($db_response->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);

            } else {
                $stmt = $conn->prepare("SELECT * FROM customers WHERE id = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $db_response = $stmt->get_result();

                $stmt->close();
                return json_encode($db_response->fetch_assoc(), JSON_PRETTY_PRINT);

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
            $id        = isset($_POST["id"]) ? $_POST["id"] : null;
            $username      = isset($_POST["username"]) ? $_POST["username"] : null;
            $password  = isset($_POST["password"]) ? $_POST["password"] : null;
            $hashed_password  = password_hash($password, PASSWORD_DEFAULT);
            $name      = isset($_POST["name"]) ? $_POST["name"] : null;
            $birthdate = isset($_POST["birthdate"]) ? $_POST["birthdate"] : null;
            $address   = isset($_POST["address"]) ? $_POST["address"] : null;
            $email     = isset($_POST["email"]) ? $_POST["email"] : null;
            $phone     = isset($_POST["phone"]) ? $_POST["phone"] : null;
            $cpf       = isset($_POST["cpf"]) ? $_POST["cpf"] : null;
            
            // Update (Edit)
            if ($id != "") {
                
                $stmt = $conn->prepare("UPDATE users SET username = ?, password = ?, name = ?, birthdate = ?, address = ?, email = ?, phone = ?, cpf = ? WHERE id = ?");
                $stmt->bind_param("ssssssssi", $username, $create_password, $name, $birthdate, $address, $email, $phone, $cpf, $id);
                $db_response_status = $stmt->execute();

                $server_response = [
                    "status"  => $db_response_status ? "edited": "failure",
                    "message" => $db_response_status ? "Usuário editado com sucesso.": "Falha ao editar usuário."
                ];
                if ($db_response_status) {
                    $stmt->prepare("SELECT * FROM users WHERE id = ?");
                    $stmt->bind_param("i", $id);
                    $stmt->execute();

                    $db_response = $stmt->get_result()->fetch_assoc();

                    // append user info:
                    $server_response["registry"] = [
                        "id"        => $db_response["id"],
                        "username"  => $db_response["username"],
                        "password"  => $db_response["password"],
                        "name"      => $db_response["name"],
                        "birthdate" => $db_response["birthdate"],
                        "address"   => $db_response["address"],
                        "email"     => $db_response["email"],
                        "phone"     => $db_response["phone"],
                        "cpf"       => $db_response["cpf"]
                    ];
                }

                $stmt->close();
                return json_encode($server_response, JSON_PRETTY_PRINT);

            // Insert (Create)
            } else {
                //Verifying if username already exists
                $stmt = $conn->prepare("SELECT id, username FROM users WHERE username = ?"); // WHERE privilege = '$privilege'
                $stmt->bind_param("s", $username);
                $stmt->execute();

                $db_response = $stmt->get_result();

                if ($db_response->num_rows > 0) {
                    $stmt->close();
                    return json_encode([
                        "status"  => "failure",
                        "message" => "Nome de usuário já existe."
                    ], JSON_PRETTY_PRINT);

                } else {
                    $stmt = $conn->prepare("INSERT INTO users(username, password, name, birthdate, address, email, phone, cpf) values(?, ?, ?, ?, ?, ?, ?, ?)"); // WHERE privilege = '$privilege'
                    $stmt->bind_param("ssssssss", $username, $hashed_password, $name, $birthdate, $address, $email, $phone, $cpf);
                    $db_response = $stmt->execute();
                    
                    $server_response = [
                        "status"  => $db_response ? "created": "failure",
                        "message" => $db_response ? "Usuário criado com sucesso.": "Falha ao criar usuário."
                    ];
                    if ($db_response) {
                        $stmt->prepare("SELECT * FROM users WHERE username = ?");
                        $stmt->bind_param("s", $username);
                        $stmt->execute();

                        $db_response = $stmt->get_result()->fetch_assoc();
    
                        // append user info:
                        $server_response["registry"] = [
                            "id"        => $db_response["id"],
                            "username"  => $db_response["username"],
                            "password"  => $db_response["password"],
                            "name"      => $db_response["name"],
                            "birthdate" => $db_response["birthdate"],
                            "address"   => $db_response["address"],
                            "email"     => $db_response["email"],
                            "phone"     => $db_response["phone"],
                            "cpf"       => $db_response["cpf"]
                        ];
                    }
    
                    $stmt->close();
                    return json_encode($server_response, JSON_PRETTY_PRINT);
                }
            }

            break;

        case "suppliers":
            $id      = $_POST["id"];
            $name    = $_POST["name"];
            $address = $_POST["address"];
            $email   = $_POST["email"];
            $phone   = $_POST["phone"];
            
            // Update (Edit)
            if ($id != "") {
                
                $stmt = $conn->prepare("UPDATE suppliers SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?");
                $stmt->bind_param("ssssi", $name, $address, $email, $phone, $id);
                $db_response_status = $stmt->execute();

                $server_response = [
                    "status"  => $db_response_status ? "edited": "failure",
                    "message" => $db_response_status ? "Fornecedor editado com sucesso.": "Falha ao editar fornecedor."
                ];
                if ($db_response_status) {
                    $stmt->prepare("SELECT * FROM suppliers WHERE id = ?");
                    $stmt->bind_param("i", $id);
                    $stmt->execute();

                    $db_response = $stmt->get_result()->fetch_assoc();

                    // append supplier info:
                    $server_response["registry"] = [
                        "id"      => $db_response["id"],
                        "name"    => $db_response["name"],
                        "address" => $db_response["address"],
                        "email"   => $db_response["email"],
                        "phone"   => $db_response["phone"]
                    ];
                }

                $stmt->close();
                return json_encode($server_response, JSON_PRETTY_PRINT);

            // Insert (Create)
            } else {
                $stmt = $conn->prepare("INSERT INTO suppliers(name, address, email, phone) values(?, ?, ?, ?)"); // WHERE privilege = '$privilege'
                $stmt->bind_param("ssss", $name, $address, $email, $phone);
                $db_response = $stmt->execute();
                
                $server_response = [
                    "status"  => $db_response ? "created": "failure",
                    "message" => $db_response ? "Fornecedor criado com sucesso.": "Falha ao criar fornecedor."
                ];
                if ($db_response) {
                    $stmt->prepare("SELECT * FROM suppliers WHERE name = ? AND address = ? AND email = ? AND phone = ?");
                    $stmt->bind_param("ssss", $name, $address, $email, $phone);
                    $stmt->execute();

                    $db_response = $stmt->get_result()->fetch_assoc();

                    // append supplier info:
                    $server_response["registry"] = [
                        "id"      => $db_response["id"],
                        "name"    => $db_response["name"],
                        "address" => $db_response["address"],
                        "email"   => $db_response["email"],
                        "phone"   => $db_response["phone"]
                    ];
                }

                $stmt->close();
                return json_encode($server_response, JSON_PRETTY_PRINT);
            }

            break;

        case "customers":
            $id      = $_POST["id"];
            $name    = $_POST["name"];
            $address = $_POST["address"];
            $email   = $_POST["email"];
            $phone   = $_POST["phone"];
            
            // Update (Edit)
            if ($id != "") {
                
                $stmt = $conn->prepare("UPDATE customers SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?");
                $stmt->bind_param("ssssi", $name, $address, $email, $phone, $id);
                $db_response_status = $stmt->execute();

                $server_response = [
                    "status"  => $db_response_status ? "edited": "failure",
                    "message" => $db_response_status ? "Cliente editado com sucesso.": "Falha ao editar cliente."
                ];
                if ($db_response_status) {
                    $stmt->prepare("SELECT * FROM customers WHERE id = ?");
                    $stmt->bind_param("i", $id);
                    $stmt->execute();

                    $db_response = $stmt->get_result()->fetch_assoc();

                    // append customer info:
                    $server_response["registry"] = [
                        "id"      => $db_response["id"],
                        "name"    => $db_response["name"],
                        "address" => $db_response["address"],
                        "email"   => $db_response["email"],
                        "phone"   => $db_response["phone"]
                    ];
                }

                $stmt->close();
                return json_encode($server_response, JSON_PRETTY_PRINT);

            // Insert (Create)
            } else {
                $stmt = $conn->prepare("INSERT INTO customers(name, address, email, phone) values(?, ?, ?, ?)"); // WHERE privilege = '$privilege'
                $stmt->bind_param("ssss", $name, $address, $email, $phone);
                $db_response = $stmt->execute();
                
                $server_response = [
                    "status"  => $db_response ? "created": "failure",
                    "message" => $db_response ? "Cliente criado com sucesso.": "Falha ao criar cliente."
                ];
                if ($db_response) {
                    $stmt->prepare("SELECT * FROM customers WHERE name = ? AND address = ? AND email = ? AND phone = ?");
                    $stmt->bind_param("ssss", $name, $address, $email, $phone);
                    $stmt->execute();

                    $db_response = $stmt->get_result()->fetch_assoc();

                    // append customer info:
                    $server_response["registry"] = [
                        "id"      => $db_response["id"],
                        "name"    => $db_response["name"],
                        "address" => $db_response["address"],
                        "email"   => $db_response["email"],
                        "phone"   => $db_response["phone"]
                    ];
                }

                $stmt->close();
                return json_encode($server_response, JSON_PRETTY_PRINT);
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

function deleteRegistry($table, $id) {
    $conn = database_connection();

    switch ($table) {
        case "users":
            $stmt = $conn->prepare("DELETE FROM users WHERE id=?"); // WHERE privilege = '$privilege'
            $stmt->bind_param("i", $id);
            $stmt->execute();

            $db_response = $stmt->execute();

            if ($db_response) {
                $stmt->close();
                return json_encode([
                    "status"  => "deleted",
                    "message" => "Usuário excluido com sucesso."
                ], JSON_PRETTY_PRINT);

            } else {
                $stmt->close();
                return json_encode([
                    "status"  => "failure",
                    "message" => "Não foi possível excluir o usuário."
                ], JSON_PRETTY_PRINT);

            }
            break;

        case "suppliers":
            $stmt = $conn->prepare("DELETE FROM suppliers WHERE id=?"); // WHERE privilege = '$privilege'
            $stmt->bind_param("i", $id);
            $stmt->execute();

            $db_response = $stmt->execute();

            if ($db_response) {
                $stmt->close();
                return json_encode([
                    "status"  => "deleted",
                    "message" => "Fornecedor excluido com sucesso."
                ], JSON_PRETTY_PRINT);

            } else {
                $stmt->close();
                return json_encode([
                    "status"  => "failure",
                    "message" => "Não foi possível excluir o fornecedor."
                ], JSON_PRETTY_PRINT);

            }
            break;

        case "customers":
            $stmt = $conn->prepare("DELETE FROM customers WHERE id=?"); // WHERE privilege = '$privilege'
            $stmt->bind_param("i", $id);
            $stmt->execute();

            $db_response = $stmt->execute();

            if ($db_response) {
                $stmt->close();
                return json_encode([
                    "status"  => "deleted",
                    "message" => "Cliente excluido com sucesso."
                ], JSON_PRETTY_PRINT);

            } else {
                $stmt->close();
                return json_encode([
                    "status"  => "failure",
                    "message" => "Não foi possível excluir o cliente."
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