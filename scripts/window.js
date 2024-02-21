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
    win.setAttribute("class", "window");

    /* ----------------------------- HEADER ----------------------------- */
    // Window bar
    const bar = document.createElement("div");
    bar.className = "window-bar";
    bar.setAttribute("onmousedown", "this.style.cursor = 'grabbing'; mouseDown(event, this)");
    bar.setAttribute("onmouseup", "this.style.cursor = 'grab'");
    bar.setAttribute("onmouseleave", "this.style.cursor = 'grab'");

    // Window label
    const label = document.createElement("span");
    label.setAttribute("class", "window-label");
    label.innerText = windowLabel;

    // Close button
    const closeButton = document.createElement("button");
    closeButton.setAttribute("class", "button close-button");
    closeButton.setAttribute("onmousedown", "event.stopPropagation()");
    closeButton.setAttribute("onclick", "removeWindow(this)");
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
    let form = document.createElement("form");
    form.className = "window-content content-user";
    form.id = `user-form-${data.id}`;
    form.onsubmit = (e) => {e.preventDefault(); setRegistry(form)};
    form.onmousedown = () => windowFocus(form);
    form.style.minWidth = "330px";
    form.style.minHeight = "290px";
    
    // ----- Fields ----- //
    // ID
    let idField = createField({
        hidden: true,
        labelTextContent: "ID",
        inputName: "id",
        inputType: "number",
        inputDisabled: true,
        inputValue: data.id
    });
    idField.removeAttribute("class");

    // User
    let userField = createField({
        labelTextContent: "Usuário",
        inputName: "user",
        inputType: "text",
        inputRequired: true,
        inputValue: data.user
    });
    
    // Password
    let passwordField = createField({
        labelTextContent: "Senha",
        inputName: "password",
        inputType: "password",
        inputRequired: true,
        inputValue: data.password
    });

    // Name
    let nameField = createField({
        labelTextContent: "Nome",
        inputName: "name",
        inputType: "text",
        inputValue: data.name
    });
    
    // Birthdate
    let birthdateField = createField({
        labelTextContent: "Nascimento",
        inputName: "birthdate",
        inputType: "date",
        inputValue: data.birthdate
    });
    
    // Address
    let addressField = createField({
        labelTextContent: "Endereço",
        inputName: "address",
        inputType: "text",
        inputValue: data.address
    });

    // Email
    let emailField = createField({
        labelTextContent: "E-mail",
        inputName: "email",
        inputType: "email",
        inputValue: data.email
    });
    
    // Phone
    let phoneField = createField({
        labelTextContent: "Telefone",
        inputName: "phone",
        inputType: "tel",
        inputPlaceHolder: "(__)_____-____",
        inputValue: data.phone
    });

    // CPF
    let cpfField = createField({
        labelTextContent: "CPF",
        inputName: "cpf",
        inputType: "text",
        inputPlaceHolder: "___.___.___-__",
        inputValue: data.cpf
    });

    // Submit button
    let submitButton = createField({
        inputType: "submit",
        inputValue: "Salvar"
    });

    form.append(idField);
    form.append(userField);
    form.append(passwordField);
    form.append(nameField);
    form.append(birthdateField);
    form.append(addressField);
    form.append(emailField);
    form.append(phoneField);
    form.append(cpfField);
    
    form.append(submitButton);

    return form;


    
    
    function createField(params = {
        "labelTextContent": "Texto",
        "inputName": "text",
        "inputType": "text"
        //"inputValue": ""
        //"inputDisabled": false
        //"inputRequired": false
        //"inputPlaceHolder": ""
        //"hidden": false
    }) {
        let field, label, input;

        if("inputType" in params)
        switch (params.inputType) {
    
            case "submit":
                // Field
                field = document.createElement("div");
                field.setAttribute("class", "field");
                if("hidden" in params) field.setAttribute("hidden", params.hidden);
                
                // Input
                input = document.createElement("input");
                input.setAttribute("class", `input ${params.inputType}`);
                input.setAttribute("type", params.inputType);
                input.setAttribute("value", params.inputValue);
                if("inputDisabled" in params) input.setAttribute("disabled", params.inputDisabled);
                if("hidden" in params) input.setAttribute("hidden", params.hidden);

                field.append(input);
                
                return field;
                //break;

            case "checkbox":
                // Field
                field = document.createElement("div");
                field.setAttribute("class", "field");
                if("hidden" in params) field.setAttribute("hidden", params.hidden);
                
                // Label
                label = document.createElement("label");
                label.textContent = params.labelTextContent;

                // Input
                input = document.createElement("input");
                input.setAttribute("class", `input ${params.inputType}`);
                input.setAttribute("type", params.inputType);
                if("inputValue" in params) input.setAttribute("value", params.inputValue);
                if("inputDisabled" in params) input.setAttribute("disabled", params.inputDisabled);
                if("hidden" in params) input.setAttribute("hidden", params.hidden);

                label.append(input);
                field.append(label);
                
                return field;
                //break;

            default:
                let inputID = params.inputName + `-${windowNumber}`;

                // Field
                field = document.createElement("div");
                field.setAttribute("class", "field");
                if("hidden" in params) field.setAttribute("hidden", params.hidden);
                
                // Label
                label = document.createElement("label");
                label.setAttribute("class", "label");
                label.setAttribute("for", inputID);
                label.textContent = params.labelTextContent;
                if("hidden" in params) label.setAttribute("hidden", params.hidden);
                
                // Input
                input = document.createElement("input");
                input.setAttribute("class", `input ${params.inputName}`);
                input.setAttribute("type", params.inputType);
                input.setAttribute("name", params.inputName);
                input.setAttribute("id", inputID);
                if("inputValue" in params) input.setAttribute("value", params.inputValue);
                if("inputPlaceHolder" in params) input.setAttribute("placeholder", params.inputPlaceHolder);
                if("inputDisabled" in params) input.setAttribute("disabled", params.inputDisabled);
                if("inputRequired" in params) input.setAttribute("required", params.inputRequired);
                if("hidden" in params) input.setAttribute("hidden", params.hidden);

                field.append(label);
                
                if(params.inputType == "password") {
                    // Wrapper password + toggle
                    let div = document.createElement("div");
                    div.setAttribute("class", "wrapper");

                    // Password visibility toggle
                    let toggle = document.createElement("input");
                    toggle.setAttribute("class", `input checkbox`);
                    toggle.setAttribute("type", "checkbox");
                    toggle.addEventListener("click", (e) => {
                        let inputPassword = toggle.parentElement.getElementsByClassName("password")[0];
                        if (inputPassword.type == "password") {
                            inputPassword.type = "text";
                        } else {
                            inputPassword.type = "password";
                        }
                    });

                    div.append(input);
                    div.append(toggle);
                    field.append(div);
                } else {
                    field.append(input);
                }
                
                return field;
                //break;
        }
    }

    // function createButton() {}
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

document.addEventListener("mouseleave", mouseUp);
document.addEventListener("mouseup", mouseUp);
function mouseUp() {
    document.removeEventListener("mousemove", moveWindow);

    // window elements
    const win = focusedWindow;
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
