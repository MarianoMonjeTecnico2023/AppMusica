
🎵 Buscador y Reproductor de Música
(Versión Legacy Mejorada — Spotify + Deezer Preview)
📋 Descripción

Este proyecto es una aplicación web diseñada como buscador musical tipo "Google de música".
Permite buscar artistas, álbumes y canciones usando la API de Spotify, y reproducir previews de cada canción mediante la API de Deezer, manteniendo intacta la estética original con un reproductor estilo disco de vinilo giratorio.

Este proyecto fue creado originalmente como entrega final en 2018 (sin IA), utilizando únicamente código manual. Hoy mantiene toda la lógica original, pero con un sistema de reproducción actualizado para que vuelva a funcionar.

🚀 Características
🔍 Búsqueda Inteligente (Spotify)

Búsqueda simultánea de:

🔸 Canciones

🔸 Álbumes

🔸 Artistas

Resultados organizados en tres columnas dinámicas

Datos completos: nombre, artistas, duración, popularidad, portada, seguidores, fecha de lanzamiento, etc.

Imágenes de portada en alta calidad

🎧 Reproductor con Vinilo Giratorio

Interfaz moderna inspirada en un tocadiscos

Disco en movimiento al reproducir

Controles: ▶️ Play/Pause — ⏮️ Anterior — ⏭️ Siguiente

Barra de progreso dinámica

Indicadores de buffering

Imagen del álbum sincronizada con la canción

🔄 Integración Dual (Spotify + Deezer)

Spotify: provee datos y metadatos

Deezer: provee el preview de audio (30 segundos asegurados)

Lógica automática:

Obtiene la canción desde Spotify

Busca el matching en Deezer

Inserta el preview en el reproductor

Reemplaza el audio sin romper la interfaz 2018 original

🛠️ Tecnologías Utilizadas
Frontend

HTML5

CSS3

JavaScript ES6+

jQuery

Bootstrap 4

APIs

Spotify Web API (Search + Metadata)

Deezer API (Preview de audio)

Extras

Font Awesome

Animaciones CSS personalizadas (vinilo giratorio)

📁 Estructura del Proyecto
Musica/
├── index.html              # Pantalla principal (buscador)
├── reproductor2.html       # Reproductor estilo vinilo
├── css/
│   ├── index.css           # Estilos del buscador
│   ├── reproductor.css     # Estilos del reproductor
├── js/
│   ├── app.js              # Lógica de búsqueda Spotify
│   ├── reproductor2.js     # Lógica del reproductor (Spotify → Deezer)
│   ├── codigo.js           # Funciones auxiliares
│   ├── config.js           # Configuración (tokens, claves)
└── img/                    # Portadas, SVG, recursos visuales

🔧 Configuración
Requisitos Previos

Navegador moderno

Internet estable

No requiere backend propio

Credenciales de Spotify

El proyecto utiliza Client Credentials para la búsqueda:

Client ID:     2dd273f1ae0c454c84e89c4e65997842
Client Secret: 199f94e4a7fb447cbafe8579bb247e90


⚠️ Para uso personal/educativo.
No deben emplearse en producción.

Instalación

Clonar o descargar el proyecto

Abrir index.html

Buscar música y reproducir 🎵

🎯 Funcionalidades
🏠 Página Principal (index.html)

Input de búsqueda

Listado paralelo:

💿 Álbumes

👤 Artistas

🎵 Canciones

Acceso directo al reproductor por canción

🎧 Reproductor Musical (reproductor2.html)

Imagen grande del álbum

Vinilo girando durante la reproducción

Vista detallada de canción

Botones de control

Barra de tiempo + tiempo transcurrido

🔄 Flujo de Funcionamiento (Actualizado)
Spotify → Datos y metadatos  
Deezer  → Preview de audio

1. Usuario busca música
2. Spotify devuelve canciones, álbumes y artistas
3. Usuario selecciona una canción
4. El reproductor abre con datos de Spotify
5. Se busca la misma canción en Deezer
6. Se inserta el preview_url de Deezer
7. El vinilo gira y se reproduce la canción

🎵 API Utilizadas
Spotify Web API

/v1/search

Datos: tracks, albums, artists, imágenes, popularidad, fechas

Deezer API

https://api.deezer.com/search?q={track_name}

Datos: preview_url (30s garantizados)

🎨 Diseño e Interfaz

Interfaz inspirada en reproductores clásicos

Animación CSS del vinilo

Diseño responsive

Colores y tipografía coherentes

Popup de reproductor estilo “modal elegante”

🚨 Limitaciones

Spotify ya no provee preview_url, por eso se integra Deezer

Canciones pueden no coincidir si el nombre es demasiado ambiguo

Requiere conexión permanente

No funciona sin internet

🔮 Mejoras Futuras

 Mejor algoritmo de matching Spotify → Deezer

 Integración con YouTube Music para previews sin límite

 Guardar canciones favoritas

 Playlist local

 Modo oscuro

 Control de volumen nativo

🐛 Troubleshooting
❌ “No hay preview disponible”

Deezer no encontró coincidencia exacta

Intentar otra canción

❌ “No hay resultados”

Verificar conexión

Probar otro nombre

❌ El vinilo no gira

Revisar en consola si se ejecutó la función startVinylRotation()

👨‍💻 Autor

Desarrollado por Mariano (Kenpachi)
Proyecto creado originalmente para examen final (2018) y mejorado posteriormente.

📄 Licencia

Uso personal y educativo.
Respeta las licencias de:

Spotify

Deezer

Bootstrap

Font Awesome

jQuery

🎵 Gracias por explorar este proyecto.

