<?php 
$PAGE_TITLE = "Clientes";
include "patterns/logged/header.php";
?>

    <!-- Windows appears here, in #container -->
    <div id="container"></div>

    <h1>Cadastro dos clientes</h1>

    <table class="registries-table"></table>
    
    <script src="/projetointegrador/scripts/window.js"></script>
    <script src="/projetointegrador/scripts/registry.js"></script>
    <script>listRegistries("customers")</script>
    
    <!-- ?php include "footer.php" ?> -->

</body>
</html>