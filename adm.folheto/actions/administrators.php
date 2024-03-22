<?php

// Database connection
include "adm.folheto/actions/connection.php";
$conn = database_connection();

// Administrator data
$id       = $_POST["id"];
$username = $_POST["username"];
$password = $_POST["password"];
$image    = $_POST["image"];

// Execute action
$action = $_POST["action"];
switch ($action) {

    case "create": echo createAdministrator(); break;
    case "read":   echo readAdministrator();   break;
    case "update": echo updateAdministrator(); break;
    case "delete": echo deleteAdministrator(); break;
    
    default:
        echo json_encode([
            "status"  => "failure",
            "message" => "Action does not exists."
        ], JSON_PRETTY_PRINT);
        break;
}

// -------------------- functions --------------------

function verifyImage($image) {

}

// -------------------- CRUD Functions --------------------

function createAdministrator() {

    // Database connection
    global $conn;

    // Administrator data
    global $username, $password, $image;
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $conn->prepare("INSERT INTO administrators(image, username, password) VALUES (?, ?, ?)");
        $stmt->bind_param("bss", $image, $username, $hashed_password);
        if ($_FILES["image"]["tmp_name"] != "") {
            $stmt->send_long_data(0, file_get_contents($_FILES["image"]["tmp_name"]));
        }
        $db_response = $stmt->execute();
    } catch (\Throwable $th) {
        $server_response = [
            "status"  => "error",
            "message" => $th->__toString()
        ];

        return json_encode($server_response, JSON_PRETTY_PRINT);
    }
    
    $server_response = [
        "status"  => $db_response ? "created": "failure",
        "message" => $db_response ? "Administrador criado com sucesso.": "Falha ao criar administrador."
    ];
    if ($db_response) {
        $stmt->prepare("SELECT * FROM administrators WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();

        try {
            $db_response = $stmt->get_result()->fetch_assoc();
        } catch (\Throwable $th) {
            $server_response = [
                "status"  => "error",
                "message" => $th->getMessage()
            ];

            return json_encode($server_response, JSON_PRETTY_PRINT);
        }

        // append user info:
        $server_response["data"] = [
            "id"        => $db_response["id"],
            "image"     => base64_encode($db_response["image"]),
            "username"  => $db_response["username"],
            "password"  => $db_response["password"]
        ];
    }

    $stmt->close();
    return json_encode($server_response, JSON_PRETTY_PRINT);
}

function readAdministrator() {

    // Database connection
    global $conn;

    // Administrator data
    global $id;

    if ($id == "*") { // All
        $stmt = $conn->prepare("SELECT * FROM administrators");
        $stmt->execute();
        $db_response = $stmt->get_result();
        $server_response = $db_response->fetch_all(MYSQLI_ASSOC);
        for ($i=0; $i < count($server_response); $i++) { 
            foreach ($server_response[$i] as $column => $value) {
                if ($column == "image") {
                    $server_response[$i][$column] = base64_encode($value);
                }
            }
        }

        return json_encode($server_response, JSON_PRETTY_PRINT);

    } else {
        $stmt = $conn->prepare("SELECT * FROM administrators WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $db_response = $stmt->get_result();
        $server_response = $db_response->fetch_assoc();
        foreach ($server_response as $column => $value) {
            if ($column == "image") {
                $server_response[$column] = base64_encode($value);
            }
        }

        $stmt->close();
        return json_encode($server_response, JSON_PRETTY_PRINT);

    }
}

function updateAdministrator() {

    // Database connection
    global $conn;

    // Administrator data
    global $id, $username, $password, $image;
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("UPDATE administrators SET image = ?, username = ?, password = ? WHERE id = ?");
    $stmt->bind_param("bssi", $image, $username, $hashed_password, $id);
    if ($_FILES["image"]["tmp_name"] != "") {
        $stmt->send_long_data(0, file_get_contents($_FILES["image"]["tmp_name"]));
    }
    $db_response_status = $stmt->execute();

    $server_response = [
        "status"  => $db_response_status ? "updated": "failure",
        "message" => $db_response_status ? "Administrador editado com sucesso.": "Falha ao editar administrador."
    ];
    if ($db_response_status) {
        $stmt->prepare("SELECT * FROM administrators WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        $db_response = $stmt->get_result()->fetch_assoc();

        // append user info:
        $server_response["data"] = [
            "id"       => $db_response["id"],
            "image"    => $db_response["image"],
            "username" => $db_response["username"],
            "password" => $db_response["password"]
        ];
    }

    $stmt->close();
    return json_encode($server_response, JSON_PRETTY_PRINT);
}

function deleteAdministrator() {

    // Database connection
    global $conn;

    // Administrator data
    global $id;

    $stmt = $conn->prepare("DELETE FROM administrators WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $db_response = $stmt->execute();

    if ($db_response) {
        $stmt->close();
        return json_encode([
            "status"  => "deleted",
            "message" => "Administrador excluido com sucesso."
        ], JSON_PRETTY_PRINT);

    } else {
        $stmt->close();
        return json_encode([
            "status"  => "failure",
            "message" => "Não foi possível excluir o administrador."
        ], JSON_PRETTY_PRINT);

    }
}

?>