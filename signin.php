<?php 
$PAGE_TITLE = "Entrar";
include "patterns/unlogged/header.php";
?>

    <div class="sign-in">
        <h1>Entrar</h1>
        
        <form class="sign-in">
            <div class="field">
                <label for="user">Usuário</label>
                <input type="text" name="user" id="user" placeholder="Usuário">
            </div>
            <div class="field">
                <label for="password">Senha</label>
                <div class="password">
                    <input type="password" name="password" id="password" placeholder="Senha">
                    <button class="button" type="button" tabindex="-1" onclick="event.preventDefault(); togglePasswordVisibility(this);">Mostrar</button>
                </div>
            </div>
            <span id="message"></span>
            <input class="button" type="submit" value="Entrar">
        </form>

        <hr>

        <a href="/projetointegrador/signup.php">Cadastrar-se</a>
        -
        <a href="#forgot-password">Esqueci minha senha</a>
    </div>

    <!-- ?php include "footer.php" ?> -->

    <script src="/projetointegrador/scripts/signin.js"></script>

</body>
</html>