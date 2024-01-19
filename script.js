
document.addEventListener("DOMContentLoaded", () => {
   const gameArena = document.getElementById("game-arena");
   const arenaSize  = 500;
   const cellSize = 20;

   let score = 0;
   let gameStarted = false;
   let food = {x : 300 , y : 200};
   let snake = [{x: 160, y : 200}, {x: 140, y : 200},{x: 120, y : 200} ];
   let dx = cellSize; // displacement on x axis 
   let dy = 0;// displacement on y axis 

   function drawScoreBoard(){
      const scoreBoard = document.getElementById("score-board");
      scoreBoard.textContent = `Score ${score}`;
   }
   function moveFood(){
      let newX, newY;
      do{
         newX = Math.floor(Math.random() * ((arenaSize-cellSize)/ cellSize) * cellSize);
         newY = Math.floor(Math.random() * ((arenaSize-cellSize)/ cellSize) * cellSize)

      }while(snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY));

      food = {x : newX, y: newY};
   }
   function updateSnake(){
      // Just calculate the new coordinates the snake head will go to 
      const newHead = {x : snake[0].x + dx , y : snake[0].y + dy};
      snake.unshift(newHead); // Add the New Head in te front 

      // Colision Case 
      if(newHead.x === food.x && newHead.y === food.y){
         // then Collistion happen 
         score +=5;
         // don't pop the tail 
         moveFood();
         // Move the food 
      }else{
          snake.pop(); // Remove the Last Cell     
      }
   }

   function isGameOver(){
      // if any of the wall is hitted by the snake then the game is over 
      // if snake hit itself to its body , then the game also over 
      
      // Check Snake Body 
      for(let i = 1;i<snake.length;i++){
         if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true; // Yes the game is Over 
         }
      }

      // Check the Wall Collision 
      const isHittingLeftWall = snake[0].x < 0;
      const isHittingTopWall = snake[0].y < 0;
      const isHittingRightWall = snake[0].x >= arenaSize - cellSize;
      const isHittingDownWall = snake[0].y >= arenaSize - cellSize;

      return isHittingDownWall || isHittingTopWall || isHittingLeftWall || isHittingRightWall; // Game is Over 
   }
   function gameLoop(){
      setInterval(()=>{
         if(!gameStarted) return; // to restart the Game 
         // check for Game Over 
         if(isGameOver()){
            gameStarted = false;
            alert(`Game Over , Score = ${score}`);
            document.location.reload();
            // return;
         }
         updateSnake();
         drawScoreBoard();
         drawFoodAndSnake();
      }, 500);
   }

   function drawDiv(x,y,className){
      const div = document.createElement('div');
      div.classList.add(className);
      div.style.top = `${y}px`;
      div.style.left = `${x}px`;
      return div;
   }
   function drawFoodAndSnake(){
      gameArena.innerHTML = '';// If previously something is drawn remove it 
      //wipe out everything and redraw with new coordinates when snake moves

      snake.forEach((snakeCell) =>{
         const element = drawDiv(snakeCell.x, snakeCell.y, 'snake');
         gameArena.appendChild(element);
      })

      const foodElement = drawDiv(food.x, food.y, 'food');
      gameArena.appendChild(foodElement);

      
   }

   function runGame(){
      gameStarted =true;
      gameLoop();
   }


   function initiateGame(){
      const scoreBoard = document.createElement('div');
      scoreBoard.id = 'score-board';
      document.body.insertBefore(scoreBoard, gameArena);

      const startButton = document.createElement('button');
      startButton.textContent = 'Start Game';
      startButton.classList.add('start-button');
      document.body.appendChild(startButton);

      startButton.addEventListener("click" , () => {
            startButton.style.display = 'none';
            runGame();
      });
   }
   
   initiateGame();//  This is the 1st function to be executed so that we prepare the UI

});

// from 35 Minute 
// If we are move in +ve direction then the displacement is +20 and -ve directoin in x axis will be -20 
// when you are vertically moving dx should be 0 and when you are horizontally movin dy will be 0