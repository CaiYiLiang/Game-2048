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
		top:getTop(x),
		left:getLeft(y)
		}, 80);
}

//indeed, even only one grid which is movable can return true
function canMoveLeft(board){
	for(var x=0;x<4;x++){
		for(var y = 1;y<4;y++){
			if(board[x][y-1]==0||board[x][y-1]==board[x][y])
			return true;
		}
	}
	
	return false;
}

function moveLeft(){
	//To confirm whether the gird can be moved towards left
	if(!canMoveLeft())	
	   return false;
	//To move left 
	
}


