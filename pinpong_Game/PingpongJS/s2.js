var can=document.getElementById("table");
var draw=can.getContext('2d');

draw.fillStyle="red";
draw.fillRect(100,100,30,30);

draw.fillStyle="orange";
draw.beginPath();
draw.arc(200,200,10,0,Math.PI*2,false);
draw.closePath();
draw.fill();
