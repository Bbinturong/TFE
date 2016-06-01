<?php 
  
  session_start();
  require "db_connect.php";
  require "connexion.php";

/* CREATE COOKIE 
setcookie("cookieIp",$_SESSION["ip"],time() + (10 * 365 * 24 * 60 * 60));
*/
?>

<!DOCTYPE html>
<html>
<head>

	<title> - Spiro - </title>
	<meta charset="UTF-8" />

	<!-- META -->
	<meta name="description" content="Spiro - Find someone and talk"/>
    <meta name="keywords" content="spiro, talk, meet, meeting, talking, app, mobile, mobile app, ux, rencontre, spirograph, parler, discuter"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Mattelet Bruno">

	<meta property="og:title" content="Sprio"/>
	<meta property="og:description" content="Find someone and talk"/>
	<meta property="og:email" content="bruno.mattelet@gmail.com"/>
	<meta property="og:image" content="assets/img/favicon.png"/>

	<link rel="icon" type="image/png" href="assets/img/favicon.png" />

	<!-- JQUERY -->
    <script type="text/javascript" src="assets/js/jquery-1.11.3.js"></script>
    <!-- BONSAI -->
    <script type="text/javascript" src="assets/js/bonsai-0.4.1.min.js"></script>
    <!-- VELOCITY -->
    <script type="text/javascript" src="assets/js/velocity.min.js"></script>
	<!-- RANDOMCOLOR -->
	<script type="text/javascript" src="assets/js/randomcolor.js"></script>	
	<!-- COMPASS -->
	<script type="text/javascript" src="assets/js/compass.js"></script>

	<!-- SPIROGRAPH -->
    <script type="text/javascript" src="assets/js/spirograph.js"></script>
    <!-- GPS -->
    <script type="text/javascript" src="assets/js/onboarding-gps.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">

</head>
<body>
<main>
    <div class='onboarding ob4'>
        <h2> J'ai trouvé quelqu'un, il s'appelle <em>Antoine</em> </h2>
        <h3> Désormais il ne te reste plus qu'à le rejoindre</h3>
    </div>
		<div class='onboarding ob5'>
        <h2> Tu es donc fin prêt à utiliser <em>Spiro</em> </h2>
        <h3> Bisous </h3>
        <a href='index.php' id='main-btn' class='no-active suppr'>

    <svg class='svg' version="1.1" id="notif-icon"  x="0px" y="0px"  width="60px" height="60px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
    <g id='svg-notif'>
      <path id='path-1' class='notif-icon_path' fill="none" stroke-width="1" stroke='#8781bd' stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M13,35l11-11l0,0l0,0l0,0l11-11"/>
      <path id='path-2' class='notif-icon_path' fill="none" stroke-width="1" stroke='#8781bd'stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M13,13l11,11l0,0l0,0l0,0l11,11"/>
    </g>
    </svg>


  </a>
    </div>

		<canvas id="spiro" class='main-avatar-GPS'></canvas>

    <canvas id='second-spiro-GPS' class='second-avatar-GPS'></canvas>


	<a href='index.php' id='main-btn' class='no-active suppr'>

		<svg class='svg' version="1.1" id="notif-icon"  x="0px" y="0px"	 width="60px" height="60px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
		<g id='svg-notif'>
			<path id='path-1' class='notif-icon_path' fill="none" stroke-width="1" stroke='#8781bd' stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M13,35l11-11l0,0l0,0l0,0l11-11"/>
			<path id='path-2' class='notif-icon_path' fill="none" stroke-width="1" stroke='#8781bd'stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M13,13l11,11l0,0l0,0l0,0l11,11"/>
		</g>
		</svg>


	</a>	

    <!--div id="dataContainerOrientation">
      No device orientation data
    </div-->
    <!--div id="compass">
      No device motion data
    </div-->	
        
    <h2 id='goto' class="goto"> <span id='gotoDist'></span> m vers Antoine</h2> 
</main>

<script type="text/javascript">
	
    $(document).ready(function(){

    	// Définis les spirographs
     // Définis les spirographs
    $('#spiro').each(function(){
        $(this).spiro({          
          color : randomColor(),
          stroke : 2,
          size : 300,
          speed: 2,
          seed: '<?php echo $_SESSION['r1']; ?>-<?php echo $_SESSION['r2']; ?>-<?php echo $_SESSION['r3']; ?>'
        })
     })
     $('#second-spiro-GPS').each(function(){
        $(this).spiro({
          color : randomColor(),
          stroke : 1,
          size : 200,
          speed : 2
        })
     });  

     var prevDist;
     var newDist;
setTimeout( function(){

    $( ".ob4" ).css( "display", 'none' );

    prevDist = document.getElementById('gotoDist').innerHTML;

     var decremntDist = setInterval(minusDist, 1000);

     function minusDist(){

      newDist = prevDist -1;
       document.getElementById("gotoDist").innerHTML = newDist;
      prevDist = newDist;

      if (newDist == 15) {

        document.getElementById("goto").innerHTML = "Plus que <span id='gotoDist'>15</span> m";
      } else if (newDist == 10) {

        document.getElementById("goto").innerHTML = "Antoine t'attend dans <span id='gotoDist'>10</span> m";
      }
      if (newDist == 2) {

          $( ".second-avatar-GPS" ).css( "width", '60vw' );
          $( ".second-avatar-GPS" ).css( "height", '60vw' );

          $( ".second-avatar-GPS" ).css( "top", '25%' );
          
          $( ".second-avatar-GPS" ).css( "margin-left", '-30vw' );


          $( ".second-avatar-GPS" ).css( "-webkit-transform", 'rotateZ(' + 0 + 'deg ) translateY(-' + 0 +'px)'  );
          $( ".second-avatar-GPS" ).css( "-moz-transform", 'rotateZ(' + 0 + 'deg ) translateY(-' + 0 +'px)'  );
          $( ".second-avatar-GPS" ).css( "-o-transform", 'rotateZ(' + 0 + 'deg ) translateY(-' + 0 +'px)'  );
          $( ".second-avatar-GPS" ).css( "transform", 'rotateZ(' + 0 + 'deg ) translateY(-' + 0 +'px)'  );

      }
      if (newDist == 0) { 
        clearInterval(decremntDist);

        document.getElementById("goto").innerHTML = "Spiro, à votre service";

        $( ".ob5" ).css( "display", 'block' );
      }
     }

    }, 5000);


});


</script>

</body>
</html>