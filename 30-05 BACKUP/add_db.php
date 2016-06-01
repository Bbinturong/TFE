<?php 

	
	$sql = 'INSERT INTO users(name, ip, r1, r2, r3)
			VALUES(:name, :ip, :r1, :r2, :r3)';
		
		$preparedStatement = $connexion->prepare($sql);
		$preparedStatement->bindValue('name', $_POST['name']);

		$preparedStatement->bindValue('ip', $ip);

		$r1 = rand(20, 100);
		$preparedStatement->bindValue('r1', $r1);

		$r2 = rand(20, 40);
		$preparedStatement->bindValue('r2', $r2);

		$r3 = rand(20, 70);
		$preparedStatement->bindValue('r3', $r3);

		$preparedStatement->execute();
		echo 'TOUT ENVOYER';
?>