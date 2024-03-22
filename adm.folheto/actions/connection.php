<?php 

// Conexão com o banco de dados
function database_connection() {
    $DATABASE_HOSTNAME = "localhost";
    $DATABASE_USERNAME = "root";
    $DATABASE_PASSWORD = "";
    $DATABASE_NAME     = "folheto";
    
    $conn = new mysqli($DATABASE_HOSTNAME, $DATABASE_USERNAME, $DATABASE_PASSWORD, $DATABASE_NAME);
    
    if ($conn->connect_errno) {
        echo "Falha ao conectar ao MySQL: " . $conn->connect_error;
        exit();
    }

    return $conn;
}

?>