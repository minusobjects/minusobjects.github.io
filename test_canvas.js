
const canvasEl = document.getElementsByTagName("canvas")[0];
// canvasEl.height = window.innerHeight / 2;
// canvasEl.width = window.innerWidth / 2;

const ctx = canvasEl.getContext('2d');

let soundObj = {};

let setInt;
let current_x = 0;

let currentImg;

const colorInfoButton = document.getElementById('colorInfoButton');
colorInfoButton.addEventListener('click', colorTimeline, false);

function colorTimeline(){
  let aud1Dur = soundObj['audio1'].duration();
  let aud2Dur = soundObj['audio2'].duration();
  let aud3Dur = soundObj['audio3'].duration();

  let shortestDur = Math.min(aud1Dur, aud2Dur, aud3Dur);
  let millies = (shortestDur / canvasEl.width) * 1000;

  setInt = window.setInterval(()=>{moveHead()}, millies);
    function moveHead(){
        current_x++;
        getColorInfo(current_x);
        // needs to account for painting
        ctx.drawImage(currentImg,0,0,1000,600);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(current_x, 0, 2, 600);
        if(current_x >= canvasEl.width){
          stopInterval();
        }
    }
    playAll();
}

let redData = [];
let greenData = [];
let blueData = [];
let alphaData = [];
let pixelInfo;
let redSum;
let greenSum;
let blueSum;
let alphaSum;

function getColorInfo(x_coord){
  pixelInfo = ctx.getImageData(x_coord+2,0,1,canvasEl.height);
  redData = [];
  greenData = [];
  blueData = [];
  alphaData = [];

  for (let i = 0; i < pixelInfo.data.length; i = i + 4) {
    redData.push(pixelInfo.data[i]);
  }

  for (let i = 1; i < pixelInfo.data.length; i = i + 4) {
    greenData.push(pixelInfo.data[i]);
  }

  for (let i = 2; i < pixelInfo.data.length; i = i + 4) {
    blueData.push(pixelInfo.data[i]);
  }

  for (let i = 3; i < pixelInfo.data.length; i = i + 4) {
    alphaData.push(pixelInfo.data[i]);
  }

  redSum = redData.reduce((acc, val) => {
    return acc + val;
  }, 0);
  greenSum = greenData.reduce((acc, val) => {
    return acc + val;
  }, 0);
  blueSum = blueData.reduce((acc, val) => {
    return acc + val;
  }, 0);
  alphaSum = alphaData.reduce((acc, val) => {
    return acc + val;
  }, 0);

  let max = canvasEl.height * 255;

  soundObj['audio1'].volume(redSum/max);
  soundObj['audio2'].volume(greenSum/max);
  soundObj['audio3'].volume(blueSum/max);

  // seems to work fine; could also do: element.setAttribute("style", "background-color: red;");
  document.getElementById("volumeTest").innerHTML = redSum/max;
}

const stopIntervalButton = document.getElementById('stopIntervalButton');
stopIntervalButton.addEventListener('click', stopInterval, false);

function stopInterval(){
  stopAll();
  window.clearInterval(setInt);
  // needs to account for painting
  ctx.drawImage(currentImg,0,0,1000,600);
  current_x = 0;
  console.log('Interval stopped!')
}

const audioLoaders = document.getElementsByClassName('audioLoader');
Array.prototype.forEach.call(audioLoaders, (loader) =>{
  loader.addEventListener('change', handleAudio, false);
});

const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', pauseInterval, false);

function pauseInterval(){
  pauseAll();
  window.clearInterval(setInt);
  console.log('Interval paused!')
}

function playAll(){
  soundObj['audio1'].play();
  soundObj['audio2'].play();
  soundObj['audio3'].play();
}

function stopAll(){
  soundObj['audio1'].stop();
  soundObj['audio2'].stop();
  soundObj['audio3'].stop();
}

function pauseAll(){
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

const imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e){
    let reader = new FileReader();
    reader.onload = function(event){
        let img = new Image();
        img.onload = function(){
            // canvasEl.width = img.width / 2;
            // canvasEl.height = img.height / 2;
            canvasEl.width = 1000;
            canvasEl.height = 600;
            currentImg = img;
            ctx.drawImage(img,0,0,1000,600);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

// start square in top left
ctx.fillStyle = 'orange';
// ctx.strokeStyle = 'blue';
ctx.fillRect(0, 0, 3, 3);

// this does seem to work to load images in
// var htmlImg = document.getElementById("htmlImg");
// htmlImg.onload = function ()
// {
//   ctx.drawImage(htmlImg, 0, 0);
// }
