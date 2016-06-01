<?php 
  
  session_start();
  require "db_connect.php";

/* GET ID */
$ip = trim($_SERVER['REMOTE_ADDR']);

/* GET NAME */
$name = trim(strip_tags($_POST["name"]));

/* CREE DES VARIABLES GLOBALES */
$_SESSION["ip"] = $ip;
$_SESSION["name"] = $name;

/* REPERTORIE LES ERREURS */
$error = [];

    $sql = 'SELECT * FROM users WHERE ip = :ip';
     $preparedStatement = $connexion->prepare($sql);
     $preparedStatement->bindValue(':ip', $ip);
     $preparedStatement->execute();
     $ip_used = $preparedStatement->fetch();
     $_SESSION["ip"] = $ip_used;

/*if ($_COOKIE['cookieIp'] == $_SESSION['ip']) {
    
    header("location:home.php");
}*/

if (!empty($ip_used)) { header("location:home.php"); }

if (!empty($_POST) && empty($ip_used) ) {
     
     if (empty($name)) {
       $error["name_empty"] = "Tu n'as pas de nom ?";
     } else { include "add_db.php"; header("location:onboarding1.php"); }

}


/* Montre les erreurs sous chaque input */
function showError($array, $err){
  if ($array[$err] != "") {
    
   return "<p class='alert'>". $array[$err] . "</p>";
  }
}

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
    

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">

</head>
<body>

    <div id='starting-screen'>
    <h1 class='logo'> Spiro </h1>
    <svg class='logo-svg' version="1.1" id="notif-icon"  x="0px" y="0px"  width="60px" height="60px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
        <g id='svg-notif'>
            <path id='path-1' class='notif-icon_path' fill="none" stroke-width="2" stroke='#8781bd' stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M19.661,46.902l16.97-25.582C37.098,20.597,36.79,20,35.943,20h-8.008c-0.844,0-1.422-0.517-1.283-1.376l2.752-17.527"/>
            <path id='path-2' class='notif-icon_path' fill="none" stroke-width="2" stroke='#8781bd'stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M29.404,1L11.411,25.697c-0.514,0.693-0.24,1.33,0.604,1.33h8.861c0.844,0,1.482,0.466,1.418,1.336L19.661,47"/>
        </g>
    </svg>
    </div>

    <div class='main-onboarding'>
    <img class='spiro-logo' src="assets/img/spiro-logo.png" alt="Spiro Logo">
        <h2> Bienvenu  sur  Spiro</h2>

        <h3> Dit moi le <em>Nom</em> avec lequel tu veux te faire connaître</h3>
        <form method="post" action="">

    <span class='input-style'>
    <input type="text" name="name" value="" placeholder="Pierre">    
    </span>
      
    <?php if (!empty($error)) {
        echo showError($error, "name_empty");
    } else { echo "<p> et partons à la rencontre d'autre personne ! </p>";} ?>

    <button>
        <svg version="1.1" id="Calque_1" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48">
        <g>
            <polyline fill="none" stroke="#8781bd" stroke-width="4" stroke-linecap="round"      stroke-linejoin="round" stroke-miterlimit="10" points="
                4.75,22.396 19.396,36.833 43.25,11.167  "/>
        </g>
        </svg>
    </button>

</form>
    </div>

    <div class='home'>
    
        <a href='gps.html' id='main-btn' class='active notif-open'>

        <svg class='svg' version="1.1" id="notif-icon"  x="0px" y="0px"  width="60px" height="60px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
        <g id='svg-notif'>
            <path id='path-1' class='notif-icon_path' fill="none" stroke-width="1" stroke='#FFF' stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M19.661,46.902l16.97-25.582C37.098,20.597,36.79,20,35.943,20h-8.008c-0.844,0-1.422-0.517-1.283-1.376l2.752-17.527"/>
            <path id='path-2' class='notif-icon_path' fill="none" stroke-width="1" stroke='#FFF'stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M29.404,1L11.411,25.697c-0.514,0.693-0.24,1.33,0.604,1.33h8.861c0.844,0,1.482,0.466,1.418,1.336L19.661,47"/>
        </g>
        </svg>

        </a>        

    </div>


    

<script type="text/javascript">
    
    $(document).ready(function(){
        
        $('.main-onboarding').css('display', 'none');

        setTimeout(function(){
                $('#starting-screen').css('display', 'none');

                $('.main-onboarding').css('display', 'block');
                //$("#home-screen").load("index.html #home-screen > *");

        },3000);

    });
    // DOCUMENT READY END 


</script>

</body>
</html>