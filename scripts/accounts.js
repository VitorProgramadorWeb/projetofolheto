let table = document.querySelector(".accounts-table");

// List accounts available to edit/delete or even create, in a table
// Also the options to do that
function listUserAccounts() {

    fetch("/projetointegrador/actions/accounts.php?action=list")
    .then(response => response.json())
    .then(response => {
        // RESPONSE: id, name, user

        let thead, tbody, tfoot;
        let tr, th, td;

        // ---------- THEAD ----------
        thead = document.createElement("thead");
        tr = document.createElement("tr");
        // Object.keys(response[0]).forEach((key) => {
        ["ID", "Nome", "Usuário"].forEach((key, index) => {
            th = document.createElement("th");
            th.innerHTML = key;
            if (index == 0) th.hidden = true; // Hide ID
            tr.append(th);
        });
        // options
        th = document.createElement("th");
        th.colSpan = 2;
        th.innerHTML = "Opções";
        tr.append(th);

        thead.append(tr);

        // ---------- TBODY ----------
        tbody = document.createElement("tbody");
        tbody.setAttribute("class", "tbody");
        response.forEach((row, index) => {
            let id;
            tr = document.createElement("tr");

            Object.entries(row).forEach(([key, value], index) => {
                td = document.createElement("td");
                td.setAttribute("class", key);
                td.innerHTML = value;
                if (index == 0) {
                    td.hidden = true; // Hide ID
                    id = value;
                }
                tr.append(td);
            });
            // options
            td = document.createElement("td");
            td.innerHTML = `<a href="#edit?id=${id}">Editar</a>`;
            tr.append(td);
            td = document.createElement("td");
            td.innerHTML = `<a onclick="deleteAccount(${id});" href="#delete?id=${id}">Excluir</a>`;
            tr.append(td);

            tbody.append(tr);
        });

        // ---------- TFOOT ----------
        tfoot = document.createElement("tfoot");
        th = document.createElement("th");
        th.colSpan = 5;
        th.scope = "row";
        th.innerHTML = "<a onclick='addWindow(\"Criar conta\", account())' href='#create'>&plus; Criar conta de usuário</a>";
        tfoot.append(th);

        table.append(thead);
        table.append(tbody);
        table.append(tfoot);
    });
}

function tableRow(id, name, user) {
    let tr, td;

    tr = document.createElement("tr");

    // id
    td = document.createElement("td");
    td.setAttribute("class", "id");
    td.innerHTML = id;
    td.hidden = true; // Hide ID
    tr.append(td);
    
    // name
    td = document.createElement("td");
    td.setAttribute("class", "name");
    td.innerHTML = name;
    tr.append(td);
    
    // user
    td = document.createElement("td");
    td.setAttribute("class", "user");
    td.innerHTML = user;
    tr.append(td);

    // options
    td = document.createElement("td");
    td.innerHTML = "<a href='#edit?id="+id+"''>Editar</a>";
    tr.append(td);
    td = document.createElement("td");
    td.innerHTML = `<a onclick="deleteAccount(${id});" href="#delete?id=${id}">Excluir</a>`;
    tr.append(td);

    return tr;
}

// Create user account from form
function createAccount(form) {
    
    let formData = new FormData(form);

    fetch("/projetointegrador/actions/accounts.php?action=create", {
        method: "post",
        body: formData
    }).then(res => res.json())
    .then(response => {

        if (response.invalidUser) {
            alert("Usuário já existe.");

        } else if (response.created) {
            let tbody = document.getElementsByTagName("tbody")[0];

            tbody.append(tableRow(response.id, response.name, response.user));
            removeWindow(form);
        }
    });
}

// Delete user account
function deleteAccount(id) {

    fetch("/projetointegrador/actions/accounts.php?action=delete&id="+id, {
        method: "post",
        body: `{"id": ${id}}`
    }).then(res => res.json())
    .then(response => {

        if (response.deleted) {
            let tds = document.getElementsByClassName("id");

            Object.values(tds).forEach(td => {
                if (td.innerHTML == id) {
                    td.parentNode.remove();
                }
            });
        }
    });
}