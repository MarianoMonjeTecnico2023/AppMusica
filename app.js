// CONFIGURACIÓN DEL BACKEND
// Cambiá esto por tu URL de Render cuando esté lista (ej: 'https://mi-backend.onrender.com')
const API_BASE_URL = 'https://server-musica.onrender.com'; 

// Elementos del DOM
const formBuscar = document.getElementById('formBuscar');
const inputBuscar = document.getElementById('buscar');

const listaAlbums = document.getElementById('lista-albums');
const listaArtistas = document.getElementById('lista-artistas');
const listaCanciones = document.getElementById('lista-canciones');

const modalPlayer = document.getElementById('modalPlayer');
const btnCerrar = document.getElementById('btnCerrar');

// Elementos del Reproductor
const audioElement = document.getElementById('audio-element');
const playPauseBtn = document.getElementById('play-pause-button');
const playIcon = document.getElementById('play-icon');
const playerTrack = document.getElementById('player-track');
const albumArt = document.getElementById('album-art');
const albumImg = document.getElementById('contenedorAlbumImagen');

const albumNameTxt = document.getElementById('album-name');
const trackNameTxt = document.getElementById('track-name');
const currentTimeTxt = document.getElementById('current-time');
const trackLengthTxt = document.getElementById('track-length');
const seekBar = document.getElementById('seek-bar');
const sArea = document.getElementById('s-area');

// Auxiliar para formatear ms a mm:ss
function convertirDuracion(ms) {
    if (!ms) return "00:00";
    const min = Math.floor(ms / 60000);
    const seg = Math.floor((ms % 60000) / 1000);
    return `${min < 10 ? '0' : ''}${min}:${seg < 10 ? '0' : ''}${seg}`;
}

// 1. EVENTO DE BÚSQUEDA
formBuscar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = inputBuscar.value.trim();
    if (!query) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        renderAlbums(data.albums || []);
        renderArtistas(data.artists || []);
        renderCanciones(data.tracks || []);
    } catch (err) {
        console.error('Error al buscar:', err);
        alert('Ocurrió un error al conectar con el servidor.');
    }
});

// Renderizar Álbumes
function renderAlbums(albums) {
    listaAlbums.innerHTML = '';
    if (albums.length === 0) {
        listaAlbums.innerHTML = '<span class="sin-datos">No hay discos para mostrar</span>';
        return;
    }

    albums.forEach(album => {
        const item = document.createElement('div');
        item.className = 'contenedor-album';
        item.innerHTML = `
            <img src="${album.cover || 'https://via.placeholder.com/60'}" alt="${album.name}">
            <div>
                <h2>${album.name}</h2>
                <span>${album.artistName || 'Artista'}</span>
            </div>
        `;
        listaAlbums.appendChild(item);
    });
}

// Renderizar Artistas
function renderArtistas(artistas) {
    listaArtistas.innerHTML = '';
    if (artistas.length === 0) {
        listaArtistas.innerHTML = '<span class="sin-datos">No hay artistas para mostrar</span>';
        return;
    }

    artistas.forEach(artista => {
        const item = document.createElement('div');
        item.className = 'contenedor-artista';
        item.innerHTML = `
            <img src="${artista.picture || 'https://via.placeholder.com/60'}" alt="${artista.name}">
            <div>
                <h2>${artista.name}</h2>
            </div>
        `;
        listaArtistas.appendChild(item);
    });
}

// Renderizar Canciones
function renderCanciones(canciones) {
    listaCanciones.innerHTML = '';
    if (canciones.length === 0) {
        listaCanciones.innerHTML = '<span class="sin-datos">No hay canciones para mostrar</span>';
        return;
    }

    canciones.forEach(cancion => {
        const item = document.createElement('div');
        item.className = 'contenedor-canciones';
        item.innerHTML = `
            <h2>${cancion.title}</h2>
            <span><strong>Artista:</strong> ${cancion.artist.name}</span>
            <span><strong>Álbum:</strong> ${cancion.album.title}</span>
            <span><strong>Duración:</strong> ${convertirDuracion(cancion.durationMs)}</span>
        `;
        
        // Al hacer clic, abrimos el reproductor
        item.addEventListener('click', () => reproducirCancion(cancion.id));
        listaCanciones.appendChild(item);
    });
}

// 2. REPRODUCTOR Y ANIMACIÓN DEL VINILO
async function reproducirCancion(trackId) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/track/${trackId}`);
        const track = await res.json();

        if (!track.previewUrl) {
            alert('Esta canción no dispone de un fragmento de audio reproducible.');
            return;
        }

        // Cargar Metadatos en la UI
        albumNameTxt.textContent = track.album;
        trackNameTxt.textContent = `${track.title} - ${track.artist}`;
        albumImg.src = track.imageUrl || 'https://via.placeholder.com/150';

        // Asignar Audio
        audioElement.src = track.previewUrl;
        audioElement.play();

        // Mostrar Modal y Activar Animación del Vinilo Girando
        modalPlayer.classList.add('active');
        playerTrack.classList.add('active');
        albumArt.classList.add('active');
        playIcon.className = 'fas fa-pause';

    } catch (err) {
        console.error('Error al cargar la canción:', err);
    }
}

// Control Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playerTrack.classList.add('active');
        albumArt.classList.add('active'); // 🟢 ACTIVA EL GIRADO DEL VINILO
        playIcon.className = 'fas fa-pause';
    } else {
        audioElement.pause();
        playerTrack.classList.remove('active');
        albumArt.classList.remove('active'); // 🔴 DETIENE EL VINILO
        playIcon.className = 'fas fa-play';
    }
});

// Actualizar Barra de Progreso y Tiempos
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        const pct = (audioElement.currentTime / audioElement.duration) * 100;
        seekBar.style.width = `${pct}%`;

        currentTimeTxt.textContent = convertirDuracion(audioElement.currentTime * 1000);
        trackLengthTxt.textContent = convertirDuracion(audioElement.duration * 1000);
    }
});

// Click en la Barra de Búsqueda
sArea.addEventListener('click', (e) => {
    const rect = sArea.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    audioElement.currentTime = (clickX / width) * audioElement.duration;
});

// Cerrar Modal
btnCerrar.addEventListener('click', cerrarModal);
modalPlayer.addEventListener('click', (e) => {
    if (e.target === modalPlayer) cerrarModal();
});

function cerrarModal() {
    audioElement.pause();
    modalPlayer.classList.remove('active');
    albumArt.classList.remove('active');
    playerTrack.classList.remove('active');
}