<?php // UNSIGNED
function custom_head() {

    session_start();
    $isSigned = isset($_SESSION["username"]);

    if($isSigned) {
        header("location: /projetofolheto/folheto/home.php");
        exit("Já está logado.");
    }

?>

<?php }
include "folheto/patterns/_head.php";
include "folheto/patterns/unsigned/menu.php";
?>