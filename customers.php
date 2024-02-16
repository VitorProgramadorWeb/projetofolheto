<?php 
$PAGE_TITLE = "Clientes";
include "patterns/logged/header.php";
?>

    <!-- Windows appears here, in #container -->
    <div id="container"></div>

    <h1>Cadastro dos clientes</h1>

    <table class="customers-table"></table>
    
    <script src="/projetointegrador/scripts/windows.js"></script>
    <script src="/projetointegrador/scripts/accounts.js"></script>
    <script>listUserAccounts()</script>
    
    <!-- ?php include "footer.php" ?> -->

</body>
</html>