<?php 
  
  session_start();
  require "db_connect.php";

$ip = trim($_SERVER['REMOTE_ADDR']);
$sql = 'SELECT * FROM users WHERE ip = :ip';
     $preparedStatement = $connexion->prepare($sql);
     $preparedStatement->bindValue(':ip', $ip);
     $preparedStatement->execute();
     $ip_used = $preparedStatement->fetch();

     if ($ip_used) {

      $_SESSION["name"] = $ip_used['name'];
      $_SESSION["r1"] = $ip_used['r1'];
      $_SESSION["r2"] = $ip_used['r2'];
      $_SESSION["r3"] = $ip_used['r3'];

     } else { header("location:index.php");}
     

?>