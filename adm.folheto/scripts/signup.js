const form = document.getElementsByTagName("form")[0];

function signup() {
    setRegistry("users", new FormData(form)).then(response => {
        alert(response.message);
        window.location.href = "/projetofolheto/adm.folheto/signin.php";
    });
}

form.onsubmit = (e) => {
    e.preventDefault();
    signup();
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