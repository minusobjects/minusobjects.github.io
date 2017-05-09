
const canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.width = 1000;
canvasEl.height = 600;
canvasEl.onselectstart = function(){ return false; };

const ctx = canvasEl.getContext('2d');

const bar = document.getElementById("bar");

// load default audio - seems to work fine with multiple files
// BUT having CORS errors locally...
let defaultHowl1 = new Howl({
  preload: true,
  volume: 0,
  src: 'defaults/Red_sample.wav',
});

let defaultHowl2 = new Howl({
  preload: true,
  volume: 0,
  src: 'defaults/Green_sample.wav',
});

let defaultHowl3 = new Howl({
  preload: true,
  volume: 0,
  src: 'defaults/Blue_sample.wav',
});

let soundObj = {};
soundObj['audio1'] = defaultHowl1;
soundObj['audio2'] = defaultHowl2;
soundObj['audio3'] = defaultHowl3;

let audioNames = {};
audioNames['audio1'] = 'Red_sample.wav';
audioNames['audio2'] = 'Green_sample.wav';
audioNames['audio3'] = 'Blue_sample.wav';

setAudioNames();

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
        bar.style.marginLeft = `${current_x}px`;
        if(current_x >= canvasEl.width){
          stopInterval();
        }
    }
    setPauseButton();
    playAll();
}

function setPauseButton(){
  document.getElementById("pauseDiv").setAttribute(`style`, `display:block;`);
  document.getElementById("playDiv").setAttribute(`style`, `display:none;`);
}

function setPlayButton(){
  document.getElementById("pauseDiv").setAttribute(`style`, `display:none;`);
  document.getElementById("playDiv").setAttribute(`style`, `display:block;`);
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

  document.getElementById("redVol").setAttribute(`style`, `background-color:rgba(255,0,0,${redSum/max});color:red;`);
  document.getElementById("greenVol").setAttribute(`style`, `background-color:rgba(0,255,0,${greenSum/max});color:green;`);
  document.getElementById("blueVol").setAttribute(`style`, `background-color:rgba(0,0,255,${blueSum/max});color:blue`);
}

const stopIntervalButton = document.getElementById('stopIntervalButton');
stopIntervalButton.addEventListener('click', stopInterval, false);

function stopInterval(){
  stopAll();
  window.clearInterval(setInt);
  bar.style.marginLeft = `0px`;
  bar.style.display = `none`;
  redraw();
  current_x = 0;
  setPlayButton()
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
  setPlayButton();
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
      });
      soundObj[audioId] = howl;
      setAudioNames();
    }
    audioNames[audioId] = e.target.files[0].name;
    reader.readAsDataURL(e.target.files[0]);
}

const imageLoader = document.getElementById('imageLoader');
imageLoader.onclick = function(){this.value = null;};
imageLoader.addEventListener('change', handleImage, false);

let currentImgName;

function handleImage(e){
    let reader = new FileReader();
    reader.onload = function(event){
      let img = new Image();
      img.onload = function(){
        currentImg = img;
        setImageName()
        redraw();
      }
      img.src = event.target.result;
    }
    currentImgName = e.target.files[0].name;
    reader.readAsDataURL(e.target.files[0]);
}

const colorButtons = document.getElementsByClassName('colorButton');
Array.prototype.forEach.call(colorButtons, (button) =>{
  button.addEventListener('click', changeColor, false);
});

function changeColor(e){
  curColor = eval(e.currentTarget.id);
  document.getElementById("currentColorButton").setAttribute(`style`, `color:${curColor};`);
}

const instruxButton = document.getElementById('instruxButton');
instruxButton.addEventListener('click', loadInstrux, false);

function loadInstrux(){
  document.getElementById("instrux").classList.add('instruxLoad');
}

const instrux = document.getElementById('instrux');
instrux.addEventListener('click', unloadInstrux, false);

function unloadInstrux(){
  $("#instrux").removeClass('instruxLoad');
}

