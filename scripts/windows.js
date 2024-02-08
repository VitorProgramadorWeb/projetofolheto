///////////////////////////////////////////////
//           Add and Remove window           //
///////////////////////////////////////////////

function addWindow(windowLabel = "", windowContent = none()) {
    // Windows container
    var container = document.getElementById("container");

    // Window
    var win = document.createElement("div");
    win.setAttribute("class", "window");
    win.style.top = "50%";
    win.style.left = "50%";
    // Position relative to previous window
    var lastWindow = container.lastChild;
    if (lastWindow != null) {
        var topLasWindow = lastWindow.style.top;
        var leftLastWindow = lastWindow.style.left;
        win.style.top = (Number(topLasWindow.substring(0, topLasWindow.length-1)) + 5) + "%";
        win.style.left = (Number(leftLastWindow.substring(0, leftLastWindow.length-1)) - 5) + "%";
    }

    /* ----------------------------- HEADER ----------------------------- */
    // Window bar
    var bar = document.createElement("div");
    bar.setAttribute("class", "window-bar");
    bar.setAttribute("onmousedown", "mouseDown(event, this)");
    bar.setAttribute("onmouseup", "mouseUp()");

    // window label
    var label = document.createElement("span");
    label.setAttribute("class", "window-label");
    label.innerText = windowLabel;

    // Close button
    var closeButton = document.createElement("button");
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
    var form = document.createElement("form");
    form.setAttribute("class", "window-content content-account");
    form.setAttribute("action", "javascript:void(0);");
    // form.setAttribute("onsubmit", "salvarFormulario(event, this, '"+action+"');"); //event.preventDefault();
    
    // ----- Fields ----- //
    // User
    var campoUser = criarCampo("User", "user", "text");

    // Name
    var campoNome = criarCampo("Nome", "nome", "text");
    
    // Birthdate
    var campoNascimento = criarCampo("Nascimento", "nascimento", "date");
    
    // Address
    var campoRua = criarCampo("Rua", "rua", "text");

    // Email
    var campoEmail = criarCampo("E-mail", "email", "email");
    
    // Phone
    var campoTelefoneResidencial = criarCampo("Telefone residencial", "telefone_residencial", "tel");
    // placeholder="(__)_____-____"

    // CPF
    var campoCpf = criarCampo("CPF", "cpf", "text");
    // placeholder="___.___.___-__"

    // Save button
    var botaoSalvar = criarBotaoSubmit();

    form.append(campoUser);
    form.append(campoNome);
    form.append(campoNascimento);
    form.append(campoRua);
    form.append(campoEmail);
    form.append(campoTelefoneResidencial);
    form.append(campoCpf);
    form.append(botaoSalvar);

    return form;


    
    function criarCampo(labelText, inputID, inputType) {
        // Campo
        var campo = document.createElement("div");
        campo.setAttribute("class", "campo");
    
        // Label
        var label = document.createElement("label");
        label.setAttribute("for", inputID);
        label.innerText = labelText;
    
        // Input
        var input = document.createElement("input");
        input.setAttribute("type", inputType);
        input.setAttribute("name", inputID);
        input.setAttribute("class", inputID);
        input.setAttribute("id", inputID);
        //input.setAttribute("placeholder", "");
    
        campo.append(label);
        campo.append(input);
        return campo;
    }

    function criarBotaoSubmit(buttonText) {
        // Campo
        var campo = document.createElement("div");
        campo.setAttribute("class", "campo");
    
        // Input
        var input = document.createElement("input");
        input.setAttribute("class", "salvar");
        input.setAttribute("value", "Salvar");
        input.setAttribute("type", "submit");
    
        campo.append(input);
        return campo;
    }
}

function configuracao() {
    
}

function none() {
    var none = document.createElement("div");
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

// Salvar formulário
function salvarFormulario(e, form, action) {
    
    // Dados do formulário
    var dadosForm = e.currentTarget;
    var dados = {
        id:                   dadosForm.id.value,
        nome:                 dadosForm.nome.value,
        email:                dadosForm.email.value,
        nascimento:           dadosForm.nascimento.value,
        renda:                dadosForm.renda.value,
        cpf:                  dadosForm.cpf.value,
        cnpj:                 dadosForm.cnpj.value,
        rua:                  dadosForm.rua.value,
        numero:               dadosForm.numero.value,
        complemento:          dadosForm.complemento.value,
        uf:                   dadosForm.uf.value,
        cidade:               dadosForm.cidade.value,
        cep:                  dadosForm.cep.value,
        telefone_residencial: dadosForm.telefone_residencial.value,
        telefone_celular:     dadosForm.telefone_celular.value
    };

    // Criando os parâmetros
    var param = "?";
    for (var dado in dados) {
        param += dado+"="+dados[dado]+"&";
    }
    param = param.substring(0, param.length-1); // - ...&

    // AJAX
    var xmlhttp = new XMLHttpRequest();

    // Ao receber a resposta
    xmlhttp.onload = function() {

        if(this.response != "") {
            alert(this.response); // ERRO
        } else {
            carregarTabela();
            removePopup(form);
        }
        
    };

    // Enviando o pedido
    xmlhttp.open("GET", action+".php"+param);
    xmlhttp.send();
}