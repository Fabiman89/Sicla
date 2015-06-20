<?php  
	require_once("../conexion.php");
	$datos = json_decode(file_get_contents('php://input'), true);
	$sentencia = $datos['sentencia'];
	switch ($sentencia) 
	{
//Eliminar Medio Error 601
		case 1:	if(isset($datos['medio']))
				{
					$id = $datos['medio']['idMedio'];
					if ($mysqli->query("delete from Medio
						 where idMedio = $id") === TRUE) {
						echo 1;
					} else {
					    echo "Error deleting Medio: " . $mysqli->error;
					}
				}else 
					echo "Error 601-1 ";
				mysqli_close($mysqli);
				break;
// Error 602
		case 2:	
				break;
//Eliminar Autor de Medio Error 603
		case 3:	if(isset($datos['autor']) )
				{	
					$CE = $datos['autor']['idCE'];
					$medio = $datos['autor']['idMedio'];
					;
					if ($mysqli->query("delete from colabora_en where idCE = $CE")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Autor: " . $mysqli->error;
				}else
					echo "Error 603-1";
				mysqli_close($mysqli);
				break;

//Eliminar Area
		case 4: if(isset($datos['id']) )
				{	
					$id = $datos['id'];

					if ($mysqli->query("delete from Area where idArea = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Area: " . $mysqli->error;
				}else
					echo "Error 604-1";
				mysqli_close($mysqli);
				break;
//Eliminar Tema
		case 5: if(isset($datos['id']) )
				{	
					$id = $datos['id'];

					if ($mysqli->query("delete from tema where idTema = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Tema: " . $mysqli->error;
				}else
					echo "Error 605-1";
				mysqli_close($mysqli);
				break;
// Eliminar Subtema
		case 6: if(isset($datos['id']) )
				{	
					$id = $datos['id'];

					if ($mysqli->query("delete from subtema where idSubtema = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Subtema: " . $mysqli->error;
				}else
					echo "Error 606-1";
				mysqli_close($mysqli);
				break;
		case 7:
			break;
//Eliminar Pais
		case 8: if(isset($datos['id']) )
				{	
					$id = $datos['id'];
					if ($mysqli->query("delete from pais where idPais = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Pais: " . $mysqli->error;
				}else
					echo "Error 608-1";
				mysqli_close($mysqli);
				break;
//Eliminar Estado
		case 9: if(isset($datos['id']) )
				{	
					$id = $datos['id'];

					if ($mysqli->query("delete from estado where idEstado = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Estado: " . $mysqli->error;
				}else
					echo "Error 609-1";
				mysqli_close($mysqli);
				break;
//Eliminar Municipio Error 610
		case 10:if(isset($datos['id']) )
				{	
					$id = $datos['id'];

					if ($mysqli->query("delete from municipio where idMunicipio = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Municipio: " . $mysqli->error;
				}else
					echo "Error 610-1";
				mysqli_close($mysqli);

				break;
//Eliminar Seccion Error 611
		case 11:if(isset($datos['id']) )
				{	
					$id = $datos['id'];

					if ($mysqli->query("delete from seccion where idSeccion = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Seccion: " . $mysqli->error;
				}else
					echo "Error 611-1";
				mysqli_close($mysqli);
				break;
//Eliminar Tipo de nota Error 612
		case 12:if(isset($datos['id']) )
				{	
					$id = $datos['id'];

					if ($mysqli->query("delete from tipoNota where idTipoNota = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Tipo de nota: " . $mysqli->error;
				}else
					echo "Error 612-1";
				mysqli_close($mysqli);
				break;
//Eliminar Protagonista
		case 13:if(isset($datos['id']) )
				{	
					$id = $datos['id'];

					if ($mysqli->query("delete from Protagonista where idProtagonista = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Protagonista: " . $mysqli->error;
				}else
					echo "Error 613-1";
				mysqli_close($mysqli);
				break;
//Eliminar Cargo
		case 14:if(isset($datos['id']) )
				{	
					$id = $datos['id'];

					if ($mysqli->query("delete from Cargo where idCargo = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Cargo: " . $mysqli->error;
				}else
					echo "Error 614-1";
				mysqli_close($mysqli);
				break;
//Eliminar Cargo - Protagonista
		case 15:if(isset($datos['id']) )
				{	
					$id = $datos['id'];

					if ($mysqli->query("delete from cargoProtagonista where idCP = $id")===true)
					{
						echo 1;
					}else
					    echo "Error deleting Cargo: " . $mysqli->error;
				}else
					echo "Error 615-1";
				mysqli_close($mysqli);
				break;
		case 16:
			if (isset($datos['nota']))
			{
				$id = $datos['nota'];			
				$result = $mysqli->query("select imagenNota from Nota where idNota = $id");
				$row = mysqli_fetch_assoc($result);
				if (isset($row['imagenNota']))
				{
					if (unlink("../../".$row['imagenNota']))
					{					
						$mysqli->query("update Nota set imagenNota = null where idNota = $id");
						echo 1;						
					}
					else
						echo "Error al borrar imagen del servidor ";
				}
				else
					echo 1;						
			}else
				echo "Error Portada-1";
			mysqli_close($mysqli);
			break;
	}
?>