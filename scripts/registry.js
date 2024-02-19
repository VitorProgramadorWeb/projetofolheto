let registriesTable = document.querySelector(".registries-table");

/**
 * List Registries available to edit/delete or even create, in a table. Also the options to do that.
 * @param {string} tableName - Database table name.
 */
function listRegistries(tableName) {

    getRegistry(tableName, "*").then(response => {
        
        let thead, tbody, tfoot;
        let tr, th, td;

        if (response.length !== 0) {
            // ---------- THEAD ----------
            thead = document.createElement("thead");
            tr = document.createElement("tr");
            Object.keys(response[0]).forEach((key) => {
                th = document.createElement("th");
                th.innerHTML = key;
                if (key == "id") th.hidden = true; // Hide ID
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
            response.forEach((row) => {
                let id;
                tr = document.createElement("tr");
    
                Object.entries(row).forEach(([key, value]) => {
                    td = document.createElement("td");
                    td.setAttribute("class", key);
                    td.innerHTML = value;
                    if (key == "id") {
                        td.hidden = true; // Hide ID
                        id = value;
                    }
                    tr.append(td);
                });
                // options
                td = document.createElement("td");
                td.innerHTML = `<button onclick="loadAccountContent(${id}, addWindow('Editar conta', account('editRegistry(this)')));">Editar</button>`;
                tr.append(td);
                td = document.createElement("td");
                td.innerHTML = `<button onclick="deleteRegistry(${id});">Excluir</button>`;
                tr.append(td);
    
                tbody.append(tr);
            });

            // APPEND
            registriesTable.append(thead);
            registriesTable.append(tbody);
        }
        
        // ---------- TFOOT ----------
        tfoot = document.createElement("tfoot");
        th = document.createElement("th");
        th.colSpan = 100;
        th.scope = "row";
        th.innerHTML = `<button onclick="addWindow('Criar conta', account('createAccount(this)'))">&plus; Criar novo</button>`;
        tfoot.append(th);
        
        // APPEND
        registriesTable.append(tfoot);
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
    td.innerHTML = `<button onclick="loadAccountContent(${id}, addWindow('Editar conta', account('editAccount(this)')));">Editar</button>`;
    tr.append(td);
    td = document.createElement("td");
    td.innerHTML = `<button onclick="deleteAccount(${id});">Excluir</button>`;
    tr.append(td);

    return tr;
}

/**
 * Create a registry.
 * @param {HTMLFormElement} form - A form element.
 */
function createRegistry(form) {
    
    let formData = new FormData(form);
    formData.append("action", "create");

    fetch("/projetointegrador/actions/accounts.php", {
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

/**
 * Delete a registry.
 * @param {number} id - The registry id to delete.
 */
function deleteRegistry(id) {

    let data = new FormData();
    data.append("action", "delete");
    data.append("id", id);

    fetch("/projetointegrador/actions/accounts.php", {
        method: "post",
        body: data
    }).then(res => res.json())
    .then(response => {

        if (response.deleted) {
            let tds = document.getElementsByClassName("id");

            Object.values(tds).forEach(td => {
                if (td.innerHTML == id) {
                    td.parentNode.remove();
                }
            });

            // Auto destruction
            if (response.id == response.sessionId) {
                window.location.href = "/projetointegrador/logout.php";
            }
        }
    });
}

/**
 * Edit a registry.
 * @param {HTMLFormElement} form - A form element.
 */
function editRegistry(form) {
    
    let data = new FormData(form);
    data.append("action", "edit");
    data.append("id", form.getElementsByClassName("id")[0].value);

    fetch("/projetointegrador/actions/accounts.php", {
        method: "post",
        body: data
    }).then(res => res.json())
    .then(response => {

        if (response.edited) {
            let tds = document.getElementsByClassName("id");

            Object.values(tds).forEach(td => {
                if (td.innerHTML == response.id) {
                    td.parentNode.getElementsByClassName("name")[0].innerHTML = response.name;
                    td.parentNode.getElementsByClassName("user")[0].innerHTML = response.user;
                }
            });

            removeWindow(form);
        }
    });
}

/**
 * Loads registry contents in a form.
 * @param {number} id - The registry id to load.
 * @param {HTMLElement} win - The window with the form.
 */
function loadRegistry(id, win) {

    let data = new FormData();
    data.append("action", "read");
    data.append("id", id);

    fetch("/projetointegrador/actions/accounts.php", {
        method: "post",
        body: data
    }).then(res => res.json())
    .then(response => {

        let form = win.getElementsByClassName("content-account")[0];

        let inputId = form.getElementsByClassName("id")[0];
        let inputUser = form.getElementsByClassName("user")[0];
        let inputPassword = form.getElementsByClassName("password")[0];
        let inputName = form.getElementsByClassName("name")[0];
        let inputBirthdate = form.getElementsByClassName("birthdate")[0];
        let inputAddress = form.getElementsByClassName("address")[0];
        let inputEmail = form.getElementsByClassName("email")[0];
        let inputPhone = form.getElementsByClassName("phone")[0];
        let inputCpf = form.getElementsByClassName("cpf")[0];

        inputId.value = response.id;
        inputUser.value = response.user;
        inputPassword.value = response.password;
        inputName.value = response.name;
        inputBirthdate.value = response.birthdate;
        inputAddress.value = response.address;
        inputEmail.value = response.email;
        inputPhone.value = response.phone;
        inputCpf.value = response.cpf;
        
    });
}

/**
 * Gets registry.
 * @async
 * @param {string} table - Database table name.
 * @param {string | number} primaryKey - The registry primary key of 'table' to get. Also can be '*' to get all available registries.
 * @returns {Promise<object>} Promise json.
 */
async function getRegistry(table, primaryKey) {
    return await fetch("/projetointegrador/actions/registry.php", {
        method: "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: `action=get&table=${table}&primary_key=${primaryKey}`
    }).then(response => response.json());
}

/**
 * Sets registry.
 */
function SetRegistry() {

}