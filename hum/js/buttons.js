const colorInfoButton = document.getElementById('colorInfoButton');
colorInfoButton.addEventListener('click', colorTimeline, false);

const stopIntervalButton = document.getElementById('stopIntervalButton');
stopIntervalButton.addEventListener('click', stopInterval, false);

const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', pauseInterval, false);

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

let curColor = colorRed;
document.getElementById("currentColorButton").setAttribute(`style`, `color:${curColor};`);
let clickColor = new Array();

const clearImgButton = document.getElementById('clearImgButton');
clearImgButton.addEventListener('click', clearImg);

const clearPaintButton = document.getElementById('clearPaintButton');
clearPaintButton.addEventListener('click', clearPaint);
