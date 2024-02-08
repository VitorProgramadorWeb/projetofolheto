var table = document.querySelector(".accounts-table");

// List accounts available to edit/delete or even create, in a table
// Also the options to do that
function listUserAccounts() {

    fetch("/projetointegrador/actions/accounts.php?action=list")
    .then(response => response.json())
    .then(response => {
        // RESPONSE: id, name, user

        // ---------- THEAD ----------
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
        // Object.keys(response[0]).forEach((key) => {
        ["ID", "Nome", "Usuário"].forEach((key, index) => {
            var th = document.createElement("th");
            th.innerHTML = key;
            if (index == 0) th.hidden = true; // Hide ID
            tr.append(th);
        });
        // options
        var th = document.createElement("th");
        th.colSpan = 2;
        th.innerHTML = "Opções";
        tr.append(th);

        thead.append(tr);

        // ---------- TBODY ----------
        var tbody = document.createElement("tbody");
        response.forEach((row, index) => {
            var tr = document.createElement("tr");

            Object.values(row).forEach((value, index) => {
                var td = document.createElement("td");
                td.innerHTML = value;
                if (index == 0) td.hidden = true; // Hide ID
                tr.append(td);
            });
            // options
            var td = document.createElement("td");
            td.innerHTML = "<a href='#edit?id="+index+"''>Editar</a>";
            tr.append(td);
            var td = document.createElement("td");
            td.innerHTML = "<a href='#delete?id="+index+"'>Excluir</a>";
            tr.append(td);

            tbody.append(tr);
        });

        // ---------- TFOOT ----------
        var tfoot = document.createElement("tfoot");
        var th = document.createElement("th");
        th.colSpan = 5;
        th.innerHTML = "<a onclick='addPopup(\"Criar usuário\", formulario(\"gg\"))' href='#create'>&plus; Criar conta de usuário</a>";
        tfoot.append(th);

        table.append(thead);
        table.append(tbody);
        table.append(tfoot);
    });
}

// Invokes a form to Create a user accounts
function createAccount() {



    fetch("/projetointegrador/actions/accounts.php?action=create")
    .then(response => response.json())
    .then(response => {
        // RESPONSE: id, name, user

        // ---------- THEAD ----------
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
        // Object.keys(response[0]).forEach((key) => {
        ["ID", "Nome", "Usuário"].forEach((key, index) => {
            var th = document.createElement("th");
            th.innerHTML = key;
            if (index == 0) th.hidden = true; // Hide ID
            tr.append(th);
        });
        // options
        var th = document.createElement("th");
        th.colSpan = 2;
        th.innerHTML = "Opções";
        tr.append(th);

        thead.append(tr);

        // ---------- TBODY ----------
        var tbody = document.createElement("tbody");
        response.forEach((row, index) => {
            var tr = document.createElement("tr");

            Object.values(row).forEach((value, index) => {
                var td = document.createElement("td");
                td.innerHTML = value;
                if (index == 0) td.hidden = true; // Hide ID
                tr.append(td);
            });
            // options
            var td = document.createElement("td");
            td.innerHTML = "<a href='#edit?id="+index+"''>Editar</a>";
            tr.append(td);
            var td = document.createElement("td");
            td.innerHTML = "<a href='#delete?id="+index+"'>Excluir</a>";
            tr.append(td);

            tbody.append(tr);
        });

        // ---------- TFOOT ----------
        var tfoot = document.createElement("tfoot");
        var th = document.createElement("th");
        th.colSpan = 5;
        th.innerHTML = "<a href='#create'>&plus; Criar conta de usuário</a>";
        tfoot.append(th);

        table.append(thead);
        table.append(tbody);
        table.append(tfoot);
    });
}