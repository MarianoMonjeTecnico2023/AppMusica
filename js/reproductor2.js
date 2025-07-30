var playerTrack = $("#player-track"), 
    bgArtwork = $('#bg-artwork'), 
    bgArtworkUrl, 
    albumName = $('#album-name'), 
    trackName = $('#track-name'), 
    albumArt = $('#album-art'), 
    sArea = $('#s-area'), 
    seekBar = $('#seek-bar'), 
    trackTime = $('#track-time'), 
    insTime = $('#ins-time'), 
    sHover = $('#s-hover'), 
    playPauseButton = $("#play-pause-button"), i = playPauseButton.find('i'), 
    tProgress = $('#current-time'), 
    tTime = $('#track-length'), 
    seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, 
    durSeconds, playProgress, bTime, nTime = 0, buffInterval = null, tFlag = false, 
   // albums = [nombrealbum], 
   // trackNames = [nombrecancion], 
    albumArtworks = ['contenedorAlbumImagen'], 
    trackUrl = [],
    playPreviousTrackButton = $('#play-previous'), 
    playNextTrackButton = $('#play-next'), 
    currIndex = -1;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var token;

var idcancion = getParameterByName("idcancion");

$.ajax({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    data: {
        client_id: '259962f9c85b44e5866da2ab7d916aec',
        client_secret: 'b176a8e3521a454da6079d3d62fd7f65',
        grant_type: 'client_credentials'
    }
}).always(function(resp){
    var token = resp.access_token;
    $.ajax({
        url: `https://api.spotify.com/v1/tracks/${idcancion}`,
        data: {
            type: 'track',
            access_token: token
        },
        success: function (response) {
            console.log(response);
            let {preview_url, album, name, artists} = response;
              // ***** AQUÍ ES DONDE DEBES HACER LA VERIFICACIÓN *****
            if (preview_url) { // Si preview_url NO es null
                $("#contenedorAlbumImagen").attr("src",album.images[0].url);
                trackUrl.push(preview_url); // Agregas la URL solo si existe
                $('.card-title').text(name);
                $('.card-text').text(artists[0].name);
                initPlayer(); // Y solo entonces inicializas el reproductor para intentar reproducir
            } else {
                // Si preview_url ES null, manejas el caso
                console.warn("No hay previsualización disponible para esta canción.");
                // Aquí puedes:
                // 1. Mostrar un mensaje en la interfaz de usuario.
                //    Ej: $('#track-name').text(name + " (Previsualización no disponible)");
                // 2. Deshabilitar el botón de play.
                //    Ej: $('#play-pause-button').prop('disabled', true);
                // 3. Mostrar un botón para abrir en Spotify.
                //    Ej: $('#some-div').html('<a href="' + response.external_urls.spotify + '" target="_blank">Escuchar en Spotify</a>');
                
                // Aun así puedes mostrar la info de la canción, pero sin reproducirla.
                $("#contenedorAlbumImagen").attr("src",album.images[0].url);
                $('.card-title').text(name);
                $('.card-text').text(artists[0].name);
                // Inicializa el reproductor pero en estado pausado o inactivo, sin fuente de audio.
                initPlayerNoAudio(); // Una función que solo actualice la UI sin intentar reproducir
            }
        },
        error: function (error) {
            console.error('Error al obtener los detalles de la canción:', error);
            // Aquí también deberías manejar errores de la API, como tokens inválidos.
            if (error.status === 401) {
                // Mostrar un mensaje al usuario, o intentar refrescar el token si tienes un refresh_token
                console.error("Token de Spotify no válido o expirado.");
            }
        }
    });
});
            $("#contenedorAlbumImagen").attr("src",album.images[0].url);
            trackUrl.push(preview_url);
            $('.card-title').text(name);
            $('.card-text').text(artists[0].name);
            initPlayer();
        }
        
    });
});    

function playPause() {
    if (audio.paused) {
        playerTrack.addClass('active');
        albumArt.addClass('active');
        checkBuffering();
        i.attr('class', 'fas fa-pause');
        audio.play();
    } else {
        playerTrack.removeClass('active');
        albumArt.removeClass('active');
        clearInterval(buffInterval);
        albumArt.removeClass('buffering');
        i.attr('class', 'fas fa-play');
        audio.pause();
    }
}


