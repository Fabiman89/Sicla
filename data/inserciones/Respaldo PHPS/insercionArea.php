<?php  
	require_once("../conexion.php");
	$dato = json_decode(file_get_contents('php://input'), true);
	$nom = $dato['nombre'];
	$mysqli->query("insert into Area values (null,'$nom')");
	$result = $mysqli->query("select * from  Area");
	$arr = array();
	while ($row = mysqli_fetch_assoc($result))
	{
		$arr[] = $row;
	}
	echo json_encode($arr);
	mysqli_free_result($result);
	mysqli_close($mysqli);
?>