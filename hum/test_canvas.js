
const canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.width = 1000;
canvasEl.height = 600;
canvasEl.onselectstart = function(){ return false; };

const ctx = canvasEl.getContext('2d');

const bar = document.getElementById("bar");

// load default audio - seems to work fine with multiple files
// BUT having errors locally...
let defaultHowl1 = new Howl({
  preload: true,
  volume: 0,
  src: 'defaults/Red_sample.wav',
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

let defaultHowl2 = new Howl({
  preload: true,
  volume: 0,
  src: 'defaults/Green_sample.wav',
  onload: function() {
    console.log('Loaded Default 2!');
  },
  onplay: function() {
    console.log('Playing Default 2!');
  },
  onend: function() {
    console.log('Finished Default 2!');
  }
});

let defaultHowl3 = new Howl({
  preload: true,
  volume: 0,
  src: 'defaults/Blue_sample.wav',
  onload: function() {
    console.log('Loaded Default 3!');
  },
  onplay: function() {
    console.log('Playing Default 3!');
  },
  onend: function() {
    console.log('Finished Default 3!');
  }
});

let soundObj = {};
soundObj['audio1'] = defaultHowl1;
soundObj['audio2'] = defaultHowl2;
soundObj['audio3'] = defaultHowl3;

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
    bar.style.display = `block`;
    function moveHead(){
        current_x++;
        getColorInfo(current_x);
        // redraw();
        bar.style.marginLeft = `${current_x}px`;
        if(current_x >= canvasEl.width){
          stopInterval();
        }
    }
    playAll();
}

let pixelInfo;
let redSum;
let greenSum;
let blueSum;
let alphaSum;
let max = canvasEl.height * 255;

function getColorInfo(x_coord){
  pixelInfo = ctx.getImageData(x_coord+2,0,1,canvasEl.height);
  redSum = 0;
  greenSum = 0;
  blueSum = 0;

  for (let i = 0; i < pixelInfo.data.length; i = i + 4) {
    redSum = redSum + pixelInfo.data[i];
    greenSum = greenSum + pixelInfo.data[i+1];
    blueSum = blueSum + pixelInfo.data[i+2];
  }

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
  //also needs to account for bar now
  bar.style.marginLeft = `0px`;
  bar.style.display = `none`;
  redraw();
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
        volume: 0,
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
imageLoader.onclick = function(){this.value = null;};
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e){
    let reader = new FileReader();
    reader.onload = function(event){
      let img = new Image();
      img.onload = function(){
        currentImg = img;
        redraw();
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

const purpleButton = document.getElementById('purpleButton');
purpleButton.addEventListener('click', ()=>{curColor = colorPurple;});

const yellowButton = document.getElementById('yellowButton');
yellowButton.addEventListener('click', ()=>{curColor = colorYellow;});

const greenButton = document.getElementById('greenButton');
greenButton.addEventListener('click', ()=>{curColor = colorGreen;});

const redButton = document.getElementById('redButton');
redButton.addEventListener('click', ()=>{curColor = colorRed;});

const blueButton = document.getElementById('blueButton');
blueButton.addEventListener('click', ()=>{curColor = colorBlue;});

const cyanButton = document.getElementById('cyanButton');
cyanButton.addEventListener('click', ()=>{curColor = colorCyan;});

const whiteButton = document.getElementById('whiteButton');
whiteButton.addEventListener('click', ()=>{curColor = colorWhite;});

const blackButton = document.getElementById('blackButton');
blackButton.addEventListener('click', ()=>{curColor = colorBlack;});

$(canvasEl).mousedown(function(e){
  let mouseX = e.pageX - this.offsetLeft + 12;
  let mouseY = e.pageY - this.offsetTop + 12;

  paint = true;
  // addClick(e.pageX - this.offsetLeft + 12, e.pageY - this.offsetTop + 12);
  addClick(mouseX, mouseY);
  redraw();
});

$(canvasEl).mousemove(function(e){
  let mouseX = e.pageX - this.offsetLeft + 12;
  let mouseY = e.pageY - this.offsetTop + 12;

  if(paint){
    // addClick(e.pageX - this.offsetLeft + 12, e.pageY - this.offsetTop + 12, true);
    addClick(mouseX, mouseY, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});

let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
}

const colorRed = "rgba(255,0,0,.5)";
const colorYellow = "rgba(255,255,0,.5)";
const colorGreen = "rgba(0,255,0,.5)";
const colorCyan = "rgba(0,255,255,.5)";
const colorBlue = "rgba(0,0,255,.5)";
const colorPurple = "rgba(255,0,255,.5)";
const colorWhite = "rgba(255,255,255,.5)";
const colorBlack = "rgba(0,0,0,.5)";

let curColor = colorRed;
let clickColor = new Array();

const clearImgButton = document.getElementById('clearImgButton');
clearImgButton.addEventListener('click', clearImg);

const clearPaintButton = document.getElementById('clearPaintButton');
clearPaintButton.addEventListener('click', clearPaint);

function clearImg(){
  currentImg = undefined;
  redraw();
}

function clearPaint(){
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
  clickColor = new Array();
  curColor = colorRed;
  redraw();
}

function redraw(){
  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  if(currentImg){
    ctx.drawImage(currentImg,0,0,1000,600);
  } else {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  ctx.lineJoin = "round";
  ctx.lineWidth = 25;

  for(let i=0; i < clickX.length; i++) {
    ctx.beginPath();
    if(clickDrag[i] && i){
      ctx.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       ctx.moveTo(clickX[i]-1, clickY[i]);
     }
     ctx.lineTo(clickX[i], clickY[i]);
     ctx.closePath();
     ctx.strokeStyle = clickColor[i];
     ctx.stroke();
  }
}

let SampleRGB1 = document.getElementById("Hum_RGB_1");
let SampleRGB2 = document.getElementById("Hum_RGB_2");
let SampleRGB3 = document.getElementById("Hum_RGB_3");
let SampleRGB4 = document.getElementById("Hum_RGB_4");

// meow
// default image. doesn't work locally.
SampleRGB1.onload = function(){
  currentImg = SampleRGB1;
  redraw();
}
