<?php 
$PAGE_TITLE = "Fornecedores";
include "patterns/logged/header.php";
?>

    <!-- Windows appears here, in #container -->
    <div id="container"></div>

    <h1>Cadastro dos fornecedores</h1>

    <table class="suppliers-table"></table>
    
    <script src="/projetointegrador/scripts/windows.js"></script>
    <script src="/projetointegrador/scripts/accounts.js"></script>
    <script>listUserAccounts()</script>
    
    <!-- ?php include "footer.php" ?> -->

</body>
</html>