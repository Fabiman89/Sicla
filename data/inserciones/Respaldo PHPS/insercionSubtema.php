<?php  
	require_once("../conexion.php");
	$dato = json_decode(file_get_contents('php://input'), true);
	$tema = $dato['tema']['idTema'];
	$nombre = $dato['nombre'];
	$mysqli->query("insert into subtema values(null, $tema, '$nombre')");
	$result = $mysqli->query("select * from subtema");
	$arr = array();
	while ($row = mysqli_fetch_assoc($result)) 
	{
		$arr[] = $row;	
	}
	echo json_encode($arr);
	mysqli_free_result($result);
	mysqli_close($mysqli);
?>