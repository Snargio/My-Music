let img = document.getElementById("img")
let audio = document.getElementById("audio")
let trackName = document.getElementById("track-name")
let trackArtist = document.getElementById("track-artist")
let back = document.getElementById("back")
let play = document.getElementById("play")
let foward = document.getElementById("foward")
let currentMusic = document.getElementById("current-time")
let totalMusic = document.getElementById("total-duration")
let progress = document.getElementById("progress")

let isPlaying = false
let index = 0

//Storage

let data = [
    {
        image: "../src/assets/image/imgsCard/50CentWanksta.gif",
        title: "Wanksta",
        artist: "50 Cent",
        file: "../src/assets/mp3/50-Cent-Wanksta.mp3",
    },
    {
        image: "../src/assets/image/imgsCard/FutureLiveIsGoodFt.jpg",
        title: "Life Is Good",
        artist: "feat.Drake Future",
        file: "../src/assets/mp3/Future-Life-Is-Goodft.-Drake.mp3",
    },
    {
        image: "../src/assets/image/imgsCard/postmalone-psychoft.gif",
        title: "Psycho",
        artist: "Postmalone",
        file: "../src/assets/mp3/Post-Malone-Psycho-ft.-Ty-Dolla-ign.mp3",
    },
    {
        image: "../src/assets/image/imgsCard/TheNotoriousB.I.G.OneM.jpg",
        title: "One More Chance",
        artist: "Notorious B.I.G.",
        file: "../src/assets/mp3/The-Notorious-B.I.G.-One-More-Chance.mp3",
    },

]

localStorage.setItem("newData", JSON.stringify(data))
let musics = JSON.parse(localStorage.newData)

//Functions

function RenderMe(){
    img.src = musics[index].image
    audio.src = musics[index].file
    document.body.style.backgroundImage = musics[index].background
    trackName.innerHTML = musics[index].title
    trackArtist.innerHTML = musics[index].artist
}
RenderMe()

// Função para mudar a img do pause

function playPause(){
    isPlaying ? goPause() : goPlay()
}

function goPause(){
    audio.pause()
    play.src = "../src/assets/image/play-circle.svg"
    isPlaying = false
}

function goPlay(){
    audio.play()
    play.src = "../src/assets/image/pause-circle.svg"
    isPlaying = true
}

function updateProgress(){
    let porcent = Math.floor((audio.currentTime / audio.duration) * 100)
    progress.value = porcent
    currentMusic.innerHTML = secondsInMinutes(Math.floor(audio.currentTime)
    )
    totalMusic.innerHTML = secondsInMinutes(Math.floor(audio.duration))
    if(audio.currentTime == audio.duration){
        nextMusic()
    }
}  

function changeProgress(){
    audio.currentTime = progress.value / progress.max * audio.duration
    goPlay()
    audio.play()
}

function secondsInMinutes(second){
    let minutes = Math.floor(second / 60)
    let seconds = second % 60

    if (seconds < 10){
        seconds = '0' + seconds
    }

    return minutes + ":" + seconds
}

function backMusic(){
    index --
    if(index < 0){
        index = musics.length - 1
    }
    RenderMe()
    goPlay()
}

function nextMusic(){
    index ++
    if(index > musics.length - 1){
        index = 0
    }
    RenderMe()
    goPlay()
}


//Eventos

play.addEventListener("click", playPause)
audio.addEventListener("timeupdate", updateProgress)
progress.addEventListener("change", changeProgress)
back.addEventListener("click", backMusic)
foward.addEventListener("click", nextMusic)