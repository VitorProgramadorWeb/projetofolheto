<nav>
    <ul>
        <li><a href="/projetointegrador/index.php">[LOGO]</a></li>
        <?php
            if ($currentFileName != "login") {
                if ($isLogged) echo "<li><a href='/projetointegrador/logout.php'>Logout</a></li>";
                else echo "<li><a href='/projetointegrador/login.php'>Login</a></li>";
            }
        ?>
    </ul>
</nav>