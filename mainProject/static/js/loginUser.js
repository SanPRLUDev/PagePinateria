window.onload = function () {
  const Form = document.getElementById("FormLogin");

  document.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("Se hizo un click");

    if (event.target == Form) {
      console.log("Se hizo un click");

      const dataForm = new FormData(Form);

      const rawData = {};

      dataForm.forEach((value, key) => {
        rawData[key] = value;
      });

      console.log(rawData);

      const csrfToken = document.querySelector(
        "[name=csrfmiddlewaretoken]"
      ).value;

      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(rawData),
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
