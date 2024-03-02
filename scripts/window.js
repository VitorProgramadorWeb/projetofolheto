///////////////////////////////////////////////
//           Add and Remove window           //
///////////////////////////////////////////////


// After adding a window, this number is increased by 1
let windowNumber = 1;

// Windows container
const container = document.getElementById("container");

function addWindow(windowLabel = "", windowContent = none()) {

    const lastWindow = container.lastChild; // Position relative to last window

    // Window
    const win = document.createElement("div");
    win.className = "window";
    win.style.zIndex = 1;

    /* ----------------------------- HEADER ----------------------------- */
    // Window bar
    const bar = document.createElement("div");
    bar.className = "window-bar";
    bar.onmousedown = (e) => {
        bar.style.cursor = "grabbing";
        e.preventDefault();
        mouseDown(e, bar);
        document.onmouseup = () => {
            bar.style.cursor = "grab";
            mouseUp(win);
        }
    }
    bar.ontouchstart = (e) => {
        bar.style.cursor = "grabbing";
        e.preventDefault();
        touchStart(e, bar);
        document.ontouchend = () => {
            bar.style.cursor = "grab";
            touchEnd(win);
        }
    }

    // Window label
    const label = document.createElement("span");
    label.className = "window-label";
    label.innerText = windowLabel;

    // Close button
    const closeButton = document.createElement("button");
    closeButton.className = "button close-button";
    closeButton.onmousedown = (e) => e.stopPropagation();
    closeButton.ontouchstart = (e) => e.stopPropagation();
    closeButton.onclick = () => removeWindow(win);
    closeButton.innerHTML = "&times;";
    
    /* ----- appends ----- */
    bar.append(label);
    bar.append(closeButton);

    win.append(bar);
    win.append(windowContent);

    container.append(win);

    /* ----- window position ----- */
    win.style.top = ((innerHeight/2) - (win.clientHeight/2)) + "px";
    win.style.left = ((innerWidth/2) - (win.clientWidth/2)) + "px";
    if (lastWindow != null) {
        let topLastWindow = lastWindow.style.top;
        let leftLastWindow = lastWindow.style.left;

        if ((Number(topLastWindow.replace("px", "")) + 10) > 0 && 
        ((Number(topLastWindow.replace("px", "")) + 10) + win.clientHeight) < innerHeight) {
            win.style.top = (Number(topLastWindow.replace("px", "")) + 10) + "px";
        }
        if ((Number(leftLastWindow.replace("px", "")) - 10) > 0 &&
        ((Number(leftLastWindow.replace("px", "")) - 10) + win.clientWidth) < innerWidth) {
            win.style.left = (Number(leftLastWindow.replace("px", "")) - 10) + "px";
        }
    }

    windowNumber++;
    return win;
}

function removeWindow(element) {
    // Window > Bar > closeButton
    while(element.tagName != "BODY") {
        if(element.className == "window") {
            element.remove();

            return true; // Success

        } else {
            element = element.parentElement;
        }
    }

    return false; // Failure
}










///////////////////////////////////////////////
//              Window contents              //
///////////////////////////////////////////////

