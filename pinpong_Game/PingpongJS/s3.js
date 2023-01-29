let can=document.getElementById("table");
let draw=can.getContext('2d');

const ball={

    x : can.clientWidth/2,
    y : can.clientHeight/2,
    radius:10,
    velx:5,
    vely:5,
    speed:5,
    color:"green"
}

const user={


    x:0,
    y:(can.clientHeight - 100)/2,
    width:10,
    height:100,
    score:0,
    color:"red"

}

const cpu={

    x:can.clientWidth - 10,
    y: (can.clientHeight - 100)/2,
width:10,
height:100,
score:0,
color:"red"
}

const sep={


    x:(can.clientWidth - 2)/2,
    y:0,
    height:10,
    width:2,
    color:"orange"
}

function drawRectangle(x,y,w,h,color){

    draw.fillStyle=color;
    draw.fillRect(x,y,w,h);
}
function drawCircle(x,y,r,color){
    draw.fillStyle=color;
    draw.beginPath();
    draw.arc(x,y,r,0,Math.PI*2,true);
    draw.closePath();
    draw.fill();

}
function drawScore(text,x,y){
    draw.fillStyle="white";
    draw.font="60px Arial";
    draw.fillText(text,x,y);
}

function drawSeperator(){
    for(let i=0;i<=can.clientHeight; i+=20){

        drawRectangle(sep.x,sep.y + i,sep.width,sep.height,sep.color);

    }
}
function restart(){
    ball.x = can.clientWidth/2;
    ball.y = can.clientHeight/2;
    ball.velx = -ball.velx;
    ball.speed = 5;
}

function detect_collision(ball,player){

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;
    
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;
    
    return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
    }
 
can.addEventListener("mousemove", getMousePos);
function getMousePos(evt){


    let rect = can.getBoundingClientRect();
    user.y=evt.clientY - rect.top - user.height/2;
}







function cpu_movement(){

    if(cpu.y < ball.y)
    cpu.y+=1;
    else
    cpu.y-=1;
}
function helper(){

    drawRectangle(0,0,can.clientWidth,can.clientHeight,"black");
    drawScore(user.score, can.clientWidth/4,can.clientHeight/5);
    drawScore(cpu.score, 3*can.clientWidth/4,can.clientHeight/5);
    drawSeperator();
    drawRectangle(user.x,user.y,user.width,user.height,user.color);
    drawRectangle(cpu.x,cpu.y,cpu.width,cpu.height,cpu.color);
    drawCircle(ball.x,ball.y,ball.radius,ball.color);

}
function updates(){


ball.x +=ball.velx;
ball.y +=ball.vely;
cpu_movement();

if(ball.y - ball.radius < 0 || ball.y + ball.radius > can.clientHeight){

    ball.vely = -ball.vely;
}

let player = (ball.x + ball.radius < can.clientWidth/2) ? user:cpu;

if(detect_collision(ball,player)){
let collidePoint = (ball.y -(player.y + player.height/2));

collidePoint = collidePoint/(player.height/2);

let angleRad = (Math.PI/4) * collidePoint;
//let direction = (ball.x < can.clientWidth/2) ? 1 : -1;
let direction = (ball.x + ball.radius < can.clientWidth/2) ? 1 : -1; ;

ball.velx = direction * ball.speed * Math.cos(angleRad);
ball.vely = ball.speed * Math.sin(angleRad);

ball.speed+=1;
}
if(ball.x - ball.radius < 0){
    cpu.score++;
    restart();
}
else if(ball.x + ball.radius > can.clientWidth){
    user.score++;
    restart();
}
}


function call_back(){
    updates();
    helper();
  
  
}
let fps=50;
let looper=setInterval(call_back,1000/fps);
