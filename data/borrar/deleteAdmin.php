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

		//Eliminar Cargo de Protagonista Error 607
		case 7:	if(isset($datos['cargo']))
				{
					$cp = $datos['cargo']['idCP'];
					$result = $mysqli->query("select idProtagonista from cargoProtagonista where idCP = $cp");
					$row = mysqli_fetch_assoc($result);
					$prot = $row['idProtagonista'];
					$mysqli->query("delete from cargoProtagonista where idCP = $cp");
					$result = $mysqli->query("select cp.idCP, c.nombreCargo
						from Cargo c, cargoProtagonista cp
						where cp.idProtagonista = $prot and cp.idCargo = c.idCargo");
					if ($result)
					{
						$arr = array();
						while ($row = mysqli_fetch_assoc($result))
							$arr[] = $row;
						mysqli_free_result($result);
						echo json_encode($arr);
					}else
						echo "Error 507-2";
				}else
					echo "Error 507-1";
				mysqli_close($mysqli);
				break;

		//Error 610
		case 10:
				break;
				
	}
?>