
const canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.width = 1000;
canvasEl.height = 600;
canvasEl.onselectstart = function(){ return false; };

const ctx = canvasEl.getContext('2d');

const bar = document.getElementById("bar");

let soundObj = {};
let audioNames = {};

function loadSampleHowls(num){
  const sampleHowls = {
    0:['Tone_Red.mp3','Tone_Green.mp3','Tone_Blue.mp3'],
    1:['Beat_Red.mp3','Beat_Green.mp3','Beat_Blue.mp3'],
    2:['Jazz_Red.mp3','Jazz_Green.mp3','Jazz_Blue.mp3'],
    3:['Choir_Red.mp3','Choir_Green.mp3','Choir_Blue.mp3']
  };

  let defaultHowl1 = new Howl({
    preload: true,
    volume: 0,
    src: `defaults/${sampleHowls[num][0]}`
  });

  let defaultHowl2 = new Howl({
    preload: true,
    volume: 0,
    src: `defaults/${sampleHowls[num][1]}`
  });

  let defaultHowl3 = new Howl({
    preload: true,
    volume: 0,
    src: `defaults/${sampleHowls[num][2]}`
  });

  soundObj['audio1'] = defaultHowl1;
  soundObj['audio2'] = defaultHowl2;
  soundObj['audio3'] = defaultHowl3;

  audioNames['audio1'] = sampleHowls[num][0];
  audioNames['audio2'] = sampleHowls[num][1];
  audioNames['audio3'] = sampleHowls[num][2];

  sampleAudSelect = [false,false,false,false];
  sampleAudSelect[num] = true;
  setSampleAudNumber();
  setAudioNames();
}

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
let halfMax = max / 2;

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

  if(redSum/halfMax >= 1){
    redSum = 1;
  } else {
    redSum = redSum/halfMax;
  }

  if(greenSum/halfMax >= 1){
    greenSum = 1;
  } else {
    greenSum = greenSum/halfMax;
  }

  if(blueSum/halfMax >= 1){
    blueSum = 1;
  } else {
    blueSum = blueSum/halfMax;
  }

  soundObj['audio1'].volume(redSum);
  soundObj['audio2'].volume(greenSum);
  soundObj['audio3'].volume(blueSum);

  document.getElementById("redVolCircle").setAttribute(`fill`, `rgba(255,0,0,${redSum})`);
  document.getElementById("greenVolCircle").setAttribute(`fill`, `rgba(0,255,0,${greenSum})`);
  document.getElementById("blueVolCircle").setAttribute(`fill`, `rgba(0,0,255,${blueSum})`);
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

let errorMessage = '';

function setErrors(){
  document.getElementById('errors').innerHTML = errorMessage;
}

function handleAudio(e){
  errorMessage = ''
  let filename = e.target.files[0].name
  let ext = filename.substr(filename.lastIndexOf('.')+1);
  if(ext.toLowerCase() !== 'mp3' && ext.toLowerCase() !== 'wav'){
    errorMessage = 'Audio file must be WAV or MP3.';
    setErrors();
    return null;
  }

  let audioId = e.currentTarget.id;

  let reader = new FileReader();
  reader.onload = function(event){
    howl = new Howl({
      preload: true,
      volume: 0,
      src: [event.target.result],
    });
    soundObj[audioId] = howl;
    setErrors();
    setAudioNames();
  }
  audioNames[audioId] = filename;
  reader.readAsDataURL(e.target.files[0]);
}

const imageLoader = document.getElementById('imageLoader');
imageLoader.onclick = function(){this.value = null;};
imageLoader.addEventListener('change', handleImage, false);

let currentImgName;

function handleImage(e){
  errorMessage = ''
  let filename = e.target.files[0].name
  let ext = filename.substr(filename.lastIndexOf('.')+1);
  if(ext.toLowerCase() !== 'png' && ext.toLowerCase() !== 'jpg' && ext.toLowerCase() !== 'jpeg'){
    errorMessage = 'Image file must be PNG or JPG.';
    setErrors();
    return null;
  }

    let reader = new FileReader();
    reader.onload = function(event){
      let img = new Image();
      img.onload = function(){
        currentImg = img;
        setImageName()
        setErrors();
        redraw();
      }
      img.src = event.target.result;
    }
    currentImgName = filename;
    reader.readAsDataURL(e.target.files[0]);
}

const colorButtons = document.getElementsByClassName('colorButton');
Array.prototype.forEach.call(colorButtons, (button) =>{
  button.addEventListener('click', changeColor, false);
});

const currentColorButton = document.getElementById("currentColorButton");
function changeColor(e){
  curColor = eval(e.currentTarget.id);
  currentColorButton.setAttribute(`style`, `color:${curColor};`);
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
  let mouseX = e.pageX - this.offsetLeft + 35;
  let mouseY = e.pageY - this.offsetTop + 35;

  paint = true;
  addClick(mouseX, mouseY);
  redraw();
});

$(canvasEl).mousemove(function(e){
  let mouseX = e.pageX - this.offsetLeft + 35;
  let mouseY = e.pageY - this.offsetTop + 35;

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
  ctx.lineWidth = 70;

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
let sampleRGB5 = document.getElementById("Hum_RGB_5");

let sampleImgSelect = [false, false, false, false, false];
let sampleAudSelect = [false, false, false, false];

loadDefaultImage = function(){
    let pickedImg;
    let rand = Math.floor((Math.random() * 5) + 1);
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
      case 5:
        pickedImg = sampleRGB5;
        currentImgName = 'Hum_RGB_5.png';
        sampleImgSelect[4] = true;
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

const sampleAudNumbers = document.getElementsByClassName('sampleAudNumber');

function readySampleAudNumbers(){
  Array.prototype.forEach.call(sampleAudNumbers, (audNumber) => {
    audNumber.addEventListener('click', (e) => {
      stopInterval();
      sampleAudSelect = [false, false, false, false];
      let n = parseInt(e.currentTarget.attributes.data.value);
      loadSampleHowls(n);
      sampleAudSelect[n] = true;
      setSampleAudNumber();
    });
  });
}

function setSampleAudNumber(){
  Array.prototype.forEach.call(sampleAudNumbers, (audNumber) =>{
    let n = parseInt(audNumber.attributes.data.value);
    if(sampleAudSelect[n] === true){
      audNumber.setAttribute(`style`, `color:white;`);
    } else {
      audNumber.setAttribute(`style`, `color:default;`);
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


// requires server
loadDefaultImage();

window.onload = function(){
  readySampleImgNumbers();
  readySampleAudNumbers();
  loadSampleHowls(0);
  setAudioNames();
  setHints();
  setTimeout(loadInstrux, 500);
}
