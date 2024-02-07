<?php
function customHeader() {

    session_start();
    $isLogged = isset($_SESSION["user"]);

    if(!$isLogged) {
        header("location: /projetointegrador/login.php");
        exit("Não está logado.");
    }

?>

<?php }
include "patterns/header.php";
include "patterns/logged/menu_logged.php";
?>