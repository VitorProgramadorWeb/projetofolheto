<!DOCTYPE html>
<html lang="pt-BR">
<head>

    <title><?= isset($PAGE_TITLE) ? $PAGE_TITLE : "Projeto integrador" ?></title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="manifest" href="/projetofolheto/adm.folheto/manifest.json">

    <link rel="stylesheet" href="/projetofolheto/adm.folheto/styles/style.css">
    <link rel="stylesheet" href="/projetofolheto/adm.folheto/styles/form.css">
    <link rel="stylesheet" href="/projetofolheto/adm.folheto/styles/menu.css">

    <?php if (function_exists("customHeader")) customHeader(); ?>

</head>
<body>