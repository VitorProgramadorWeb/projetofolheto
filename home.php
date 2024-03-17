<?php 
$PAGE_TITLE = "Home";
include "patterns/logged/header.php";
?>

    <nav>
        <ul>
            <?php if (function_exists("customMenu")) customMenu(); ?>
        </ul>
    </nav>

    <h1>Bem vindo(a), <?= $_SESSION["username"] ?>!</h1>

    <p>Para acessar outra conta, faça logout.</p>

    <!-- ?php include "footer.php" ?> -->

</body>
</html>