///////////////////////////////////////////////
//           Add and Remove window           //
///////////////////////////////////////////////


// After adding a window, this number is increased by 1
let windowNumber = 1;

// Windows container
const container = document.getElementById("container");

function addWindow(windowLabel = "", content = none()) {

    const lastWindow = container.lastChild; // Position relative to last window

    // Window
    const win = document.createElement("div");
    win.className = "window";
    win.style.zIndex = 2;

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
    const label = document.createElement("div");
    label.className = "window-label";
    label.innerText = windowLabel;

    // Close button
    const closeButton = document.createElement("button");
    closeButton.className = "button close-button";
    closeButton.onmousedown = (e) => e.stopPropagation();
    closeButton.ontouchstart = (e) => e.stopPropagation();
    closeButton.onclick = () => removeWindow(win);
    closeButton.innerHTML = "&times;";

    // Window content
    const windowContent = document.createElement("div");
    windowContent.className = "window-content";
    windowContent.style.marginTop = "30px";
    windowContent.style.width = "340px";
    windowContent.style.height = "fit-content";
    
    /* ----- appends ----- */
    bar.append(label);
    bar.append(closeButton);

    win.append(bar);
    windowContent.append(content);
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

function administratorForm(data) {
    /* ----------------------------- USER ----------------------------- */
    // Form
    const form = document.createElement("form");
    form.id = "administrator-form-" + (data != undefined ? data.id : "0");
    form.className = "content-administrator";
    form.onsubmit = (e) => {
        e.preventDefault();

        let tbody = document.querySelector("main table").querySelector("tbody");

        if (data?.action == "update") {
            updateAdministrator(new FormData(form)).then(response => {
                alert(response.message);
                if (response.status == "updated") {
                    let tableRow = [...tbody.querySelectorAll("tr")].find((tr) => {
                        return (tr.querySelector(".id").innerText == response.data.id);
                    });
                    tableRow.replaceWith(createTableRow(response.data));
    
                    removeWindow(form);
    
                }
            });

        } else {
            createAdministrator(new FormData(form)).then(response => {
                alert(response.message);
                if (response.status == "created") {
                    tbody.append(createTableRow(response.data));
    
                    removeWindow(form);
    
                }
            });

        }
    };
    form.onmousedown = () => windowFocus(form);
    
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

    /* Image */ dataName = "image";
    const imageField = document.createElement("div");
    imageField.className = fieldClassName;

    const image = document.createElement("img");
    image.loading = "lazy";
    image.src = "/projetofolheto/adm.folheto/images/person.svg";
    image.id = dataName + `-${windowNumber}`;

    const imageContainer = document.createElement("div");
    imageContainer.className = `${dataName}-container`;

    imageContainer.append(image);

    // adicionar / remover
    const editImageField = document.createElement("div");
    editImageField.className = "add-remove-image";

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.name = "image";
    imageInput.className = inputClassName + ` ${dataName}-input`;
    imageInput.id = `input-${dataName}-${windowNumber}`;
    imageInput.style.display = "none";
    imageInput.onchange = () => {
        const [file] = imageInput.files;
        if (file) {
            image.src = URL.createObjectURL(file);
        }
    };

    const imageInputLabel = document.createElement("label");
    imageInputLabel.className = labelClassName + " button";
    imageInputLabel.textContent = "Adicionar";
    imageInputLabel.htmlFor = imageInput.id;
    
    const removeImage = document.createElement("a");
    removeImage.href = "#remove-image";
    removeImage.innerHTML = "Remover";
    removeImage.onclick = () => {
        imageInput.value = "";
        image.src = "/projetofolheto/adm.folheto/images/person.svg";
    }

    editImageField.append(imageInputLabel);
    editImageField.append(imageInput);
    editImageField.append(" / ");
    editImageField.append(removeImage);

    imageField.append(imageContainer);
    imageField.append(editImageField);

    /* Username */ dataName = "username";
    const userField = document.createElement("div");
    userField.className = fieldClassName;

    const userInput = document.createElement("input");
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
    
    /* Password field */ dataName = "password";
    const passwordField = document.createElement("div");
    passwordField.className = fieldClassName;

    /* Password */ dataName = "password";
    const passwordAndToggleField = document.createElement("div");
    passwordAndToggleField.className = "password";

    const passwordInput = document.createElement("input");
    passwordInput.name = dataName;
    passwordInput.type = "password";
    passwordInput.className = inputClassName + ` ${dataName}-input`;
    passwordInput.id = `${dataName}-${windowNumber}`;
    
    const passwordToggle = document.createElement("button");
    passwordToggle.className = "button";
    passwordToggle.type = "button";
    passwordToggle.innerHTML = "Mostrar";
    passwordToggle.tabIndex = "-1";
    passwordToggle.onclick = () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordToggle.innerHTML = "Ocultar";
        } else {
            passwordInput.type = "password";
            passwordToggle.innerHTML = "Mostrar";
        }
    };

    passwordAndToggleField.append(passwordInput);
    passwordAndToggleField.append(passwordToggle);

    const passwordLabel = document.createElement("label");
    passwordLabel.className = labelClassName;
    passwordLabel.textContent = "Senha";
    passwordLabel.htmlFor = passwordInput.id;

    passwordField.append(passwordLabel);
    passwordField.append(passwordAndToggleField);

    /* Change password link */
    const passwordLink = document.createElement("a");
    passwordLink.innerHTML = "Alterar senha";
    passwordLink.href = "#change-password";
    passwordLink.onclick = () => {
        passwordAndToggleField.style.display = "flex";
        passwordLink.style.display = "none";
    };

    passwordField.append(passwordLink);

    if (data == undefined) { // create password
        passwordLink.style.display = "none";
        
    } else { // change password
        passwordAndToggleField.style.display = "none";

    }
    
    /* Submit */
    const submitField = document.createElement("div");
    submitField.className = fieldClassName;

    const submitInput = document.createElement("input");
    submitInput.className = "button";
    submitInput.type = "submit";
    submitInput.value = "Salvar";

    submitField.append(submitInput);
    
    // Appends
    form.append(idField);
    form.append(imageField);
    form.append(userField);
    form.append(passwordField);
    form.append(submitField);
    
    // Inserting data
    if (data != undefined) {
        idInput.value =   data.id;
        userInput.value = data.username;
        // Inserting image
        if (!(data.image == null || data.image == "")) {
            image.src =  `data:image/png;base64, ${data.image}`;
        }
    }

    return form;
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

