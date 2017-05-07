var x = 0;
var y = 0;
var lastX;
var lastY;
function draw(x,y,w,r,g,b,a){
        var gradient = ctx2.createRadialGradient(x, y, 0, x, y, w);
        gradient.addColorStop(0, 'rgba('+r+', '+g+', '+b+', '+a+')');
        gradient.addColorStop(1, 'rgba('+r+', '+g+', '+b+', 0)');

        ctx2.beginPath();
        ctx2.arc(x, y, w, 0, 2 * Math.PI);
        ctx2.fillStyle = gradient;
        ctx2.fill();
        ctx2.closePath();
};
var canvasTwo = document.getElementById('canvasTwo');
var ctx2 = canvasTwo.getContext('2d');
var w = 10;
var radius = w/2;
var going = false;
$(canvasTwo).mousedown(function(e){
    going = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    draw(lastX, lastY,w,200,200,200, 0.5);
});
$(canvasTwo).mouseup(function(){
    going = false;
});
$(canvasTwo).mousemove(function(e){
    if(going === true){
        x = e.offsetX;
        y = e.offsetY;

        // the distance the mouse has moved since last mousemove event
        var dis = Math.sqrt(Math.pow(lastX-x, 2)+Math.pow(lastY-y, 2));

        // for each pixel distance, draw a circle on the line connecting the two points
        // to get a continous line.
        for (i=0;i<dis;i++) {
            var s = i/dis;
            draw(lastX*s + x*(1-s), lastY*s + y*(1-s),w,200,200,200, 0.5);
        }
        lastX = x;
        lastY = y;
    };
});
