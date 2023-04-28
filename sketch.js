//CHANGE THE IMG AND THATS IT,DO NOT OVER COMLECATE IT

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var cat, catImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  catImg = loadImage("download.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();

  cat=createSprite(300,300)
  cat.addImage("cat",catImg);
  cat.scale=0.5;
}

function draw() {
  background(200);
  
  
if(gameState=="play"){
  
  if(tower.y > 400){
    tower.y = 300
  }

  if(keyDown("left_arrow")){

      cat.x=cat.x-3;
  }

  if(keyDown("right_arrow")){

    cat.x=cat.x+3;
}

if(keyDown("space")){

  cat.velocityY=-10
}
cat.velocityY=cat.velocityY+0.8

spawnDoors()

if(climbersGroup.isTouching(cat)){
  cat.velocityY=0;
}
if(invisibleBlockGroup.isTouching(cat)||cat.y>600){
  cat.destroy();
  gameState="end"

}
drawSprites()
}

if(gameState=="end"){
  fill("#c4d9bc");
  textSize(30) 
  text("GAME OVER",230,250);

}

   
}

function spawnDoors(){
  if(frameCount%240==0){
    
    var door=createSprite(200,-50);
    var climber=createSprite(200,10);
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;

    door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisibleBlock.x=door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;

    cat.depth=door.depth;
    cat.depth+=1;

    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.liftime=800;

    doorsGroup.add(door);
    invisibleBlock.debug=true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock)


  }
}