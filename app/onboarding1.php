<?php 
  
  session_start();
  require "db_connect.php";
  require "login.php";

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
	<!-- SHAKE -->
	<script type="text/javascript" src="assets/js/shake.js"></script>

	<!-- SPIROGRAPH -->
    <script type="text/javascript" src="assets/js/spirograph.js"></script>
    <!-- GPS -->
    <script type="text/javascript" src="assets/js/gps.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">

</head>
<body>

    <div class='onboarding ob0'>
        <h2> Hey <em><?php  echo $_SESSION["name"] ?></em> </h2>
        <h3> Ce qui se dessine ici c'est ton <em>avatar personnel</em></h3>

        <svg class='svg' version="1.1" id="gotoob1"  x="0px" y="0px"  width="40px" height="40px" viewBox="0 0 48 48">
        <g>
            <polyline fill="none" stroke="#8781bd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="4.75,22.396 19.396,36.833 43.25,11.167  "/>
        </g>
        <p class='goto_ux'> Wahou !</p>
        </svg>

    </div>
    <div class='onboarding ob1 disappear-ob'>

        <h2> Essayons de trouver quelqu'un pour <em>discuter</em> ! </h2>
        <h3>Pour cela appuie sur le bouton du bas pour <em>répondre</em> à un appel </h3>

        <svg class='svg' version="1.1" id="gotoob2"  x="0px" y="0px"  width="40px" height="40px" viewBox="0 0 48 48">
        <g>
            <polyline fill="none" stroke="#8781bd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="4.75,22.396 19.396,36.833 43.25,11.167  "/>
        </g>
        </svg>
    </div>
    <div class='acc-notif'>
        
        <h2> Ne ratez aucun appel !</h2>
        <h3> Activez les notifications pour savoir si quelqu'un à lancé un appel près de vous </h3>

        <p class='notif-btn'> Autoriser </p>
        <p class='notif-btn'> Pas maintenant </p>

    </div>
    <div class='onboarding ob2 disappear-ob'>

        <h2> Ha, il n'y a aucun <em>appel</em> aux alentours</h2>
        <h3> Alors lance un appel en <em>secouant</em> ton avatar avec ton smartphone </h3>

        <svg class='svg' version="1.1" id="gotoob3"  x="0px" y="0px"  width="40px" height="40px" viewBox="0 0 48 48">
        <g>
            <polyline fill="none" stroke="#8781bd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="4.75,22.396 19.396,36.833 43.25,11.167  "/>
        </g>
        </svg>
    </div>    
    <div class='onboarding ob3 disappear-ob'>

        <h2> Maintenant attendons que <em>Spiro</em> trouve quelqu'un</h2>
        <h3> Faut que j'arrête de parler à la 3ème personne moi... </h3>

        <svg class='svg' version="1.1" id="gotogps"  x="0px" y="0px"  width="40px" height="40px" viewBox="0 0 48 48">
        <g>
            <polyline fill="none" stroke="#8781bd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="4.75,22.396 19.396,36.833 43.25,11.167  "/>
        </g>
        </svg>
    </div>

    <header id="header" class="header main_header">

        <a class='header-btn btn-param' href="param.html" title="Parameter">
        <span class='param-icon'></span>
        </a>

        <h1 class='title header-title'> <?php  echo $_SESSION["name"] ?> </h1>

        <!--a id='open-history' class='header-btn btn-history' href="#" title="History">
        <span class='history-icon'></span>  
        </a-->
        
    </header><!-- /header -->

    <main>

    <div class='home'>

        <canvas id='spiro' width='300px' height="300px" id="main-spiro" class='main-avatar'>
            
        </canvas>

        <p class='shake-baseline'> Secouer pour lancer un appel</p>
    
        <a href='gps.html' id='main-btn' class='no-active main-btn'>

        <svg class='svg' version="1.1" id="notif-icon"  x="0px" y="0px"  width="60px" height="60px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
        <g id='svg-notif'>
            <path id='path-1' class='notif-icon_path' fill="none" stroke-width="1" stroke='#FFF' stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M19.661,46.902l16.97-25.582C37.098,20.597,36.79,20,35.943,20h-8.008c-0.844,0-1.422-0.517-1.283-1.376l2.752-17.527"/>
            <path id='path-2' class='notif-icon_path' fill="none" stroke-width="1" stroke='#FFF'stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M29.404,1L11.411,25.697c-0.514,0.693-0.24,1.33,0.604,1.33h8.861c0.844,0,1.482,0.466,1.418,1.336L19.661,47"/>
        </g>
        </svg>

        <p class='btn-baseline'> Pas d'appel a proximité</p>  

        </a>        

    </div>
    </main>

