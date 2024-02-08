<?php 
$PAGE_TITLE = "Login";
include "patterns/unlogged/header.php";
?>

<h1>Login</h1>

<form id="form" method="post">
    <input type="text" name="user" id="user" placeholder="Usuário">
    <br>
    <input type="password" name="password" id="password" placeholder="Senha">
    <br>
    <button type="submit">Entrar</button>
    <span id="message"></span>
</form>

    <!-- ?php include "footer.php" ?> -->

    <script src="/projetointegrador/scripts/login.js"></script>

</body>
</html>