// Función para obtener la cookie CSRF
function getCSRFToken() {
    let csrfToken = null;
    const cookies = document.cookie.split("; ");
    cookies.forEach(cookie => {
        if (cookie.startsWith("csrftoken=")) {
            csrfToken = cookie.split("=")[1];
        }
    });
    return csrfToken;
}

window.onload = function () {
    const btnRegister = document.getElementById("register-btn");
    const Isform = document.getElementById("FormRegister");

    document.addEventListener("click", async (event) => {
        event.preventDefault();

        if (event.target === btnRegister) {
            console.log("Se hizo un click 2");

            const dataForm = new FormData(Isform);
            const dataRaw = {};

            dataForm.forEach((value, key) => {
                dataRaw[key] = value;
            });

            console.log(dataRaw);

            const csrfToken = getCSRFToken();

            const response = await fetch("/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken, // Enviar CSRF Token correcto
                },
                body: JSON.stringify(dataRaw),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.redirect);

                window.location.href = data.redirect;

            } else {
                const data = await response.json();
                console.log(data.redirect);
                window.location.href = data.redirect;
            }

            
        }
    });
};
