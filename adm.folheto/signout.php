<?php 
session_start();
session_destroy();
header("location: /projetofolheto/adm.folheto/signin.php");
?>