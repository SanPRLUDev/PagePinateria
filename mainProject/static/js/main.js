window.onload = function () {
  const FormCreate = document.getElementById("FormCreate");

  console.log("Hi");

  document.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (event.target == FormCreate) {
      const dataForm = new FormData(FormCreate);
      console.log(dataForm)

      const csrfToken = document.querySelector(
        "[name=csrfmiddlewaretoken]"
      ).value;

      const response = await fetch("/api/Probes/", {
        method: "POST",
        body: dataForm,
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        window.location.href = "/api/Probes/";
      } else {
        const data = await response.json();

        console.log(data);
      }
    }
  });
};

document.getElementById("create-button").addEventListener('click', (e)=>{
  e.preventDefault();
  console.log('click');
  window.location.href = "/api/Probes/"
})

document.getElementById("Delete-button").addEventListener('click', (e)=>{
  e.preventDefault();
  console.log('click');
  window.location.href = "/api/products/"
})
