let soundObj = {};
let sampleAudSelect = [false, false, false, false];

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

  soundObj['red'] = defaultHowl1;
  soundObj['green'] = defaultHowl2;
  soundObj['blue'] = defaultHowl3;

  sampleAudSelect = [false,false,false,false];
  sampleAudSelect[num] = true;
  setSampleAudNumber();

  setAudioName('red', sampleHowls[num][0]);
  setAudioName('green', sampleHowls[num][1]);
  setAudioName('blue', sampleHowls[num][2]);
}

function setAudioName(color, name){
  document.getElementById(`${color}AudioName`).innerHTML = name;
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

  let color = e.currentTarget.id;

  let reader = new FileReader();
  reader.onload = function(event){
    howl = new Howl({
      preload: true,
      volume: 0,
      src: [event.target.result],
    });
    soundObj[color] = howl;
    setErrors();
    setAudioName(color, filename);
  }
  reader.readAsDataURL(e.target.files[0]);
}

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

function pauseInterval(){
  pauseAll();
  window.clearInterval(setInt);
  setPlayButton();
}

function playAll(){
  soundObj['red'].play();
  soundObj['green'].play();
  soundObj['blue'].play();
}

function stopAll(){
  soundObj['red'].stop();
  soundObj['green'].stop();
  soundObj['blue'].stop();
}

function pauseAll(){
  soundObj['red'].pause();
  soundObj['green'].pause();
  soundObj['blue'].pause();
}

function setPauseButton(){
  document.getElementById("pauseDiv").setAttribute(`style`, `display:block;`);
  document.getElementById("playDiv").setAttribute(`style`, `display:none;`);
}

function setPlayButton(){
  document.getElementById("pauseDiv").setAttribute(`style`, `display:none;`);
  document.getElementById("playDiv").setAttribute(`style`, `display:block;`);
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
