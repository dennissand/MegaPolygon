let f = new FontFace("gamefont", "url(res/ABSTRACT.TTF)")
const canvas = document.getElementById("MegaPolygon")
let context = canvas.getContext("2d")
let test = 0.01
f.load().then(function () {

  let particlesArray = [];
  generateParticles(25000);
  setSize();
  anim();
  
  addEventListener("keypress", logKey)
  
  function logKey(e){
    if(e.code === "Enter"){
      game()
    }else if(e.code === "KeyW"){
        test = test + 1
    }
    return test
  }
  
  function generateParticles(amount) {
    for (let i = 0; i < amount; i++) {
      particlesArray[i] = new Particle(
          innerWidth,
          innerHeight,
          (amount/55) -i,
          set_color(i),
          set_rotate_speed(i),
          i
      );
    }
  }

  function set_color(index){
      
      let color = ""
      
      if(index%2===0){
           color = "#00ff00"
      }else{
           color = "#ffffff"
      }
      return color
  }
  
  function set_rotate_speed(index) {
    //2.52 Erzeugt unter den richtigen umständen ein Pentagram 
    let value = test + (index /2500)
      if(index % 2===0){
        value = value *-1
    }
      
    return value
  }
  
  function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
  }

  function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed, index) {
    this.x = x;
    this.y = y;
    this.particleTrailWidth = particleTrailWidth;
    this.strokeColor = strokeColor;
    this.theta = Math.PI * 2;
    this.rotateSpeed = rotateSpeed;
    this.t = (index+1) * 10;

    this.rotate = () => {
      const ls = {
        x: this.x,
        y: this.y,
      };
      this.theta += this.rotateSpeed;
      this.x =canvas.width/2 + Math.cos(this.theta) * this.t;
      this.y = canvas.height/2 + Math.sin(this.theta) * this.t;
      context.beginPath();
      context.lineWidth = this.particleTrailWidth;
      context.strokeStyle = this.strokeColor;
      context.moveTo(ls.x, ls.y);
      context.lineTo(this.x, this.y);
      context.stroke();
    };
  }

  function anim() {

      requestAnimationFrame(anim);

      context.fillStyle = "rgba(0,0,0,2)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((particle) => particle.rotate());
      context.fillStyle = "black"
      context.fillRect(0, 0, canvas.width, canvas.height/5)
      context.fillRect(0, canvas.height, canvas.width, -canvas.height/5 )
      
      context.textAlign = "center"
      context.strokeStyle = "white"

      context.strokeRect(canvas.width/2 - 303,(canvas.height/1.1) -55 , 600, 80)
      
      context.fillStyle = "white"
      context.font = "15px gamefont"

      context.fillText("ABSURDEM TIEFER", canvas.width / 2, 30)
      context.font = "10px gamefont"

      context.fillText("presents", canvas.width / 2, 70)
      context.font = "20px gamefont"

      context.fillText("Press Enter", canvas.width / 2,  canvas.height / 1.1)
      let grd = context.createLinearGradient(10, 0, 0, 200);
      grd.addColorStop(0, "#E931FF");
      grd.addColorStop(1, "black");
      context.fillStyle = grd
      context.font = "50px gamefont"
      context.fillText("Mega Polygon", (canvas.width / 2), canvas.height / 6)
      context.strokeText("Mega Polygon", canvas.width/2, canvas.height/6)
  }
  
  function game(){
    
    alert("Game Start")
    
  }
  
})