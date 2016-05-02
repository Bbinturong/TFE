
var latUser1;
var latUser2 = 50.464265749190176;
var longUser1;
var longUser2 = 4.860398769378662;
var bearing;

window.navigator.geolocation.watchPosition(getLocationData, error);

function getLocationData(position) {
    

    latUser1 = position.coords.latitude;
    longUser1 = position.coords.longitude;	

    distanceBetweenUsers(latUser1, longUser1, latUser2, longUser2);
	console.log(latUser1);
	console.log(longUser1);
}

function error() {

    document.getElementById('gpsData').innerHTML = 'Location not supported';
    updateSpiro(10, 500);
}
              		

function distanceBetweenUsers(latUser1, longUser1, latUser2, longUser2) {

	var radlatUser1 = Math.PI * latUser1/180
	var radlatUser2 = Math.PI * latUser2/180
	var theta = longUser1-longUser2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlatUser1) * Math.sin(radlatUser2) + Math.cos(radlatUser1) * Math.cos(radlatUser2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	dist = dist * 1609.344
	dist = Math.floor(dist);
	console.log(dist);

    document.getElementById("gpsData").innerHTML = dist;

    getBearing(latUser1, longUser1, latUser2, longUser2);
	moveSpiro(bearing, dist);

    /*
    // SAME AS BEFORE 
    // 2 WAYS TO GET THE DISTANCE
	Number.prototype.toRad = function() {
	   return this * Math.PI / 180;
	}

    var R = 6371; // km 
	//has a problem with the .toRad() method below.
	var x1 = latUser2-latUser1;
	var dLat = x1.toRad();  
	var x2 = longUser2-longUser1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
	                Math.cos(latUser1.toRad()) * Math.cos(latUser2.toRad()) * 
	                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; 
	var dist = d;
	
	alert(d);

    document.getElementById("gpsData").innerHTML = dist;	
    */
}


function getBearing(latUser1, longUser1, latUser2, longUser2){

	Number.prototype.toDegrees = function() {
	   return this * 180 / Math.PI;
	}

	var y = Math.sin(latUser2-latUser1) * Math.cos(longUser2);
	var x = Math.cos(longUser1)*Math.sin(longUser2) -
        Math.sin(longUser1)*Math.cos(longUser2)*Math.cos(latUser2-latUser1);
	bearing = Math.atan2(y, x).toDegrees();


}

function moveSpiro(bearing, dist) {

	
	var widthMainAvatar = $(".main-avatar-GPS").outerWidth(true);
	var widthSecondAvatar = $(".second-avatar-GPS").outerWidth(true);
	var translateOuterSpiro = widthSecondAvatar + widthMainAvatar; 
	$( ".second-avatar-GPS" ).css( "width", '100px' );
	$( ".second-avatar-GPS" ).css( "height", '100px' );


	$( ".second-avatar-GPS" ).css( "top", 'calc(30% + 15vw)' );
	
	$( ".second-avatar-GPS" ).css( "margin-left", '-50px' );

	$( ".second-avatar-GPS" ).css( "-webkit-transform", 'rotateZ(' + bearing + 'deg ) translateY(-' + dist/2 +'px)'  );
	$( ".second-avatar-GPS" ).css( "-moz-transform", 'rotateZ(' + bearing + 'deg ) translateY(-' + dist/2 +'px)'  );
  $( ".second-avatar-GPS" ).css( "-o-transform", 'rotateZ(' + bearing + 'deg ) translateY(-' + dist/2 +'px)'  );
  $( ".second-avatar-GPS" ).css( "transform", 'rotateZ(' + bearing + 'deg ) translateY(-' + dist/2 +'px)'  );

	updateSpiro(bearing, dist);
}


    function updateSpiro(bearing, dist) {

      //Find our div containers in the DOM
      var dataContainerOrientation = document.getElementById('dataContainerOrientation');
      var dataContainerMotion = document.getElementById('dataContainerMotion');
 
      //Check for support for DeviceOrientation event
      if(window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
                     
            var alpha = Math.floor(event.alpha);
           	var beta =  Math.floor(event.beta);
           	var gamma =  Math.floor(event.gamma);
            		
            if(alpha!=null || beta!=null || gamma!=null)   {  
                 
                	dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
              		$( ".second-avatar-GPS" ).css( "-webkit-transform", 'rotateZ('+ bearing - alpha + 'deg ) translateY(' + dist/2 +'px)'  );
              		$( ".second-avatar-GPS" ).css( "-moz-transform", 'rotateZ(' + bearing - alpha + 'deg ) translateY(' + dist/2 +'px)'  );
                  $( ".second-avatar-GPS" ).css( "-o-transform", 'rotateZ(' + bearing - alpha + 'deg ) translateY(' + dist/2 +'px)'  );
                  $( ".second-avatar-GPS" ).css( "transform", 'rotateZ(' + bearing - alpha + 'deg ) translateY(' + dist/2 +'px)'  );
              		}

              }, false);
      } 	
 		
 	  /*
      // Check for support for DeviceMotion events
      if(window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', function(event) {
                var x = event.accelerationIncludingGravity.x;
                var y = event.accelerationIncludingGravity.y;
                var z = event.accelerationIncludingGravity.z;
                var r = event.rotationRate;
                var html = 'Acceleration:<br />';
                html += 'x: ' + x +'<br />y: ' + y + '<br/>z: ' + z+ '<br />';
                html += 'Rotation rate:<br />';
                if(r!=null) html += 'alpha: ' + r.alpha +'<br />beta: ' + r.beta + '<br/>gamma: ' + r.gamma + '<br />';
                dataContainerMotion.innerHTML = html;                  
              });
      }
      */
    }   

