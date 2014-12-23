<?php  
	require_once("../conexion.php");
	$medio = $_POST['medio'];
	$imagen = $_FILES['imagen'];
	$allow = array("png","jpg","jpeg");
	if(file_exists($imagen['tmp_name']) || is_uploaded_file($imagen['tmp_name'])) 
	{
		$name = $imagen["name"];	
		$ext = strtolower(pathinfo($name,PATHINFO_EXTENSION));
		if (in_array($ext, $allow))
		{
			if( $imagen['error'] == 0)
			{
				$fecha = date("Y-m-d");
				$tmp_name =$imagen["tmp_name"];								
				move_uploaded_file($tmp_name, "../../imagenes/periodicos/$name-$medio-$fecha");
				$final="imagenes/periodicos/$name-$medio-$fecha";
				$mysqli->query("update Medio set imagen = '$final' where id = $medio");
			}				
		}
	}
	$result = $mysqli->query("select * from Medio");
	$arr = array();
	if ($result)
	{
		while($row = mysqli_fetch_assoc($result))
			$arr = $row;
		mysqli_free_result($result);
	}
	mysqli_close($mysqli);
	echo json_encode($arr);	
?>