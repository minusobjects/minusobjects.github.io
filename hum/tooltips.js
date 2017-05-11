
let enableStr = 'enable';

const allHintButtons = [clearImgButton, clearPaintButton, colorButtons,
currentColorButton, stopIntervalButton, colorInfoButton,
'#audio1Button', '#audio2Button', '#audio3Button',
'#imageLoaderButton', '#redVol', '#greenVol', '#blueVol',
sampleImgNumbers, '#imageName', '#redAudioName', '#greenAudioName',
'#blueAudioName', instruxButton, '#sampleImgStatic', '#sampleAudStatic'];

const toggleTipsButton = document.getElementById('toggleTipsButton');
toggleTipsButton.addEventListener('click', toggleTips);

function toggleTips(){
  if(enableStr === 'enable'){
    enableStr = 'disable'
    toggleTipsButton.innerHTML = 'TURN HINTS ON';
  } else {
    enableStr = 'enable'
    toggleTipsButton.innerHTML = 'TURN HINTS OFF';
  }
  setHints();
}

$(clearImgButton).tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Clear the background image, but not the paint."
});
$(clearPaintButton).tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Clear the paint, but not the background image."
});
$(currentColorButton).tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Current paint color."
});
$(colorButtons).tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Choose a color to paint with."
});
$(colorInfoButton).tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Play/pause the audio."
});
$(stopIntervalButton).tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Stop the audio."
});
$('#imageLoaderButton').tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Load your own image (PNG or JPG) into the background."
});
$("#redVol").tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Audio level for the red channel."
});
$("#greenVol").tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Audio level for the green channel."
});
$("#blueVol").tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Audio level for the blue channel."
});
$('#audio1Button').tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Load your own audio (MP3 or WAV) into the red channel."
});
$('#audio2Button').tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Load your own audio (MP3 or WAV) into the green channel."
});
$('#audio3Button').tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Load your own audio (MP3 or WAV) into the blue channel."
});
$(sampleImgNumbers).tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Load one of the sample images into the background."
});
$('#sampleImgStatic').tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Load one of the sample images into the background."
});
$('#sampleAudStatic').tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Load one of the sample sets of audio files."
});
$('#imageName').tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "The current background image."
});
$('#redAudioName').tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "The audio currently on the red channel."
});
$('#greenAudioName').tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "The audio currently on the green channel."
});
$('#blueAudioName').tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "The audio currently on the blue channel."
});
$(instruxButton).tooltip({
  classes: {
    "ui-tooltip": "highlight"
  },
  show: { duration: 300 },
  content: "Load the instructions window."
});

function setHints(){
  allHintButtons.forEach((button)=>{
    $(button).tooltip(enableStr);
  })
}
