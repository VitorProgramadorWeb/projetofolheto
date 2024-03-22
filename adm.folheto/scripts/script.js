/** @type {HTMLDivElement} */
// const tableWrapper = document.querySelector(".table-wrapper");
// tableWrapper.onscroll = () => {
//     tableWrapper.style.setProperty("--scroll", tableWrapper.scrollLeft / (tableWrapper.scrollWidth - tableWrapper.offsetWidth));
//     console.log(tableWrapper.scrollLeft / (tableWrapper.scrollWidth - tableWrapper.offsetWidth));
// };

let computerView = window.matchMedia("(min-width: 450px)");
computerView.onchange = () => {
    const menu = document.querySelector("body > nav");
    if (computerView.matches) {
        if (menu.style.display == "none") {
            menu.style.display = "block";
        }
    } else {
        showMenu();
    }
};

function showMenu() {
    const menu = document.querySelector("body > nav");
    const img = document.querySelector("header > nav ul li.menu img");

    if (menu.style.display == "block") {
        menu.style.display = "none";
        img.src = "/projetofolheto/adm.folheto/images/menu.svg";
    } else {
        menu.style.display = "block";
        img.src = "/projetofolheto/adm.folheto/images/close.svg";
    }
}