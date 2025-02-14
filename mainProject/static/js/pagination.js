window.onload = async function () {
  fetchProducts("/api/list-products/");
};

let nextPage = null;
let previousPage = null;

fetchProducts = async (url) => {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();

    const productlist = document.getElementById("product-list");
    productlist.innerHTML = ""; // Limpiar la lista antes de agregar los nuevos productos

    data.results.forEach((product) => {
      console.log(product);
      // Crear elementos manualmente
      const li = document.createElement("li");

      const div = document.createElement("div");
      div.className = "container";

      const img = document.createElement("img");
      img.src = product.image_url || "default_image.png";
      img.width = 500;
      img.height = 400;

      const Btn = document.createElement("button");
      Btn.textContent = "Eliminar";

      const DescriptionAll = document.createElement("ul");
      const li_1 = document.createElement("li");
      li_1.textContent = `Nombre: ${product.name}`;
      DescriptionAll.appendChild(li_1);
      const li_2 = document.createElement("li");
      li_2.textContent = `Precio: ${product.price}`;
      DescriptionAll.appendChild(li_2);
      const li_3 = document.createElement("li");
      li_3.textContent = `Categoria: ${product.category}`;
      DescriptionAll.appendChild(li_3);
      const li_4 = document.createElement("li");
      li_4.textContent = `Descripcion: ${product.description}`;
      DescriptionAll.appendChild(li_4);
      const li_5 = document.createElement("li");
      li_5.textContent = `Stock: ${product.stock}`;
      DescriptionAll.appendChild(li_5);
      const li_6 = document.createElement("li");
      li_6.textContent = `Fecha de Creacion: ${product.date_creation}`;
      DescriptionAll.appendChild(li_6);

      Btn.addEventListener("click", async () => {
        const csrfToken = getCSRFToken(); // ⬅️ Obtener el CSRF token

        if (!csrfToken) {
          console.error("CSRF token no encontrado.");
          return;
        }
        else{
          console.log(csrfToken);
        }

        const ResponseEliminar = await fetch("/api/list-products/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({ name: product.name }), // Enviar el nombre como JSON
        });

        if (ResponseEliminar.ok) {
          productlist.removeChild(li); // ✅ Eliminar el producto del DOM
        } else {
          console.log("Hubo un error al eliminar el producto.");
        }
      });

      div.appendChild(img);
      div.appendChild(DescriptionAll);
      div.appendChild(Btn);
      li.appendChild(div);
      productlist.appendChild(li);
    });

    nextPage = data.next;
    previousPage = data.previous;
    updatePaginationButtons();
  } else {
    console.log("Hubo un error en la solicitud de productos.");
  }
};

updatePaginationButtons = () => {
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");

  if (nextPage) {
    nextButton.disabled = false;
  } else {
    nextButton.disabled = true;
  }

  if (previousPage) {
    prevButton.disabled = false;
  } else {
    prevButton.disabled = true;
  }
};

// Manejar el clic en el botón "Siguiente"
document.getElementById("next-button").addEventListener("click", (e) => {
  e.preventDefault();
  if (nextPage) {
    fetchProducts(nextPage);
  }
});

// Manejar el clic en el botón "Anterior"
document.getElementById("prev-button").addEventListener("click", (e) => {
  e.preventDefault();
  if (previousPage) {
    fetchProducts(previousPage);
  }
});

document.getElementById("create-button").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/api/Probes/";
});

document.getElementById("Delete-button").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/api/products/";
});

document
  .getElementById("Logout-button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const NewResponse = await fetch("/api/logout/");

    if (NewResponse.ok) {
      window.location.href = "/api/login/";
    } else {
      window.location.href = "/api/products/";
    }
  });

function getCSRFToken() {
  let cookieValue = null;
  let cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].split("=");
    if (cookie[0] === "csrftoken") {
      cookieValue = cookie[1];
      break;
    }
  }
  return cookieValue;
}
