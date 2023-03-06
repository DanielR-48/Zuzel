
document.addEventListener("DOMContentLoaded", function (event) {



    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    function road() {
        ctx.strokeStyle = "black"
        ctx.lineWidth = 5;
        ctx.rect(0, 0, 640, 480);

        ctx.fillStyle = "rgba(100,150,100,1)";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();

        ctx.fillStyle = "rgba(100,20,20,1)";
        ctx.rect(167, 90, 306, 300);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(170, 240, 150, 0.5 * Math.PI, 0.5 * Math.PI + Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(470, 240, 150, 1.5 * Math.PI, 1.5 * Math.PI + Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(190, 290)
        ctx.lineWidth = 6;
        ctx.strokeStyle = "white"
        ctx.lineWidth = 5;
        ctx.lineTo(190, 387)
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "black"
        ctx.fillStyle = "rgba(100,150,100,1)";
        ctx.rect(167, 190, 306, 100);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(170, 240, 50, 0.5 * Math.PI, 0.5 * Math.PI + Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(470, 240, 50, 1.5 * Math.PI, 1.5 * Math.PI + Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
    }
    road()
    var x = 190;
    var y = 340;
    var a = 0;
    var v = 2;
    var aa = false;
    var r
    var b
    var g
    var taby = []
    var tabx = []
    var start = true
    var numberofplayers = 0

    for (var i = 0; i < 4; i++) {
        tabx[i] = []
        taby[i] = []
    }

    var myObj = {
        "players": [
            { "x": 190, "y": 310, "a": 0, "color": "255,0,0", "kolizja": true, "turn": false, "laps": 10, "lapoff": false, "gracz": "player1", "key": 37 },
            { "x": 190, "y": 330, "a": 0, "color": "0,255,0", "kolizja": true, "turn": false, "laps": 10, "lapoff": false, "gracz": "player2", "key": 39 },
            { "x": 190, "y": 350, "a": 0, "color": "0,0,255", "kolizja": true, "turn": false, "laps": 10, "lapoff": false, "gracz": "player3", "key": 38 },
            { "x": 190, "y": 370, "a": 0, "color": "255,255,0", "kolizja": true, "turn": false, "laps": 10, "lapoff": false, "gracz": "player4", "key": 40 }
        ]
    }
    function color(x, y) {
        r = ctx.getImageData(x, y, 1, 1).data[0]
        g = ctx.getImageData(x, y, 1, 1).data[1]
        b = ctx.getImageData(x, y, 1, 1).data[2]
    }

    function turn(n) {
        tabx[n].push(myObj.players[n].x)
        taby[n].push(myObj.players[n].y)
        if (tabx[n].length > 35)
            tabx[n].shift()
        if (taby[n].length > 35)
            taby[n].shift()
        myObj.players[n].x = myObj.players[n].x + v * Math.cos(myObj.players[n].a)
        myObj.players[n].y = myObj.players[n].y + v * Math.sin(myObj.players[n].a)
        color(myObj.players[n].x, myObj.players[n].y)
        if (myObj.players[n].turn)
            myObj.players[n].a -= 0.03;
        if (r == 0 && g == 0 && b == 0) {
            myObj.players[n].kolizja = false
        }
    }

    function slad(n) {
        ctx.lineWidth = 4;
        for (var i = 0; i < tabx[n].length; i++) {
            ctx.strokeStyle = "rgba(" + myObj.players[n].color + "," + (0 + (i / 25)) + ")"
            ctx.moveTo(tabx[n][i], taby[n][i])
            ctx.lineTo(tabx[n][i + 1], taby[n][i + 1]);
            ctx.stroke();
            ctx.beginPath();
        }
    }
    function laps(n) {
        if (myObj.players[n].lapoff && myObj.players[n].x > 190 && myObj.players[n].y > 290 && myObj.players[n].y < 387) {
            myObj.players[n].lapoff = false
            myObj.players[n].laps--
            document.getElementById(myObj.players[n].gracz).innerHTML = myObj.players[numberofplayers - 1].gracz + ": " + myObj.players[n].laps
            if (myObj.players[n].laps == 0) {
                myObj.players[0].kolizja = false
                myObj.players[1].kolizja = false
                myObj.players[2].kolizja = false
                myObj.players[3].kolizja = false
                document.getElementById("wygranatext").innerHTML = "Gracz " + myObj.players[n].gracz + " wygrywa!"
                document.getElementById("wygrana").style.display = "block";
                return 0;
            }
            //alert("Gracz "+myObj.players[n].gracz+" wygrywa!")
        }
        if (myObj.players[n].y < 290) {
            myObj.players[n].lapoff = true
        }
    }
    var wygranaprzezbrakgraczy = true
    var timestamp = 1000 / 60
    function startgame() {
        function step(timestamp) {
            road()
            if (numberofplayers > 1) {
                var licznikkolizji = 0
                for (var i = 0; i < numberofplayers; i++) {

                    if (myObj.players[i].kolizja == false) {
                        licznikkolizji++

                    }
                }
                if (licznikkolizji == numberofplayers - 1)
                    for (var i = 0; i < numberofplayers; i++) {
                        if (myObj.players[i].kolizja && wygranaprzezbrakgraczy) {
                            //alert("Gracz "+myObj.players[i].gracz+" wygrywa!")
                            myObj.players[i].kolizja = false
                            document.getElementById("wygranatext").innerHTML = "Gracz " + myObj.players[i].gracz + " wygrywa!"
                            document.getElementById("wygrana").style.display = "block";
                            wygranaprzezbrakgraczy = false
                            return 0;
                        }
                    }
            }
            else {
                if (myObj.players[0].kolizja == false && wygranaprzezbrakgraczy) {
                    //alert("Przegrałeś")
                    document.getElementById("wygranatext").innerHTML = "Przegrałeś!"
                    document.getElementById("wygrana").style.display = "block";
                    wygranaprzezbrakgraczy = false
                    return 0;
                }
            }
            for (var n = 0; n < numberofplayers; n++) {
                if (myObj.players[n].kolizja) {
                    slad(n)
                    turn(n)
                    laps(n)
                }
            }
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    document.addEventListener("keydown", function (e) {
        if (e.keyCode == myObj.players[0].key && numberofplayers > 0) { myObj.players[0].turn = true }
        else if (e.keyCode == myObj.players[1].key && numberofplayers > 1) { myObj.players[1].turn = true }
        else if (e.keyCode == myObj.players[2].key && numberofplayers > 2) { myObj.players[2].turn = true }
        else if (e.keyCode == myObj.players[3].key && numberofplayers > 3) { myObj.players[3].turn = true }
    });
    document.addEventListener("keyup", function (e) {
        if (e.keyCode == myObj.players[0].key && numberofplayers > 0) { myObj.players[0].turn = false }
        else if (e.keyCode == myObj.players[1].key && numberofplayers > 1) { myObj.players[1].turn = false }
        else if (e.keyCode == myObj.players[2].key && numberofplayers > 2) { myObj.players[2].turn = false }
        else if (e.keyCode == myObj.players[3].key && numberofplayers > 3) { myObj.players[3].turn = false }
    });
    document.getElementById("startgame").onclick = function () {
        if (start && numberofplayers != 0) {
            startgame()
            start = false
            document.getElementById("startmenu").style.display = "none";
        }
        else
            alert("Aby ropocząć grę dodaj przynajmniej 1 gracza")
    };
    var top = 0
    document.addEventListener("keypress", function (e) {
        if (numberofplayers < 4 && start) {
            myObj.players[numberofplayers].key = e.keyCode
            numberofplayers++
            var playername = document.createElement("p")
            playername.style.display = "inline-block"
            playername.innerHTML = "player" + numberofplayers
            playername.id = "gracz" + numberofplayers
            document.getElementById("graczemenu").appendChild(playername)
            document.getElementById("gracz" + numberofplayers).style.top = top
            top += 50
            var lap = document.createElement("div")
            lap.innerHTML = myObj.players[numberofplayers - 1].gracz + ": " + 10
            lap.className = "lap"
            lap.id = "player" + numberofplayers
            document.getElementById("contener").appendChild(lap)
        }
    });
    document.getElementById("resetgame").onclick = function () {
        myObj = {
            "players": [
                { "x": 190, "y": 310, "a": 0, "color": "255,0,0", "kolizja": true, "turn": false, "laps": 10, "lapoff": false, "gracz": "player1", "key": 37 },
                { "x": 190, "y": 330, "a": 0, "color": "0,255,0", "kolizja": true, "turn": false, "laps": 10, "lapoff": false, "gracz": "player2", "key": 39 },
                { "x": 190, "y": 350, "a": 0, "color": "0,0,255", "kolizja": true, "turn": false, "laps": 10, "lapoff": false, "gracz": "player3", "key": 38 },
                { "x": 190, "y": 370, "a": 0, "color": "255,255,0", "kolizja": true, "turn": false, "laps": 10, "lapoff": false, "gracz": "player4", "key": 40 }
            ]
        }
        for (var i = 0; i < 4; i++) {
            tabx[i] = []
            taby[i] = []
        }
        start = true
        numberofplayers = 0
        wygranaprzezbrakgraczy = true
        while (document.getElementById("graczemenu").hasChildNodes()) {
            document.getElementById("graczemenu").removeChild(document.getElementById("graczemenu").firstChild);
        }
        while (document.getElementById("contener").hasChildNodes()) {
            document.getElementById("contener").removeChild(document.getElementById("contener").firstChild);
        }
        top = 0
        document.getElementById("wygrana").style.display = "none";
        document.getElementById("startmenu").style.display = "block";
    };
});

