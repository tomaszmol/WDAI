const tableBody = document.getElementById("product-table-body");
const filterInput = document.getElementById("filter-input");
const sortSelect = document.getElementById("sort-select");

let products = [];
let displayedProducts = [];

// Wczytywanie danych z pliku JSON
async function fetchProducts() {
  try {
    const response = await fetch("products.json");
    const data = await response.json();
    products = data.products.slice(0, 30); // Pobieramy pierwsze 30 produktów
    displayedProducts = [...products]; // Kopia na potrzeby filtrowania/sortowania
    renderTable(displayedProducts);
  } catch (error) {
    console.error("Błąd podczas wczytywania danych:", error);
  }
}

// Funkcja renderująca tabelę
function renderTable(products) {
  tableBody.innerHTML = products
    .map(
      (product) => `
      <tr>
        <td><img src="${product.thumbnail}" alt="${product.title}"></td>
        <td>${product.title}</td>
        <td>${product.description}</td>
      </tr>
    `
    )
    .join("");
}

// Obsługa filtrowania
filterInput.addEventListener("input", () => {
  const query = filterInput.value.toLowerCase();
  displayedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  renderTable(displayedProducts);
});

// Obsługa sortowania
sortSelect.addEventListener("change", () => {
  const sortOption = sortSelect.value;

  if (sortOption === "ascending") {
    displayedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "descending") {
    displayedProducts.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    displayedProducts = [...products]; // Przywrócenie oryginalnej kolejności
  }

  renderTable(displayedProducts);
});

// Inicjalizacja
fetchProducts();
