var app = {

    arrow : 'null',
    columns: 7, // vous pouvez faire varier le nombre de colonnes
    rows: 4, // vous pouvez faire varier le nombres de lignes
    

  init: function() {
    console.log('init');

    
    app.drawBoard();

    document.getElementById('launchScript').addEventListener("click", app.handleLaunchScriptButton);

  },


  moveForward: function() {

    var actualDirection = app.arrow;

    if(actualDirection == 'cellCurrent-top'){ // nouvelle manière d'enlever la direction de la classe
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-top');
    }
    else if (actualDirection == 'cellCurrent-right'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-right');
    }
    else if (actualDirection == 'cellCurrent-bottom'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-bottom');
    }
    else if (actualDirection == 'cellCurrent-left'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-left');
    }

    var actualPosition = document.querySelector('.cellCurrent').id; // je récupère la valeur de mon id de placement dans la grille

    var removeCurrent = document.querySelector('.cellCurrent'); 
    removeCurrent.classList.remove('cellCurrent'); // j'enlève le curseur de sa position actuelle en vue du déplacement
    
    var splitPosition = actualPosition.split('-'); 
    PositionX = splitPosition[0];
    PositionY = splitPosition[1]; // je découpe mon id pour récuperer une position en X et une en Y

    
    var temporaryX = PositionX; // je stocke la position de cellCurrent en axe X dans la variable temporaryX
    var temporaryY = PositionY; // je stocke la position de cellCurrent en axe Y dans la variable temporaryY


    if(actualDirection == "cellCurrent-right"){ // je teste la direction de mon curseur placé dans la variable arrow et en fonction du cas j'incrémente ma variable dans une direction ou une autre
      temporaryY++;
      
    }
    else if (actualDirection == "cellCurrent-left"){
      temporaryY--;
      
    }
    else if (actualDirection == "cellCurrent-top"){
      temporaryX--;
      
    }
    else if (actualDirection == "cellCurrent-bottom"){
      temporaryX++;
      
    }

    if(temporaryY < 1 || temporaryY > app.columns){
      window.alert("vous êtes sortis de la grille")
      app.reset();
    }
    else if(temporaryX < 1 || temporaryX > app.rows){
      window.alert("vous êtes sortis de la grille")
      app.reset();
    }
    else {
      var gps = "'" + temporaryX + "-" + temporaryY + "'"; // je concatène mes deux donnés d'axes X et Y pour l'utiliser sur mon querySelector
  
      var newPosition = document.querySelector("[id=" + gps + "]"); // je cherche l'id correspondant à ma nouvelle position
      newPosition.className += " cellCurrent"; // je lui ajoute la classe cellCurrent pour lui coller le curseur flèche
      newPosition.className += " " + actualDirection;
    
    }
  },


  turnRight: function() {

    var changeDir = app.arrow; // je crée une variable pour stocker ma direction

    if(changeDir == 'cellCurrent-top'){ // nouvelle manière d'enlever la direction de la classe
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-top');
    }
    else if (changeDir == 'cellCurrent-right'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-right');
    }
    else if (changeDir == 'cellCurrent-bottom'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-bottom');
    }
    else if (changeDir == 'cellCurrent-left'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-left');
    }

    if(changeDir == "cellCurrent-top"){ // je teste la direction de mon curseur placé dans la variable arrow et en fonction du cas je change le contenu de ma variable app.arrow
      
      var newDir = "cellCurrent-right";
    }
    else if (changeDir == "cellCurrent-right"){

      var newDir = "cellCurrent-bottom";
    }
    else if (changeDir == "cellCurrent-bottom"){

      var newDir = "cellCurrent-left";
    }
    else if (changeDir == "cellCurrent-left"){

      var newDir = "cellCurrent-top";
    }

    app.arrow = newDir; // je mets ma nouvelle orientation dans ma direction arrow

    
    var turning = document.querySelector('.cellCurrent'); // je selectionne mon élément qui contient mon curseur
  
    turning.className += " " + newDir; //et je lui rajoute la classe qui gère sa direction

  },


  turnLeft: function() {

    var changeDir = app.arrow; // je crée une variable pour stocker ma direction
    
    if(changeDir == 'cellCurrent-top'){ // nouvelle manière d'enlever la direction de la classe
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-top');
    }
    else if (changeDir == 'cellCurrent-right'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-right');
    }
    else if (changeDir == 'cellCurrent-bottom'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-bottom');
    }
    else if (changeDir == 'cellCurrent-left'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-left');
    }

    if(changeDir == "cellCurrent-top"){ // je teste la direction de mon curseur placé dans la variable arrow et en fonction du cas je change le contenu de ma variable app.arrow
      
      var newDir = "cellCurrent-left";
    }
    else if (changeDir == "cellCurrent-left"){

      var newDir = "cellCurrent-bottom";
    }
    else if (changeDir == "cellCurrent-bottom"){

      var newDir = "cellCurrent-right";
    }
    else if (changeDir == "cellCurrent-right"){

      var newDir = "cellCurrent-top";
    }

    app.arrow = newDir; // je mets ma nouvelle orientation dans ma direction arrow

    
    var turning = document.querySelector('.cellCurrent'); // je selectionne mon élément qui contient mon curseur
    turning.className += " " + newDir; //et je lui rajoute la classe qui gère sa direction

  },


  drawBoard: function() {


      var columns = app.columns;
      var rows = app.rows;

      var board = document.getElementById('board'); // je selectionne ma div board

      for(var i = 1; i <= rows; i++) { // je crée une ligne tant que le nombre de ligne est inférieur à rows

            var row = document.createElement("div"); // je crée un élément div
                row.className = "cellRow"; // je lui donne une classe cellRow
                row.id = "row" + i; // je lui donne un id row + le numéro de ligne

        for(var j = 1; j <= columns; j++){

            var col = document.createElement("div"); // je crée un element div
                col.className = "cell"; // je lui donne une class cell
                col.id = i + '-' + j; // j'ajoute un id special à chaque div pour permettre une selection de la mort qui tue qui m'épargnera de nombreux effort par la suite
                row.appendChild(col); //j'ajoute mes colonne à la ligne en cours
        }
        board.appendChild(row); //j'ajoute chaque ligne (avec ses colonnes) à mon element board
      }
      document.getElementById("board").innerHTML = board.innerHTML; // j'ajoute l'élément fraichement créé au Dom dans la div qui a l'ID board

      randomStartX = Math.floor(Math.random() * rows) + 1; // je crée une valeur random X pour la case de début
      randomStartY = Math.floor(Math.random() * columns) + 1  // je crée une valeur random y pour la case de début
      var startPosition = "'" + randomStartX + "-" + randomStartY + "'"; // j'assemble les deux valeurs random pour avoir mes coordonnées de case de début

      randomEndX = Math.floor(Math.random() * rows) + 1;  // je crée une valeur random X pour la case de fin
      randomEndY = Math.floor(Math.random() * columns) + 1;  // je crée une valeur random Y pour la case de fin
      var endPosition = "'" + randomEndX + "-" + randomEndY + "'";  // j'assemble les deux valeurs random pour avoir mes coordonnées de case de début

      document.querySelector("[id=" + startPosition + "]").className += " cellStart"; // placement de la case depart en ajoutant une classe à la position déterminé de manière random
      document.querySelector("[id=" + endPosition + "]").className += " cellEnd"; // placement de la case end en ajoutant une classe à la position déterminé de manière random
      document.querySelector("[id=" + startPosition + "]").className += " cellCurrent"; // placement du curseur sur les même coordonées que la case de départ
      app.arrow = 'cellCurrent-right'; // orientation de départ du curseur

  },


  handleLaunchScriptButton: function() {
    console.log('prout t\'a appuyé sur le bouton');

    var textarea = document.getElementById('userCode').value; // récupération de la valeur du textarea

    var codeLines = textarea.split("\n"); // j'indexe les valeurs en prenant pour référence le saut de ligne pour créer mon tableau

    window.setTimeout(function() {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },

  codeLineLoop: function(codeLines, index) {
    
    var currentLine = codeLines[index]; 

    
      if(currentLine === 'turn right'){ // je teste les lignes et si une corespondance est trouvé j'appelle la fonction éponyme...
        app.turnRight();
      }
      else if(currentLine === 'turn left'){
        app.turnLeft();
      }
      else if(currentLine === 'move forward') {
        app.moveForward();
      }
      else {
        window.alert("instruction incorrecte"); // ...ou je renvoie une erreur dans une window.alert en arrêtant la boucle

        app.reset();
      }
    

    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function() {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function() {
        app.checkSuccess();
      }, 1000);
    }
  },


  checkSuccess: function() {
    var checkEnd = document.querySelector('.cellEnd').id; // je récupère la position de ma case de fin via son id
    console.log(checkEnd);

    var position = document.querySelector('.cellCurrent').id; // je récupère la position de mon curseur en regardant et récupérant l'id de la case sur laquelle il se trouve
    console.log(position);

    
    if(checkEnd === position){  // si les deux positions sont les même, ça veut dire que...
      return window.alert("you wiiiiin!") // ..tu as gagné mon gars
    }
    else { // sinon ça veut dire que...
      window.alert("you loooose! let's try again!") //...tu as perdu!
      app.reset();
    }

    console.log(checkEnd);
  },

  reset: function() {

    var resetDir = app.arrow; // je crée une variable pour stocker ma direction
    
    if(resetDir == 'cellCurrent-top'){ // nouvelle manière d'enlever la direction de la classe
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-top');
    }
    else if (resetDir == 'cellCurrent-right'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-right');
    }
    else if (resetDir == 'cellCurrent-bottom'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-bottom');
    }
    else if (resetDir == 'cellCurrent-left'){
      document.querySelector('.cellCurrent').classList.remove('cellCurrent-left');
    }

    document.querySelector('.cellCurrent').classList.remove('cellCurrent'); // reset de la position actuelle

    document.querySelector('.cellStart').className += ' cellCurrent'; // replacement du curseur sur la position de départ

    app.arrow = 'cellCurrent-right'; // orientation de départ du curseur
    document.getElementById('launchScript').addEventListener("click", app.handleLaunchScriptButton); // écoute du bouton c'est parti
    
  }
};

document.addEventListener('DOMContentLoaded', app.init);
