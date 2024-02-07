<?php 
$PAGE_TITLE = "Home";
function customHeader() { ?>
<?php }
include "patterns/header.php";
?>

    <h1>Bem vindo(a), <?= $_SESSION["user"] ?>!</h1>

    <p>Para acessar outra conta, faça logout.</p>

    <!-- ?php include "footer.php" ?> -->

</body>
</html>