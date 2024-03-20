<?php
$PAGE_TITLE = "Produtos";
function custom_head() { ?>
    <link rel="stylesheet" href="/projetofolheto/folheto/styles/products.css">
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

        <!-- Filters -->
        <aside>
            Filtros
        </aside>
    
        <!-- Products -->
        <main>
            <h1>Produtos</h1>
        </main>

    </div>

    <!-- Footer -->
    <?php include "folheto/patterns/_footer.php"; ?>

</body>
</html>