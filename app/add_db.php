<?php 

	$sql = 'INSERT INTO users(name, ip, r1, r2, r3, color)
			VALUES(:name, :ip, :r1, :r2, :r3, :color)';
		
		$preparedStatement = $connexion->prepare($sql);
		$preparedStatement->bindValue('name', $_POST['name']);

		$preparedStatement->bindValue('ip', $_SESSION['ip']);

		$r1 = rand(20, 100);
		$preparedStatement->bindValue('r1', $r1);

		$r2 = rand(20, 40);
		$preparedStatement->bindValue('r2', $r2);

		$r3 = rand(20, 70);
		$preparedStatement->bindValue('r3', $r3);

		$rand = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
    	$color = '#'.$rand[rand(0,15)].$rand[rand(0,15)].$rand[rand(0,15)].$rand[rand(0,15)].$rand[rand(0,15)].$rand[rand(0,15)];
    	$preparedStatement->bindValue('color', $color);
    

		$preparedStatement->execute();
		echo 'TOUT ENVOYER';
?>