Ahora combina la nostalgia del código original con APIs modernas. ¡Disfrutalo! 🎵
=======
🎵 Buscador y Reproductor de Música
(Versión Legacy Mejorada — Spotify + Deezer Preview)


📋 Descripción

Este proyecto es una aplicación web diseñada como buscador musical tipo "Google de música".
Permite buscar artistas, álbumes y canciones usando la API de Spotify, y reproducir previews de cada canción mediante la API de Deezer, manteniendo intacta la estética original con un reproductor estilo disco de vinilo giratorio.

Este proyecto fue creado originalmente como entrega final en 2018 (sin IA), utilizando únicamente código manual. Hoy mantiene toda la lógica original, pero con un sistema de reproducción actualizado para que vuelva a funcionar.

🚀 Características
🔍 Búsqueda Inteligente (Spotify)

Búsqueda simultánea de:

🔸 Canciones

🔸 Álbumes

🔸 Artistas

Resultados organizados en tres columnas dinámicas

Datos completos: nombre, artistas, duración, popularidad, portada, seguidores, fecha de lanzamiento, etc.

Imágenes de portada en alta calidad

🎧 Reproductor con Vinilo Giratorio

Interfaz moderna inspirada en un tocadiscos

Disco en movimiento al reproducir

Controles: ▶️ Play/Pause — ⏮️ Anterior — ⏭️ Siguiente

Barra de progreso dinámica

Indicadores de buffering

Imagen del álbum sincronizada con la canción

🔄 Integración Dual (Spotify + Deezer)

Spotify: provee datos y metadatos

Deezer: provee el preview de audio (30 segundos asegurados)

Lógica automática:

Obtiene la canción desde Spotify

Busca el matching en Deezer

Inserta el preview en el reproductor

Reemplaza el audio sin romper la interfaz 2018 original

🛠️ Tecnologías Utilizadas
Frontend

HTML5

CSS3

JavaScript ES6+

jQuery

Bootstrap 4

APIs

Spotify Web API (Search + Metadata)

Deezer API (Preview de audio)

Extras

Font Awesome

Animaciones CSS personalizadas (vinilo giratorio)

📁 Estructura del Proyecto
Musica/
├── index.html              # Pantalla principal (buscador)
├── reproductor2.html       # Reproductor estilo vinilo
├── css/
│   ├── index.css           # Estilos del buscador
│   ├── reproductor.css     # Estilos del reproductor
├── js/
│   ├── app.js              # Lógica de búsqueda Spotify
│   ├── reproductor2.js     # Lógica del reproductor (Spotify → Deezer)
│   ├── codigo.js           # Funciones auxiliares
│   ├── config.js           # Configuración (tokens, claves)
└── img/                    # Portadas, SVG, recursos visuales

🔧 Configuración
Requisitos Previos

Navegador moderno

Internet estable

No requiere backend propio

Credenciales de Spotify

El proyecto utiliza Client Credentials para la búsqueda:

Client ID:     2dd273f1ae0c454c84e89c4e65997842
Client Secret: 199f94e4a7fb447cbafe8579bb247e90


⚠️ Para uso personal/educativo.
No deben emplearse en producción.

Instalación

Clonar o descargar el proyecto

Abrir index.html

Buscar música y reproducir 🎵

🎯 Funcionalidades
🏠 Página Principal (index.html)

Input de búsqueda

Listado paralelo:

💿 Álbumes

👤 Artistas

🎵 Canciones

Acceso directo al reproductor por canción

🎧 Reproductor Musical (reproductor2.html)

Imagen grande del álbum

Vinilo girando durante la reproducción

Vista detallada de canción

Botones de control

Barra de tiempo + tiempo transcurrido

🔄 Flujo de Funcionamiento (Actualizado)
Spotify → Datos y metadatos  
Deezer  → Preview de audio

1. Usuario busca música
2. Spotify devuelve canciones, álbumes y artistas
3. Usuario selecciona una canción
4. El reproductor abre con datos de Spotify
5. Se busca la misma canción en Deezer
6. Se inserta el preview_url de Deezer
7. El vinilo gira y se reproduce la canción

🎵 API Utilizadas
Spotify Web API

/v1/search

Datos: tracks, albums, artists, imágenes, popularidad, fechas

Deezer API

https://api.deezer.com/search?q={track_name}

Datos: preview_url (30s garantizados)

🎨 Diseño e Interfaz

Interfaz inspirada en reproductores clásicos

Animación CSS del vinilo

Diseño responsive

Colores y tipografía coherentes

Popup de reproductor estilo “modal elegante”

🚨 Limitaciones

Spotify ya no provee preview_url, por eso se integra Deezer

Canciones pueden no coincidir si el nombre es demasiado ambiguo

Requiere conexión permanente

No funciona sin internet

🔮 Mejoras Futuras

 Mejor algoritmo de matching Spotify → Deezer

 Integración con YouTube Music para previews sin límite

 Guardar canciones favoritas

 Playlist local

 Modo oscuro

 Control de volumen nativo

🐛 Troubleshooting
❌ “No hay preview disponible”

Deezer no encontró coincidencia exacta

Intentar otra canción

❌ “No hay resultados”

Verificar conexión

Probar otro nombre

❌ El vinilo no gira

Revisar en consola si se ejecutó la función startVinylRotation()

👨‍💻 Autor

Desarrollado por Mariano (Kenpachi)
Proyecto creado originalmente para examen final (2018) y mejorado posteriormente.

📄 Licencia

Uso personal y educativo.
Respeta las licencias de:

Spotify

Deezer

Bootstrap

Font Awesome

jQuery

🎵 Gracias por explorar este proyecto.


Ahora combina la nostalgia del código original con APIs modernas. ¡Disfrutalo! 🎵
