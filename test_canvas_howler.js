
const canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.height = window.innerHeight / 2;
canvasEl.width = window.innerWidth / 2;

var ctx = canvasEl.getContext('2d');

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

let fileInfo;
let pixelInfo;

function handleImage(e){
    var reader = new FileReader();
    // reader.onload = function(event){
    //     var img = new Image();
    //     img.onload = function(){
    //         canvasEl.width = img.width / 2;
    //         canvasEl.height = img.height / 2;
    //         ctx.drawImage(img,0,0,img.width / 2,img.height / 2);
    //         //works! returns an array with color info
    //         pixelInfo = ctx.getImageData(0,0,img.width / 2,20);
    //     }
    //     img.src = event.target.result;
    // }
    // mp3 is read as type "audio/mp3"
    // also, there's "image/jpeg" and "image/png"
    reader.readAsDataURL(e.target.files[0]);
    // yeah this works. can also get .size
    fileInfo = e.target.files[0].name + ' ' + e.target.files[0].type;
    // var sound = new Howl({
    //   preload: true,
    //   autoplay: true,
    //   volume: 0.5,
    //   src: [e.target.files[0]],
    //   onload: function() {
    //     console.log('Loaded!');
    //   },
    //   onplay: function() {
    //     console.log('Playing!');
    //   },
    //   onend: function() {
    //     console.log('Finished!');
    //   }
    // });
    // debugger
    // sound.play();
}


if (canvasEl.getContext) {

    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'blue';

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);

  }