function showHover(event) {
    seekBarPos = sArea.offset();
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());

    sHover.width(seekT);

    cM = seekLoc / 60;

    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

    if ((ctMinutes < 0) || (ctSeconds < 0))
        return;

    if ((ctMinutes < 0) || (ctSeconds < 0))
        return;

    if (ctMinutes < 10)
        ctMinutes = '0' + ctMinutes;
    if (ctSeconds < 10)
        ctSeconds = '0' + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds))
        insTime.text('--:--');
    else
        insTime.text(ctMinutes + ':' + ctSeconds);

    insTime.css({ 'left': seekT, 'margin-left': '-21px' }).fadeIn(0);

}

function hideHover() {
    sHover.width(0);
    insTime.text('00:00').css({ 'left': '0px', 'margin-left': '0px' }).fadeOut(0);
}

function playFromClickedPos() {
    audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
}

function updateCurrTime() {
    nTime = new Date();
    nTime = nTime.getTime();

    if (!tFlag) {
        tFlag = true;
        trackTime.addClass('active');
    }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);

    playProgress = (audio.currentTime / audio.duration) * 100;

    if (curMinutes < 10)
        curMinutes = '0' + curMinutes;
    if (curSeconds < 10)
        curSeconds = '0' + curSeconds;

    if (durMinutes < 10)
        durMinutes = '0' + durMinutes;
    if (durSeconds < 10)
        durSeconds = '0' + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds))
        tProgress.text('00:00');
    else
        tProgress.text(curMinutes + ':' + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds))
        tTime.text('00:00');
    else
        tTime.text(durMinutes + ':' + durSeconds);

    if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
        trackTime.removeClass('active');
    else
        trackTime.addClass('active');


    seekBar.width(playProgress + '%');

    if (playProgress == 100) {
        i.attr('class', 'fa fa-play');
        seekBar.width(0);
        tProgress.text('00:00');
        albumArt.removeClass('buffering').removeClass('active');
        clearInterval(buffInterval);
    }
}

function checkBuffering() {
    clearInterval(buffInterval);
    buffInterval = setInterval(function () {
        if ((nTime == 0) || (bTime - nTime) > 1000)
            albumArt.addClass('buffering');
        else
            albumArt.removeClass('buffering');

        bTime = new Date();
        bTime = bTime.getTime();

    }, 100);
}

function selectTrack(flag) {
    if (flag == 0 || flag == 1)
        ++currIndex;
    else
        --currIndex;

    if ((currIndex > -1) && (currIndex < albumArtworks.length)) {
        if (flag == 0)
            i.attr('class', 'fa fa-play');
        else {
            albumArt.removeClass('buffering');
            i.attr('class', 'fa fa-pause');
        }

        seekBar.width(0);
        trackTime.removeClass('active');
        tProgress.text('00:00');
        tTime.text('00:00');

        //currAlbum = albums[currIndex];
        //currTrackName = trackNames[currIndex];
        currArtwork = albumArtworks[currIndex];

        audio.src = trackUrl[currIndex];

        nTime = 0;
        bTime = new Date();
        bTime = bTime.getTime();

        if (flag != 0) {
            audio.play();
            playerTrack.addClass('active');
            albumArt.addClass('active');

            clearInterval(buffInterval);
            checkBuffering();
        }

        //albumName.text(currAlbum);
        //trackName.text(currTrackName);
        albumArt.find('img.active').removeClass('active');
        $('#' + currArtwork).addClass('active');

        bgArtworkUrl = $('#' + currArtwork).attr('src');

        bgArtwork.css({ 'background-image': 'url(' + bgArtworkUrl + ')' });
    }
    else {
        if (flag == 0 || flag == 1)
            --currIndex;
        else
            ++currIndex;
    }
}

function initPlayer() {
    audio = new Audio();

    selectTrack(0);

    audio.loop = false;
    $.ajax({
        url: `https://api.spotify.com/v1/tracks/${idcancion}`,
        data: {
            type: 'track',
            access_token: token
        },
        success: function (response) {
            // Rellenar los elementos en tu página de reproductor con la información obtenida
            albumName.text(response.album.name);
            trackName.text(response.name);
           
            $('.card .card-title').text(response.name);
            albumArt.find('img.active').attr('src', response.album.images[0].url);
           
            // Si necesitas más información, puedes actualizar otros elementos también
        },
        error: function (error) {
            console.error('Error al obtener los detalles de la canción:', error);
        }
    });

    playPauseButton.on('click', playPause);

    sArea.mousemove(function (event) { showHover(event); });

    sArea.mouseout(hideHover);

    sArea.on('click', playFromClickedPos);

    $(audio).on('timeupdate', updateCurrTime);

    playPreviousTrackButton.on('click', function () { selectTrack(-1); });
    playNextTrackButton.on('click', function () { selectTrack(1); });
}
