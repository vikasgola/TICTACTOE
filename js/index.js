start();

function start() {
    state = document.getElementById("status");
    if (Math.random() < 0.5) {
        msg = "X";
        setStatus(msg + " gets start.");
    } else {
        msg = "O";
        setStatus(msg + " gets start.");
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
        areEqual(1, 5, 9) || areEqual(3, 5, 7) ) {
        setStatus(msg+ " won");
        return true;
    }
    return false;
}

function clickevent(clicked) {

    if (!checkForWinner()) {
        if (clicked.innerText != "") {
            setStatus("Already filled.")
        } else {

            clicked.innerText = msg;
            if (msg == "X" && !checkForWinner()) {
                msg = "O";
                setStatus(msg + "'s turn.");
            } else if(msg == "O" && !checkForWinner()){
                msg = "X";
                setStatus(msg + "'s turn.");
            }
        }
    }
}

function reset(){
    for(var i=1;i<10;i++){
        document.getElementById("b" + i).innerText="";
    }
    start();
}

function exit(){
    if(confirm("Are u sure? Babye!")){
        window.close();
    }
}