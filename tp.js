// funcion para la carga de peliculas desde la API themoviedb.org
async function pelicula() {
    const apiKey = "9cbeffd1413cdbf806e8c4423d3512e6";
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`;

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status} ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        if (!datos.results || datos.results.length === 0) {
            throw new Error("No se recibieron resultados de películas.");
        }

        const indiceAleatorio = Math.floor(Math.random() * datos.results.length);
        const pelicula = datos.results[indiceAleatorio];
        const rutaImagen = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
        const main = document.querySelector('main');

        main.innerHTML = `
            <div class="movie-card">
                <div class="movie-card__poster">
                    <img src="${rutaImagen}" alt="Póster de ${pelicula.title}" />
                </div>
                <div class="movie-card__details">
                    <div class="movie-card__meta">
                        <h2 class="movie-card__title">${pelicula.title}</h2>
                        <span class="movie-card__rating">${pelicula.vote_average} / 10</span>
                    </div>
                    <p class="movie-card__label">Estreno: ${pelicula.release_date}</p>
                    <p class="movie-card__overview"><strong>Sinopsis:</strong> ${pelicula.overview}</p>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Hubo un error al traer la película:", error);
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = `<div class="error-message">Error al cargar películas: ${error.message}</div>`;
        }
    }
}

// funcion de carga de juegos freetogame.com
async function juegoGratis() {
    const url = "https://www.freetogame.com/api/games?sort-by=popularity";

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status} ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        if (!Array.isArray(datos) || datos.length === 0) {
            throw new Error("No se recibieron datos de juegos.");
        }

        const indiceAleatorio = Math.floor(Math.random() * datos.length);
        const juego = datos[indiceAleatorio];
        const main = document.querySelector('main');

        main.innerHTML = `
            <div class="movie-card game-card">
                <div class="movie-card__poster game-card__thumb">
                    <img src="${juego.thumbnail}" alt="Portada de ${juego.title}" />
                </div>
                <div class="movie-card__details game-card__details">
                    <div class="movie-card__meta">
                        <h2 class="movie-card__title">${juego.title}</h2>
                        <span class="movie-card__rating">${juego.genre}</span>
                    </div>
                    <p class="movie-card__label">Plataforma: ${juego.platform}</p>
                    <p class="movie-card__overview"><strong>Desarrollador:</strong> ${juego.developer}</p>
                    <p class="movie-card__overview"><strong>Descripción:</strong> ${juego.short_description}</p>
                    <div class="game-card__actions">
                        <a class="game-card__button" href="${juego.game_url}" target="_blank">Ir a la página del juego</a>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Che, hubo un error al traer el juego:", error);
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = `<div class="error-message">Error al cargar el juego: ${error.message}</div>`;
        }
    }
}

//funcion para volver al inicio
function volverInicio() {
    const main = document.querySelector('main');
    if (!main) return;

    main.innerHTML = `
        <div class="div-central">
            <h2>Bienvenido a TyG Web</h2>
            <p>Presioná "Películas Más Populares" o "Mejor Juego Gratis" para ver la información de la API con un diseño más claro y ordenado.</p>
        </div>

        <div class="div-central">
            <h2 id="frase"></h2>
        </div>

        <div>
            <p><strong>Mis expectativas en TygWeb:</strong> Espero poder afianzar mis
                conocimientos en el desarrollo frontend, dominando la manipulación del
                DOM con Vanilla JavaScript y comprendiendo
                a fondo el consumo de APIs para aplicarlo en proyectos reales.</p>
        </div>
    `;

    cargarFraseAleatoria();
}

//funcion de frases aleatorias
function cargarFraseAleatoria() {
    const frases = [
        { texto: "El código funciona, NO LO TOQUES.", clase: "sombra-neon" },
        { texto: "Si compila a la primera, HAY ALGO RARO.", clase: "sombra-3d" },
        { texto: "Te juro que en mi máquina SÍ ANDABA.", clase: "sombra-fuego" }
    ];

    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    const fraseElegida = frases[indiceAleatorio];
    const elementoFrase = document.getElementById("frase");

    if (elementoFrase) {
        elementoFrase.innerText = fraseElegida.texto;
        elementoFrase.className = fraseElegida.clase;
    } else {
        console.warn("No se encontró el elemento #frase para mostrar la frase.");
    }
}

cargarFraseAleatoria();