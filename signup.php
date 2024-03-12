<?php 
$PAGE_TITLE = "Cadastrar";
include "patterns/unlogged/header.php";
?>

    <div class="sign-up">
        <h1>Cadastrar</h1>
        
        <form class="sign-up">
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
            <input class="button" type="submit" value="Cadastrar">
        </form>
    </div>

    <!-- ?php include "footer.php" ?> -->

    <script src="/projetointegrador/scripts/signup.js"></script>
    <script src="/projetointegrador/scripts/registry.js"></script>

</body>
</html>