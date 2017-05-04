
const canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.height = window.innerHeight / 2;
canvasEl.width = window.innerWidth / 2;

const ctx = canvasEl.getContext('2d');

// no reason this couldn't work with multiple files, right?
let defaultHowl1 = new Howl({
  preload: true,
  volume: 0.5,
  src: './defaults/neverturnback.mp3',
  onload: function() {
    console.log('Loaded Default 1!');
  },
  onplay: function() {
    console.log('Playing Default 1!');
  },
  onend: function() {
    console.log('Finished Default 1!');
  }
});

let soundObj = {};
soundObj['audio1'] = defaultHowl1;


const imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

const audioLoaders = document.getElementsByClassName('audioLoader');
Array.prototype.forEach.call(audioLoaders, (loader) =>{
  loader.addEventListener('change', handleAudio, false);
});

const playButton = document.getElementById('playButton');
playButton.addEventListener('click', playAll, false);

const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', stopAll, false);

const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', pauseAll, false);

const volumeNumber = document.getElementById('volumeNumber');
volumeNumber.addEventListener('change', changeVolume, false);

function changeVolume(e){
  // right now just changes the first file
  // could get this to work for any of the three
  console.log('You changed the volume!');
  soundObj['audio1'].volume(e.target.value);
}

function playAll(){
  console.log('you clicked PLAY');
  soundObj['audio1'].play();
  soundObj['audio2'].play();
  soundObj['audio3'].play();
}

function stopAll(){
  console.log('you clicked STOP');
  soundObj['audio1'].stop();
  soundObj['audio2'].stop();
  soundObj['audio3'].stop();
}

function pauseAll(){
  console.log('you clicked PAUSE');
  soundObj['audio1'].pause();
  soundObj['audio2'].pause();
  soundObj['audio3'].pause();
}

function handleAudio(e){

    let audioId = e.currentTarget.id;

    let reader = new FileReader();
    reader.onload = function(event){
      howl = new Howl({
        preload: true,
        volume: 0.5,
        src: [event.target.result],
        onload: function() {
          console.log('Loaded!');
        },
        onplay: function() {
          console.log('Playing!');
        },
        onend: function() {
          console.log('Finished!');
        }
      });
      soundObj[audioId] = howl;
    }
    reader.readAsDataURL(e.target.files[0]);
}


function handleImage(e){
    let reader = new FileReader();
    reader.onload = function(event){
        let img = new Image();
        img.onload = function(){
            canvasEl.width = img.width / 2;
            canvasEl.height = img.height / 2;
            ctx.drawImage(img,0,0,img.width / 2,img.height / 2);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}
