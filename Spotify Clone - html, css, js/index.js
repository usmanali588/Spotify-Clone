// Initialize the variables
function autofill(){
    let clutter ="";
    for(var a=1; a<=10; a++){
        clutter += `
        <div class="songItem">
        <img src="" alt="">
        <span class="songName"></span>
        <span ><i id="${a}"  class="fa-regular songItemPlay fa-circle-play"></i></span>
        </div>`
    }
    document.querySelector('.songsList').innerHTML = clutter;
}
autofill();

let songIndex = 1;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.querySelector("#masterPlay");
let progressBar = document.querySelector("#progressBar");
let gif = document.querySelector("#gif");
let spn = document.querySelector(".spn");
let songItems = Array.from(document.getElementsByClassName("songItem"))
let playSongName = document.getElementById('playSongName');



let songs = [
    { songName: "Mile ho tum hum ko bary naseebo sy", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Roi Na Je yaad Meri Aayi Ve _ ", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Pagal Nahi Hona Official Video Sunanda", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Waves Beat Sound Tune ", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Main Dhoondne Ko Zamaane Mein", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Ishqan De Lekhe (Full Song) - Sajjan", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Dheere Dheere Se Meri Zindagi Song 4K", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Mehabooba Main Teri Mehbooba  KGF", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Bs enna nerry rakh ly k Zinda reh Jawa", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "English baby girl song", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
]

// Events
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        makeAllPlays();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = '1';
        spn.style.opacity = '1';
        
    }
    else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.add('fa-circle-play')
        masterPlay.classList.remove('fa-circle-pause')
        gif.style.opacity = '0';
        spn.style.opacity = '0';
    }
})

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})
progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
})
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            playSongName.innerText = songs[songIndex - 1].songName;
            audioElement.src = `songs/${songIndex}.mp3`
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = '1';
            spn.style.opacity = '1';
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
        }
        else {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            playSongName.innerText = songs[songIndex - 1].songName;
            audioElement.src = `songs/${songIndex}.mp3`
            audioElement.currentTime = 0;
            audioElement.pause();
            gif.style.opacity = '0';
            spn.style.opacity = '0';
            masterPlay.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 10) {
        songIndex = 1;
    }
    else {
        songIndex += 1
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex}.mp3`
    audioElement.currentTime = 0;
    playSongName.innerText = songs[songIndex - 1].songName;
    audioElement.play();
    gif.style.opacity = '1';
    spn.style.opacity = '1';
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex == 1) {
        songIndex = 10;
    }
    else {
        songIndex -= 1
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex}.mp3`
    audioElement.currentTime = 0;
    playSongName.innerText = songs[songIndex - 1].songName;
    audioElement.play();
    gif.style.opacity = '1';
    spn.style.opacity = '1';
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})
