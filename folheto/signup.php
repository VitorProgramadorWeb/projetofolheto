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
    
        <!-- Sign-in -->
        <main>

            <h1>Cadastrar-se</h1>

            <!-- Form -->
            <form>

                <div class="field">
                    <label for="username">Usuário</label>
                    <input type="text" name="username" id="username">
                </div>

                <div class="field">
                    <label for="password">Senha</label>
                    <div class="password">
                        <input type="password" name="password" id="password">
                        <button class="button" type="button" tabindex="-1" onclick="toggleVisibility(this);"><img src="/projetofolheto/folheto/images/visibility.svg" alt="Mostrar"></button>
                    </div>
                </div>
                
                <input class="button" type="submit" value="Cadastrar">

            </form>

            <!-- Form-footer -->
            <div class="footer">
                <hr>
                <div class="message">Usuário ou senha incorretos</div>
            </div>

        </main>

    </div>

    <!-- Footer -->
    <?php include "folheto/patterns/_footer.php"; ?>

</body>
</html>