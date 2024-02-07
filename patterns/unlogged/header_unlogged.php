<?php
function customHeader() {

    session_start();
    $isLogged = isset($_SESSION["user"]);

    if($isLogged) {
        header("location: /projetointegrador/home.php");
        exit("Já está logado.");
    }

?>

<?php }
include "patterns/header.php";
include "patterns/unlogged/menu_unlogged.php";
?>