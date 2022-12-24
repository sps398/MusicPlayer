const songItem = document.querySelectorAll('.song-item');
const pp = document.getElementById('a-pp');
const prev = document.getElementById('a-prev');
const next = document.getElementById('a-next');
const progressBar = document.getElementById('progress-bar');
const anim = document.getElementById('animation');
const curr = document.getElementById('curr');
const audio = new Audio('./songs/1.mp3');
let currId = 1, prevId = 0;

const songNames = ["Chahe-Dukh-Ho-Chahe-Sukh-Ho", "Jim's-Theme", "Jo-Tum-Na-Ho", "Tere-Naina", 
                    "Teri-Galiyon-Se", "Tod-Lage-Jatt_Nu", "Tu-Itna-Zaroori-Kaise-Hua", "Tu-Mila-To-Khuda-Ka-Sahara-Mil-Gaya",
                    "Yaadon-Mein-Teri", "Zoom-Boom-Doom-Pathan"];

Array.from(songItem).forEach(song => {
    song.addEventListener('click', s => {
        const id = getId(s);
        if (!audio.paused && id == currId)
            return;

        prevId = currId;
        currId = parseInt(id);
        
        highlight();
        
        audio.src = `./songs/${id}.mp3`;
        setForPlay();
        audio.play();
        curr.innerText = `${songNames[currId-1]}`;   
    });
});

pp.addEventListener('click', ppSong);

function ppSong() {
    if (!audio.paused) {
        audio.pause();
        pp.classList.remove("fa-pause");
        pp.classList.add('fa-play');    
        anim.src = `anim_still.png`;
    }
    else {
        highlight();
        setForPlay();
        audio.play();
    }
}

prev.addEventListener('click', playPrevSong);

function playPrevSong() {
    prevId = currId;
    currId = getPrevId(currId);
    highlight();

    if (audio.paused)
        setForPlay();
    
    audio.src = `./songs/${currId}.mp3`;
    audio.play();
    curr.innerText = `${songNames[currId-1]}`;
}

next.addEventListener('click', playNextSong);

function playNextSong() {
    prevId = currId;
    currId = getNextId(currId);
    highlight();

    if (audio.paused)
        setForPlay();
    
    audio.src = `./songs/${currId}.mp3`;
    audio.play();
    curr.innerText = `${songNames[currId-1]}`;
}

function setForPlay() {
    pp.classList.remove('fa-play');
    pp.classList.add('fa-pause');
    anim.src = "anim.gif";
}

audio.addEventListener('timeupdate', () => {
    progressBar.value = parseInt((audio.currentTime/audio.duration)*100);

    if(progressBar.value == 100)
        playNextSong();
})

progressBar.addEventListener('change', e => {
    audio.currentTime = progressBar.value*audio.duration/100;
})

function getId(s) {
    if (s.target.nodeName == "IMG")
        return s.target.parentNode.parentNode.id;
    else
        return s.target.parentNode.id;
}

function getPrevId(currId) {
    if (currId == 1)
        return 10;
    else
        return currId-1;
}

function getNextId(currId) {
    if (currId == 10)
        return 1;
    else
        return currId+1;
}

function highlight() {
    normalise();
    document.getElementById(currId).style.color = "green";
}

function normalise() {
    if(prevId != 0)
        document.getElementById(prevId).style.color = "white";
}

document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
      ppSong();
    }
  }