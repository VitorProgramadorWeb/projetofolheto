<?php 
$PAGE_TITLE = "Cadastrar";
include "folheto/patterns/unsigned/header.php";
?>

    <nav>
        <ul>
            <?php if (function_exists("customMenu")) customMenu(); ?>
        </ul>
    </nav>

    <div class="sign-up">
        <h1>Cadastrar</h1>
        
        <form class="sign-up">
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
            <span id="message"></span>
            <input class="button" type="submit" value="Cadastrar">
        </form>
    </div>

    <script src="/projetofolheto/adm.folheto/scripts/signup.js"></script>
    <script src="/projetofolheto/adm.folheto/scripts/registry.js"></script>

</body>
</html>