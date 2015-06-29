<?php  
	require_once("../conexion.php");
	$nota = $_POST['nota'];
	$imagen = $_FILES['imagen'];
	$allow = array("png","jpg","jpeg","gif","tiff");
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
				move_uploaded_file($tmp_name, "../../imagenes/imagenesNotas/$fecha-$nota-$name");
				$final="imagenes/imagenesNotas/$fecha-$nota-$name";
				$mysqli->query("update Nota set imagenNota = '$final' where idNota = $nota");
				mysqli_free_result($result);
				mysqli_close($mysqli);				
				echo 1;
			}
			else
				echo "Error: La imagen no subió al servidor.";							
		}
		else 
			echo "Error: La extensión ".$ext." no está permitida.";
	}
	else
		echo "Error: La imagen no subió al servidor.";
?>