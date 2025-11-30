const API_URL = "https://rickandmortyapi.com/api/character";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const container = document.getElementById("container");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const themeToggle = document.getElementById("themeToggle");

//oscuro
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggle.checked = savedTheme === "dark";
});

themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
});


//integrar fetch api
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchCharacters(query);
    }
});


//crear card con api
async function fetchCharacters(name = "") {
    loading.classList.remove("hidden");
    error.classList.add("hidden");
    container.innerHTML = "";

    try {
        const res = await fetch(`${API_URL}/?name=${name}`);
        const data = await res.json();

        loading.classList.add("hidden");

        if (!data.results) {
            error.classList.remove("hidden");
            return;
        }

        renderizarCard(data.results);

    } catch (err) {
        console.log(err);
        loading.classList.add("hidden");
        error.classList.remove("hidden");
    }
}


//renderizar 
function renderizarCard(list) {
    container.innerHTML = list.map(item => `
        <div class="card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p><strong>Especie:</strong> ${item.species}</p>
            <p><strong>Estado:</strong> ${item.status}</p>
            <p><strong>Origen:</strong> ${item.origin.name}</p>
        </div>
    `).join("");
}

// Cargar personajes al inicio
fetchCharacters();
