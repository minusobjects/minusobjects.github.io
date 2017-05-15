const canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.width = 1000;
canvasEl.height = 600;
canvasEl.onselectstart = function(){ return false; };

const ctx = canvasEl.getContext('2d');

const bar = document.getElementById("bar");

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
