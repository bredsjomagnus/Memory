(function () {
    let websocket;
    let connect     = document.getElementById("connect");
    let nickname    = document.getElementById('nickname');
    let clientlist  = document.getElementById("clientarea");
    let output      = document.getElementById("msgarea");
    let sendmessage = document.getElementById("messagebtn");
    let startgame = document.getElementById("startgame");
    let clientmessage = document.getElementById("message");
    let close       = document.getElementById("disconnectbtn");
    // var nicknamevalue = document.getElementById('nickname').value;
    var userparams = {uniquenickname: "anon"};
    // let protocol    = document.getElementById("protocol");
    // var nicknamevalue = document.getElementById('nickname').value;

    /**
    * Check nickname inputfield. If empty disable connectionbtn.
    */
    function doCheck() {
        var nicknamevalue;

        if (nicknamevalue === '') {
            document.getElementById("connect").disabled = true;
        } else {
            document.getElementById("connect").disabled = false;
        }
    }

    // Checking nickname inputfield when keyup or when focusout
    $('#nickname').keyup(doCheck).focusout(doCheck);

    function renderClientArea(userarray) {
        var HTMLlist = "";

        console.log("Inne i renderClientArea, uniquenickname = " + userparams.uniquenickname);
        clientlist.innerHTML = "";
        for (var i = 0; i < userarray.length; i++) {
            if (userarray[i] === userparams.uniquenickname) {
                HTMLlist += "<p><strong>"+userarray[i]+"</strong></p>";
            } else {
                HTMLlist += "<p>"+userarray[i]+"</p>";
            }
        }
        clientlist.innerHTML = HTMLlist;
    }

    function addClientMsg(jsonmsg) {
        let now = new Date();
        let timestamp = now.toLocaleTimeString();
        var htmlmsg;
        var nick = jsonmsg.nick;
        var content = jsonmsg.content;

        htmlmsg = document.createElement('div');
        htmlmsg.className = "well clientmsgwell";
        htmlmsg.innerHTML = "<p>"+`${timestamp}`+" [<strong>"+nick+"</strong>]: "+content+"</p>";
        output.appendChild(htmlmsg);
    }

    function setuniquename(uniquename) {
        console.log("Setting uniquenickname to " + uniquename);
        userparams.uniquenickname = uniquename;
    }

    /**
    * What to do when user clicks Connect
    */
    connect.addEventListener("click", function() {
        console.log("Connecting to ws://localhost:8001/.");
        websocket = new WebSocket('ws://localhost:8001/');
        websocket.onopen = function() {
            console.log("The websocket is now open.");
            console.log(websocket);
            var msg;

            msg = {
                type: 'newuser',
                content: nickname.value
            };
            websocket.send(JSON.stringify(msg));
            $("#connectform").hide();
            $("#messageform").show();
            $("#startgame").show();
        };

        websocket.onmessage = function(event) {
            console.log("Receiving message: " + event.data);
            console.log(event);
            console.log(websocket);
            var jsonmsg;

            jsonmsg = JSON.parse(event.data);
            console.log(jsonmsg.type);
            if (jsonmsg.type === 'users') {
                console.log("renderClientArea");
                console.log("jsonmsg.userarray: ");
                console.log(jsonmsg.userarray);
                renderClientArea(jsonmsg.userarray);
            } else if (jsonmsg.type === 'uniquename') {
                console.log("Uniquenickname: " + jsonmsg.uniquenick);
                setuniquename(jsonmsg.uniquenick);
            } else if (jsonmsg.type === 'clientmsg') {
                addClientMsg(jsonmsg);
            }
        };

        websocket.onclose = function() {
            console.log("The websocket is now closed.");
            console.log(websocket);
            $("#messageform").hide();
            $("#connectform").show();
        };
    }, false);

    /**
     * What to do when user clicks to send a message.
     */
    sendmessage.addEventListener("click", function(/*event*/) {
        let messagetext = clientmessage.value;
        var msg;

        if (!websocket || websocket.readyState === 3) {
            console.log("The websocket is not connected to a server.");
        } else {
            msg = {
                type: "clientmsg",
                nick: userparams.uniquenickname,
                content: messagetext
            };
            websocket.send(JSON.stringify(msg));
            console.log("Sending message: " + messagetext);
            // outputLog("You said: " + messagetext);
        }
    });

    /**
     * What to do when starting a game and setting the table
     */
    startgame.addEventListener("click", function(/*event*/) {
        // let messagetext = clientmessage.value;
        var msg;

        if (!websocket || websocket.readyState === 3) {
            console.log("The websocket is not connected to a server.");
        } else {
            msg = {
                type: "startgame"
            };
            websocket.send(JSON.stringify(msg));
            console.log("Starting up a new game");
            // outputLog("You said: " + messagetext);
        }
    });



    /**
     * What to do when user clicks Close connection.
     */
    close.addEventListener("click", function(/*event*/) {
        console.log("Closing websocket.");
        var msg;

        msg = {
            type: 'deleteuser',
            content: userparams.uniquenickname
        };
        websocket.send(JSON.stringify(msg));
        clientlist.innerHTML = "";
        output.innerHTML = "";
        // websocket.send("Client closing connection by intention.");
        websocket.close();
    });
})();
