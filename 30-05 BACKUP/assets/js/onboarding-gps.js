
var latUser1;
var latUser2 = 50.463186669426605;
var longUser1;
var longUser2 = 4.874110221862793;
var bearing;
var translateOuterSpiro;
var dist;


window.navigator.geolocation.watchPosition(getLocationData, error);

function getLocationData(position) {
    


  latUser1 = position.coords.latitude;
  longUser1 = position.coords.longitude;	

  latUser2 = latUser1 + 0.0002;
  longUser2 = longUser1 + 0.0002;

  distanceBetweenUsers(latUser1, longUser1, latUser2, longUser2);
	console.log(latUser1);
	console.log(longUser1);
}

function error() {

   // document.getElementById('gpsData').innerHTML = 'Location not supported';
    updateSpiro(175, 500);
}
              		

function distanceBetweenUsers(latUser1, longUser1, latUser2, longUser2) {

	var radlatUser1 = Math.PI * latUser1/180
	var radlatUser2 = Math.PI * latUser2/180
	var theta = longUser1-longUser2
	var radtheta = Math.PI * theta/180
	dist = Math.sin(radlatUser1) * Math.sin(radlatUser2) + Math.cos(radlatUser1) * Math.cos(radlatUser2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515 // en miles
	dist = dist * 1609.344 // en m
	dist = Math.floor(dist);


  document.getElementById("gotoDist").innerHTML = dist;

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

	
  $( ".second-avatar-GPS" ).css( "width", '100px' );
  $( ".second-avatar-GPS" ).css( "height", '100px' );

	var widthMainAvatar = $(".main-avatar-GPS").width();
	var widthSecondAvatar = $(".second-avatar-GPS").width();
	translateOuterSpiro = widthSecondAvatar/2 + widthMainAvatar/2 + 5;

	$( ".second-avatar-GPS" ).css( "top", 'calc(25% + 30vw - 50px)' );
	
	$( ".second-avatar-GPS" ).css( "margin-left", '-50px' );


	$( ".second-avatar-GPS" ).css( "-webkit-transform", 'rotateZ(' + bearing + 'deg ) translateY(-' + translateOuterSpiro +'px)'  );
	$( ".second-avatar-GPS" ).css( "-moz-transform", 'rotateZ(' + bearing + 'deg ) translateY(-' + translateOuterSpiro +'px)'  );
  $( ".second-avatar-GPS" ).css( "-o-transform", 'rotateZ(' + bearing + 'deg ) translateY(-' + translateOuterSpiro +'px)'  );
  $( ".second-avatar-GPS" ).css( "transform", 'rotateZ(' + bearing + 'deg ) translateY(-' + translateOuterSpiro +'px)'  );

	updateSpiro(bearing, dist);


  distOnboarding(dist);
}


    function updateSpiro(bearing, dist) {

      //Find our div containers in the DOM
      var dataContainerOrientation = document.getElementById('dataContainerOrientation');
 
      //Check for support for DeviceOrientation event
      if(window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
                     
            var alpha = Math.round(event.alpha);
           	var beta =  Math.round(event.beta);
           	var gamma =  Math.round(event.gamma);
            		
            if(alpha!=null || beta!=null || gamma!=null)   {  
                  
                  var totalRotation = Math.round(bearing) - alpha;
                  console.log('bearing'+ Math.floor(bearing));
                  console.log('alpha'+alpha);
                  console.log('totalRotation'+totalRotation);
                  //dataContainerOrientation.innerHTML = 'bearing: ' +  Math.round(bearing) + '<br/>totalRotation: ' + totalRotation + '<br />alpha: ' + alpha;
                  //$( ".second-avatar-GPS" ).css( "-webkit-transform", 'rotateZ('+ totalRotation + 'deg ) translateY(-' + translateOuterSpiro +'px)'  );
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

    function distOnboarding(dist) {

        for (var i = dist; i < 0; i--) {
          
          console.log('tets');
          document.getElementById("gotoDist").innerHTML = dist;
        }
    }   
    /*
    function playSound(){

      var audio = new Audio('assets/sound/beeper.mp3');
      audio.play();
    } */

