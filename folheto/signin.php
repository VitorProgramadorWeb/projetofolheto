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

                <!-- Logo -->
                <div class="logo">
                    <img src="/projetofolheto/folheto/images/folheto.png" alt="Folheto logo">
                    <div class="text">Folheto</div>
                </div>

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
                            <button class="button" type="button" tabindex="-1" onclick="event.preventDefault(); togglePasswordVisibility(this);"><img src="/projetofolheto/folheto/images/visibility.svg" alt="Eye visibility"></button>
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

    </div>

</body>
</html>