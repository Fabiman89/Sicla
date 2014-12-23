<?php  
	require_once("../conexion.php");
	$dato = json_decode(file_get_contents('php://input'), true);
	$area = $dato['area']['idArea'];
	$nom = $dato['nombre'];
	$mysqli->query("insert into tema values (null, $area, '$nom')");
	$result = $mysqli->query("select * from tema");
	$arr = array();
	while ($row = mysqli_fetch_assoc($result)) 
	{
		$arr[] = $row;	
	}
	echo json_encode($arr);
	mysqli_free_result($result);
	mysqli_close($mysqli);
?>