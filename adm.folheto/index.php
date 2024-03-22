<?php
$PAGE_TITLE = "Início";
function custom_head() { ?>
    <link rel="stylesheet" href="/projetofolheto/adm.folheto/styles/style.css">
    <link rel="stylesheet" href="/projetofolheto/adm.folheto/styles/home.css">
<?php }
include "adm.folheto/patterns/_head.php";
?>
<body>
    
    <!-- Header -->
    <?php include "adm.folheto/patterns/_header.php" ?>
    
    <!-- Menu (only for mobile) -->
    <?php include "adm.folheto/patterns/_menu.php" ?>
    
    
    <!-- Main page content -->
    <div class="main-wrapper">
        
        <!-- Menu -->
        <aside>
            <nav>
                <ul class="menu">
                    <li><a href="/projetofolheto/adm.folheto/products.php">Produtos</a></li>
                    <li><a href="/projetofolheto/adm.folheto/administrators.php">Administradores</a></li>
                    <li><a class="comming-soon" href="/projetofolheto/adm.folheto/charts.php" onclick="event.preventDefault();">Gráficos</a></li>
                    <li><a class="comming-soon" href="/projetofolheto/adm.folheto/logs.php" onclick="event.preventDefault();">Histórico</a></li>
                </ul>
            </nav>
        </aside>
        
        <!-- Content -->
        <main>
            <h1>Bem vindo(a), <?= $_SESSION["username"] ?>!</h1>
            
            <p>Para acessar outra conta, faça logout.</p>
        </main>

    </div>

    <!-- Footer -->
    <?php include "adm.folheto/patterns/_footer.php"; ?>

</body>
</html>