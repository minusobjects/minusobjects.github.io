
(function () {
    fluid.registerNamespace("myStuff");
    var environment = flock.init();
    myStuff.play = function (url) {
        var mySynth = flock.synth({
            synthDef: {
                ugen: "flock.ugen.playBuffer",
                buffer: {
                  url: url
                }
            }
        });
        debugger
        environment.start();
    };
}());


const canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.height = window.innerHeight / 2;
canvasEl.width = window.innerWidth / 2;

var ctx = canvasEl.getContext('2d');

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);



function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
      myStuff.play(event.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
}


if (canvasEl.getContext) {

    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'blue';

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);

  }
