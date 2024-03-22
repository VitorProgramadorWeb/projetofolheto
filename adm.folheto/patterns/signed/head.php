<?php // SIGNED

session_start();
$isSigned = isset($_SESSION["username"]);

if(!$isSigned) {
    header("location: /projetofolheto/adm.folheto/signin.php");
    exit("Não está logado.");
}

include "adm.folheto/patterns/_head.php";

?>