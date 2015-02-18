<?php  
	$mysqli = new mysqli("localhost","root","S1c-#1234v","sicla");
	if ($mysqli->connect_errno)
	{
		$mysqli = new mysqli("localhost","u270745","201598765M","u270745_sicla2");	
		if ($mysqli->connect_errno)
		{
			$mysqli = new mysqli("localhost","root","","sicla");	
			if ($mysqli->connect_errno)
			{
				echo("Fallo al contenctar a MySQL: (".$mysqli->connect_errno.") ".$mysqli->connect_error);
				exit();
			}			
		}
	}
	mysqli_set_charset($mysqli, 'utf8');	
	
?>