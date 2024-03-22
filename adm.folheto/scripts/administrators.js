// -------------------------------------------------------------
// -------------------------- CONSTS ---------------------------
// -------------------------------------------------------------

/** 
 * Table of administrator accounts
 * @type {HTMLTableElement}
 * @constant
*/
const [table] = document.getElementsByTagName("table");

/** 
 * Table head of administrator accounts
 * @type {HTMLTableSectionElement}
 * @constant
*/
const [thead] = table.getElementsByTagName("thead");

/** 
 * Table body of administrator accounts
 * @type {HTMLTableSectionElement}
 * @constant
*/
const [tbody] = table.getElementsByTagName("tbody");

/** Database and table columns names
 * @constant
*/
const columnNames = {
    id:       "ID",
    image:    "Imagem",
    username: "Usuário",
    //password: "Senha",
}

// -------------------------------------------------------------
// ------------------------- FUNCTIONS -------------------------
// -------------------------------------------------------------

/**
 * Updates administrator accounts table.
 */
function updateTable() {

    // Cleaning data
    thead.replaceChildren();
    tbody.replaceChildren();

    try {
        readAdministrators().then(response => {
            if (response.length !== 0) {

                // Table row
                let tr = document.createElement("tr");

                // ---------- THEAD ----------
                // column headers
                for (const columnName in columnNames) {
                    th = document.createElement("th");
                    th.innerText = columnNames[columnName];
                    if (columnName == "id") th.hidden = true; // Hide ID
                    tr.append(th);
                }
        
                // APPEND
                thead.append(tr);
        
                // ---------- TBODY ----------
                response.forEach((rowData) => {
                    tbody.append(createTableRow(rowData));
                });
            }
        });

    } catch (error) {
        console.log(error);

    }
}

/**
 * Creates a table row with content
 * @param {object} data - Ex.: {columnName: "columnData", ...}
 * @returns {HTMLTableRowElement} Table row
 */
function createTableRow(data) {

    // Variables
    let id;
    let tr = document.createElement("tr");
    let td;
    let button, img;

    // Inserting data
    for (const column in columnNames) {
        td = document.createElement("td");
        td.setAttribute("class", column);

        if (column == "image") {
            let img = document.createElement("img");
            img.loading = "lazy";
            if (data[column] == null || data[column] == "") {
                img.src = "/projetofolheto/adm.folheto/images/person.svg";
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

    // ----- options -----
    td = document.createElement("td");
    td.className = "option";

    // Edit
    button = document.createElement("button");
    img = document.createElement("img");
    img.src = "/projetofolheto/adm.folheto/images/edit.svg";
    img.alt = "Editar";
    button.append(img);
    button.className = "button edit-button";
    button.onclick = () => {
        readAdministrator(id).then((data) => {
            if (container.querySelector(`#user-form-${id}`) === null) {
                data.action = "update";
                addWindow("Editar administrador", administratorForm(data));
            }
        });
    };
    td.append(button);

    // Delete
    button = document.createElement("button");
    img = document.createElement("img");
    img.src = "/projetofolheto/adm.folheto/images/delete.svg";
    img.alt = "Excluir";
    button.append(img);
    button.className = "button delete-button";
    button.onclick = () => {
        readAdministrator(id).then((data) => {
            if (confirm(`Deseja realmente excluir o administrador ${data.username}?`)) {
                deleteAdministrator(id).then(response => {
                    removeTableRow(tr);
                    alert(response.message);
                });
            }
        });
    };
    td.append(button);

    tr.append(td);

    // tr shows options
    tr.ontouchstart = () => {
        tr.onmouseenter = null;
        
    };
    tr.onmouseenter = (e) => {
        td.style.position = "sticky";
        td.style.right = "0px";

        td.style.display = "table-cell";
    }
    tr.onclick = (e) => {
        if (td.style.position == "sticky") {
            td.style.removeProperty("position");
            td.style.removeProperty("rigth");

        } else {
            td.style.position = "sticky";
            td.style.right = "0px";
        }
        
        if (td.style.display == "table-cell") {
            td.style.display = "none";
            
        } else {
            td.style.display = "table-cell";
        }
    };
    tr.onmouseleave = (e) => {
        td.style.removeProperty("position");
        td.style.removeProperty("rigth");
        
        td.style.display = "none";

        if (tr.onmouseenter == null) {
            tr.onmouseenter = () => {
                td.style.position = "sticky";
                td.style.right = "0px";
            };
        }
    }
    td.onclick = (e) => {
        e.stopPropagation();
    };

    return tr;
}
/**
 * Removes a table row by passing it or by passing any of its children.
 * @param {HTMLTableRowElement | HTMLElement} element - Tr (or tr child) to remove.
 * @returns {boolean} True for success, false for failure.
 */
function removeTableRow(tr) {
    // tr > td > button
    while(tr.tagName != "BODY") {
        if(tr.tagName == "TR") {
            tr.remove();

            return true; // Success

        } else {
            tr = tr.parentElement;
        }
    }

    return false; // Failure
}

// --------------------------------------------------------------
// ----------------------- CRUD FUNCTIONS -----------------------
// --------------------------------------------------------------

/**
 * Creates an administrator account.
 * @async
 * @param {FormData} formData - Data to set.
 * @returns {Promise<object>} A Promise json for success or failure.
 */
async function createAdministrator(formData) {
    formData.append("action", "create");

    return await fetch("/projetofolheto/adm.folheto/actions/administrators.php", {
        method: "post",
        body: formData
    }).then(response => response.json());
}

/**
 * Reads administrator data.
 * @async
 * @param {number} id - The administrator id.
 * @returns {Promise<object>} A Promise json containing administrator data.
 */
async function readAdministrator(id) {
    return await fetch(`/projetofolheto/adm.folheto/actions/administrators.php`, {
        method: "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: `action=read&id=${id}`
    }).then(response => response.json());
}

/**
 * Reads all administrators data.
 * @async
 * @returns {Promise<object>} A Promise json containing all administrators data.
 */
async function readAdministrators() {
    return await fetch("/projetofolheto/adm.folheto/actions/administrators.php", {
        method: "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: `action=read&id=*`
    })
    .then(response => response.json());
}

/**
 * Updates administrator account informations.
 * @async
 * @param {FormData} formData - Data to set.
 * @returns {Promise<object>} A Promise json for success or failure.
 */
async function updateAdministrator(formData) {
    formData.append("action", "update");

    return await fetch("/projetofolheto/adm.folheto/actions/administrators.php", {
        method: "post",
        body: formData
    }).then(response => response.json());
}

/**
 * Deletes administrator account.
 * @async
 * @param {number} id - The administrator id.
 * @returns {Promise<object>} A Promise json for success or failure.
 */
async function deleteAdministrator(id) {
    return await fetch("/projetofolheto/adm.folheto/actions/administrators.php", {
        method: "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: `action=delete&id=${id}`
    }).then(response => response.json());
}

// Initialization
updateTable();