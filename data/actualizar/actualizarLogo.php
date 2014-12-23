<?php 
	require_once("../conexion.php");
	if (isset($_POST['medio']))
			{
				$id = $_POST['medio'];
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
							$result = $mysqli->query("select imagenMedio from Medio where idMedio = $id");
							$row = mysqli_fetch_assoc($result);
							$auxiliar = $row['imagenMedio'];
							if ($auxiliar != "null")
								if (!unlink("../../$auxiliar"))
									echo "Error Logo-5";
							$fecha = date("Y-m-d");
							$tmp_name =$imagen["tmp_name"];								
							move_uploaded_file($tmp_name, "../../imagenes/imagenesMedios/$fecha-$id-$name");
							$final="imagenes/imagenesMedios/$fecha-$id-$name";
							$mysqli->query("update Medio set imagenMedio = '$final' where idMedio = $id");
							$result = $mysqli->query("select * from Medio");
							if ($result)
							{
								$arr = array();
								while ($row = mysqli_fetch_assoc($result))
									$arr[] = $row;								
								mysqli_free_result($result);
								echo json_encode($arr);

							}else
								echo "Error Logo-5";
						}else
							echo "Error Logo-4";
					}else
						echo "Error Logo-3";
				}else
					echo "Error Logo-2";
			}else
				echo "Error Logo-1";
			mysqli_close($mysqli);
?>