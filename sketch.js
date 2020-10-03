var PLAY=1
var END=0
var gameState=PLAY

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var ground, restart, restartImage
var FoodGroup, obstacleGroup
var time=0,score=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  restartImage=loadImage("restart.png");
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(120,250,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.15;
  
  restart=createSprite(200,200,20,20);
  restart.addImage("restart_button",restartImage);
  restart.scale=0.4;

  ground= createSprite(200,295,500,2);
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
}


function draw() {
  background("white");
  
  //making score and time alive
  textSize(20);
  fill("black");
  text("Time: "+time,160,50);  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+1
  }
  text("Score: "+score,160,70);
  
  
  if(gameState==PLAY){
    restart.visible=false
    
    //making the gravity effect
    monkey.velocityY=monkey.velocityY+0.4
    if(keyDown("space")&&monkey.collide(ground)){
      monkey.velocityY=-9;
     }

    //adding time
    if(frameCount%30===0){
    time=time+1
       }    
    if(monkey.collide(obstacleGroup)){
      gameState=END
       }    
     }
  
  else if(gameState==END){
     restart.visible=true
     restart.setCollider("circle",0,0,100);
    
     //making the bananas and rocks last forever
     FoodGroup.setLifetimeEach(-1);
     obstacleGroup.setLifetimeEach(-1);
    
     //making the rocks, bananas, and monkey stop
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);   
     monkey.velocityX=0;
    
     //adding the restart button
     if(mousePressedOver(restart)){
       reset();
        }
     }
  
  //stopping the monkey from falling through the ground
  monkey.collide(ground);
  
  food();
  obstacles();
  drawSprites();
  
}
function reset(){
  gameState=PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  score=0;
  time=1;
}
function food(){
  if(frameCount % 80===0){
    banana=createSprite(450,Math.round(random(120,200)),20,20);
    banana.addImage("banana", bananaImage);
    banana.scale=0.1
    banana.velocityX=-7
    
    banana.lifetime=100
    
    FoodGroup.add(banana);
}
}

function obstacles(){
  if(frameCount % 300===0){
    obstacle=createSprite(450,270,20,20);
    obstacle.addImage("obstacleImage", obstaceImage);
    obstacle.scale=0.15
    obstacle.velocityX=-7
    
    obstacle.lifetime=100
    
    obstacleGroup.add(obstacle);
}
}






