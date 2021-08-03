var PLAY = 1, END = 0, gameState = PLAY,  trex, trex_running, ground, groundImage, invground, score, trex_collided, gameOver
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  
  
}
function setup() {
  createCanvas(600, 200);
  //trex sprites
  trex = createSprite(50, 160, 20, 50)
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  
  //adding position and scale of t rex
  trex.scale = 0.5;
  trex.x = 50;
  
  gameOver = createSprite(300,100)
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140)
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5; 
                        
  
  //creating ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2;
  score = 0;
  
  //creating invicible ground
  invground = createSprite(200,190,400,10);
  invground.visible = false;
  var rand = Math.round(random(1,100))
  
  
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  trex.setCollider("circle",0,0,40);
//trex.debug = true;
}







function draw() {
  background(180);
  text("Score: "+score, 500, 50);
  
 
  
  if(gameState === PLAY){
    
     ground.velocityX = -(5 + 3*score/1000);
    
     score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%1000 == 0){
      checkPointSound.play();
    }
    
    gameOver.visible = false;
    restart.visible = false;
     
    if(ground.x<0){
  ground.x = ground.width/2;
    }
      if(keyDown("space")&& trex.y >= 150){
    trex.velocityY = - 10;
        jumpSound.play();
       
      }
    spawnclouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      trex.velocityY = -10;
      
      gameState = END;
      dieSound.play();
    }
      
  }
  else if(gameState === END){
    
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    trex.velocityY = 0;
    
    gameOver.visible = true;
    restart.visible = true;
    
    obstaclesGroup.setLifetimeEach(-1);
    
    cloudsGroup.setLifetimeEach(-1);
    
    ground.velocityX = 0;
    
    trex.changeAnimation("collided", trex_collided);
    
  }
   
  
  
  
  
  
  
  trex.velocityY = trex.velocityY + 0.5; 
  trex.collide(invground)
  
  //spawning of clouds
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  
  

  
  
  
  
  drawSprites();
}                
  
 function reset(){
   gameState = PLAY;
   
   gameOver.visible = false;
   restart.visible = false;
   
   obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();
   trex.changeAnimation("running", trex_running);
   score = 0;
 }

function spawnclouds(){
  if(frameCount % 120==0){
    
  cloud=createSprite(600,100,40,10);
  cloud.addImage(cloudImage);
  cloud.y = Math.round(random(10,60));
  cloud.scale = 0.5;
  cloud.velocityX = -3;
    
  cloud.lifetime = 210;
    
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1
    
    
    
    cloudsGroup.add(cloud);
    
    

}
  }
function spawnObstacles(){
  if(frameCount % 100 == 0){
    var obstacle = createSprite(600, 165, 10, 40)
    obstacle.velocityX = -(5 + score/1000);
    var rand = Math.round(random(1,6));
    switch(rand){
     case 1: obstacle.addImage(obstacle1);
        break;
     case 2: obstacle.addImage(obstacle2);
        break;
     case 3: obstacle.addImage(obstacle3);
        break;
     case 4: obstacle.addImage(obstacle4);
        break;
     case 5: obstacle.addImage(obstacle5);
        break;
     case 6: obstacle.addImage(obstacle6);
        break;
     default: break;
     
    }
    
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}