<script type="text/javascript">
	
    $(document).ready(function(){


    // Définis les spirographs
    $('#spiro').each(function(){
        $(this).spiro({          
          color : '<?php echo $_SESSION['color']; ?>',
          stroke : 2,
          size : 300,
          speed: 1,
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

    var noActive = $( "#main-btn" ).hasClass( "no-active" );

    if (noActive) {

        $( "#main-btn" ).attr("href", "#");
    }  
    $("#main-btn").click(function(){ 

        $( ".btn-baseline" ).addClass("show-baseline");
        setTimeout( function(){ $( ".btn-baseline" ).removeClass("show-baseline"); }, 1500);
    });  

    /* START ONBOARDING */
    $("#gotoob1").click(function(){ 

        $( ".ob0" ).toggleClass("disappear-ob");
        $( ".ob1" ).toggleClass("disappear-ob");
        $( ".ob1" ).toggleClass("appear-ob");        
    }); 
    $("#gotoob2").click(function(){ 

        $( ".ob1" ).toggleClass("disappear-ob");   
        $( ".ob1" ).toggleClass("appear-ob");     
    }); 
        $(".no-active.main-btn").click(function(){ 
    
            $( ".ob2" ).removeClass("disappear-ob");
            $( ".ob2" ).addClass("appear-ob");    
            $( ".acc-notif" ).toggleClass("pop-up");         
        }); 
    $(".notif-btn").click(function(){ 

        $( ".acc-notif" ).toggleClass("pop-up");   
    }); 
    $("#gotoob3").click(function(){ 

        $( ".ob2" ).toggleClass("appear-ob");
        $( ".ob2" ).toggleClass("disappear-ob");          
    }); 
    $(".shake-baseline").click(function(){ 

        $( "#header" ).removeClass( "appear");

        $( "#path-1" ).attr("d", "M13,35l11-11l0,0l0,0l0,0l11-11");
        $( "#path-2" ).attr("d", "M13,13l11,11l0,0l0,0l0,0l11,11");
        $( "#main-btn" ).css( "border", 'none' );

        $( ".ob3" ).toggleClass("disappear-ob");   
        $( ".ob3" ).toggleClass("appear-ob");            
        $( ".shake-baseline" ).toggleClass("disappear-ob");  
    }); 
    
    $("#gotogps").click(function(){ 

        $( ".ob3" ).toggleClass("appear-ob");
        $( ".ob3" ).toggleClass("disappear-ob");  
        setTimeout( function(){ 
        window.location.href = "onboarding-gps.php"; }, 2000); 
    }); 


    });
    // DOCUMENT READY END 


    /* SHAKE JS */

    var myShakeEvent = new Shake({
    	threshold: 10, // optional shake strength threshold
    	timeout: 100 // optional, determines the frequency of event generation
	});

	myShakeEvent.start();

	window.addEventListener('shake', shakeEventDidOccur, false);
	
		//function to call when shake occurs
		function shakeEventDidOccur () {
		
        // Permet de préfixer les navigateurs
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        
        // Si l'API vibrate est supportée, on fait vibrer le téléphone 1/2 seconde
        if (navigator.vibrate) {
            navigator.vibrate(800);
        }
        
	}






        


    /* INTRO TO AJAX 
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
        } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("home-screen").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("POST", "form-screen.php", true);
    xhttp.send();*/

</script>


</body>
</html>