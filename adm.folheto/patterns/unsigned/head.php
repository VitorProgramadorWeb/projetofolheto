<?php // UNSIGNED

session_start();
$isSigned = isset($_SESSION["username"]);

if($isSigned) {
    header("location: /projetofolheto/adm.folheto/index.php");
    exit("Já está logado.");
}

include "adm.folheto/patterns/_head.php";

?>