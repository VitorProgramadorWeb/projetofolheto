<?php // UNSIGNED
function custom_head() {

    session_start();
    $isLogged = isset($_SESSION["username"]);

    if($isLogged) {
        header("location: /projetofolheto/adm.folheto/home.php");
        exit("Já está logado.");
    }

?>

<?php }
include "folheto/patterns/_head.php";
include "folheto/patterns/unsigned/menu.php";
?>