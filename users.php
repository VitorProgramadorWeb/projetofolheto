<?php 
$PAGE_TITLE = "Usuários";
include "patterns/logged/header.php";
?>

    <!-- Windows appears here, in #container -->
    <div id="container"></div>

    <h1>Contas dos usuários</h1>

    <table class="registries-table"></table>
    
    <script src="/projetointegrador/scripts/window.js"></script>
    <script src="/projetointegrador/scripts/registry.js"></script>
    <script>listRegistries()</script>
    
    <!-- ?php include "footer.php" ?> -->

</body>
</html>