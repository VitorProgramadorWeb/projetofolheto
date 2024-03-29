<?php
$PAGE_TITLE = "Administradores";
function custom_head() { ?>
    <link rel="stylesheet" href="/projetofolheto/adm.folheto/styles/administrators.css">
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

            <!-- Windows container -->
            <div id="container"></div>

            <!-- <h1>Sua conta</h1>
            <div></div>
            
            <h1>Criar uma conta de administrador</h1> -->
            
            <h1>Cadastro dos administradores</h1>
            <div class="table-wrapper">

                <!-- Administrators table -->
                <table>
                    <thead></thead>
                    <tbody></tbody>
                </table>
                
                <!-- Create button -->
                <button class="button create-button" onclick="addWindow('Criar administrador', administratorForm());"><img src="/projetofolheto/adm.folheto/images/add_person.svg" alt="Criar conta">Criar conta</button>
            </div>

            
        </main>
        
    </div>
    
    <!-- Footer -->
    <?php include "adm.folheto/patterns/footer.php"; ?>
    <script src="/projetofolheto/adm.folheto/scripts/administrators.js"></script>

</body>
</html>