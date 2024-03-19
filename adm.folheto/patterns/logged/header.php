<?php // LOGGED
function customHeader() {

    session_start();
    $isLogged = isset($_SESSION["username"]);

    if(!$isLogged) {
        header("location: /projetofolheto/adm.folheto/signin.php");
        exit("Não está logado.");
    }

?>
    <link rel="stylesheet" href="styles/table.css">
    <link rel="stylesheet" href="styles/window.css">
<?php }
include "adm.folheto/patterns/_header.php";
include "adm.folheto/patterns/logged/menu.php";
?>