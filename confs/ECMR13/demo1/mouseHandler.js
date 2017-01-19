
var originx = 0;
var originy = 0;

var scale = 1;

var dragOffset = new Array();

var mouseIsDown = false;

window.onload = function()
{
    canvas = document.getElementById('myCanvas');
    
    canvas.onmousewheel = function (event)
    {
    	var mousex = event.clientX - canvas.offsetLeft;
    	var mousey = event.clientY - canvas.offsetTop;
    	var wheel = event.wheelDelta/120;//n or -n

    	var zoom = 1 + wheel/4;

    	context.translate(originx,originy);
    
    	context.scale(zoom,zoom);
    	context.translate(
        	-( mousex / scale + originx - mousex / ( scale * zoom ) ),
        	-( mousey / scale + originy - mousey / ( scale * zoom ) )
    	);

    	originx = ( mousex / scale + originx - mousex / ( scale * zoom ) );
    	originy = ( mousey / scale + originy - mousey / ( scale * zoom ) );
    	scale *= zoom;
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