function userForm(data) {
    /* ----------------------------- USER ----------------------------- */
    // Form
    const form = document.createElement("form");
    form.id = "user-form-" + (data != undefined ? data.id : "#");
    form.className = "window-content content-user";
    form.onsubmit = (e) => {
        e.preventDefault();
        setRegistry("users", new FormData(form)).then(response =>{
            if (response.status != "failure") {
                alert(response.message);
                
                let tbody = document.getElementsByClassName("registries-table")[0].getElementsByTagName("tbody")[0];
                if (response.status == "created") {

                    tbody.append(createRow("users", Object.entries(response.registry)));

                } else if (response.status == "edited") {
                    //
                }

                removeWindow(form);

            } else {
                alert(response.message);
            }
        });
    };
    form.onmousedown = () => windowFocus(form);
    form.style.minWidth = "330px";
    form.style.minHeight = "295px";
    
    let dataName; // Data name (reseted each data);
    const fieldClassName = "field"; // All field's class
    const inputClassName = "input"; // All inputs's class
    const labelClassName = "label"; // All labels's class
    // ---------- Fields ---------- //
    /* ID */ dataName = "id";
    const idField = document.createElement("div");
    idField.hidden = true;
    //idField.className = fieldClassName;

    const idInput = document.createElement("input");
    idInput.hidden = true;
    //idInput.disabled = true; // Does not send on submit
    idInput.name = dataName;
    idInput.type = "number";
    idInput.className = inputClassName + ` ${dataName}-input`;
    idInput.id = dataName + `-${windowNumber}`;

    const idLabel = document.createElement("label");
    idLabel.hidden = true;
    idLabel.className = labelClassName;
    idLabel.textContent = "ID";
    idLabel.htmlFor = idInput.id;

    idField.append(idLabel);
    idField.append(idInput);
    
    /* User */ dataName = "user";
    const userField = document.createElement("div");
    userField.className = fieldClassName;

    const userInput = document.createElement("input");
    userInput.required = true;
    userInput.name = dataName;
    userInput.type = "text";
    userInput.className = inputClassName + ` ${dataName}-input`;
    userInput.id = dataName + `-${windowNumber}`;

    const userLabel = document.createElement("label");
    userLabel.className = labelClassName;
    userLabel.textContent = "Usuário";
    userLabel.htmlFor = userInput.id;

    userField.append(userLabel);
    userField.append(userInput);
    
    /* Password */ dataName = "password";
    const passwordField = document.createElement("div");
    passwordField.className = fieldClassName;

    const passwordInput = document.createElement("input");
    passwordInput.required = true;
    passwordInput.name = dataName;
    passwordInput.type = "password";
    passwordInput.className = inputClassName + ` ${dataName}-input`;
    passwordInput.id = dataName + `-${windowNumber}`;

    const passwordLabel = document.createElement("label");
    passwordLabel.className = labelClassName;
    passwordLabel.textContent = "Senha";
    passwordLabel.htmlFor = passwordInput.id;

    passwordField.append(passwordLabel);
    passwordField.append(passwordInput);
    
    /* Name */ dataName = "name";
    const nameField = document.createElement("div");
    nameField.className = fieldClassName;

    const nameInput = document.createElement("input");
    nameInput.required = true;
    nameInput.name = dataName;
    nameInput.type = "text";
    nameInput.className = inputClassName + ` ${dataName}-input`;
    nameInput.id = dataName + `-${windowNumber}`;

    const nameLabel = document.createElement("label");
    nameLabel.className = labelClassName;
    nameLabel.textContent = "Nome";
    nameLabel.htmlFor = nameInput.id;

    nameField.append(nameLabel);
    nameField.append(nameInput);
    
    /* Birthdate */ dataName = "birthdate";
    const birthdateField = document.createElement("div");
    birthdateField.className = fieldClassName;

    const birthdateInput = document.createElement("input");
    birthdateInput.name = dataName;
    birthdateInput.type = "date";
    birthdateInput.className = inputClassName + ` ${dataName}-input`;
    birthdateInput.id = dataName + `-${windowNumber}`;

    const birthdateLabel = document.createElement("label");
    birthdateLabel.className = labelClassName;
    birthdateLabel.textContent = "Nascimento";
    birthdateLabel.htmlFor = birthdateInput.id;

    birthdateField.append(birthdateLabel);
    birthdateField.append(birthdateInput);
    
    /* Address */ dataName = "address";
    const addressField = document.createElement("div");
    addressField.className = fieldClassName;

    const addressInput = document.createElement("input");
    addressInput.name = dataName;
    addressInput.type = "text";
    addressInput.className = inputClassName + ` ${dataName}-input`;
    addressInput.id = dataName + `-${windowNumber}`;

    const addressLabel = document.createElement("label");
    addressLabel.className = labelClassName;
    addressLabel.textContent = "Endereço";
    addressLabel.htmlFor = addressInput.id;

    addressField.append(addressLabel);
    addressField.append(addressInput);
    
    /* Email */ dataName = "email";
    const emailField = document.createElement("div");
    emailField.className = fieldClassName;

    const emailInput = document.createElement("input");
    emailInput.name = dataName;
    emailInput.type = "email";
    emailInput.className = inputClassName + ` ${dataName}-input`;
    emailInput.id = dataName + `-${windowNumber}`;

    const emailLabel = document.createElement("label");
    emailLabel.className = labelClassName;
    emailLabel.textContent = "E-mail";
    emailLabel.htmlFor = emailInput.id;

    emailField.append(emailLabel);
    emailField.append(emailInput);
    
    /* Phone */ dataName = "phone";
    const phoneField = document.createElement("div");
    phoneField.className = fieldClassName;

    const phoneInput = document.createElement("input");
    phoneInput.name = dataName;
    phoneInput.type = "tel";
    phoneInput.className = inputClassName + ` ${dataName}-input`;
    phoneInput.id = dataName + `-${windowNumber}`;
    phoneInput.placeholder = "(__)_____-____";

    const phoneLabel = document.createElement("label");
    phoneLabel.className = labelClassName;
    phoneLabel.textContent = "Telefone";
    phoneLabel.htmlFor = phoneInput.id;

    phoneField.append(phoneLabel);
    phoneField.append(phoneInput);
    
    /* CPF */ dataName = "cpf";
    const cpfField = document.createElement("div");
    cpfField.className = fieldClassName;

    const cpfInput = document.createElement("input");
    cpfInput.name = dataName;
    cpfInput.type = "text";
    cpfInput.className = inputClassName + ` ${dataName}-input`;
    cpfInput.id = dataName + `-${windowNumber}`;
    cpfInput.placeholder = "___.___.___-__";
    cpfInput.onblur = (e) => {
        /** @type {HTMLElement} */
        let input = e.currentTarget;
        /** @type {string} */
        let cpf = input.value.replace(/\D/g, "");

        if (cpf != "") {
            if (verifyCpf(cpf)) {
                input.style.removeProperty("outline-color");
                input.value = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
            } else {
                input.style.outlineColor = "red";
                
                alert("CPF inválido");
            }
        }
    };

    const cpfLabel = document.createElement("label");
    cpfLabel.className = labelClassName;
    cpfLabel.textContent = "CPF";
    cpfLabel.htmlFor = cpfInput.id;

    cpfField.append(cpfLabel);
    cpfField.append(cpfInput);
    
    /* Submit */
    const submitField = document.createElement("div");
    submitField.className = fieldClassName;

    const submitInput = document.createElement("input");
    submitInput.name = dataName;
    submitInput.className = "button";
    submitInput.type = "submit";
    submitInput.value = "Salvar";

    submitField.append(submitInput);
    
    // Appends
    form.append(idField);
    form.append(userField);
    form.append(passwordField);
    form.append(nameField);
    form.append(birthdateField);
    form.append(addressField);
    form.append(emailField);
    form.append(phoneField);
    form.append(cpfField);
    form.append(submitField);
    
    // Inserting data
    if (data != undefined) {
        idInput.value =        data.id,
        userInput.value =      data.user,
        passwordInput.value =  data.password,
        nameInput.value =      data.name,
        birthdateInput.value = data.birthdate,
        addressInput.value =   data.address,
        emailInput.value =     data.email,
        phoneInput.value =     data.phone,
        cpfInput.value =       data.cpf
    }

    return form;
}

