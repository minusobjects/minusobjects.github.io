function colorTimeline(){
  let aud1Dur = soundObj['red'].duration();
  let aud2Dur = soundObj['green'].duration();
  let aud3Dur = soundObj['blue'].duration();

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


function sumMaxOne(colorSum,max){
  if(colorSum/max >= 1){
    colorSum = 1;
  } else {
    colorSum = colorSum/max;
  }
  return colorSum;
}

function getColorInfo(x_coord){
  let pixelInfo;
  let redSum = 0;
  let greenSum = 0;
  let blueSum = 0;
  let alphaSum;
  let max = canvasEl.height * 255;
  let halfMax = max / 2;

  pixelInfo = ctx.getImageData(x_coord+2,0,1,canvasEl.height);

  for (let i = 0; i < pixelInfo.data.length; i = i + 4) {
    redSum = redSum + pixelInfo.data[i];
    greenSum = greenSum + pixelInfo.data[i+1];
    blueSum = blueSum + pixelInfo.data[i+2];
  }

  redSum = sumMaxOne(redSum,halfMax);
  greenSum = sumMaxOne(greenSum,halfMax);
  blueSum = sumMaxOne(blueSum,halfMax);

  assignVolume(redSum,greenSum,blueSum);
  showLevels(redSum,greenSum,blueSum);
}

function assignVolume(redSum,greenSum,blueSum){
  soundObj['red'].volume(redSum);
  soundObj['green'].volume(greenSum);
  soundObj['blue'].volume(blueSum);
}

function showLevels(redSum,greenSum,blueSum){
  document.getElementById("redVolCircle").setAttribute(`fill`, `rgba(255,0,0,${redSum})`);
  document.getElementById("greenVolCircle").setAttribute(`fill`, `rgba(0,255,0,${greenSum})`);
  document.getElementById("blueVolCircle").setAttribute(`fill`, `rgba(0,0,255,${blueSum})`);
}
