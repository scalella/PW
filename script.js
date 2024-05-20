document.addEventListener('DOMContentLoaded', () => {
    const tracks = [
        { title: 'VIAJE_INTERESTELAR', url: './public/canciones/PATAGONIA_WESTERN_ft_CARLO1ro-VIAJE_INTERESTELAR.mp3', image: ["./public/images/dogs1.png","./public/images/dogs2.png","./public/images/dogs3.png"]},
        { title: 'El eterno camino a alfa centauro', url: './public/canciones/1 camino a alfa centauro.mp3', image: ["./public/images/1.png", "./public/images/2.png", "./public/images/33.png"]  },
        { title: 'Nebulosa PW parte 2', url: './public/canciones/1_SUPERNOVA PW.mp3', image: ["./public/images/desert1.png","./public/images/desert2.png","./public/images/desert3.png"] },
        { title: 'Panico y locura sobre el asteroide Luth Golein', url: './public/canciones/2 panico y locura sobre el asteroide luth golein.mp3', image: ["./public/images/nautas1.png","./public/images/nautas2.png","./public/images/nautas3.png"] },
        { title: 'Dimension paralela alelarap noisnemiD', url: './public/canciones/2_DIMENSION PARALELA.mp3', image: "./public/images/recording-studio--metal-style.png"},
        { title: 'Patinando entre anillos de saturno', url: './public/canciones/3-ENTRE ANILLOS DE SATURNO.mp3',image: ["./public/images/desert1.png","./public/images/desert2.png","./public/images/desert3.png"] },
        { title: 'Agujero Blanco', url: './public/canciones/4_AGUJERO BLANCO.mp3',image: ["./public/images/nebulosa.png","./public/images/nebulosa1.png","./public/images/nebulosa2.png","./public/images/nebulosa3.png"] },
        { title: 'Nebulosa PW parte 1, el regreso del Space Cowcho', url: './public/canciones/6 nebulosa pw 1 el regreso del space cowcho.mp3',image: ["./public/images/desert1.png","./public/images/desert2.png","./public/images/desert3.png"]},
        { title: 'La vida en otro planeta', url: './public/canciones/7 la vida en otro planeta.mp3',image: ["./public/images/nebulosa.png","./public/images/nebulosa1.png","./public/images/nebulosa2.png","./public/images/nebulosa3.png"]},
        { title: 'Del desierto', url: './public/canciones/deldesierto.mp3',image: ["./public/images/tri1.png","./public/images/tri2.png","./public/images/tri3.png" ] },
        { title: 'Densidad cuantica', url: './public/canciones/densidad cuantica.mp3',image: ["./public/images/nebulosa.png","./public/images/nebulosa1.png","./public/images/nebulosa2.png","./public/images/nebulosa3.png"] },
        { title: 'Evitar al mundo', url: './public/canciones/evitaralmundo.mp3' ,image: "./public/images/recording-studio--metal-style.png"},
        { title: 'Espuma estelar', url: './public/canciones/puma.mp3',image: ["./public/images/nebulosa.png","./public/images/nebulosa1.png","./public/images/nebulosa2.png","./public/images/nebulosa3.png"] },
        { title: 'Quasar de hielo', url: './public/canciones/Quasardehielo.mp3',image: ["./public/images/tri1.png","./public/images/tri2.png","./public/images/tri3.png" ]},
        { title: 'Lo triste de ser feliz', url: './public/canciones/revista corsa.mp3' ,image: ["./public/images/dogs1.png","./public/images/dogs2.png","./public/images/dogs3.png"]},
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;
    let imageIndex = 0;
    let imageInterval;

    const trackTitleElement = document.getElementById('track-title');
    const audioElement = document.getElementById('audio');
    const trackImageElement = document.getElementById('track-image');
    const prevButton = document.getElementById('prev-btn');
    const playPauseButton = document.getElementById('play-pause-btn');
    const nextButton = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const volumeBar = document.getElementById('volume-bar');

    const loadTrack = (index) => {
        const track = tracks[index];
        trackTitleElement.textContent = track.title;
        audioElement.src = track.url;
        clearInterval(imageInterval);

        if (Array.isArray(track.image)) {
            trackImageElement.src = track.image[0];
            imageIndex = 0;
            imageInterval = setInterval(() => {
                imageIndex = (imageIndex + 1) % track.image.length;
                trackImageElement.src = track.image[imageIndex];
            }, 532);
        } else {
            trackImageElement.src = track.image;
        }

        audioElement.pause();
        audioElement.currentTime = 0;
        isPlaying = false;
        playPauseButton.textContent = 'Play';
        progressBar.value = 0;
    };

    const playTrack = () => {
        audioElement.play();
        isPlaying = true;
        playPauseButton.textContent = 'Pause';
    };

    const pauseTrack = () => {
        audioElement.pause();
        isPlaying = false;
        playPauseButton.textContent = 'Play';
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    };

    const playNextTrack = () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        playTrack();
    };

    const updateProgressBar = () => {
        const duration = audioElement.duration;
        const currentTime = audioElement.currentTime;
        progressBar.value = (currentTime / duration) * 100;
    };

    const setProgress = () => {
        const duration = audioElement.duration;
        audioElement.currentTime = (progressBar.value / 100) * duration;
    };

    const updateVolume = () => {
        audioElement.volume = volumeBar.value;
    };

    prevButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) {
            playTrack();
        }
    });

    playPauseButton.addEventListener('click', togglePlayPause);
    nextButton.addEventListener('click', playNextTrack);
    audioElement.addEventListener('timeupdate', updateProgressBar);
    progressBar.addEventListener('input', setProgress);
    volumeBar.addEventListener('input', updateVolume);
    audioElement.addEventListener('ended', playNextTrack);
    loadTrack(currentTrackIndex);
});