function supplierForm() {

}

function customerForm() {

}

function productForm() {

}

function none() {
    let none = document.createElement("div");
    none.setAttribute("class", "window-content");
    // size
    none.style.minWidth = "200px";
    none.style.minHeight = "150px";

    return none;
}










//////////////////////////////////////////////
//           Other window actions           //
//////////////////////////////////////////////

// Communication variables
let focusedWindow;
let xWindow;
let yWindow;

// Window movimentatino [mouseDown -> moveWindow -> mouseUp]
function mouseDown(e, bar) {
    // Window element
    let win = bar.parentElement;

    // Focus on window (places it in front)
    focusedWindow = windowFocus(win);

    // Capture mouse moves
    document.addEventListener("mousemove", moveWindow);

    // TOP and LEFT CSS values of window
    let topWindow = win.style.top; // "px"
    let leftWindow = win.style.left;
    
    // Calculating the X and Y distance from the top left corner of the window to the mouse
    yWindow = e.pageY - Number(topWindow.replace("px", "")); // Ex: str("10px") -> num(10)
    xWindow = e.pageX - Number(leftWindow.replace("px", ""));
}

function touchStart(e, bar) {
    // Window element
    let win = bar.parentElement;

    // Focus on window (places it in front)
    focusedWindow = windowFocus(win);

    // Capture mouse moves
    document.addEventListener("touchmove", touchMoveWindow);

    // TOP and LEFT CSS values of window
    let topWindow = win.style.top; // "px"
    let leftWindow = win.style.left;
    
    e = e.touches[0];
    // Calculating the X and Y distance from the top left corner of the window to the mouse
    yWindow = e.pageY - Number(topWindow.replace("px", "")); // Ex: str("10px") -> num(10)
    xWindow = e.pageX - Number(leftWindow.replace("px", ""));
}

function moveWindow(e) {
    // Defines the TOP and LEFT css of the window based on where the mouse is grabbing on the Bar
    if ((e.pageY - yWindow) > 0 && ((e.pageY - yWindow) + focusedWindow.clientHeight) < innerHeight) {
        focusedWindow.style.top = (e.pageY - yWindow) + "px";
    } else if ((e.pageY - yWindow) < 0) {
        focusedWindow.style.top = 0 + "px";
    } else if (((e.pageY - yWindow) + focusedWindow.clientHeight) > innerHeight) {
        focusedWindow.style.top = (innerHeight - focusedWindow.clientHeight) + "px";
    }

    if ((e.pageX - xWindow) > 0 && ((e.pageX - xWindow) + focusedWindow.clientWidth) < innerWidth) {
        focusedWindow.style.left = (e.pageX - xWindow) + "px";
    } else if ((e.pageX - xWindow) < 0) {
        focusedWindow.style.left = 0 + "px";
    } else if (((e.pageX - xWindow) + focusedWindow.clientWidth) > innerWidth) {
        focusedWindow.style.left = (innerWidth - focusedWindow.clientWidth) + "px";
    }
}
/**
 * 
 * @param {TouchEvent} e 
 */
