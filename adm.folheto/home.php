<?php 
$PAGE_TITLE = "Home";
include "adm.folheto/patterns/logged/header.php";
?>

    <nav>
        <ul>
            <?php if (function_exists("customMenu")) customMenu(); ?>
        </ul>
    </nav>

    <h1>Bem vindo(a), <?= $_SESSION["username"] ?>!</h1>

    <p>Para acessar outra conta, faça logout.</p>

    <script>
        let computerView = window.matchMedia("(min-width: 450px)");
        computerView.onchange = () => {
            const menu = document.querySelector("body > nav");
            if (computerView.matches) {
                if (menu.style.display == "none") {
                    menu.style.display = "block";
                }
            } else {
                showMenu();
            }
        };
        
        function showMenu() {
            const menu = document.querySelector("body > nav");
            const img = document.querySelector("header > nav ul li.menu img");

            if (menu.style.display == "block") {
                menu.style.display = "none";
                img.src = "/projetofolheto/adm.folheto/images/menu.svg";
            } else {
                menu.style.display = "block";
                img.src = "/projetofolheto/adm.folheto/images/close.svg";
            }
        }
    </script>

</body>
</html>