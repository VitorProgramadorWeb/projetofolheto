<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title>Login</title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="/projetointegrador/styles/style.css">
    <link rel="stylesheet" href="/projetointegrador/styles/menu.css">
</head>
<body>

    <?php include "menu.php" ?>

    <form action="/projetointegrador/action_login.php" method="post">
        <h1>Login</h1>
        <input type="text" name="user" id="" placeholder="Usuário">
        <br>
        <input type="password" name="password" id="" placeholder="Senha">
        <br>
        <button type="submit">Entrar</button>
        <a href="#">Esqueceu a senha?</a>
    </form>

    <!-- ?php include "footer.php" ?> -->

</body>
</html>