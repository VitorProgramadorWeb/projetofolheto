const defaultSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
defaultSvg.setAttributeNS(null, "width", "30");
defaultSvg.setAttributeNS(null, "height", "30");
defaultSvg.setAttributeNS(null, "viewBox", "0 -960 960 960");
const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttributeNS(null, "fill", "currentColor");

const moonSvg = defaultSvg.cloneNode(true);
moonSvg.setAttributeNS(null, "mode", "dark");
const moonPath = path.cloneNode();
moonSvg.append(moonPath);
moonPath.setAttributeNS(null, "d", "M481.154-140.001q-142.153 0-241.076-98.923T141.155-480q0-118.383 73.268-210.459 73.268-92.077 195.19-118.693 12.616-3.154 22.231.615 9.615 3.77 15.615 11.231t7.077 18.115q1.077 10.654-5 21.269-12.384 22.538-18.384 46.829-6 24.29-6 51.093 0 98.334 68.834 167.168 68.834 68.833 167.168 68.833 29.461 0 56.307-7.461 26.846-7.461 47-17.307 9.846-4.308 19.23-3.038 9.385 1.269 16.016 6.269 7.368 5 10.945 13.654 3.577 8.653.808 20.346-21.309 117.998-114.808 194.766-93.499 76.769-215.498 76.769Zm0-59.999q88 0 158-48.5t102-126.5q-20 5-40 8t-40 3q-123 0-209.5-86.5t-86.5-209.5q0-20 3-40t8-40q-78 32-126.5 102t-48.5 158q0 116 82 198t198 82Zm-10-270Z");

const sunSvg = defaultSvg.cloneNode(true);
sunSvg.setAttributeNS(null, "mode", "light");
const sunPath = path.cloneNode();
sunSvg.append(sunPath);
sunPath.setAttributeNS(null, "d", "M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 59.999q-74.922 0-127.461-52.538Q300.001-405.078 300.001-480t52.538-127.461Q405.078-659.999 480-659.999t127.461 52.538Q659.999-554.922 659.999-480t-52.538 127.461Q554.922-300.001 480-300.001Zm-400-150q-12.75 0-21.374-8.628Q50-467.258 50-480.013q0-12.756 8.625-21.371 8.624-8.615 21.374-8.615h90.001q12.749 0 21.374 8.628Q200-492.742 200-479.987q0 12.756-8.625 21.371-8.625 8.615-21.374 8.615H80Zm709.999 0q-12.749 0-21.374-8.628Q760-467.258 760-480.013q0-12.756 8.625-21.371 8.625-8.615 21.374-8.615H880q12.75 0 21.375 8.628 8.624 8.629 8.624 21.384 0 12.756-8.624 21.371-8.625 8.615-21.375 8.615h-90.001ZM479.987-760q-12.756 0-21.371-8.625-8.615-8.625-8.615-21.374V-880q0-12.75 8.628-21.375 8.629-8.624 21.384-8.624 12.756 0 21.371 8.624 8.615 8.625 8.615 21.375v90.001q0 12.749-8.628 21.374Q492.742-760 479.987-760Zm0 710q-12.756 0-21.371-8.626-8.615-8.624-8.615-21.374v-90.001q0-12.749 8.628-21.374Q467.258-200 480.013-200q12.756 0 21.371 8.625 8.615 8.625 8.615 21.374V-80q0 12.75-8.628 21.374Q492.742-50 479.987-50ZM240.232-678.386l-50.308-48.923q-8.923-8.308-8.616-20.884.308-12.577 8.733-21.884 9.19-9.308 21.574-9.308 12.385 0 21.077 9.308L282-720.153q8.692 9.308 8.692 21.077 0 11.769-8.5 21.076-8.499 9.307-20.576 8.807t-21.384-9.192Zm487.076 488.461L678-239.847q-8.692-9.308-8.692-21.384 0-12.077 8.692-20.769 8.115-9.307 20.288-8.807t21.48 9.192l50.308 48.923q8.923 8.308 8.616 20.884-.308 12.577-8.733 21.884-9.19 9.308-21.574 9.308-12.385 0-21.077-9.308ZM678-677.808q-9.307-8.499-8.807-20.576t9.192-21.384l48.923-50.308q8.308-8.923 20.884-8.616 12.577.308 21.884 8.733 9.308 9.19 9.308 21.574 0 12.385-9.308 21.077L720.153-678q-9.308 8.692-21.077 8.692-11.769 0-21.076-8.5ZM189.924-189.84q-9.308-9.391-9.308-21.775 0-12.385 9.308-21.077L239.847-282q9.308-8.692 21.384-8.692 12.077 0 20.769 8.692 8.923 8.115 8.423 20.288t-8.808 21.48l-48.923 50.308q-8.692 9.308-21.077 9-12.384-.307-21.691-8.916ZM480-480Z");

/**
 * Toggle password visibility by a button inner a div with the password input
 * @param {HTMLButtonElement} button - Toggle button
 */
function toggleVisibility(button) {
    const [input] = button.parentElement.getElementsByTagName('input');
    const img = document.createElement("img");
    
    if (input.type === 'password') {
        input.type = 'text';
        img.src = "/projetofolheto/folheto/images/visibility_off.svg";
        img.alt = "Ocultar";
    } else {
        input.type = 'password';
        img.src = "/projetofolheto/folheto/images/visibility.svg";
        img.alt = "Mostrar";
    }

    button.replaceChildren(img);
}

/**
 * Toggle theme mode (dark and light)
 * @param {HTMLButtonElement} button - Toggle button
 */
function toggleTheme(button) {
    let [svg] = button.parentElement.getElementsByTagNameNS("http://www.w3.org/2000/svg", "svg");
    
    if (svg.getAttributeNS(null, "mode") == "dark") {
        svg = sunSvg;
    } else {
        svg = moonSvg;
    }

    button.replaceChildren(svg);
}