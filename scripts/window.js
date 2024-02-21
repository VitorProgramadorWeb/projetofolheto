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
    bar.setAttribute("class", "window-bar");
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

const resizeObserver = new ResizeObserver((entries) => {
    const targ = entries[0].target;
    const windowContent = targ.getElementsByClassName("window-content")[0];

    if (((Number(targ.style.top.replace("px", "")) + 10) + windowContent.clientHeight) > innerHeight) {
        windowContent.style.height = (innerHeight - Number(targ.style.top.replace("px", "")) - 5) + "px";
    }
    if (((Number(targ.style.left.replace("px", "")) - 10) + windowContent.clientWidth) > innerWidth) {
        windowContent.style.width = (innerWidth - Number(targ.style.left.replace("px", "")) - 5) + "px";
    }
});

function account(action = "") {
    /* ----------------------------- ACCOUNT ----------------------------- */
    // Form
    let form = document.createElement("form");
    form.setAttribute("class", "window-content content-account");
    form.setAttribute("onsubmit", `event.preventDefault(); ${action};`);
    form.setAttribute("onmousedown", `windowFocus(this)`);
    form.style.minWidth = "330px";
    form.style.minHeight = "290px";
    
    // ----- Fields ----- //
    // ID
    let idField = createField({
        hidden: true,
        labelTextContent: "ID",
        inputName: "id",
        inputType: "number",
        inputDisabled: true
    });
    idField.removeAttribute("class");

    // User
    let userField = createField({
        labelTextContent: "Usuário",
        inputName: "user",
        inputType: "text",
        inputRequired: true
    });
    
    // Password
    let passwordField = createField({
        labelTextContent: "Senha",
        inputName: "password",
        inputType: "password",
        inputRequired: true
    });

    // Name
    let nameField = createField({
        labelTextContent: "Nome",
        inputName: "name",
        inputType: "text"
    });
    
    // Birthdate
    let birthdateField = createField({
        labelTextContent: "Nascimento",
        inputName: "birthdate",
        inputType: "date"
    });
    
    // Address
    let addressField = createField({
        labelTextContent: "Endereço",
        inputName: "address",
        inputType: "text"
    });

    // Email
    let emailField = createField({
        labelTextContent: "E-mail",
        inputName: "email",
        inputType: "email"
    });
    
    // Phone
    let phoneField = createField({
        labelTextContent: "Telefone",
        inputName: "phone",
        inputType: "tel",
        inputPlaceHolder: "(__)_____-____"
    });

    // CPF
    let cpfField = createField({
        labelTextContent: "CPF",
        inputName: "cpf",
        inputType: "text",
        inputPlaceHolder: "___.___.___-__"
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

function userForm() {
    
}

function supplierForm() {

}

function customerForm() {

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
    if ((e.pageY - yWindow) > 0 &&
    ((e.pageY - yWindow) + focusedWindow.clientHeight) < innerHeight) {
        focusedWindow.style.top = (e.pageY - yWindow) + "px";
    }
    if ((e.pageX - xWindow) > 0 &&
    ((e.pageX - xWindow) + focusedWindow.clientWidth) < innerWidth) {
        focusedWindow.style.left = (e.pageX - xWindow) + "px";
    }
}

document.addEventListener("mouseleave", mouseUp);
document.addEventListener("mouseup", mouseUp);
function mouseUp() {
    document.removeEventListener("mousemove", moveWindow);
}

// Places window in front
function windowFocus(win) {
    const lastWindow = container.lastChild;
    
    while(win.tagName != "BODY") {
        if(win.className == "window") {
            if (win !== lastWindow) {
                document.getElementById("container").append(win);
            }
            // resize if out of window
            const windowContent = win.getElementsByClassName("window-content")[0];

            if ((Number(win.style.top.replace("px", "")) + win.clientHeight) >= innerHeight) {
            windowContent.style.height = (innerHeight - Number(win.style.top.replace("px", "")) - 30) + "px"; // -30px (bug?)
            }
            if ((Number(win.style.left.replace("px", "")) + win.clientWidth) >= innerWidth) {
            windowContent.style.width = (innerWidth - Number(win.style.left.replace("px", ""))) + "px";
            }

            return win; // Success

        } else {
            win = win.parentElement;
        }
    }

    return false; // Failure
}
