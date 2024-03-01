let registriesTable = document.querySelector(".registries-table");

/**
 * List Registries available to edit/delete or even create, in a table. Also the options to do that.
 * @param {string} tableName - Database table name.
 */
function listRegistries(tableName) {

    getRegistry(tableName, "*").then(response => {
        
        let thead, tbody, tfoot;
        let tr, th, td;
        let button;

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
            th.className = "option";
            th.colSpan = 2;
            th.innerHTML = "Opções";
            tr.append(th);
    
            thead.append(tr);
    
            // ---------- TBODY ----------
            tbody = document.createElement("tbody");
            response.forEach((row) => {
                tbody.append(createRow(tableName, Object.entries(row)));
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
        button = document.createElement("button");
        button.innerHTML = "&plus; Criar novo";
        button.className = "button";
        button.onclick = () => {
            switch (tableName) {
                case "users":     addWindow("Criar usuário",    userForm());     break;
                case "suppliers": addWindow("Criar fornecedor", supplierForm()); break;
                case "customers": addWindow("Criar cliente",    customerForm()); break;
                case "stock":     addWindow("Criar produto",    productForm());  break;
                default:
                    break;
            }
        };
        th.append(button);
        tfoot.append(th);
        
        // APPEND
        registriesTable.append(tfoot);
    });
}

function createRow(tableName, data) {

    let id;
    let tr = document.createElement("tr");
    let td;

    data.forEach(([key, value]) => {
        td = document.createElement("td");
        td.setAttribute("class", key);
        td.innerText = value;
        if (key == "id") {
            td.hidden = true; // Hide ID
            id = value;
        }
        tr.append(td);
    });

    // options
    td = document.createElement("td"); // Edit
    td.className = "option";
    button = document.createElement("button");
    button.innerText = "Editar";
    button.className = "button";
    button.onclick = () => {
        getRegistry(tableName, id).then((data) => {
            switch (tableName) {
                case "users":     if (container.querySelector(`#user-form-${id}`) === null) addWindow("Editar usuário",    userForm(data));     break;
                case "suppliers": addWindow("Editar fornecedor", supplierForm(data)); break;
                case "customers": addWindow("Editar cliente",    customerForm(data)); break;
                case "stock":     addWindow("Editar produto",    productForm(data));  break;
                default:
                    break;
            }
        });
    };
    td.append(button);
    tr.append(td);

    td = document.createElement("td"); // Delete
    td.className = "option";
    button = document.createElement("button");
    button.innerText = "Excluir";
    button.className = "button";
    button.onclick = () => {
        getRegistry(tableName, id).then(registry => {
            if (confirm(`Deseja realmente excluir o usuário ${registry.user}, nome ${registry.name}?`)) {
                deleteRegistry(tableName, id).then(response => {
                    removeRow(button);
                    alert(response.message);
                });
            }
        });
    };
    td.append(button);
    tr.append(td);
    
    return tr;
}

function removeRow(element) {
    // tr > td > button
    while(element.tagName != "BODY") {
        if(element.tagName == "TR") {
            element.remove();

            return true; // Success

        } else {
            element = element.parentElement;
        }
    }

    return false; // Failure
}

/**
 * Deletes registry.
 * @async
 * @param {string} table Database table name.
 * @param {string | number} primaryKey The registry primary key of 'table' to delete.
 * @returns {Promise<object>} A Promise json for success or failure.
 */
async function deleteRegistry(table, primaryKey) {
    return await fetch("/projetointegrador/actions/registry.php", {
        method: "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: `action=delete&table=${table}&primary_key=${primaryKey}`
    }).then(response => response.json());
    
    // // Auto destruction
    // if (response.id == response.sessionId) {
    //     window.location.href = "/projetointegrador/logout.php";
    // }
}

/**
 * Gets registry.
 * @async
 * @param {string} table Database table name.
 * @param {string | number} primaryKey The registry primary key of 'table' to get. Also can be '*' to get all available registries.
 * @returns {Promise<object>} A Promise json for the registry data.
 */
async function getRegistry(table, primaryKey) {
    return await fetch("/projetointegrador/actions/registry.php", {
        method: "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: `action=get&table=${table}&primary_key=${primaryKey}`
    }).then(response => response.json());
}

/**
 * Sets registry. Used to INSERT or UPDATE a registry.
 * @async
 * @param {string} table Database table name.
 * @param {FormData} formData Data to set. If registry primary key of 'table' to set is ommited, inserts instead of update.
 * @returns {Promise<object>} A Promise json for success or failure.
 */
async function setRegistry(table, formData) {
    formData.append("action", "set");
    formData.append("table", table);

    return await fetch("/projetointegrador/actions/registry.php", {
        method: "post",
        body: formData
    }).then(response => response.json());
}