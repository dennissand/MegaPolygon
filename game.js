let f = new FontFace("gamefont", "url(res/fonts/ABSTRACT.TTF)")
f.load().then(function () {
const canvas = document.getElementById("MegaPolygon")
const context = canvas.getContext("2d")

class GameObject{
    
    constructor(posX, posY) {
        this.posX = posX
        this.posY = posY
    }
}

class Player extends GameObject{
    
    constructor(posX, posY) {
        super(posX, posY);
        this.velo = 0.2
        this.theta = Math.PI * 2 
    }
    
    playerMovement(direction){
        
        const ls = {
            x: this.posX,
            y: this.posY
        }
        
        if(direction === "left"){
            this.theta -= this.velo
        }else if(direction === "right"){
            this.theta += this.velo 
        }
        this.posX = canvas.width / 2 + Math.cos(this.theta) * 20
        this.posY = canvas.height / 2 + Math.sin(this.theta) * 20 
        //context.beginPath()
        //context.lineWidth = 2
        //context.strokeStyle = "red"
        context.moveTo(ls.x, ls.y)
        context.lineTo(this.posX, this.posY)
        //context.stroke()
        
        
    }
    draw_player(){
        context.fillStyle = "#00fa00"
        context.fillRect(this.posX, this.posY, 5 , 5 )
    }
}

class Obstacle extends GameObject{

    constructor(posX, posY) {
        super(posX, posY);
        this.velo = 1
        
    }
    draw_obstacle(){
        
        let x = 1
        
        context.strokeStyle = "red"
        context.beginPath()
        for(let i = 0; i < x; i++){
            context.moveTo(0,0)
            context.lineTo(this.posX, this.posY)
            
            context.lineWidth = 5
            context.stroke() 
        }
        
    }
    
    move_obstacle(){
        console.log("nug")
       this.posX -= this.velo
       this.posY -= this.velo
    }  
    
}
function background(){
    
    context.fillStyle = "#2a2a2a"
    context.strokeStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
    
}
function draw_score(points){
    
    context.fillStyle = "green"
    context.font = " 4px gamefont"
    context.fillText("Score: " + points, canvas.width - 120, 10)
    
}
function draw_startscreen(points){
    
    if(first_game){
        context.textAlign = "center"
        context.fillStyle = "green"
        context.font = " 5px gamefont"
        context.fillText("Press SPACE to play",  canvas.width/ 2, canvas.height/ 2) 
        
    }else{
        context.textAlign = "center"
        context.fillStyle = "green"
        context.font = " 4px gamefont"
        context.fillText("You reached "+ points +" points",  canvas.width/ 2, canvas.height/ 2) 
        context.fillText("Press SPACE to play again",  canvas.width/ 2, (canvas.height/ 2) -20) 
    }
}

function calc_score(frames){
    
    let temp = frames / 16 
    
    return temp.toFixed(2)
    
}

let update = function (){
    
    let points = calc_score(frames)
    context.clearRect(0, 0 , canvas.width, canvas.height)
    background()
    
    if(game_running){
        ob_array.forEach((element => element.draw_obstacle()))
        ob_array.forEach((element => element.move_obstacle()))
        if(ob_array.length < 10){
            ob_array[ob_array.length] = new Obstacle((canvas.width ), (canvas.height)) 
        }
        
        player.draw_player()
        draw_score(points)
        
        if(player in ob_array[0]){
            game_running = false
        }
        
        frames++             
    }else{
        draw_startscreen(points)
    }
   
}

function playerInput(event){

    if(event.code === "KeyA" || event.code === "ArrowLeft"){
        player.playerMovement("left")
    }else if(event.code === "KeyD" || event.code === "ArrowRight"){
        player.playerMovement("right")
    }
    if(game_running === false){
        
        if(event.code === "Space"){
            game_running = true 
            if(first_game){
                first_game = false
            }
        }
    }if(event.code ==="Escape"){
        game_running = false
    }
}

addEventListener("keydown", playerInput)
setInterval(update, 16) // nearly 60 Fps

// create Objects
    let frames = 0 
    let first_game = true
    let game_running = false
    let player = new Player(canvas.width / 2, canvas.height / 2)
    let ob_array = []
    for(let i = 0; i < 1; i++){
        ob_array[i] = new Obstacle(canvas.width/2, canvas.height/2)
    }

})
