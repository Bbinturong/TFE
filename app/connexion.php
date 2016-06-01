<?php 
  
  session_start();
  require "db_connect.php";

/* GET IP */
$_SESSION['ip'] = trim($_SERVER['REMOTE_ADDR']);

/* REPERTORIE LES ERREURS */
$error = [];

    $sql = 'SELECT * FROM users WHERE ip = :ip';
     $preparedStatement = $connexion->prepare($sql);
     $preparedStatement->bindValue(':ip', $_SESSION['ip']);
     $preparedStatement->execute();
     $ip_used = $preparedStatement->fetch();

if (!empty($ip_used)) { 
  header("location:home.php"); 
} else {

  header("location:inscription.php");
}
?>