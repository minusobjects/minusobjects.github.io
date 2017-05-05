// integrate these when using an actual server!

//load default image, set to canvas
// BUT not working locally!
// need to use File API here?
// let defaultImg = new Image();
// defaultImg.src = 'defaults/rgb_default.png';
 // defaultImg.setAttribute('crossOrigin', '');
// defaultImg.onload = function(){
//   canvasEl.width = defaultImg.width / 2;
//   canvasEl.height = defaultImg.height / 2;
//   ctx.drawImage(defaultImg,0,0,defaultImg.width / 2,defaultImg.height / 2);
// }

// load default audio - seems to work fine with multiple files
// BUT having errors locally! So, gonna turn it off for now.
// let defaultHowl1 = new Howl({
//   preload: true,
//   volume: 0.5,
//   src: 'defaults/neverturnback.mp3',
//   onload: function() {
//     console.log('Loaded Default 1!');
//   },
//   onplay: function() {
//     console.log('Playing Default 1!');
//   },
//   onend: function() {
//     console.log('Finished Default 1!');
//   }
// });
//
// let defaultHowl2 = new Howl({
//   preload: true,
//   volume: 0.5,
//   src: 'defaults/80s_vibe.mp3',
//   onload: function() {
//     console.log('Loaded Default 2!');
//   },
//   onplay: function() {
//     console.log('Playing Default 2!');
//   },
//   onend: function() {
//     console.log('Finished Default 2!');
//   }
// });
//
// let defaultHowl3 = new Howl({
//   preload: true,
//   volume: 0.5,
//   src: 'defaults/rave_digger.mp3',
//   onload: function() {
//     console.log('Loaded Default 3!');
//   },
//   onplay: function() {
//     console.log('Playing Default 3!');
//   },
//   onend: function() {
//     console.log('Finished Default 3!');
//   }
// });
//
let soundObj = {};
// soundObj['audio1'] = defaultHowl1;
// soundObj['audio2'] = defaultHowl2;
// soundObj['audio3'] = defaultHowl3;
