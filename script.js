const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6cb3ab2d6b40d16f517058bd8ec99094&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=6cb3ab2d6b40d16f517058bd8ec99094&query="'
const main = document.getElementById('main')
const form = document.getElementById('form');
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results);
}

// Show Movies
function showMovies(movies) {
    // Delete all for instance
    main.innerHTML = ''
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="green">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Mezora Movies</h3>
                ${overview}
            </div>
        </div>`;
        main.appendChild(movieEl);
    });
}

// Form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if ( searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
})