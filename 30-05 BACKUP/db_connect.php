<?php 
	
	/* Sert a se connecter a la basse de donnée */

	$db = 'mysql:host=localhost; dbname=spiro; charset=utf8';
	$user = 'root';
	$password = 'root';	

	try {

		$connexion = new PDO($db, $user, $password);

	} catch(PDOException $e) {
		echo "Connection Failed" . $e->getMessage();
	}

?>