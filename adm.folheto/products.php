<?php
$PAGE_TITLE = "Produtos";
function custom_head() { ?>
    <link rel="stylesheet" href="/projetofolheto/adm.folheto/styles/products.css">
<?php }
include "adm.folheto/patterns/signed/head.php";
?>
<body>
    
    <!-- Header -->
    <?php include "adm.folheto/patterns/header.php" ?>
    
    <!-- Menu (only for mobile) -->
    <?php //include "adm.folheto/patterns/_menu.php" ?>
    
    
    
    <!-- Main page content -->
    <div class="main-wrapper">
        
        <!-- Menu -->
        <aside>
            <?php include "adm.folheto/patterns/menu.php" ?>
        </aside>
        
        <!-- Content -->
        <main>
            
            <h1>Não tem nada aqui ainda...</h1>
            
            <p>Por enquanto, aprecie o cubo</p>

            <div class="cube">
                <div class="face front"></div>
                <div class="face back"></div>
                <div class="face top"></div>
                <div class="face bottom"></div>
                <div class="face left"></div>
                <div class="face right"></div>
            </div>

        </main>

    </div>

    <!-- Footer -->
    <?php include "adm.folheto/patterns/footer.php"; ?>

</body>
</html>