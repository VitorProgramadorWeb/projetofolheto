<?php 
session_start();
session_destroy();
header("location: /projetointegrador/signin.php");
?>