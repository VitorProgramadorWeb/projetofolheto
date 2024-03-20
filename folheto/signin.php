<?php
$PAGE_TITLE = "Entrar";
function custom_head() { ?>
    <link rel="stylesheet" href="/projetofolheto/folheto/styles/signin.css">
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

        <!-- Image -->
        <aside class="image"></aside>
    
        <div>
            <!-- Sign-in -->
            <main>
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
            </main>
        </div>

    </div>

</body>
</html>