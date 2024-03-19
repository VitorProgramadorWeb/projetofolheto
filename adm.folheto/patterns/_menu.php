<header>
    <nav>
        <ul>
            <li class="menu"><a onclick="showMenu()" href="#menu"><img src="/projetofolheto/adm.folheto/images/menu.svg" alt="Menu"></a></li>
            <li><a href="/projetofolheto/adm.folheto/index.php">[LOGO]</a></li>
            <?php echo isset($_SESSION["username"]) ? '<li><a href="#"><img src="/projetofolheto/adm.folheto/images/person.svg" alt="User image"><div>'.$_SESSION["username"].'</div></a></li>' : '';?>
        </ul>
    </nav>
</header>