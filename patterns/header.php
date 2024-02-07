<?php 
session_start();
$isLogged = isset($_SESSION["user"]);
$currentFileName = basename($_SERVER["PHP_SELF"], ".php");

if($isLogged and $currentFileName != "home") {
    header("location: /projetointegrador/home.php");
    die("Já está logado.");
} else if (!$isLogged and $currentFileName == "home") {
    header("location: /projetointegrador/login.php");
    exit("Não está logado.");
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>

    <title><?= isset($PAGE_TITLE) ? $PAGE_TITLE : "Projeto integrador" ?></title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="/projetointegrador/styles/style.css">
    <link rel="stylesheet" href="/projetointegrador/styles/menu.css">

    <?php if (function_exists("customHeader")) customHeader(); ?>

</head>
<body>

    <?php include "patterns/menu.php" ?>

    <!-- ... -->
