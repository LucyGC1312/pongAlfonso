
 
 var computerScore = 0;
 var playerScore = 0;
 var gameState = "servir";
 var sonido;
 var userPaddle, computerPaddle, ball;
function preload(){
  //sonido=loadSound("./hit.mp3");
}

function setup(){
 //configura los sprites de Borde
 edges = createEdgeSprites();
  

 //crea un sprite para la barra del usuario
 userPaddle = createSprite(390,200,10,70);
 
 //crea un sprite para la barra de la computadora 
  computerPaddle = createSprite(10,200,10,70);
 
 //create the pong ball
 ball = createSprite(200,200,12,12);
}

 function draw() {
   //llena la pantalla de la computadora con color blanco
   background("white");
   
   //muestra el Puntaje
   text(computerScore,170,20);
   text(playerScore, 230,20);
   
   //dibuja líneas punteadas
   for (var i = 0; i < 400; i+=20) {
      line(200,i,200,i+10);
   }
   
   if (gameState === "servir") {
     text("Presiona la Barra Espaciadora para Servir",150,180);
   } 
   
   if (gameState === "over") {
     text("!Perdiste!",170,160);
     text("Presiona 'R' para Reiniciar",150,180);
   }
   
   if (keyDown("r")) {
     gameState = "servir";
     computerScore = 0;
     playerScore = 0;
   }
   
   
   //da velocidad a la pelota cuando el jugador presione Jugar
   //asigna velocidad aleatoria más tarde por diversión
   if (keyDown("space") && gameState == "servir") {
     ball.velocityX = 5;
     ball.velocityY = 5;
     gameState = "jugar";
   }
   
   //haz que el userPaddle (la barra del jugador) se mueva con el ratón
   userPaddle.y = mouseY;
   
   
   
   //haz que la pelota rebote en la barra del jugador
   if(ball.isTouching(userPaddle)){
   //  sonido.play();
     ball.x = ball.x - 5;
     ball.velocityX = -ball.velocityX;
   }
   
   //haz que la pelota rebote en la barra de la computadora
   if(ball.isTouching(computerPaddle)){
  //  sonido.play();
     ball.x = ball.x + 5;
     ball.velocityX = -ball.velocityX;
   }
   
   //coloca la pelota de nuevo en el centro si cruza la pantalla
   if(ball.x > 400 || ball.x < 0){
  //  sonido.play();
     
     if (ball.x < 0) {
       playerScore++;
     }
     else {
       computerScore++;
     }
       
     ball.x = 200;
     ball.y = 200;
     ball.velocityX = 0;
     ball.velocityY = 0;
     gameState = "servir";
     
     if (computerScore=== 5 || playerScore === 5){
       gameState = "over";
     }
   }
   
   //haz que la pelota rebote en las paredes de arriba y abajo
   if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
     ball.bounceOff(edges[2]);
     ball.bounceOff(edges[3]);
   //  sonido.play();
   }
   
   //agrega Inteligencia Artifical a la barra de la computadora para que siempre le pegue a la pelota
   computerPaddle.y = ball.y;
   drawSprites();
 }