function changePassword(data = {id: 0}) {
    const form = document.createElement("form");
    form.id = "changepassword-form-" + data.id;
    form.className = "window-content content-changepassword";
    form.onsubmit = (e) => {
        e.preventDefault();
        // ...
    };
    form.onmousedown = () => windowFocus(form);
    form.style.minWidth = "515px";
    form.style.minHeight = "135px";

    let dataName; // Data name (reseted each data);
    const fieldClassName = "field"; // All field's class
    const inputClassName = "input"; // All inputs's class
    const labelClassName = "label"; // All labels's class

    /* Old password */ dataName = "password";
    const oldPasswordField = document.createElement("div");
    oldPasswordField.className = fieldClassName;

    const oldPasswordAndToggleField = document.createElement("div");
    oldPasswordAndToggleField.className = "password";

    const oldPasswordInput = document.createElement("input");
    oldPasswordInput.name = dataName;
    oldPasswordInput.type = "password";
    oldPasswordInput.className = inputClassName + ` ${dataName}-input`;
    oldPasswordInput.id = `old-${dataName}-${windowNumber}`;
    
    const oldPasswordToggle = document.createElement("button");
    oldPasswordToggle.className = "button";
    oldPasswordToggle.type = "button";
    oldPasswordToggle.innerHTML = "Mostrar";
    oldPasswordToggle.tabIndex = "-1";
    oldPasswordToggle.onclick = () => {
        if (oldPasswordInput.type === "password") {
            oldPasswordInput.type = "text";
            oldPasswordToggle.innerHTML = "Ocultar";
        } else {
            oldPasswordInput.type = "password";
            oldPasswordToggle.innerHTML = "Mostrar";
        }
    };

    oldPasswordAndToggleField.append(oldPasswordInput);
    oldPasswordAndToggleField.append(oldPasswordToggle);

    const oldPasswordLabel = document.createElement("label");
    oldPasswordLabel.className = labelClassName;
    oldPasswordLabel.textContent = "Senha antiga";
    oldPasswordLabel.htmlFor = oldPasswordInput.id;

    oldPasswordField.append(oldPasswordLabel);
    oldPasswordField.append(oldPasswordAndToggleField);

    /* New password */ dataName = "password";
    const newPasswordField = document.createElement("div");
    newPasswordField.className = fieldClassName;

    const newPasswordAndToggleField = document.createElement("div");
    newPasswordAndToggleField.className = "password";

    const newPasswordInput = document.createElement("input");
    newPasswordInput.name = dataName;
    newPasswordInput.type = "password";
    newPasswordInput.className = inputClassName + ` ${dataName}-input`;
    newPasswordInput.id = `new-${dataName}-${windowNumber}`;
    
    const newPasswordToggle = document.createElement("button");
    newPasswordToggle.className = "button";
    newPasswordToggle.type = "button";
    newPasswordToggle.innerHTML = "Mostrar";
    newPasswordToggle.tabIndex = "-1";
    newPasswordToggle.onclick = () => {
        if (newPasswordInput.type === "password") {
            newPasswordInput.type = "text";
            newPasswordToggle.innerHTML = "Ocultar";
        } else {
            newPasswordInput.type = "password";
            newPasswordToggle.innerHTML = "Mostrar";
        }
    };

    newPasswordAndToggleField.append(newPasswordInput);
    newPasswordAndToggleField.append(newPasswordToggle);

    const newPasswordLabel = document.createElement("label");
    newPasswordLabel.className = labelClassName;
    newPasswordLabel.textContent = "Senha nova";
    newPasswordLabel.htmlFor = newPasswordInput.id;

    newPasswordField.append(newPasswordLabel);
    newPasswordField.append(newPasswordAndToggleField);
    
    /* Submit */
    const submitField = document.createElement("div");
    submitField.className = fieldClassName;
    
    const submitInput = document.createElement("input");
    submitInput.className = "button";
    submitInput.type = "submit";
    submitInput.value = "Alterar senha";
    
    submitField.append(submitInput);

    form.append(oldPasswordField);
    form.append(newPasswordField);
    form.append(submitField);

    return form;
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
