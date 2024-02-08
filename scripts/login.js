var form = document.querySelector("#form");

function authenticate() {
    var formData = new FormData(form);

    fetch("/projetointegrador/actions/login.php", {
        method: "post",
        body: formData
    }).then(response => response.json())
    .then(data => {

        if (data.auth) {
            window.location.href = "/projetointegrador/home.php";
        }

        // Message
        var spanMessage = document.querySelector("#message");
        spanMessage.innerHTML = data.message;
        if (data.message != "") {
        }
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    authenticate();
});