$(canvasEl).mousedown(function(e){
  let mouseX = e.pageX - this.offsetLeft + 12;
  let mouseY = e.pageY - this.offsetTop + 12;

  paint = true;
  addClick(mouseX, mouseY);
  redraw();
});

$(canvasEl).mousemove(function(e){
  let mouseX = e.pageX - this.offsetLeft + 12;
  let mouseY = e.pageY - this.offsetTop + 12;

  if(paint){
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
document.getElementById("currentColorButton").setAttribute(`style`, `color:${curColor};`);
let clickColor = new Array();

const clearImgButton = document.getElementById('clearImgButton');
clearImgButton.addEventListener('click', clearImg);

const clearPaintButton = document.getElementById('clearPaintButton');
clearPaintButton.addEventListener('click', clearPaint);

function clearImg(){
  currentImg = undefined;
  currentImgName = '(none)';
  setImageName();
  sampleImgSelect = [false, false, false, false];
  setSampleImgNumber();
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

let sampleRGB1 = document.getElementById("Hum_RGB_1");
let sampleRGB2 = document.getElementById("Hum_RGB_2");
let sampleRGB3 = document.getElementById("Hum_RGB_3");
let sampleRGB4 = document.getElementById("Hum_RGB_4");

let sampleImgSelect = [false, false, false, false];

loadDefaultImage = function(){
    let pickedImg;
    let rand = Math.floor((Math.random() * 4) + 1);
    switch (rand){
      case 1:
        pickedImg = sampleRGB1;
        currentImgName = 'Hum_RGB_1.png';
        sampleImgSelect[0] = true;
        break;
      case 2:
        pickedImg = sampleRGB2;
        currentImgName = 'Hum_RGB_2.png';
        sampleImgSelect[1] = true;
        break;
      case 3:
        pickedImg = sampleRGB3;
        currentImgName = 'Hum_RGB_3.png';
        sampleImgSelect[2] = true;
        break;
      case 4:
        pickedImg = sampleRGB4;
        currentImgName = 'Hum_RGB_4.png';
        sampleImgSelect[3] = true;
        break;
      default:
        pickedImg = sampleRGB1;
        currentImgName = 'Hum_RGB_1.png';
        sampleImgSelect[0] = true;
        break;
    }
    pickedImg.onload = function(){
      currentImg = pickedImg;
      setImageName();
      setSampleImgNumber();
      redraw();
    }
}

// requires server!
loadDefaultImage();

const sampleImgNumbers = document.getElementsByClassName('sampleImgNumber');

function readySampleImgNumbers(){
  Array.prototype.forEach.call(sampleImgNumbers, (imgNumber) => {
    imgNumber.addEventListener('click', (e) => {
      sampleImgSelect = [false, false, false, false];
      currentImg = eval(e.currentTarget.id);
      let n = parseInt(e.currentTarget.attributes.data.value);
      sampleImgSelect[n] = true;
      currentImgName = currentImg.src.split(/(\\|\/)/g).pop();
      setSampleImgNumber();
      setImageName();
      redraw();
    });
  });
}

readySampleImgNumbers();

function setSampleImgNumber(){
  Array.prototype.forEach.call(sampleImgNumbers, (imgNumber) =>{
    let n = parseInt(imgNumber.attributes.data.value);
    if(sampleImgSelect[n] === true){
      imgNumber.setAttribute(`style`, `color:white;`);
    } else {
      imgNumber.setAttribute(`style`, `color:default;`);
    }
  });
}

function setImageName(){
  document.getElementById("imageName").innerHTML = currentImgName;
}

function setAudioNames(){
  document.getElementById("redAudioName").innerHTML = audioNames['audio1'];
  document.getElementById("greenAudioName").innerHTML = audioNames['audio2'];
  document.getElementById("blueAudioName").innerHTML = audioNames['audio3'];
}

window.onload = function(){
  setTimeout(loadInstrux, 1000);
}
