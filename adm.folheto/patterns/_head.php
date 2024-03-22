<!DOCTYPE html>
<html lang="pt-BR">
<head>

    <link rel="shortcut icon" href="/projetofolheto/adm.folheto/images/folheto.ico" type="image/x-icon">

    <title><?php echo isset($PAGE_TITLE) ? $PAGE_TITLE : "Folheto"; ?></title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="/projetofolheto/adm.folheto/styles/style.css">
    
    <?php if (function_exists("custom_head")) custom_head(); ?>

</head>