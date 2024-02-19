<?php 
$PAGE_TITLE = "Fornecedores";
include "patterns/logged/header.php";
?>

    <!-- Windows appears here, in #container -->
    <div id="container"></div>

    <h1>Cadastro dos fornecedores</h1>

    <table class="registries-table"></table>
    
    <script src="/projetointegrador/scripts/window.js"></script>
    <script src="/projetointegrador/scripts/registry.js"></script>
    <script>listRegistries("suppliers")</script>
    
    <!-- ?php include "footer.php" ?> -->

</body>
</html>