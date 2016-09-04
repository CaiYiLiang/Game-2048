function getTop(x) {
	return 20 + 120 * x;
}

function getLeft(y) {
	return 20 + 120 * y;
}

//the background color for specific digit
function getNumberBackgroundColor(number) {
	switch(number) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
	}

	return "black";
}

//the color attribute for specific digit
function getNumberColor(number) {
	if(number <= 4)
		return "#776e65";

	return "white";
}

function noSpace(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] == 0)
				return false; //there is an empty grid
		}
	}
	return true; //there is no empty grid
}

function getEmptyGrid() {
	var emptyGrid = new Array();
	var z = 0;
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] == 0) {
				emptyGrid[z] = new Array();
				emptyGrid[z][0] = i;
				emptyGrid[z][1] = j;
				z++;
			}

		}
	}
	var randomIndex = parseInt(Math.floor(Math.random() * emptyGrid.length));
	//var randomPos = new Array();
	emptyGridPos[0] = emptyGrid[randomIndex][0];
	emptyGridPos[1] = emptyGrid[randomIndex][1];
	//return randomPos;
}

function showRandomNum(x, y, num) {
	var numberCell = $("#number-cell-" + x + "-" + y);

	numberCell.css("background-color", getNumberBackgroundColor(num));
	numberCell.css("color", getNumberColor(num));
	numberCell.text(num);

	numberCell.animate({
		//the initial witdth/height is 0px
		width: "100px",
		height: "100px",
		top: getTop(x),
		left: getLeft(y)
	}, 150);
}

function moveHorizontalAnimate(x, y, k) {
	var oldNumberCell = $("#number-cell-" + x + "-" + y);
	oldNumberCell.animate({
		top: getTop(x),
		left: getLeft(k)
	}, 200)

}

function moveVerticalAnimate(x, y, k) {
	var oldNumberCell = $("#number-cell-" + x + "-" + y);
	oldNumberCell.animate({
		top: getTop(k),
		left: getLeft(y)
	}, 200)

}

//indeed, even only one grid which is movable can return true
function canMoveLeft(board) {
	for(var x = 0; x < 4; x++) {
		for(var y = 1; y < 4; y++) {
			if(board[x][y] != 0) {
				if(board[x][y - 1] == 0 || board[x][y - 1] == board[x][y])
					return true;
			}

		}
	}

	return false;
}

function noLeftBlock(x, y, k, board) {
	for(var z = k + 1; z < y; z++) {
		if(board[x][k] != 0)
			return false;
	}
	return true;
}

function moveLeft() {
	//To confirm whether the gird can be moved towards left
	if(!canMoveLeft(board))
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
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView();", 200);
	return true;
}

function noRightBlock(x,y,k,board){
	console.log("noRightBlockjudege");
	for(var z=y+1;z<k;z++){
		if(board[x][z]!=0)
			return false;
	}
	return true;
}



function canMoveRight(board) {
	console.log("canMoveRight??");
	for(var x = 0; x < 4; x++) {
		for(var y = 0; y < 3; y++) {
			if(board[x][y] != 0) {
				if(board[x][y + 1] == 0 || board[x][y + 1] == board[x][y])
					console.log("can move right !!");
				return true;
			}

		}
	}

	return false;
}

function moveRight(){
	console.log("KeyRight");
	if(!canMoveRight(board))	{
		return false;
	}

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
						continue;	
					}
				}
			}
		}
	}
	
	 setTimeout("updateBoardView();",200);
	 return true;
}
function noRightBlock(row, col1, col2, board) {
	for(var i = col1 + 1; i < col2; i++) {
		if(board[row][i] != 0)
			return false;
	}
	return true;
}


function canMoveUp(board) {
	for(var x = 1; x < 4; x++) {
		for(var y = 0; y < 4; y++) {
			if(board[x][y] != 0) {
				if(board[x - 1][y] == 0 || board[x - 1][y] == board[x][y])
					return true;
			}
		}
	}
	return false;
}

function canMoveDown(board) {
	for(var x = 0; x < 3; x++) {
		for(var y = 0; y < 4; y++) {
			if(board[x][y] != 0) {
				if(board[x + 1][y] == 0 || board[x + 1][y] == board[x][y])
					return true;
			}
		}
	}
	return false;
}

function noUpBlock(x, y, k, board) {
	if(k != 0) {
		for(var z = k - 1; z > k; z--) {
			if(board[z][y] != 0)
				return false;
		}
	}
	return true;
}

function noDownBlock(x, y, k, board) {
	for(var z = k - 1; z > x; z--) {
		if(board[z][y] != 0)
			return false;
	}
	return true;
}

function moveUp() {
	//To confirm whether the gird can be moved towards up
	if(!canMoveUp(board))
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
	if(!canMoveDown(board))
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
						continue;
					}
				}
			}

		}
	}

	setTimeout("updateBoardView();", 200);
	return true;
}

function gameStatus() {

}