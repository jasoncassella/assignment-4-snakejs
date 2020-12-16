const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const grid = 32;

const bg = new Image();
bg.src = "img/bg.png";

const red = new Image();
red.src = "img/red.png";

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let snake = [];

snake[0] = {
    x : 9 * grid,
    y : 10 * grid
};

let food = {
    x : Math.floor(Math.random()*17+1) * grid,
    y : Math.floor(Math.random()*15+3) * grid
}

let counter = 0;

let r;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 74 && r != "RIGHT"){
        r = "LEFT";
        left.play();
    }else if(key == 73 && r != "DOWN"){
        r = "UP";
        up.play();
    }else if(key == 76 && r != "LEFT"){
        r = "RIGHT";
        right.play();
    }else if(key == 75 && r != "UP"){
        r = "DOWN";
        down.play();
    }
}

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    for(let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "blue" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,grid,grid);
    }
    
    ctx.drawImage(red, food.x, food.y);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if( r == "LEFT") snakeX -= grid;
    if( r == "UP") snakeY -= grid;
    if( r == "RIGHT") snakeX += grid;
    if( r == "DOWN") snakeY += grid;
    
    if(snakeX == food.x && snakeY == food.y){
        counter++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * grid,
            y : Math.floor(Math.random()*15+3) * grid
        }
    }else{
        snake.pop();
    }
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    if(snakeX < grid || snakeX > 17 * grid || snakeY < 3*grid || snakeY > 17*grid || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        alert("GAME OVER");
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "black";
    ctx.font = "45px open sans";
    ctx.fillText(counter,2*grid,1.6*grid);
}

let game = setInterval(draw,100);


















