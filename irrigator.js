// Home grown websocket server
// This needs to run on a Raspberry pi.
var s = new WebSocket("ws://bostonpi:12345/");
var bostonPi  = false;
var tmonth    = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var systemOn  = document.getElementById("systemOn");  //Define the on button
var systemOff = document.getElementById("systemOff"); //define the off button
var conInd = document.getElementById("ind");

function myFunction() {
	 var x = document.getElementById("Zone01").value;
	 //document.getElementById("demo").innerHTML = x;
	 console.log(x);
}

function inComing(data) {
	console.log("Msg received: " + data);
	if(data === "pin17:enable")  { systemOn.disabled = true;  systemOff.disabled = false; }
	if(data === "pin17:disable") { systemOn.disabled = false; systemOff.disabled = true;  }
}

function outputUpdate(idName,minS) {
	document.querySelector(idName).value = minS;
}

function GetClock(){
   var d=new Date();
   var nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
   if(nyear<1000) { nyear+=1900; }
      var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;
      if(nhour==0)       { ap=" AM"; nhour=12; }
      else if(nhour<12)  { ap=" AM"; }
      else if(nhour==12) { ap=" PM"; }
      else if(nhour>12)  { ap=" PM";nhour-=12; }
      if(nmin<=9)        { nmin="0"+nmin; }
      if(nsec<=9)        { nsec="0"+nsec; }
      document.getElementById('clockbox').innerHTML=""+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+"";
}

//******************************************************************************
// Main code
//******************************************************************************
	systemOn.addEventListener("click", function() {       //add event listner for on
		s.send("pin17:enable");
	});

	systemOff.addEventListener("click", function() {      //add event listner for off
		s.send('pin17:disable');
	});

//******************************************************************************
// Post Window Load
//******************************************************************************
	window.onload=function(){                             // This runs after DOM is ready to display
		GetClock();
		setInterval(GetClock,1000);

   	setTimeout(function () {
      	if (s.readyState != 1) {
         	console.log("Problem connection , kindly contact system admin .");
				conInd.className = "dot dot-red";
      	} else {
      		conInd.className = "dot dot-green";
      		s.send("Hello Server!");
      		s.send('pin17:status');
   		}
   	}, 3000);
		s.onopen = function(e) { console.log("Connection Opened"); conInd.className = "dot dot-yellow";}
		s.onclose = function(e) { console.log("Connection Closed"); conInd.className = "dot dot-red";  }
		s.onmessage = function(e) { inComing(e.data); }
		//outputUpdate(vvol);
	}
