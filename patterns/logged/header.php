<?php // LOGGED
function customHeader() {

    session_start();
    $isLogged = isset($_SESSION["user"]);

    if(!$isLogged) {
        header("location: /projetointegrador/login.php");
        exit("Não está logado.");
    }

?>
    <link rel="stylesheet" href="styles/table.css">
    <link rel="stylesheet" href="styles/windows.css">
<?php }
include "patterns/_header.php";
include "patterns/logged/menu.php";
?>