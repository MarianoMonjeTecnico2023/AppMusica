# 🎵 Reproductor de Música Spotify + YouTube Music

## 📋 Descripción

Este proyecto combina la **API de Spotify** para obtener información de canciones (título, artista, álbum, imagen) con **YouTube Music** para la reproducción de audio. Esto resuelve el problema de las `preview_url: null` de Spotify, proporcionando una experiencia completa de reproducción de música.

## 🚀 Características

### ✅ **Spotify API**
- Búsqueda de canciones, álbumes y artistas
- Información completa de tracks (título, artista, álbum)
- Imágenes de alta calidad de portadas de álbumes
- Metadatos detallados (duración, popularidad, etc.)

### ✅ **YouTube Music Integration**
- Reproducción de canciones completas desde YouTube
- Búsqueda automática de videos oficiales de música
- Reproductor integrado con controles personalizados
- Fallback a preview de Spotify si YouTube no está disponible

### ✅ **Interfaz de Usuario**
- Diseño moderno y responsivo
- Reproductor con controles intuitivos
- Visualización de información de Spotify
- Indicadores de estado de reproducción

## 🛠️ Arquitectura del Sistema

### **Flujo de Funcionamiento:**

1. **Búsqueda** → Usuario busca en la página principal
2. **Spotify Data** → Se obtienen datos de la canción desde Spotify API
3. **YouTube Search** → Se busca el video correspondiente en YouTube
4. **Reproducción** → Se reproduce desde YouTube con datos visuales de Spotify

### **Archivos Principales:**

```
├── index.html              # Página principal de búsqueda
├── reproductor2.html       # Página del reproductor
├── js/
│   ├── config.js           # Configuración de APIs
│   ├── app.js              # Lógica de búsqueda principal
│   ├── youtube-player.js   # Reproductor de YouTube
│   └── reproductor2.js     # Lógica del reproductor
└── css/
    ├── index.css           # Estilos de la página principal
    └── reproductor.css     # Estilos del reproductor
```

## 🔧 Configuración

### **APIs Requeridas:**

1. **Spotify API**
   - Client ID y Client Secret
   - Configurado en `js/config.js`

2. **YouTube Data API v3**
   - API Key de Google
   - Configurado en `js/config.js`

### **Configuración de APIs:**

```javascript
const CONFIG = {
    SPOTIFY: {
        CLIENT_ID: 'tu_client_id',
        CLIENT_SECRET: 'tu_client_secret'
    },
    YOUTUBE: {
        API_KEY: 'tu_youtube_api_key'
    }
};
```

## 🎯 Funcionalidades Implementadas

### **Búsqueda y Visualización:**
- ✅ Búsqueda de canciones, álbumes y artistas
- ✅ Visualización de resultados con imágenes
- ✅ Información detallada de cada elemento

### **Reproducción de Audio:**
- ✅ Reproducción desde YouTube Music
- ✅ Controles de play/pause
- ✅ Indicadores visuales de estado
- ✅ Fallback a preview de Spotify

### **Interfaz de Usuario:**
- ✅ Diseño responsivo
- ✅ Controles intuitivos
- ✅ Información visual de Spotify
- ✅ Enlaces directos a Spotify

## 🔄 Flujo de Datos

```
Usuario busca → Spotify API → Datos de canción → YouTube Search → Video ID → Reproducción
     ↓              ↓              ↓              ↓              ↓           ↓
  Interfaz    Información    Metadatos    Video oficial    Player    Audio completo
```

## 🎵 Ejemplo de Uso

1. **Buscar "Billie Jean"** en la página principal
2. **Hacer clic** en la canción en los resultados
3. **Ver información** de Spotify (título, artista, álbum, imagen)
4. **Reproducir** desde YouTube Music con controles personalizados

## 🚨 Limitaciones y Consideraciones

### **YouTube API:**
- Requiere API Key válida
- Límites de cuota diaria
- Búsqueda limitada a videos de música

### **Spotify API:**
- Datos de solo lectura
- No requiere autenticación de usuario
- Información pública disponible

### **Reproducción:**
- Dependiente de disponibilidad en YouTube
- No control total sobre el tiempo de reproducción
- Requiere conexión a internet

## 🔮 Mejoras Futuras

- [ ] Implementar autenticación de usuario de Spotify
- [ ] Agregar playlist y favoritos
- [ ] Mejorar búsqueda de videos en YouTube
- [ ] Agregar controles de volumen
- [ ] Implementar historial de reproducción
- [ ] Agregar modo offline con cache

## 📝 Notas Técnicas

- **Compatibilidad**: Funciona en navegadores modernos
- **Dependencias**: jQuery, Bootstrap, YouTube IFrame API
- **APIs**: Spotify Web API, YouTube Data API v3
- **Licencias**: Respetar términos de uso de ambas APIs

---

**Desarrollado con ❤️ para disfrutar de la música de manera inteligente** 