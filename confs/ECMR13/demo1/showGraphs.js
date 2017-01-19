var ORIGINAL_WIDTH  = 1024;
var ORIGINAL_HEIGHT = 600;

locationsXf = new Array();
locationsYf = new Array();
locationsXr = new Array();
locationsYr = new Array();

var showFullGraph = true;
var showReducedGraph = true;
var showEdges = true;
var showLoopClosures = false;

var canvas;
var context;

var centerX;
var centerY;
var radius =5;
var factor =5.0;


var EPS = 0.05;

var vertexCount = 0;


document.onkeypress = function(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    if (charCode) {
        if(String.fromCharCode(charCode) == 'f')
	  showFullGraph = !showFullGraph;
	if(String.fromCharCode(charCode) == 'r')
	  showReducedGraph = !showReducedGraph;	
	if(String.fromCharCode(charCode) == 'e')
	  showEdges = !showEdges;
	if(String.fromCharCode(charCode) == 'l')
	  showLoopClosures = !showLoopClosures;
	
	
        //alert("Character typed: " + String.fromCharCode(charCode));
    }
};

function init() {

canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d');

centerX = canvas.width/2;
centerY = canvas.height/2;

context.clearRect(0,0,canvas.width,canvas.height);
context.fillStyle = 'green';

	if(locationsXf.length != full_graph.length)
	{
		for (i=0;i<full_graph.length; i++)
		{
			xNew = centerX+full_graph[i].x*factor;
			yNew = centerY+full_graph[i].y*-factor;
			locationsXf[i] = xNew;
			locationsYf[i] = yNew;
		}
	}
	
	if(locationsXr.length != reduced_graph.length)
	{
		for (i=0;i<reduced_graph.length; i++)
		{
			xNew = centerX+reduced_graph[i].x*factor;
			yNew = centerY+reduced_graph[i].y*-factor;
			locationsXr[i] = xNew;
			locationsYr[i] = yNew;
		}
	}
	
	
	drawVertices(true,true);
	
	return true;
}

	
function drawVertices()
{
  context.fillStyle = "white";
  context.clearRect(originx,originy,ORIGINAL_WIDTH/scale,ORIGINAL_HEIGHT/scale);
  context.fillStyle = 'red' ; //"#69D2E7"; // green
   
  var R = Math.min(5,radius/scale);
  R = Math.max(R,0.1);
  
  var L = Math.min(10, 5/scale);
  L = Math.max(L,0.25);
  
  if(showFullGraph)
  {
    context.fillStyle = "#F38630";
    
    for(i=1; i<full_graph.length; i++)
    {
      if(showEdges)
      {
	context.beginPath();
	context.moveTo(locationsXf[i-1],locationsYf[i-1]);
	context.lineTo(locationsXf[i],locationsYf[i]);
	context.strokeStyle = "rgba(243,134,48,0.5);";//'#EEEEEE';
	context.lineWidth = L;
	context.stroke();
      }
      
      context.beginPath();
      context.arc(locationsXf[i-1],locationsYf[i-1], R, 0, 2 * Math.PI, false);context.fill();
    }
  }
  

  if(showReducedGraph)
  {
    context.fillStyle = '#69D2E7';
    for(i=1; i<reduced_graph.length; i++)
    {
      
      if(showEdges)
      {
	context.beginPath();
	context.moveTo(locationsXr[i-1],locationsYr[i-1]);
	context.lineTo(locationsXr[i],locationsYr[i]);
	context.strokeStyle = 'rgba(105,210,231,.5)';//'#EEEEEE';
	context.lineWidth = L;
	context.stroke();
      }
      
      
      context.beginPath();
      context.arc(locationsXr[i-1],locationsYr[i-1], R , 0, 2 * Math.PI, false);context.fill();
    }
    
  }
}

setInterval(drawVertices,200);

