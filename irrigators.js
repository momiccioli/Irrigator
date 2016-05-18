#!/usr/bin/env node
// This is node.js Websocket server it run a simple server server.

var GPIO = require('onoff').Gpio;
var WebSocketServer = require('ws').Server;
var os = require( 'os' );


/** Variables **/
var led = new GPIO(17, 'out');
var wss = new WebSocketServer({port: 12345});
var networkInterfaces = os.networkInterfaces( );
var ip = networkInterfaces.eth0[0].address;

function pinStatus(data) {
	var stte = led.readSync();
	console.log(stte);
	if(stte === 0) { return "pin17:disable"; }
	if(stte === 1) { return "pin17:enable"; }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

//******************************************************************************
// Main Program Body
//******************************************************************************
for (i = 0; i < 9; i++) {
   led.writeSync(1);
	sleep(100);
	led.writeSync(0);
	sleep(100);
}

wss.on('connection', function(ws) {
    ws.send('Connected Accepted!');
    console.log("connection established");
    ws.on('message', function(msg)  {    // When a message comes in run this function
    if(msg === "pin17:enable")  { led.writeSync(1); ws.send("pin17:enable" ); }
		if(msg === "pin17:disable") { led.writeSync(0); ws.send("pin17:disable"); }
		if(msg === "pin17:status")  { sts = pinStatus(msg); ws.send(sts); }
    });
});



console.log("\nHello World I am listening on port: 12345 @ " + ip);
console.log("This is an edit from MAC Mini Code Runner");
