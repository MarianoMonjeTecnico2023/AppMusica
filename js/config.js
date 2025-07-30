// Configuración de APIs
const CONFIG = {
    // Spotify API
    SPOTIFY: {
        CLIENT_ID: '259962f9c85b44e5866da2ab7d916aec',
        CLIENT_SECRET: 'b176a8e3521a454da6079d3d62fd7f65',
        BASE_URL: 'https://api.spotify.com/v1',
        AUTH_URL: 'https://accounts.spotify.com/api/token'
    },
    
    // YouTube Music (usaremos la API de YouTube Data v3)
    YOUTUBE: {
        API_KEY: 'AIzaSyBvOKszFiDHtEny4XmNDxvU8bF6xU7yFtg', // Necesitarás obtener tu propia API key
        BASE_URL: 'https://www.googleapis.com/youtube/v3'
    }
};

// Función para obtener token de Spotify
async function getSpotifyToken() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: CONFIG.SPOTIFY.AUTH_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(CONFIG.SPOTIFY.CLIENT_ID + ':' + CONFIG.SPOTIFY.CLIENT_SECRET)
            },
            data: 'grant_type=client_credentials',
            success: function(response) {
                resolve(response.access_token);
            },
            error: function(error) {
                console.error('Error obteniendo token de Spotify:', error);
                reject(error);
            }
        });
    });
}

// Función para buscar en YouTube Music
async function searchYouTubeMusic(query) {
    return new Promise((resolve, reject) => {
        const searchQuery = encodeURIComponent(query + ' music');
        
        $.ajax({
            url: `${CONFIG.YOUTUBE.BASE_URL}/search`,
            data: {
                part: 'snippet',
                q: searchQuery,
                type: 'video',
                videoCategoryId: '10', // Música
                maxResults: 1,
                key: CONFIG.YOUTUBE.API_KEY
            },
            success: function(response) {
                if (response.items && response.items.length > 0) {
                    const videoId = response.items[0].id.videoId;
                    const youtubeUrl = `https://music.youtube.com/watch?v=${videoId}`;
                    resolve(youtubeUrl);
                } else {
                    reject(new Error('No se encontraron resultados en YouTube'));
                }
            },
            error: function(error) {
                console.error('Error buscando en YouTube:', error);
                reject(error);
            }
        });
    });
} 