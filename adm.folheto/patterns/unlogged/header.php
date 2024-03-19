<?php // UNLOGGED
function customHeader() {

    session_start();
    $isLogged = isset($_SESSION["username"]);

    if($isLogged) {
        header("location: /projetofolheto/adm.folheto/home.php");
        exit("Já está logado.");
    }

?>

<?php }
include "adm.folheto/patterns/_header.php";
include "adm.folheto/patterns/unlogged/menu.php";
?>