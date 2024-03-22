<?php
$PAGE_TITLE = "Entrar";
function custom_head() { ?>
    <link rel="stylesheet" href="/projetofolheto/adm.folheto/styles/signin.css">
<?php }
include "adm.folheto/patterns/_head.php";
?>
<body>
    
    <!-- Header -->
    <?php include "adm.folheto/patterns/_header.php" ?>

    

    <!-- Main page content -->
    <div class="main-wrapper">
    
        <!-- Sign-in -->
        <main>

            <h1>Entrar</h1>

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
                        <button class="button" type="button" tabindex="-1" onclick="toggleVisibility(this);"><img src="/projetofolheto/adm.folheto/images/visibility.svg" alt="Mostrar"></button>
                    </div>
                </div>
                
                <input class="button" type="submit" value="Entrar">
                
                <a class="recover-password" href="#recover-password">Recuperar senha</a>

            </form>
            
            <!-- Form-footer -->
            <div class="footer">
                <hr>
                <div class="message">Usuário ou senha incorretos</div>
            </div>

        </main>

    </div>

    <!-- Footer -->
    <?php include "adm.folheto/patterns/_footer.php"; ?>

</body>
</html>