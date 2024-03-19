const form = document.getElementsByTagName("form")[0];

function signin() {
    let formData = new FormData(form);

    fetch("/projetofolheto/adm.folheto/actions/signin.php", {
        method: "post",
        body: formData
    }).then(response => response.json())
    .then(data => {

        if (data.status == "authenticated") {
            window.location.href = "/projetofolheto/adm.folheto/home.php";
        } else {
            // Message
            let spanMessage = document.querySelector("#message");
            spanMessage.innerHTML = data.message;
        }
    });
}

form.onsubmit = (e) => {
    e.preventDefault();
    signin();
};

/**
 * Toggle password visibility by a button inner a div with the password input
 * @param {HTMLButtonElement} button - toggle button
 */
function togglePasswordVisibility(button) {
    let input = button.parentElement.getElementsByTagName('input')[0];
    
    if (input.type === 'password') {
        input.type = 'text'; button.innerText = 'Ocultar'
    } else {
        input.type = 'password'; button.innerText = 'Mostrar'
    }
}