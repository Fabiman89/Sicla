<?php 
	require_once("../conexion.php");
	if (isset($_POST['nota']))
		{
			$id = $_POST['nota'];
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
						$result = $mysqli->query("select imagenNota from Nota where idNota = $id");
						$row = mysqli_fetch_assoc($result);
						if (isset($row['imagenNota']))
							if (!unlink("../../".$row['imagenNota']))
								echo "Error al borrar imagen del servidor ";
						$fecha = date("Y-m-d");
						$tmp_name =$imagen["tmp_name"];								
						move_uploaded_file($tmp_name, "../../imagenes/imagenesNotas/$fecha-$id-$name");
						$final="imagenes/imagenesNotas/$fecha-$id-$name";
						$mysqli->query("update Nota set imagenNota = '$final' where idNota = $id");
						echo 1;						
					}else
						echo "Error Portada-4";
				}else
					echo "Error Portada-3";
			}else
				echo "Error Portada-2";
		}else
			echo "Error Portada-1";
		mysqli_close($mysqli);
?>