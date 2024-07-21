console.log("Welcome to Spotify")
let songIndex = 0;
let audioElement = new Audio('song/Daku.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    {songName: "Daku", filepath: "song/Daku.mp3", coverPath: "covers/Daku.jpg"},
    {songName: "Levitating", filepath: "song/Levitating.mp3", coverPath: "covers/levitating.jpg"},
    {songName: "Balam Thanedar", filepath: "song/Balam Thanedar.mp3", coverPath: "covers/Balam Thanedar.jpg"},
    {songName: "DeathRow", filepath: "song/DeathRow.mp3", coverPath: "covers/DeathRow.jpg"},
    {songName: "Fortuner", filepath: "song/Fortuner.mp3", coverPath: "covers/Fortuner.jpg"},
    {songName: "Spellbound", filepath: "song/Spellbound.mp3", coverPath: "covers/Spellbound.jpg"},
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })    
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `song/${songIndex+1}.mp3`;
        
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})