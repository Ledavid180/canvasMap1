let ctx = null;
let gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
    0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

let tileW = 40, tileH = 40;
let mapW = 10, mapH = 10;
let currentSecond = 0, frameCount = 0, framesLastSecond = 0;

window.onload = function(){
    //you want to let the browser tell you when its ready for you to draw to the canvas. The easiest way to do this is to use the requestAnimationFrame function and designate a 'callback' - a function we want exectued when the browser is ready.
    ctx = document.getElementById('gameBoard').getContext('2d');
    requestAnimationFrame(drawGameBoard);
    ctx.font = 'bold 10pt sans-serif';
}

function drawGameBoard(){
    //use this function to count the number of frame (frame rate) per second; it will draw the map itself; the frame rate will be draw and finally well request that the function be called again when the browser is ready
    if(ctx==null) {
        //this checks to see if the canvas drawing context exists and if not, we exit out of the function and give up.
        return;
    }
    //next we do a simple framecount. We see which second it currently is in Unix Time, and if its the same one as it was last frame we add to the frame count. If not, we set the framesLastSecond t the current frame count, reset the frame count to 0 and update the current second.
    let sec = Math.floor(Date.now()/1000);
    if(sec != currentSecond){
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    } else {
        frameCount++;
    }
    //now we begin our main drawing loops- to draw our map, we'll be using 2 nested loops; our outer loop(yloop), does down the map row by row, whilst inner loop(x loop) goes from left to right over each column within the current row
    for(var y = 0; y < mapH; ++y){
        for(var x = 0; x < mapW; ++x) {
            switch(gameMap[((y*mapW)+x)])
			{
				case 0:
					ctx.fillStyle = "#000000";
					break;
				default:
					ctx.fillStyle = "#ccffcc";
			}

			ctx.fillRect( x*tileW, y*tileH, tileW, tileH);

        }
    }
    ctx.fillStyle = "#ff0000";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);

	requestAnimationFrame(drawGameBoard);

}

