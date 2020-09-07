//Create variables here
var database;
var dog;
var normalDog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  normalDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,250,20,20);
  dog.addImage("normal",normalDog);
  dog.scale = 0.3;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() { 
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  // else{
  //   dog.addImage(normalDog);
  // }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke("black");
  
  text("Food Remaining : "+ foodS, 200,100)

}

function fetchFood(){
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(Food){
  if(Food<=0){
    Food=0;
  }
  else{
    Food = Food - 1; 
  }

  database.ref('/').update({
    food : Food
  })

}



