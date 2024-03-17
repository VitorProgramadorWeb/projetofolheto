<?php 
$PAGE_TITLE = "Home";
include "patterns/logged/header.php";
?>

    <nav>
        <ul>
            <?php if (function_exists("customMenu")) customMenu(); ?>
        </ul>
    </nav>

    <h1>Bem vindo(a), <?= $_SESSION["username"] ?>!</h1>

    <p>Para acessar outra conta, faça logout.</p>

    <!-- ?php include "footer.php" ?> -->

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
                img.src = "/projetointegrador/images/menu.svg";
            } else {
                menu.style.display = "block";
                img.src = "/projetointegrador/images/close.svg";
            }
        }
    </script>

</body>
</html>