var board = new Array(); //This is for storing 4*4 digits on the board
var score = 0; //create an vaiable and initial the value as 0

var emptyGridPos = new Array();
var action = 0;
var start_x = 0;
var start_y = 0;
var end_x = 0;
var end_y = 0;

$(document).ready(function() {
	newGame();		
	
	$("#new_game").click(function(){
		newGame();		
	});
	
	$(document).keydown(function(event){
		girdMove(event);
	})
});

function newGame() {
	//initial the game
	init();
	//generate random digits on the board
	generateOneNumber();
	generateOneNumber();
}

function init(){
	//init the gameboard and show the background-color without digits
	for(var x=0; x<4;x++){
		for(var y =0;y<4;y++){
			var gridCell = $("#grid-cell-"+x+"-"+y);
			gridCell.css("top", getTop(x));
	        gridCell.css("left", getLeft(y));
		}
	}
	
	for(var i=0; i<4;i++){
		board[i]=new Array();
		for(var j =0;j<4;j++){
			board[i][j] = 0;	
		}
	}
	
	updateBoardView();
	
	score=0;
}


function updateBoardView(){
	 $(".number-cell").remove();
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var numberCell = $("#number-cell-"+i+"-"+j);

            if( board[i][j] == 0 ){
                numberCell.css("width","0px");
                numberCell.css("height","0px");
                numberCell.css("top",getTop(i,j) + 50);
                numberCell.css("left",getLeft(i,j) + 50);
            }
            else{
                numberCell.css("width","100px");
                numberCell.css("height","100px");
                numberCell.css("top",getTop(i));
                numberCell.css("left",getLeft(j));
                numberCell.css("background-color",getNumberBackgroundColor( board[i][j] ) );
                numberCell.css("color",getNumberColor( board[i][j] ) );
                numberCell.text( board[i][j] );
            }

	}
}

function generateOneNumber(){
	 //To judge whether can add new number
	 if (noSpace(board))
	     return false;
	 
	 //pick a ramdom position
	 getEmptyGrid();
	 var rand_x = emptyGridPos[0];
	 var rand_y = emptyGridPos[1];
	 
	 //generate a ramdom number
	 var randomNum = Math.random()<0.5 ? 2:4;
	 board[rand_x][rand_y]=randomNum;
	 
	 showRandomNum(rand_x,rand_y,randomNum);
	 return true;
}


function girdMove(event){
	switch(event.keyCode){
		case 37 : //Key Left
			if (moveLeft()){
				setTimeout("generateOneNumber();", 250);
				setTimeout("gameStatus();", 300);	
			}
			break;
			
	   	case 38 : //Key Up
			if (moveUp()){
				setTimeout("generateOneNumber();", 250);
				setTimeout("gameStatus();", 300);	
			}
			break;
			
		case 39 : //Key right
			if (moveRight()){
				setTimeout("generateOneNumber();", 250);
				setTimeout("gameStatus();", 300);	
			}
			break;
		
		case 40 : //Key Down
			if (moveDown()){
				setTimeout("generateOneNumber();", 250);
				setTimeout("gameStatus();", 300);	
			}
			break;
			
		default:
		   break;
	}
}

function moveLeft() {
	//To confirm whether the gird can be moved towards left
	if(!canMoveLeft())
		return false;
	//To move left 

	for(var x = 0; x < 4; x++) {
		for(var y = 1; y < 4; y++) {
			if(board[x][y] != 0) {

				for(var k = 0; k < y; k++) {
					if(board[x][k] == 0 && noLeftBlock(x, y, k, board)) {
						//move
						moveHorizontalAnimate(x, y, k);
						board[x][k] = board[x][y];
						board[x][y] = 0;
						continue;
					}

					if(board[x][k] == board[x][y] && noLeftBlock(x, y, k, board)) {
						//move
						moveHorizontalAnimate(x, y, k);
						board[x][y] = 0;

						//add
						board[x][k] *= 2;
						
						//update score
						score+=board[x][k];
						updateScore(score);
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView();", 200);
	return true;
}

function moveRight(){
	//console.log("KeyRight");
	if(!canMoveRight())	
		return false;
	

    console.log("noRightBlock ");
	for(var x =0; x<4;x++){
		for(var y =2 ; y>=0; y--){
			if(board[x][y]!=0){
				
				for(var k =3;k>y;k--){
					if( board[x][k]==0 && noRightBlock(x,y,k,board) ){
						moveHorizontalAnimate(x,y,k);
						board[x][k]=board[x][y];
						board[x][y]=0;
						continue;
					}
					
					if( board[x][k]==board[x][y] && noRightBlock(x,y,k,board)){
						//move
						moveHorizontalAnimate(x,y,k);
						board[x][y]=0;
                        
						//add
						board[x][k]*=2;
						
						//update score
						score+=board[x][k];
						updateScore(score);
						continue;	
					}
				}
			}
		}
	}
	
	 setTimeout("updateBoardView();",200);
	 return true;
}

function moveUp() {
	//To confirm whether the gird can be moved towards up
	if(!canMoveUp())
		return false;
	//To move left 

	for(var x = 1; x < 4; x++) {
		for(var y = 0; y < 4; y++) {
			if(board[x][y] != 0) {

				for(var k = 0; k < x; k++) {
					if(board[k][y] == 0 && noUpBlock(x, y, k, board)) {
						//move
						moveVerticalAnimate(x, y, k);
						board[k][y] = board[x][y];
						board[x][y] = 0;
						continue;
					}

					if(board[k][y] == board[x][y] && noUpBlock(x, y, k, board)) {
						//move
						moveVerticalAnimate(x, y, k);
						//add
						board[x][y] = 0;
						board[k][y] *= 2;
						
						//update score
						score+=board[k][y];
						updateScore(score);
						continue;
					}
				}
			}

		}
	}

	setTimeout("updateBoardView();", 200);
	return true;
}

function moveDown() {
	//console.log("down");
	//To confirm whether the gird can be moved towards up
	if(!canMoveDown())
		return false;
	//To move down
	//console.log("To move down");
	for(var x = 2; x >= 0; x--) {
		for(var y = 0; y < 4; y++) {
			if(board[x][y] != 0) {

				for(var k = 3; k > x; k--) {
					if(board[k][y] == 0 && noDownBlock(x, y, k, board)) {
						//move
						moveVerticalAnimate(x, y, k);
						board[k][y] = board[x][y];
						board[x][y] = 0;
						continue;
					}

					if(board[k][y] == board[x][y] && noDownBlock(x, y, k, board)) {
						//move
						moveVerticalAnimate(x, y, k);
						//add
						board[x][y] = 0;
						board[k][y] *= 2;
						//update score
						score+=board[k][y];
						updateScore(score);
						continue;
					}
				}
			}

		}
	}

	setTimeout("updateBoardView();", 200);
	return true;
}



function gameStatus(){
	      if(canMoveLeft()|| canMoveRight()|| canMoveDown()|| canMoveUp())
	         return true;
	      else
	      alert("Game over!");
}


