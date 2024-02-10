///////////////////////////////////////////////
//           Add and Remove window           //
///////////////////////////////////////////////

// After adding a window, this number is increased by 1
let windowNumber = 1;

function addWindow(windowLabel = "", windowContent = none()) {
    // Windows container
    let container = document.getElementById("container");

    // Window
    let win = document.createElement("div");
    win.setAttribute("class", "window");
    win.style.top = "50%";
    win.style.left = "50%";
    // Position relative to previous window
    let lastWindow = container.lastChild;
    if (lastWindow != null) {
        let topLasWindow = lastWindow.style.top;
        let leftLastWindow = lastWindow.style.left;
        win.style.top = (Number(topLasWindow.substring(0, topLasWindow.length-1)) + 5) + "%";
        win.style.left = (Number(leftLastWindow.substring(0, leftLastWindow.length-1)) - 5) + "%";
    }

    /* ----------------------------- HEADER ----------------------------- */
    // Window bar
    let bar = document.createElement("div");
    bar.setAttribute("class", "window-bar");
    bar.setAttribute("onmousedown", "mouseDown(event, this)");
    bar.setAttribute("onmouseup", "mouseUp()");

    // window label
    let label = document.createElement("span");
    label.setAttribute("class", "window-label");
    label.innerText = windowLabel;

    // Close button
    let closeButton = document.createElement("button");
    closeButton.setAttribute("class", "close-button");
    closeButton.setAttribute("onmousedown", "event.stopPropagation()");
    closeButton.setAttribute("onclick", "removeWindow(this)");
    closeButton.innerHTML = "&times;";
    
    /* ----- appends ----- */
    bar.append(label);
    bar.append(closeButton);

    win.append(bar);
    win.append(windowContent);

    container.append(win);

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

function account() {
    /* ----------------------------- ACCOUNT ----------------------------- */
    // Form
    let form = document.createElement("form");
    form.setAttribute("class", "window-content content-account");
    form.setAttribute("action", "javascript:void(0);");
    form.setAttribute("onsubmit", "event.preventDefault(); createAccount(this);");
    
    // ----- Fields ----- //
    // ID
    let idField = createField({
        hidden: true,
        labelTextContent: "ID",
        inputName: "id",
        inputType: "number",
        inputDisabled: true
    });

    // User
    let userField = createField({
        labelTextContent: "Usuário",
        inputName: "user",
        inputType: "text"
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
        //"inputPlaceHolder": ""
        //"hidden": false
    }) {
        
        if("inputType" in params)
        switch (params.inputType) {
            case "submit":{
                // Field
                let field = document.createElement("div");
                field.setAttribute("class", "field");
                if("hidden" in params) field.setAttribute("hidden", params.hidden);
                
                // Input
                let input = document.createElement("input");
                input.setAttribute("class", "input");
                input.setAttribute("type", params.inputType);
                input.setAttribute("value", params.inputValue);
                if("inputDisabled" in params) input.setAttribute("disabled", params.inputDisabled);
                if("hidden" in params) input.setAttribute("hidden", params.hidden);

                field.append(input);
                
                return field;
                //break;
            }

            default:
                let inputID = params.inputName + `-${windowNumber}`;

                // Field
                let field = document.createElement("div");
                field.setAttribute("class", "field");
                if("hidden" in params) field.setAttribute("hidden", params.hidden);
                
                // Label
                let label = document.createElement("label");
                label.setAttribute("class", "label");
                label.setAttribute("for", inputID);
                label.textContent = params.labelTextContent;
                if("hidden" in params) label.setAttribute("hidden", params.hidden);
                
                // Input
                let input = document.createElement("input");
                input.setAttribute("class", "input");
                input.setAttribute("type", params.inputType);
                input.setAttribute("name", params.inputName);
                input.setAttribute("id", inputID);
                if("inputPlaceHolder" in params) input.setAttribute("placeholder", params.inputPlaceHolder);
                if("inputDisabled" in params) input.setAttribute("disabled", params.inputDisabled);
                if("hidden" in params) input.setAttribute("hidden", params.hidden);
            
                field.append(label);
                field.append(input);
                
                return field;
                //break;
        }
    }

    // function createButton() {}
}

function none() {
    let none = document.createElement("div");
    none.setAttribute("class", "window-content");
    // size
    none.style.width = "200px";
    none.style.height = "150px";

    return none;
}










//////////////////////////////////////////////
//           Other window actions           //
//////////////////////////////////////////////

// Communication variables
var focusedWindow;
var xWindow;
var yWindow;

// Window movimentatino [mouseDown -> moveWindow -> mouseUp]
function mouseDown(e, bar) {
    // Window element
    var win = bar.parentElement;

    // Focus on window (places it in front)
    focusedWindow = windowsFocus(win);

    // Capture mouse moves
    document.addEventListener("mousemove", moveWindow);

    // TOP and LEFT CSS values of window
    // window != win
    var topWindow = window.getComputedStyle(popup).getPropertyValue("top"); // "px"
    var leftWindow = window.getComputedStyle(popup).getPropertyValue("left");
    
    // Calculating the X and Y distance from the top left corner of the window to the mouse
    yWindow = e.pageY - Number(topWindow.substring(0, topWindow.length-2)); // Ex: str("10px") -> num(10)
    xWindow = e.pageX - Number(leftWindow.substring(0, leftWindow.length-2));
}
function moveWindow(e) {
    // Defines the TOP and LEFT css of the window based on where the mouse is grabbing on the Bar
    focusedWindow.style.top = (e.pageY - yWindow) + "px";
    focusedWindow.style.left = (e.pageX - xWindow) + "px";
}
function mouseUp() {
    document.removeEventListener("mousemove", movePopup);
}

// Places window in front
function windowFocus(win) {
    while(win.tagName != "BODY") {
        if(win.className == "window") {
            document.getElementById("container").append(win);

            return win; // Success

        } else {
            win = win.parentElement;
        }
    }

    return false; // Failure
}

