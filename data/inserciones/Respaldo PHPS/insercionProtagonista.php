<?php
	require_once("../conexion.php");
	$dato = json_decode(file_get_contents('php://input'), true);
	$nombre = $dato['nombre'];
	$cargo = $dato['cargo']['idCargo'];
	$gen = $dato['genero'];
	$mysqli->query("insert into Protagonista values(null,'$nombre','$gen')");
	$id = mysqli_insert_id($mysqli);
	$mysqli->query("insert into cargoProtagonista values(null,$cargo,$id)");
	$result = $mysqli->query("select * from Protagonista");
	$arr = array();
	if($result)
	{
		while($row = mysqli_fetch_assoc($result))
			$arr[] = $row;
		mysqli_free_result($result);
	}
	echo json_encode($arr);
	mysqli_close($mysqli);
?>