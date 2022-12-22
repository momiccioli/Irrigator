// This is a basic Websocket client setup.

window.onload = function() {
   var s = new WebSocket("ws://192.168.1.159:12345/");
   s.onopen = function(e) { console.log("Connection Opened"); }
   s.onclose = function(e) { console.log("Connection Closed"); }
   //s.onmessage = function(e) { alert("got: " + e.data); }
   s.onmessage = function(e) { console.log("Message recieved: " + e.data); }
};
