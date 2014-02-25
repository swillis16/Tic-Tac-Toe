$(window).load(function() {
var x = "x";
var o = "o";
var firstMove;

function PlayerOneMark () {
	return firstMove < 0.5 ? x : o;
}

function CpuMark() {
	return firstMove > 0.5 ? x : o;
}

function checkLine(squareOne, currentSquare, otherSquare) {
	if (otherSquare.innerHTML != "") {
		return false;
	}

	if (squareOne.innerHTML == PlayerOneMark() && currentSquare.innerHTML == PlayerOneMark()) {
		otherSquare.innerHTML = CpuMark();
		return true;
	}
	else if (squareOne.innerHTML == CpuMark() && currentSquare.innerHTML == CpuMark()) {
		otherSquare.innerHTML = CpuMark();
		$(".player1Move").hide();
		$(".win").show();
		return true;
	}
	else {
		return false;
	}
}

function CheckDiagonalWinLoss(rows, chosenRowIndex, chosenSquareIndex) {
	var currentSquare = rows[chosenRowIndex].children[chosenSquareIndex].firstChild;
	var otherSquare;
	var aboveSquare;
	var belowSquare;

	switch(chosenSquareIndex){
		case 0:
			if (chosenRowIndex == 0){
				rightSquare = rows[chosenRowIndex + 1].children[chosenSquareIndex + 1].firstChild;
				otherSquare = rows[chosenRowIndex + 2].children[chosenSquareIndex + 2].firstChild;
				if (checkLine(rightSquare, currentSquare, otherSquare) === true) {
					return true;
				}
			}
			else if (chosenRowIndex == 2) {
				rightSquare = rows[chosenRowIndex - 1].children[chosenSquareIndex + 1].firstChild;
				otherSquare = rows[chosenRowIndex - 2].children[chosenSquareIndex + 2].firstChild;
				if (checkLine(rightSquare, currentSquare, otherSquare) === true) {
					return true;
				}
			}
			break;
		case 2:
			if (chosenRowIndex == 0){
				rightSquare = rows[chosenRowIndex + 1].children[chosenSquareIndex - 1].firstChild;
				otherSquare = rows[chosenRowIndex + 2].children[chosenSquareIndex - 2].firstChild;
				if (checkLine(rightSquare, currentSquare, otherSquare) === true) {
					return true;
				}
			}
			else if (chosenRowIndex == 2) {
				rightSquare = rows[chosenRowIndex - 1].children[chosenSquareIndex - 1].firstChild;
				otherSquare = rows[chosenRowIndex - 2].children[chosenSquareIndex - 2].firstChild;
				if (checkLine(rightSquare, currentSquare, otherSquare) === true) {
					return true;
				}
			}
			break;
	}
	return false;
}

function CheckLeftRightWinLoss(rows, chosenRowIndex, chosenSquareIndex) {
	var currentSquare = rows[chosenRowIndex].children[chosenSquareIndex].firstChild;
	var otherSquare;
	var leftSquare;
	var rightSquare;

	switch(chosenSquareIndex){
		case 0:
			rightSquare = rows[chosenRowIndex].children[chosenSquareIndex + 1].firstChild;
			otherSquare = rows[chosenRowIndex].children[chosenSquareIndex + 2].firstChild;
			if (checkLine(rightSquare, currentSquare, otherSquare) === true ||
				checkLine(otherSquare, currentSquare, rightSquare)) {
					return true;
			}
			break;
		case 1:
			leftSquare = rows[chosenRowIndex].children[chosenSquareIndex - 1].firstChild;
			rightSquare = rows[chosenRowIndex].children[chosenSquareIndex + 1].firstChild;

			if (checkLine(leftSquare, currentSquare, rightSquare) === true ||
				checkLine(rightSquare, currentSquare, leftSquare)) {
					return true;
			}	
			break;
		case 2:
			leftSquare = rows[chosenRowIndex].children[chosenSquareIndex - 1].firstChild;
			otherSquare = rows[chosenRowIndex].children[chosenSquareIndex - 2].firstChild;

			if (checkLine(leftSquare, currentSquare, otherSquare) === true ||
				checkLine(otherSquare, currentSquare, leftSquare) === true) {
					return true;
			}	
			break;
	}

	if (CheckDiagonalWinLoss(rows, chosenRowIndex, chosenSquareIndex) === true){
			return true;
	}
	
	return false;
}

function CheckAboveBelowWinLoss(rows, chosenRowIndex, chosenSquareIndex) {
	var currentSquare = rows[chosenRowIndex].children[chosenSquareIndex].firstChild;
	var otherSquare;
	var aboveSquare;
	var belowSquare;

	switch(chosenRowIndex) {
		case 0:
			belowSquare = rows[chosenRowIndex + 1].children[chosenSquareIndex].firstChild;
			otherSquare = rows[chosenRowIndex + 2].children[chosenSquareIndex].firstChild;

			if (checkLine(belowSquare, currentSquare, otherSquare) === true || 
				checkLine(otherSquare, currentSquare, belowSquare) === true) {
					return true;
			}
			break;
		case 1:
			aboveSquare = rows[chosenRowIndex - 1].children[chosenSquareIndex].firstChild;
			belowSquare = rows[chosenRowIndex + 1].children[chosenSquareIndex].firstChild;

			if (checkLine(aboveSquare, currentSquare, belowSquare) === true ||
				checkLine(belowSquare, currentSquare, aboveSquare) === true) {
					return true;
			}
			break;
		case 2:
			aboveSquare = rows[chosenRowIndex - 1].children[chosenSquareIndex].firstChild;
			otherSquare = rows[chosenRowIndex -2].children[chosenSquareIndex].firstChild;

			if (checkLine(aboveSquare, currentSquare, otherSquare) === true ||
				checkLine(otherSquare, currentSquare, aboveSquare) === true) {
					return true;
			}
			break;
	}

	if (CheckLeftRightWinLoss(rows, chosenRowIndex, chosenSquareIndex) === true){
				return true;
	}

	return false;
}

function CheckWinLoss(boardRows) {
	//Check for win condition.
	for (var i = 0; i < boardRows.length; i++) {
		var squares = boardRows[i].children;
		for (var j = 0; j < squares.length; j++) {
			if (squares[j].children[0].innerHTML == CpuMark()) {
				if(CheckAboveBelowWinLoss(boardRows, i, j) === true) {
					return true;
				}
			}
		}
	}

	//Check for loss condition.
	for (var i = 0; i < boardRows.length; i++) {
		var squares = boardRows[i].children;
		for (var j = 0; j < squares.length; j++) {
			if(CheckAboveBelowWinLoss(boardRows, i, j) === true) {
				return true;
			}
		}
	}

	return false;
}

function CpuMove() {
	var rows = $(".board").children()[0].children;

	if (CheckWinLoss(rows) == false) {
		// If no win/loss possible, make best move possible.
		//Check if middle element is taken.
		if (rows[1].children[1].firstChild.innerHTML == "") {
			rows[1].children[1].firstChild.innerHTML = CpuMark();
			return 0;
		}

		//Check for open corner move.
		for(var i = 0; i < rows.length; i += 2){
			var squares = rows[i].children;

			for(var j = 0; j < squares.length; j += 2) {
				var square = squares[j].children;

				if(square[0].innerHTML == "") {
					square[0].innerHTML = CpuMark();
					return 0;
				}
			}
		}

		// Check for other open spot.
		var openSpots = [rows[0].children[1].children,
						 rows[1].children[0].children, 
						 rows[1].children[2].children,
						 rows[2].children[1].children];

		for(var i = 0; i < openSpots.length; i++) {
			if(openSpots[i][0].innerHTML == ""){
				openSpots[i][0].innerHTML = CpuMark();
				return 0;
			}
		}
	}
}

function UpdateBoard(square) {
	$(square).html(PlayerOneMark());
	CpuMove();

	var gameOver = true;

	$(".spot").each(function() {
		if($(this).html() == "") {
			gameOver = false;
		}
	});

	if(gameOver == true && $(".win").css('display') == 'none') {
		$(".tie").show();
	}
}

function StartGame() {
	firstMove = Math.random();

	if(firstMove > 0.5) {
		CpuMove();
	}

	$(".player1Move").show();
}

$(".spot").click(function() {
		UpdateBoard(this);
	});

$("#reset").click(function() {
	$(".spot").html("");
});

StartGame();
});