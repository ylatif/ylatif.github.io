
var originx = 0;
var originy = 0;

var scale = 1;

var dragOffset = new Array();

var mouseIsDown = false;

function MouseWheelHandler(e)
{
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	
	var mousex = e.clientX - canvas.offsetLeft;
    var mousey = e.clientY - canvas.offsetTop;
	console.log(delta);

	var zoom = 1 + delta/4;

    	context.translate(originx,originy);
    
    	context.scale(zoom,zoom);
    	context.translate(
        	-( mousex / scale + originx - mousex / ( scale * zoom ) ),
        	-( mousey / scale + originy - mousey / ( scale * zoom ) )
    	);

    	originx = ( mousex / scale + originx - mousex / ( scale * zoom ) );
    	originy = ( mousey / scale + originy - mousey / ( scale * zoom ) );
    	scale *= zoom;

    return false;
}


window.onload = function()
{
    canvas = document.getElementById('myCanvas');
    
	if (canvas.addEventListener)
	{
		// IE9, Chrome, Safari, Opera
		canvas.addEventListener("mousewheel", MouseWheelHandler, false);
		// Firefox
		canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
	}


    canvas.onmousedown = function(event)
    {
	dragOffset.x = event.clientX - canvas.offsetLeft ;
	dragOffset.y = event.clientY - canvas.offsetTop;
	mouseIsDown = true;
    };

    canvas.onmouseup = function(event)
    {
	mouseIsDown = false;
    };

    canvas.onmousemove = function(event)
    {
	if(!mouseIsDown) return;
	var dx = (event.clientX - canvas.offsetLeft - dragOffset.x)/scale;
	var dy = (event.clientY - canvas.offsetTop - dragOffset.y)/scale;
	context.translate( dx , dy );
	dragOffset.x = event.clientX - canvas.offsetLeft;
	dragOffset.y = event.clientY - canvas.offsetTop;
    
	originx -=dx;
	originy -=dy;
	return true;
    };
}