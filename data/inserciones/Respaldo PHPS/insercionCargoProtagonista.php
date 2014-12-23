<?php
	require_once("../conexion.php");
	$dato = json_decode(file_get_contents('php://input'), true);
	$Prot = $dato["prot"]["idProtagonista"];
	$Carg = $dato["car"]["idCargo"];
	$mysqli->query("insert into cargoProtagonista values (null, $Carg, $Prot)");
	$result = $mysqli->query("select * from Cargo where idCargo not in(select idCargo from cargoProtagonista where idProtagonista=$Prot)");
	$arr = array();
	if ($result)
	{
		while($row = mysqli_fetch_assoc($result))
			$arr[] = $row;
		mysqli_free_result($result);	
	}
	echo json_encode($arr);
	mysqli_close($mysqli);
?>