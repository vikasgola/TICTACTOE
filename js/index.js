var game = document.getElementById("game");
var mode = document.getElementById("mode");
var level = document.getElementById("level");
var state = document.getElementById("status");

function personWindow() {
    mode.style.display = "none";
    game.style.display = "block";
}

function computerWindow() {
    level.style.display = "none";
    game.style.display = "block";
    startComputerMode();
}

function levelSelectWindow() {
    mode.style.display = "none";
    level.style.display = "block";
}

function start2PlayerMode() {
    whichMode = "2Player";
    if (Math.random() < 0.5) {
        msg = "X";
        setStatus(msg + " gets start.");
    } else {
        msg = "O";
        setStatus(msg + " gets start.");
    }

}

function selectLevel(levelselect) {
    selectedLevel = levelselect.innerText;
}

function startComputerMode() {
    whichMode = "Computer";

    if (Math.random() < 0.5) {
        msg = "X";
        setStatus("You will start.");
    } else {
        msg = "O";
        setStatus("Computer will start.");

        alldisable();

        setTimeout(function () {
            computerMove()
        }, 700);
        // computerMove();
    }
}

function randomPos() {
    var select = (Math.random() * 9) + 1;
    // console.log(select); 
    return document.getElementById("b" + Math.floor(select));
}

function beginner() {
    x = randomPos();
    while (x.innerText != "") {
        x = randomPos();
    }
    x.innerText = "O";
}

function intermediate() {}

function hard() {}

function computerMove() {

    if (selectedLevel == "Beginner") {
        beginner();
    } else if (selectedLevel == "Intermediate") {
        intermediate();
    } else if (selectedLevel == "Hard") {
        hard();
    }

    if (!checkForWinner() && !draw()) {
        setStatus("Your turn.")
        msg = "X";
    }
    for (var i = 1; i < 10; i++) {
        document.getElementById("b" + i).style.pointerEvents = "auto";
    }

}

function twoPlayer(clicked) {

    if (!checkForWinner() && !draw()) {
        if (clicked.innerText != "") {
            setStatus("Already filled.")
        } else {

            clicked.innerText = msg;
            if (msg == "X" && !checkForWinner() && !draw()) {
                msg = "O";
                setStatus(msg + "'s turn.");
            } else if (msg == "O" && !checkForWinner() && !draw()) {
                msg = "X";
                setStatus(msg + "'s turn.");
            }
        }
    }
}

function draw() {
    for (var t = 1; t < 10; t++) {
        if (document.getElementById("b" + t).innerText == "") {
            break;
        }
    }
    if (t == 10) {
        setStatus(" Match draw!");
        return true;
    }
    return false;
}

function Computer(clicked) {

    if (!checkForWinner() && !draw()) {
        if (clicked.innerText != "") {
            setStatus("Already filled.")
        } else {
            clicked.innerText = msg;
            if (msg == "X" && !checkForWinner() && !draw()) {
                msg = "O";
                setStatus("Computer's turn");
                alldisable();
                setTimeout(function () {
                    computerMove()
                }, 500);
            }
        }
    }
}

function getPos(k) {
    return document.getElementById("b" + k).innerText;
}

function setStatus(message) {
    state.innerText = message;
}

function areEqual(a, b, c) {
    if (getPos(a) == msg && getPos(b) == msg && getPos(c) == msg) {
        return true;
    } else {
        return false;
    }
}

function checkForWinner() {
    if (areEqual(1, 2, 3) || areEqual(4, 5, 6) || areEqual(7, 8, 9) ||
        areEqual(1, 4, 7) || areEqual(2, 5, 8) || areEqual(3, 6, 9) ||
        areEqual(1, 5, 9) || areEqual(3, 5, 7)) {
        if (whichMode == "Computer") {
            if (msg == "X") {
                setStatus("Congrats, You won!");
            } else {
                setStatus("Sorry, You Lose!");
            }
        } else {
            setStatus("Congrats, " + msg + " won");
        }
        return true;
    }
    return false;
}

function clickevent(clicked) {

    if (whichMode == "2Player") {
        twoPlayer(clicked);
    } else {
        Computer(clicked);
    }
}

function reset() {
    for (var i = 1; i < 10; i++) {
        document.getElementById("b" + i).innerText = "";
    }
    if (whichMode == "Computer") {
        startComputerMode();
    } else {
        start2PlayerMode();
    }
}

function back() {
    game.style.display = "none";
    mode.style.display = "block";
    for (var i = 1; i < 10; i++) {
        document.getElementById("b" + i).innerText = "";
    }
}

function alldisable() {
    for (var i = 1; i < 10; i++) {
        document.getElementById("b" + i).style.pointerEvents = "none";
    }
}