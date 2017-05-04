// Wrap everything in a function to keep your stuff private.
(function () {

    // JavaScript strict mode is a good thing.
    // "use strict";

    // Define a unique global namespace for your stuff.
    // You should change this to a namespace that is appropriate for your project.
    fluid.registerNamespace("myStuff");

    var environment = flock.init();

    // Expose any public functions or constructors as properties on your namesapce.
    myStuff.play = function () {
        // var mySynth = flock.synth({
        var mySynth = flock.synth({
            synthDef: {
                // ugen: "flock.ugen.sin",
                // freq: {
                //     ugen: "flock.ugen.lfNoise",
                //     freq: 10,
                //     mul: 380,
                //     add: 60
                // },
                // mul: 0.1

                ugen: "flock.ugen.playBuffer",
                buffer: {
                  url: "nevertturnback.mp3"
                }
            }
        });

        // If you're on iOS, you will need to call in a listener for
        // some kind of user input action, such a button click or touch handler.
        // This is because iOS will only play sound if the user initiated it.
        environment.start();
    };

}());

myStuff.play();

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
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvasEl.width = img.width / 2;
            canvasEl.height = img.height / 2;
            ctx.drawImage(img,0,0,img.width / 2,img.height / 2);
            //works! returns an array with color info
            pixelInfo = ctx.getImageData(0,0,img.width / 2,20);
        }
        img.src = event.target.result;
    }
    // mp3 is read as type "audio/mp3"
    // also, there's "image/jpeg" and "image/png"
    reader.readAsDataURL(e.target.files[0]);
    // yeah this works. can also get .size
    fileInfo = e.target.files[0].name + ' ' + e.target.files[0].type;
}


if (canvasEl.getContext) {

    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'blue';

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);

  }
