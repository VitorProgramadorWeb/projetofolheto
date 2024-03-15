const registriesTable = document.querySelector(".registries-table");

const columnNames = {
    users: {
        id: "ID",
        image: "Imagem",
        username: "Usuário",
        name: "Nome",
        email: "E-mail",
        phone: "Telefone"
        //birthdate: "Nascimento"
        //password: "Senha"
        //address: "Endereço"
        //cpf: "CPF"
    },
    suppliers: {
        id: "ID",
        name: "Nome",
        email: "E-mail",
        phone: "Telefone"
        //address: "Endereço"
    },
    customers: {
        id: "ID",
        name: "Nome",
        email: "E-mail",
        phone: "Telefone"
        //address: "Endereço"
    }
};

/**
 * List Registries available to edit/delete or even create, in a table. Also the options to do that.
 * @param {string} tableName - Database table name.
 */
function listRegistries(tableName) {

    getRegistry(tableName, "*").then(response => {
        
        let thead, tbody, tfoot;
        let tr, th;
        let button;

        if (response.length !== 0) {
            // ---------- THEAD ----------
            thead = document.createElement("thead");
            tr = document.createElement("tr");
            // column headers
            for (const columnName in columnNames[tableName]) {
                th = document.createElement("th");
                th.innerText = columnNames[tableName][columnName];
                if (columnName == "id") th.hidden = true; // Hide ID
                tr.append(th);
            }
        
            // options header
            th = document.createElement("th");
            th.className = "option";
            th.innerText = "Opções";
            tr.append(th);
    
            thead.append(tr);
    
            // ---------- TBODY ----------
            tbody = document.createElement("tbody");
            response.forEach((row) => {
                tbody.append(createTableRow(tableName, row));
            });

            // APPEND
            registriesTable.append(thead);
            registriesTable.append(tbody);
        }
        
        // ---------- TFOOT ----------
        tfoot = document.createElement("tfoot");
        tr = document.createElement("tr");
        th = document.createElement("th");
        th.className = "option";
        //th.colSpan = 100;
        th.scope = "row";
        button = document.createElement("button");
        button.innerHTML = "&plus; Criar novo";
        button.className = "button create-button";
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
        tr.append(th);
        tfoot.append(tr);
        
        // APPEND
        registriesTable.append(tfoot);
    });
}

/**
 * 
 * @param {*} tableName 
 * @param {object} data {columnName: "value"}
 * @returns {HTMLTableRowElement}
 */
function createTableRow(tableName, data) {

    let id;
    let tr = document.createElement("tr");
    let td;

    for (const column in columnNames[tableName]) {
        td = document.createElement("td");
        td.setAttribute("class", column);

        if (column == "image") {
            let img = document.createElement("img");
            if (data[column] == null || data[column] == "") {
                img.src = "/projetointegrador/images/user.svg";
            } else {
                img.src = `data:image/png;base64, ${data[column]}`;
            }
            td.append(img);
        } else {
            td.innerText = data[column];
            if (column == "id") {
                td.hidden = true; // Hide ID
                id = data[column];
            }
        }
        tr.append(td);
    }

    // options
    td = document.createElement("td");
    td.className = "option";

    button = document.createElement("button"); // Edit
    button.innerText = "Editar";
    button.className = "button edit-button";
    button.onclick = () => {
        getRegistry(tableName, id).then((data) => {
            switch (tableName) {
                case "users":
                    if (container.querySelector(`#user-form-${id}`) === null) addWindow("Editar usuário", userForm(data));
                    break;
                    
                case "suppliers":
                    if (container.querySelector(`#supplier-form-${id}`) === null) addWindow("Editar fornecedor", supplierForm(data));
                    break;

                case "customers":
                    if (container.querySelector(`#customer-form-${id}`) === null) addWindow("Editar cliente", customerForm(data));
                    break;

                case "stock":
                    if (container.querySelector(`#product-form-${id}`) === null) addWindow("Editar produto", productForm(data));
                    break;

                default:
                    break;
            }
        });
    };
    td.append(button);

    button = document.createElement("button"); // Delete
    button.innerText = "Excluir";
    button.className = "button delete-button";
    button.onclick = () => {
        getRegistry(tableName, id).then(registry => {
            if (confirm(`Deseja realmente excluir o usuário ${registry.username}?`)) {
                deleteRegistry(tableName, id).then(response => {
                    removeTableRow(tr);
                    alert(response.message);
                });
            }
        });
    };
    td.append(button);
    tr.append(td);
    
    return tr;
}

function removeTableRow(element) {
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
 * @param {string | number} id The registry id of 'table' to delete.
 * @returns {Promise<object>} A Promise json for success or failure.
 */
async function deleteRegistry(table, id) {
    return await fetch("/projetointegrador/actions/registry.php", {
        method: "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: `action=delete&table=${table}&id=${id}`
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
 * @param {string | number} id The registry id of 'table' to get. Also can be '*' to get all available registries.
 * @returns {Promise<object>} A Promise json for the registry data.
 */
async function getRegistry(table, id) {
    return await fetch("/projetointegrador/actions/registry.php", {
        method: "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: `action=get&table=${table}&id=${id}`
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