function touchMoveWindow(e) {
    e = e.touches[0];
    // Defines the TOP and LEFT css of the window based on where the mouse is grabbing on the Bar
    if ((e.pageY - yWindow) > 0 && ((e.pageY - yWindow) + focusedWindow.clientHeight) < innerHeight) {
        focusedWindow.style.top = (e.pageY - yWindow) + "px";
    } else if ((e.pageY - yWindow) < 0) {
        focusedWindow.style.top = 0 + "px";
    } else if (((e.pageY - yWindow) + focusedWindow.clientHeight) > innerHeight) {
        focusedWindow.style.top = (innerHeight - focusedWindow.clientHeight) + "px";
    }

    if ((e.pageX - xWindow) > 0 && ((e.pageX - xWindow) + focusedWindow.clientWidth) < innerWidth) {
        focusedWindow.style.left = (e.pageX - xWindow) + "px";
    } else if ((e.pageX - xWindow) < 0) {
        focusedWindow.style.left = 0 + "px";
    } else if (((e.pageX - xWindow) + focusedWindow.clientWidth) > innerWidth) {
        focusedWindow.style.left = (innerWidth - focusedWindow.clientWidth) + "px";
    }
}

// document.addEventListener("mouseleave", mouseUp);
// document.addEventListener("mouseup", mouseUp);
function mouseUp(win) {
    document.removeEventListener("mousemove", moveWindow);

    // window elements
    const windowContent = win.getElementsByClassName("window-content")[0];
    const windowBar = win.getElementsByClassName("window-bar")[0];
    // resize if out of window
    const top = Number(win.style.top.replace("px", ""));
    const bottomTop = Number(win.style.top.replace("px", "")) + win.clientHeight;
    const left = Number(win.style.left.replace("px", ""));
    const rightLeft = Number(win.style.left.replace("px", "")) + win.clientWidth;

    
    if (win.clientHeight > innerHeight) {
        win.style.top = 0 + "px";
        windowContent.style.height = (innerHeight - windowBar.style.height - 29) + "px"; // - bar.height
    } else if (top < 0) {
        win.style.top = 0 + "px";
    } else if (bottomTop > innerHeight) {
        win.style.top = (innerHeight - win.clientHeight) + "px";
    }

    if (win.clientWidth > innerWidth) {
        win.style.left = 0 + "px";
        windowContent.style.width = innerWidth + "px";
    } else if (left < 0) {
        win.style.left = 0 + "px";
    } else if (rightLeft > innerWidth) {
        win.style.left = (innerWidth - win.clientWidth) + "px";
    }
}

function touchEnd(win) {
    document.removeEventListener("touchmove", touchMoveWindow);

    // window elements
    const windowContent = win.getElementsByClassName("window-content")[0];
    const windowBar = win.getElementsByClassName("window-bar")[0];
    // resize if out of window
    const top = Number(win.style.top.replace("px", ""));
    const bottomTop = Number(win.style.top.replace("px", "")) + win.clientHeight;
    const left = Number(win.style.left.replace("px", ""));
    const rightLeft = Number(win.style.left.replace("px", "")) + win.clientWidth;

    
    if (win.clientHeight > innerHeight) {
        win.style.top = 0 + "px";
        windowContent.style.height = (innerHeight - windowBar.style.height - 29) + "px"; // - bar.height
    } else if (top < 0) {
        win.style.top = 0 + "px";
    } else if (bottomTop > innerHeight) {
        win.style.top = (innerHeight - win.clientHeight) + "px";
    }

    if (win.clientWidth > innerWidth) {
        win.style.left = 0 + "px";
        windowContent.style.width = innerWidth + "px";
    } else if (left < 0) {
        win.style.left = 0 + "px";
    } else if (rightLeft > innerWidth) {
        win.style.left = (innerWidth - win.clientWidth) + "px";
    }
}

// Places window in front
/** @param {HTMLElement} win  */
function windowFocus(win) {
    const lastWindow = container.lastChild;
    
    while(win.tagName != "BODY") {
        if(win.className == "window") {
            if (win !== lastWindow) {
                document.getElementById("container").append(win);
            }

            return win; // Success

        } else {
            win = win.parentElement;
        }
    }

    return false; // Failure
}
