const [form] = document.getElementsByTagName("form");

function signin() {
    let formData = new FormData(form);

    fetch("/projetofolheto/adm.folheto/actions/signin.php", {
        method: "post",
        body: formData
    }).then(response => response.json())
    .then(data => {

        if (data.status == "authenticated") {
            window.location.href = "/projetofolheto/adm.folheto/index.php";
        } else {
            // Form footer
            let formFooter = document.querySelector("main div.footer");
            formFooter.style.display = "block";
            
            // Message
            formFooter.querySelector(".message").innerHTML = data.message;
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