<?php
$PAGE_TITLE = "Cadastrar-se";
function custom_head() { ?>
    <link rel="stylesheet" href="/projetofolheto/folheto/styles/signup.css">
<?php }
include "folheto/patterns/_head.php";
?>
<body>
    
    <!-- Header -->
    <?php include "folheto/patterns/_header.php" ?>
    
    <!-- Menu (only for mobile) -->
    <?php include "folheto/patterns/_menu.php" ?>

    

    <!-- Main page content -->
    <div class="main-wrapper">
    
        <!-- Sign-up -->
        <main>
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
        </main>

    </div>

</body>
</html>