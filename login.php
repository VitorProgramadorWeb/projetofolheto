<?php 
$PAGE_TITLE = "Login";
include "patterns/unlogged/header.php";
?>

    <div class="sign-in">
        <h1>Login</h1>
        
        <form id="form" method="post">
            <div class="field">
                <label for="user">Usuário</label>
                <input type="text" name="user" id="user" placeholder="Usuário">
            </div>
            <div class="field">
                <label for="password">Senha</label>
                <div class="password">
                    <input type="password" name="password" id="password" placeholder="Senha">
                    <button type="button" tabindex="-1" onclick="event.preventDefault(); togglePasswordVisibility(this);">Mostrar</button>
                </div>
            </div>
            <span id="message"></span>
            <input type="submit" value="Entrar">
        </form>

        <hr>

        <a href="#sign-up">Cadastrar-se</a>
        -
        <a href="#forgot-password">Esqueci minha senha</a>
    </div>

    <!-- ?php include "footer.php" ?> -->

    <script src="/projetointegrador/scripts/login.js"></script>

</body>
</html>