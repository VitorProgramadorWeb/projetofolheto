<?php // UNLOGGED
function customHeader() {

    session_start();
    $isLogged = isset($_SESSION["username"]);

    if($isLogged) {
        header("location: /projetointegrador/home.php");
        exit("Já está logado.");
    }

?>

<?php }
include "patterns/_header.php";
include "patterns/unlogged/menu.php";
?>