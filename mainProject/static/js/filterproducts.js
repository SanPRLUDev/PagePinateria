document.addEventListener("DOMContentLoaded", () => {
  console.log("Iniciando...");
  const searchInput = document.getElementById("search");
  const btnSearch = document.getElementById("btn-search");

  const searchNav = document.getElementById("search-Nav");
  const catalogNav = document.getElementById("catalog-Nav");
  const mainNav = document.getElementById("main-Nav");

  const btnNext = document.getElementsByClassName("next-button");
  const btnPrevious = document.getElementById("prev-button");

  document.addEventListener(('click'), (event_mul) => {
    if(event_mul.target == mainNav){
      window.location.href = "/market/"
    }
    else if(event_mul.target == btnSearch)
    {
      const searchTerm = searchInput.value.trim();
      console.log(searchTerm);
      if (searchTerm) {
        const newUrl = `/market-search/?search=${encodeURIComponent(
          searchTerm
        )}&page=1`;
        window.location.href = newUrl;
      }
    }
    else if(event_mul.target == searchNav){
      window.location.href = "/market-search/"
    }
    else if(event_mul.target == catalogNav){
      window.location.href = "/market-search/?search=all&page=1"
    }
  });


  const params = new URLSearchParams(window.location.search);
  const searchParam = params.get("search");
  const pageParam = params.get("page") || 1;

  // Verificar si la URL es "/market-search/" sin parámetros
  if (!searchParam && !pageParam) {
    btnNext.hidden = true;
    btnPrevious.hidden = true;
  } else {
    btnNext.hidden = false;
    btnPrevious.hidden = false;
  }

  if (searchParam) {
    searchInput.value = searchParam;

    searchInput.hidden = true;
    btnSearch.hidden = true;

    fetchProducts(searchParam, pageParam);
  }
});

async function fetchProducts(search, page) {
  try {
    const btnNext = document.getElementById("next-button");
    const btnPrevious = document.getElementById("prev-button");
    const resultsHeader = document.getElementById("results-header");
    const NumPage = document.getElementById("Num-pages");

    const response = await fetch(
      `/market-search/api/?search=${encodeURIComponent(search)}&page=${page}`
    );
    const data = await response.json();

    NumPage.textContent = `pagina ${page} de ${data.total_pages}`

    if (!data.next) {
      btnNext.disabled = true;
    }

    if (!data.previous) {
      btnPrevious.disabled = true;
    }

    if(search === 'all'){
      resultsHeader.innerHTML = `Catalogo completo de productos`;
    }
    else if(search === 'piñatas-niño'){
      resultsHeader.innerHTML = `piñatas niño`;
    }
    else if(search === 'piñatas-niña'){
      resultsHeader.innerHTML = `piñatas niña`;
    }
    else if(search === 'piñatas-adulto'){
      resultsHeader.innerHTML = `piñatas adulto`;
    }
    else if(search === 'porcelanicron-matrimonio'){
      resultsHeader.innerHTML = `motivos matrimonio`;
    }
    else if(search === 'porcelanicron-quinceañeras'){
      resultsHeader.innerHTML = `motivos quinceañeras`;
    }
    else if(search === 'porcelanicron-animados'){
      resultsHeader.innerHTML = `motivos animados`;
    }
    else if(search === 'porcelanicron-profesiones'){
      resultsHeader.innerHTML = `motivos profesiones`;
    }
    else if(search === 'porcelanicron-comunion'){
      resultsHeader.innerHTML = `motivos comunion`;
    }
    else if(search === 'porcelanicron-grados'){
      resultsHeader.innerHTML = `motivos grados`;
    }
    else if(search === 'stickers-niño'){
      resultsHeader.innerHTML = `stickers niño`;
    }
    else if(search === 'stickers-niña'){
      resultsHeader.innerHTML = `stickers niña`;
    }
    else if(search === 'stickers-adulto'){
      resultsHeader.innerHTML = `stickers adulto`;
    }
    else if(search === 'toppers-cumpleanos'){
      resultsHeader.innerHTML = `toppers cumpleaños`;
    }
    else if(search === 'toppers-feliz-dia'){
      resultsHeader.innerHTML = `toppers feliz día`;
    }
    else if(search === 'toppers-aniversario'){
      resultsHeader.innerHTML = `toppers aniversario`;
    }
    else if(search === 'toppers-grados'){
      resultsHeader.innerHTML = `toppers grados`;
    }
    else if(search === 'toppers-comunion'){
      resultsHeader.innerHTML = `toppers comunion`;
    }
    else if(search === 'toppers-numeros'){
      resultsHeader.innerHTML = `toppers numeros`;
    }
    else{
      resultsHeader.innerHTML = `Resultados para "${search}"`;
    }

    document.addEventListener("click", (event1) => {
      if (event1.target == btnNext) {
        if (data.next) {
          const url = new URL(data.next);
          const paramsAux = new URLSearchParams(url.search);
          const searchParamAux = paramsAux.get("search");
          const pageParamAux = paramsAux.get("page");

          if (searchParamAux) {
            window.location.href = `/market-search/?search=${encodeURIComponent(
              searchParamAux
            )}&page=${pageParamAux}`;
          }
        }
      }
    });

    document.addEventListener("click", (event2) => {
      if (event2.target == btnPrevious) {
        if (data.previous) {
          const url = new URL(data.previous);
          const paramsAux = new URLSearchParams(url.search);
          const searchParamAux = paramsAux.get("search");
          const pageParamAux = paramsAux.get("page") || 1;

          if (searchParamAux) {
            window.location.href = `/market-search/?search=${encodeURIComponent(
              searchParamAux
            )}&page=${pageParamAux}`;
          }
        }
      }
    });

    if (response.ok) {
      updateProducts(data.results);
    } else {
      console.log("No se encontraron productos.");
    }
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}

function updateProducts(products) {
  const container = document.getElementById("product-container");

  container.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");

    div.innerHTML = ` 
            <img src="${product.image_url || "default_image.png"}" width="200">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p> $ ${product.price}</p>
        `;
    container.appendChild(div);
  });
}


