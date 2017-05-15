let setInt;
let current_x = 0;

let currentImg;
let currentImgName;

let errorMessage = '';
function setErrors(){
  document.getElementById('errors').innerHTML = errorMessage;
}

// requires server
loadDefaultImage();

window.onload = function(){
  readySampleImgNumbers();
  readySampleAudNumbers();
  loadSampleHowls(0);
  setHints();
  document.getElementById("loadingAnim").setAttribute(`style`, `display:none;`);
  setTimeout(loadInstrux, 500);
}
