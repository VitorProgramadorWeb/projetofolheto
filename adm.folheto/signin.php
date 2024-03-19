<?php 
$PAGE_TITLE = "Entrar";
include "adm.folheto/patterns/unlogged/header.php";
?>

    <nav>
        <ul>
            <?php if (function_exists("customMenu")) customMenu(); ?>
        </ul>
    </nav>

    <div class="sign-in">
        <h1>Entrar</h1>
        
        <form class="sign-in">
            <div class="field">
                <label for="username">Usuário</label>
                <input type="text" name="username" id="username" placeholder="Usuário">
            </div>
            <div class="field">
                <label for="password">Senha</label>
                <div class="password">
                    <input type="password" name="password" id="password" placeholder="Senha">
                    <button class="button" type="button" tabindex="-1" onclick="event.preventDefault(); togglePasswordVisibility(this);">Mostrar</button>
                </div>
            </div>
            <div id="message"></div>
            <input class="button" type="submit" value="Entrar">
        </form>

        <hr>

        <a href="/projetofolheto/adm.folheto/signup.php">Cadastrar-se</a>
        -
        <a href="#forgot-password">Esqueci minha senha</a>
    </div>

    <!-- ?php include "adm.folheto/footer.php" ?> -->

    <script src="/projetofolheto/adm.folheto/scripts/signin.js"></script>

</body>
</html>