/*
function calcluateVisibleVertices()
{

   
for (i=0; i<vertices.length; i++)
{
    var willShow=(i%constSampleRate==0);
    showVertices[i]=({id:i,show:0});
}



var StartID = 0;
var EndID = 1;

for(i=1; i<vertices.length;i++)
{
    var dmax = -1;
    var farthestNodeId = -1;
    var L = new Array();
    L=({x1:vertices[StartID].x , y1: vertices[StartID].y, x2: vertices[EndID].x, y2: vertices[EndID].y});
    for(j=StartID; j<i; j++)
    {
	distance = calcDistance(vertices[j],L);
	
	if(distance > dmax)
	{
	    dmax=distance;
	    farthestNodeId = j;
	}
    }
    
    if( farthestNodeId>-1 && dmax > EPS)
    {
	showVertices[StartID].show = 1;
	showVertices[farthestNodeId-1].show = 1;
	
	StartID = farthestNodeId;
	EndID   = i;
    }
    else
    {
	EndID = i;
    }
}
showVertices[vertices.length-1].show = 1;


for(i=0;i<edges.length;i++)
{
    if(edges[i].start > edges[i].end) // Keep the loop closing vertices
    {
    	showVertices[edges[i].start].show = 1;
    	showVertices[edges[i].end].show = 1;
    }
}

vertexCount=0;
for(i=0;i<vertices.length;i++ ){
    vertexCount+=showVertices[i].show;
   // if( showVertices[i].show ) document.write("Node Visible : "+i+"<br/>");
}

	
	
	
	return vertexCount;

}

function drawVisibleVertices()
{
    //context.clearRect(0,0,canvas.width,canvas.height);
   // context.fillText("Hello",100,100);
   context.fillStyle = "white";
   //context.clearRect(originx - delX ,originy -delY,ORIGINAL_WIDTH/scale + delX,ORIGINAL_HEIGHT/scale + delY);
   context.clearRect(originx,originy,ORIGINAL_WIDTH/scale,ORIGINAL_HEIGHT/scale);
   context.fillStyle = 'green' ; //"#69D2E7"; // green
   
   

    var start=0;
    var end = 0;
	
	for(i=0; i<showVertices.length; i++)
	{
	    	
	    	if(showVertices[i].show)
	    	{
		    end = i;
		    
		    context.beginPath();
		    context.moveTo(locationsX[showVertices[start].id],locationsY[showVertices[start].id]);
		    context.lineTo(locationsX[showVertices[end].id],locationsY[showVertices[end].id]);
		    context.strokeStyle = 'rgba(127,127,127,.75)';//'#EEEEEE';
		    context.strokeWidth = 1;
		    context.stroke();
		    start = i;
		    
		    context.beginPath();
		    context.arc(locationsX[end],locationsY[end], radius, 0, 2 * Math.PI, false);context.fill();
		    
		}
		else
		{
		    /*
		    context.fillStyle = 'rgba(127,127,127,.4)';//'#EEEEEE';
		    context.beginPath();
		    context.arc(locationsX[i],locationsY[i], radius, 0, 2 * Math.PI, false);context.fill();
		    
		}
	}
	
	for (i=0;i<edges.length; i++)
	{
	    	context.fillStyle = 'red';
	    	var startVID = edges[i].start;
	    	var endVID   = edges[i].end;

		if(startVID>endVID && showVertices[startVID].show && showVertices[startVID].show) // This is a loop closure
		{
			context.beginPath();
			context.moveTo(locationsX[edges[i].start],locationsY[edges[i].start]);
			context.lineTo(locationsX[edges[i].end],locationsY[edges[i].end]);
			context.strokeStyle = 'rgba(200,200,200,.5)';//'#EEEEEE';
			context.strokeWidth = 0.1;
			context.stroke();
			
			context.beginPath();
			context.arc(locationsX[edges[i].start],locationsY[edges[i].start], radius, 0, 2 * Math.PI, false);context.fill();
			
			context.beginPath();
			context.arc(locationsX[edges[i].end],locationsY[edges[i].end], radius, 0, 2 * Math.PI, false);context.fill();
		}
	}
	
	context.fillStyle = '#888888';
	context.fillRect(originx+10/scale,originy+780/scale,780/scale,15/scale);
	context.fillStyle = 'green';
	
	context.fillRect(originx+10/scale,originy+780/scale,780*(vertexCount/showVertices.length)/scale,15/scale);
	
	var context2=document.getElementById("myCanvasDraw").getContext("2d");
/*
	context2.fillStyle = '#4444ff';
	
	var barLength = 400*vertexCount/showVertices.length;
	
	context2.fillRect(EPS*400,390-barLength,1,barLength);
	
	context2.rect(0,0,400,400);
	context2.strokeStyle='#44ff44';
	context2.stroke();

	
	return true;
	
}
setInterval(drawVisibleVertices,100);

function updateTextInput(val) 
{
      newVal = val/100;
      document.getElementById('textInput').innerHTML=newVal;
      EPS = newVal;
      vertexCount = init();
      
      var percentage = Math.round(vertexCount/showVertices.length * 10000);
      percentage /=100;
      
      document.getElementById('textInput2').innerHTML=vertexCount+"("+percentage+"%)" ;
      
      return true;
}

/* Initialization code. */
