var board = new Array(); //This is for storing 4*4 digits on the board
var score = 0; //create an vaiable and initial the value as 0

var start_x = 0;
var start_y = 0;
var end_x = 0;
var end_y = 0;

$(document).ready(function() {
	newGame();
});

function newGame() {
	//initial the game
	init();
	//generate random digits on the board
	//generateOneNumber();
	//generateOneNumber();
}

function init(){	
	for(var x=0; x<4;x++){
		for(var y =0;y<4;y++){
			var gridCell = $("#grid-cell-"+x+"-"+y);
			gridCell.css("top",getTop(x));
	        gridCell.css("left",getLeft(y));
		}
	}
	
}
