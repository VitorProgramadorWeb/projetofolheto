///////////////////////////////////////////////
//           Add and Remove window           //
///////////////////////////////////////////////

function addPopup(popupName = "", popupContent = none()) {
    // Container dos popups
    var popups = document.getElementById("container");

    // Popup
    var popup = document.createElement("div");
    popup.setAttribute("class", "popup");
    popup.style.top = "50%";
    popup.style.left = "50%";
    // Para colocar um deslocamento do popup anterior
    var lastPopup = popups.lastChild;
    if (lastPopup != null) {
        var topLastPopup = lastPopup.style.top;
        var leftLastPopup = lastPopup.style.left;
        popup.style.top = (Number(topLastPopup.substring(0, topLastPopup.length-1)) + 5) + "%";
        popup.style.left = (Number(leftLastPopup.substring(0, leftLastPopup.length-1)) - 5) + "%";
    }

    /* ----------------------------- CABEÇALHO ----------------------------- */
    // Bar
    var bar = document.createElement("div");
    bar.setAttribute("class", "bar");
    bar.setAttribute("onmousedown", "mouseDown(event, this)");
    bar.setAttribute("onmouseup", "mouseUp()");

    // Name bar
    var nameBar = document.createElement("span");
    nameBar.setAttribute("class", "nameBar");
    nameBar.innerText = popupName;

    // Close button
    var closeButton = document.createElement("button");
    closeButton.setAttribute("class", "closeButton");
    closeButton.setAttribute("onmousedown", "event.stopPropagation()");
    closeButton.setAttribute("onclick", "removePopup(this)");
    closeButton.innerHTML = "&times;";
    
    /* ----- appends ----- */
    bar.append(nameBar);
    bar.append(closeButton);

    popup.append(bar);
    popup.append(popupContent);

    popups.append(popup);

    return popup;
}

function removePopup(element) {
    // Popup > bar > closeButton
    while(element.tagName != "BODY") {
        if(element.className == "popup") {
            element.remove();
            return;
        } else {
            element = element.parentElement;
        }
    }
}










///////////////////////////////////////////////
//              Conteúdos POPUP              //
///////////////////////////////////////////////

function formulario(action) {
    /* ----------------------------- FORMULÁRIO ----------------------------- */
    // Form
    var form = document.createElement("form");
    form.setAttribute("class", "popupContent formulario");
    form.setAttribute("action", "javascript:void(0);");
    form.setAttribute("onsubmit", "salvarFormulario(event, this, '"+action+"');"); //event.preventDefault();
    
    // ----- Campos ----- //
    // ID
    var campoId = criarCampo("ID", "id", "number");

    // Nome
    var campoNome = criarCampo("Nome", "nome", "text");

    // Email
    var campoEmail = criarCampo("E-mail", "email", "email");

    // Nascimento
    var campoNascimento = criarCampo("Nascimento", "nascimento", "date");
    
    // Renda
    var campoRenda = criarCampo("Renda", "renda", "number");
    // step="0.01"
    // placeholder="R$"

    // CPF
    var campoCpf = criarCampo("CPF", "cpf", "text");
    // placeholder="___.___.___-__"
    
    // CNPJ
    var campoCnpj = criarCampo("CNPJ", "cnpj", "text");
    // placeholder="__.___.___/____-__"

    // Rua
    var campoRua = criarCampo("Rua", "rua", "text");

    // Nº
    var campoNumero = criarCampo("Nº", "numero", "number");

    // Complemento
    var campoComplemento = criarCampo("Complemento", "complemento", "text");

    // UF e Cidade [Campos tipo SELECT (e dentros de outra div)]
    var campoUf = criarCampo("UF", "uf", "text");
    var campoCidade = criarCampo("Cidade", "cidade", "text");

    // CEP
    var campoCep = criarCampo("CEP", "cep", "text");
    // placeholder="_____-___"

    // Telefone residencial
    var campoTelefoneResidencial = criarCampo("Telefone residencial", "telefone_residencial", "tel");
    // placeholder="(__)____-____"

    // Telefone celular
    var campoTelefoneCelular = criarCampo("Telefone celular", "telefone_celular", "tel");
    // placeholder="(__)_____-____"

    // Botão: SALVAR
    var botaoSalvar = criarBotaoSubmit();

    form.append(campoId);
    form.append(campoNome);
    form.append(campoEmail);
    form.append(campoNascimento);
    form.append(campoRenda);
    form.append(campoCpf);
    form.append(campoCnpj);
    form.append(campoRua);
    form.append(campoNumero);
    form.append(campoComplemento);
    form.append(campoUf);
    form.append(campoCidade);
    form.append(campoCep);
    form.append(campoTelefoneResidencial);
    form.append(campoTelefoneCelular);
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
    none.setAttribute("class", "popupContent");
    // size
    none.style.width = "200px";
    none.style.height = "150px";

    return none;
}










//////////////////////////////////////////////
//            Outras ações POPUP            //
//////////////////////////////////////////////

// Variáveis de comunicação
var focusedPopup;
var xPopup;
var yPopup;

// Mover popup [mouseDown -> movePopup -> mouseUp]
function mouseDown(e, bar) {
    // Elemento popup
    var popup = bar.parentElement;

    // Focar no popup (Colocá-lo à frente)
    popupFocus(popup);
    focusedPopup = popup;

    // Capturar os movimentos do mouse na página inteira
    document.addEventListener("mousemove", movePopup);

    // Pegando os valores css TOP e LEFT do popup
    var topPopup = window.getComputedStyle(popup).getPropertyValue("top"); // "px"
    var leftPopup = window.getComputedStyle(popup).getPropertyValue("left");
    
    // Calculando a distância X e Y do canto superior esquerdo do popup até o mouse
    yPopup = e.pageY - Number(topPopup.substring(0, topPopup.length-2)); // Ex: str("10px") -> num(10)
    xPopup = e.pageX - Number(leftPopup.substring(0, leftPopup.length-2));
}
function movePopup(e) {
    // Define css TOP e LEFT do popup com base no local que o mouse agarrou na Bar
    focusedPopup.style.top = (e.pageY - yPopup) + "px";
    focusedPopup.style.left = (e.pageX - xPopup) + "px";
}
function mouseUp() {
    document.removeEventListener("mousemove", movePopup);
}

// Colocar o popup na frente
function popupFocus(popup) {
    while(popup.tagName != "BODY") {
        if(popup.className == "popup") {
            document.getElementById("popups").append(popup);
            return;
        } else {
            popup = popup.parentElement;
        }
    }
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