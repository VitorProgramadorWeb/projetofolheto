<?php
$PAGE_TITLE = "Início";
function custom_head() { ?>
    <link rel="stylesheet" href="/projetofolheto/adm.folheto/styles/home.css">
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
            <h1>Bem vindo(a), <?php echo $_SESSION["username"]; ?>!</h1>
            
            <p>Para acessar outra conta, faça logout.</p>
        </main>

    </div>

    <!-- Footer -->
    <?php include "adm.folheto/patterns/footer.php"; ?>

</body>
</html>