<?php 
$PAGE_TITLE = "Usuários";
include "patterns/logged/header.php";
?>

    <div class="body">
        <nav>
            <ul>
                <?php if (function_exists("customMenu")) customMenu(); ?>
            </ul>
        </nav>
        
        <main>
            <!-- Windows appears here, in #container -->
            <div id="container"></div>
        
            <h1>Cadastro dos usuários</h1>
        
            <table class="registries-table"></table>
            
            <script src="/projetointegrador/scripts/window.js"></script>
            <script src="/projetointegrador/scripts/registry.js"></script>
            <script src="/projetointegrador/scripts/verifications.js"></script>
            <script>listRegistries("users")</script>
            
        </main>

        <!-- ?php include "footer.php" ?> -->
    </div>

    <script>
        function showMenu() {
            const menu = document.querySelector("div.body nav");
            const img = document.querySelector("header nav ul li.menu img");

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