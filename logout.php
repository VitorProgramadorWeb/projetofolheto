<?php 
session_start();
session_destroy();
header("location: /projetointegrador/login.php");
?>