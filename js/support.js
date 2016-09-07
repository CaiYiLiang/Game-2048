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
				console.log("noSpace=false");
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
	
	var amount =emptyGrid.length;
	if(amount != 0){
	   var randomIndex = parseInt(Math.floor(Math.random() * emptyGrid.length));
	   //var randomPos = new Array();
	   emptyGridPos[0] = emptyGrid[randomIndex][0];
	  emptyGridPos[1] = emptyGrid[randomIndex][1];
	  //return randomPos;
	}
	
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
	}, 300);
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
function canMoveLeft() {
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


function canMoveRight() {
    console.log("canMoveRight??");
	for(var x = 0; x < 4; x++) {
		for(var y = 0; y < 3; y++) {
			if(board[x][y] != 0) {
				if(board[x][y + 1] == 0 || board[x][y + 1] == board[x][y])
					//console.log("can move right !!");
				    return true;
			}

		}
	}
	
    console.log("canMoveRightfalse");
	return false;
}


function canMoveUp() {
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

function canMoveDown() {
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


function noLeftBlock(x, y, k, board) {
	for(var z = k + 1; z < y; z++) {
		if(board[x][k] != 0)
			return false;
	}
	return true;
}


function noRightBlock(x,y, k, board) {
	for(var z = y + 1; z < k; z++) {
		if(board[x][z] != 0)
			return false;
	}
	return true;
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


function updateScore(score){   
	      var scoreNum = $("#score_num");
	      scoreNum.text(score);
	      scoreNum.animate({height:"0px"});
	      scoreNum.animate({height:"20px"},50);
	      
}
