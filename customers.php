<?php 
$PAGE_TITLE = "Clientes";
include "patterns/logged/header.php";
?>

<nav>
        <ul>
            <?php if (function_exists("customMenu")) customMenu(); ?>
        </ul>
    </nav>
    
    <main>
        <div class="wrapper">
            <!-- Windows appears here, in #container -->
            <div id="container"></div>
        
            <h1>Cadastro dos clientes</h1>
        
            <div class="table-wrapper">
                <div class="left-fade"></div>
                <table class="registries-table"></table>
                <div class="right-fade"></div>
            </div>
            
            <script src="/projetointegrador/scripts/window.js"></script>
            <script src="/projetointegrador/scripts/registry.js"></script>
            <script src="/projetointegrador/scripts/verifications.js"></script>
            <script>listRegistries("customers")</script>
            
        </div>
    </main>

    <!-- ?php include "footer.php" ?> -->

    <script>
        /** @type {HTMLDivElement} */
        const tableWrapper = document.querySelector(".table-wrapper");
        tableWrapper.onscroll = () => {
            tableWrapper.style.setProperty("--scroll", tableWrapper.scrollLeft / (tableWrapper.scrollWidth - tableWrapper.offsetWidth));
            console.log(tableWrapper.scrollLeft / (tableWrapper.scrollWidth - tableWrapper.offsetWidth));
        };
        
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