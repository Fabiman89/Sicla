<?php  
	require_once("../conexion.php");
	$datos = json_decode(file_get_contents('php://input'), true);
	$nombre = $datos['nombre'];
	$id = $datos['estado']['idEstado'];
	$mysqli->query("insert into municipio values(null,'$nombre',$id)");
	$arr = array();
	$result = $mysqli->query("select * from municipio");
	if ($result)
	{
		while($row = mysqli_fetch_assoc($result))
			$arr[] = $row;
		mysqli_free_result($result);
	}
	echo json_encode($arr);
	mysqli_close($mysqli);
?>