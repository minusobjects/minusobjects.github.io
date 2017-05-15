let sampleImgSelect = [false, false, false, false, false];

const sampleImgNumbers = document.getElementsByClassName('sampleImgNumber');

loadDefaultImage = function(){
    const sampleRGB1 = document.getElementById("Hum_RGB_1");
    const sampleRGB2 = document.getElementById("Hum_RGB_2");
    const sampleRGB3 = document.getElementById("Hum_RGB_3");
    const sampleRGB4 = document.getElementById("Hum_RGB_4");
    const sampleRGB5 = document.getElementById("Hum_RGB_5");

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

const imageLoader = document.getElementById('imageLoader');
imageLoader.onclick = function(){this.value = null;};
imageLoader.addEventListener('change', handleImage, false);

function readySampleImgNumbers(){
  Array.prototype.forEach.call(sampleImgNumbers, (imgNumber) => {
    imgNumber.addEventListener('click', (e) => {
      sampleImgSelect = [false, false, false, false];
      let n = parseInt(e.currentTarget.attributes.data.value);
      currentImg = document.getElementById(`Hum_RGB_${n + 1}`);
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

function setImageName(){
  document.getElementById("imageName").innerHTML = currentImgName;
}

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
