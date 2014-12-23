<?php  
	require_once("../conexion.php");
	$datos = json_decode(file_get_contents('php://input'), true);
	$sentencia = $datos['sentencia'];
	switch ($sentencia) 
	{
//Actualizar Medio Error 501
		case 1:	if(isset($datos['medio']))
				{
					$id = $datos['medio']['idMedio'];
					$nombre = $datos['medio']['nombreMedio'];
					$url = $datos['medio']['urlMedio'];
					if ($mysqli->query("update Medio 
						set nombreMedio = '$nombre', urlMedio = '$url'
						 where idMedio = $id") === TRUE) {
					    $result  = $mysqli->query("select * from Medio order by nombreMedio asc");
						if ($result)
						{
							$arr = array();
							while ($row = mysqli_fetch_assoc($result)) 
								$arr[] = $row;
							mysqli_free_result($result);
							echo json_encode($arr);
						}else
							echo "Error 501-2";
					} else {
					    echo "Error updating record: " . $mysqli->error;
					}
				}else 
					echo "Error 501-1";
				mysqli_close($mysqli);
				break;
// Error 502
		case 2:	
				break;
//Eliminar Autor de Medio Error 503
		case 3:	if(isset($datos['autor']) )
				{	
					$CE = $datos['autor']['idCE'];
					$result = $mysqli->query("select idMedio from colabora_en where idCE = $CE");
					$row = mysqli_fetch_assoc($result);
					$medio = $row['idMedio'];
					$mysqli->query("delete from colabora_en where idCE = $CE");
					$result = $mysqli->query("select c.idCE, a.nombreAutor 
						from Autor a, colabora_en c 
						where c.idMedio = $medio and c.idAutor = a.idAutor");
					if ($result)
					{
						$arr = array();
						while ($row = mysqli_fetch_assoc($result))
							$arr[] = $row;
						mysqli_free_result($result);
						echo json_encode($arr);
					}else
						echo "Error 503-2";
				}else
					echo "Error 503-1";
				mysqli_close($mysqli);
				break;
//Actualizar Autor Error 504
		case 4:	if(isset($datos['autor']) && isset($datos['medio']))
				{
					$id = $datos['autor']['idAutor'];
					$medio = $datos['medio'];
					$nombre = $datos['autor']['nombreAutor'];
					$genero = $datos['autor']['generoAutor'];
					$mysqli->query("update Autor set nombreAutor = '$nombre', generoAutor = '$genero' where idAutor = $id");
					$result = $mysqli->query("SELECT a.idAutor, a.nombreAutor,a.generoAutor,c.idMedio, c.idCE 
			FROM Autor a, colabora_en c 
			WHERE c.idMedio=$medio 
			and c.idAutor = a.idAutor 
			order by nombreAutor asc");
					if ($result)
					{
						$arr = array();
						while ($row = mysqli_fetch_assoc($result))
							$arr[] = $row;
						mysqli_free_result($result);
						echo json_encode($arr);
					}else
						echo "Error 504-2";
				}else
					echo "Error 504-1";
				mysqli_close($mysqli);
				break;
//Actualizar Protagonista Error 505
		case 5: if(isset($datos['protagonista']))
				{
					$id = $datos['protagonista']['idProtagonista'];
					$nombre = $datos['protagonista']['nombreProtagonista'];
					$genero = $datos['protagonista']['generoProtagonista'];
					if($mysqli->query("UPDATE Protagonista 
						set nombreProtagonista = '$nombre', genero = '$genero' 
						where idProtagonista = $id")===true){
						echo 1;
					}else
						echo "Error 505-2";
				}else{
					echo "Error 505-1";
					echo "Error updating Protagonista: " . $mysqli->error;
				}
				mysqli_close($mysqli);
				break;
//Actualizar Cargo Error 506
		case 6: if(isset($datos['cargo']))
				{	
					$id = $datos['cargo']['idCargo'];
					$nombre = $datos['cargo']['nombre'];
					if($mysqli->query("UPDATE Cargo 
						set nombreCargo = '$nombre' 
						where idCargo = $id")===true){
						echo 1;
					}else
						echo "Error 506-2";
				}else
					echo "Error 506-1";
				mysqli_close($mysqli);
				break;
//Eliminar Cargo de Protagonista Error 507
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
//Actualizar Seccion Error 508
		case 8:	if(isset($datos['seccion']))
				{
					$id = $datos['seccion']['idSeccion'];
					$nombre = $datos['seccion']['nombreSeccion'];
					

					if($mysqli->query("update seccion set nombreSeccion = '$nombre' where idSeccion = $id")===TRUE){
						echo 1;
					}else
						echo "Error 508-2" . $mysqli->error;
				}else
					echo "Error 508-1";
				mysqli_close($mysqli);
				break;
//Actualizar Nota Error 509
		case 9:	if(isset($datos['nota']))
				{
					session_start();
					$user = $_SESSION['uid'];					
					$dato = $datos['nota'];
					$id = $dato['idNota'];
					$ce = $dato['autor']['idCE'];
					$titulo = $dato['titulo'];
					$sintesis = $dato['sintesis'];
					$texto = $dato['texto'];
					$tipo = $dato['tipo']['idTipoNota'];
					$pag = $dato['pagina'];
					$fecha = $dato['fecha'];
					$cargo = $dato['cargo']['idCP'];
					$pos = $dato['posneg'];
					$subtema = $dato['subtema']['idSubtema'];
					$otroSB = $dato['otroSubtema'];
					$otrosCG = $dato['otrosCargo'];
					$seccion = $dato['seccion']['idSeccion'];
					$mun = $dato['municipio']['idMunicipio'];
					$url = $dato['url'];
					$num = $dato['num'];
					if($mysqli->query("UPDATE Nota 
						set tituloNota = '$titulo', fecha = '$fecha', paginaNota = $pag, idTipoNota = $tipo, Clasificacion = '$pos', sintesis = '$sintesis', texto = '$texto', numeroPeriodico = $num, urlNota = '$url', idMunicipio = $mun, idAdmin = $user, idCE = $ce, idSeccion = $seccion
					where idNota = $id")==TRUE){



					$mysqli->query("delete from notaProtagonista where idNota = $id");
					$mysqli->query("delete from trata_de where idNota_ = $id");
					$mysqli->query("insert into trata_de values($id,$subtema)");
					$mysqli->query("insert into notaProtagonista values($id,$cargo,1)");
					for ($i = 0; $i < count($otroSB);$i++)
						if ($otroSB[$i]!=null)
						{
							$aux = $otroSB[$i]['idSubtema'];
							$mysqli->query("insert into trata_de values($id,$aux)");
						}
					for ($i=0; $i < count($otrosCG); $i++)
						if($otrosCG[$i]!=null)
						{
							$aux = $otrosCG[$i]['idCP'];
							$mysqli->query("insert into notaProtagonista values($id,$aux,2)");
						}
					echo 1;
					}else{
						echo "Error en actualizacion 509-2";
					}

				}else
					echo "Error 509-1";
				mysqli_close($mysqli);
				break;
//Actualizar Area Error 510
		case 10:
			if(isset($datos['area']))
			{
				$idArea = $datos['area']['idArea'];
				$nombre = $datos['area']['nombre'];
				if($mysqli->query("update Area 
					set nombreArea = '$nombre'
					where idArea = $idArea ")===True){
					echo 1;
				}else{
					echo "Error 511-2";
				}
			}else{
				echo "Error updating Area: " . $mysqli->error;
			}
			mysqli_close($mysqli);
			break;
				//Actualizar TEMA Error 511
// TEMA
		case 11: if(isset($datos['tema']))
				{
					$id = $datos['tema']['idTema'];
					$nombre = $datos['tema']['nombre'];
					if($mysqli->query("UPDATE tema 
											set nombreTema = '$nombre' 
											where idTema = $id")===true){
						echo 1;
					}
					else
						echo "Error 511-2";
				}else{
					echo "Error 511-1";
					echo "Error updating Tema: " . $mysqli->error;
				}
				mysqli_close($mysqli);
				break;
				//Actualizar subtema Error 512
// SUBTEMA
		case 12: if(isset($datos['subtema']))
				{
					$id = $datos['subtema']['idSubtema'];
					$nombre = $datos['subtema']['nombre'];
					if($mysqli->query("UPDATE subtema 
						set nombreSubtema = '$nombre' 
						where idSubtema = $id")===true){
						echo 1;
					}
					else
						echo "Error 512-2";
				}else{
					echo "Error 512-1";
					echo "Error updating Subtema: " . $mysqli->error;
				}
				mysqli_close($mysqli);
				break;
// PAIS		
		case 13: if(isset($datos['pais'])){
				$id = $datos['pais']['idPais'];
				$nombre = $datos['pais']['nombre'];
				if($mysqli->query("UPDATE pais 
					set nombrePais = '$nombre' 
					where idPais = $id")===TRUE){
					echo 1;
				}else{
					echo "Error 513-2 updating Pais". $mysqli->error;

				}
			}else{
				echo "Error 513-1";
			}
			mysqli_close($mysqli);
			break;
// ESTADO
		case 14: if(isset($datos['estado'])){
				$id = $datos['estado']['idEstado'];
				$nombre = $datos['estado']['nombre'];
				if($mysqli->query("UPDATE estado 
					set nombreEstado = '$nombre' 
					where idEstado = $id")===TRUE){
					echo 1;
				}else{
					echo "Error 514-2 updating Estado". $mysqli->error;

				}
			}else{
				echo "Error 514-1";
			}
			mysqli_close($mysqli);
			break;
// MUNICIPIO
		case 15: if(isset($datos['municipio'])){
				$id = $datos['municipio']['idMunicipio'];
				$nombre = $datos['municipio']['nombre'];
				if($mysqli->query("UPDATE municipio 
					set nombreMunicipio = '$nombre' 
					where idMunicipio = $id")===TRUE){
					echo 1;
				}else{
					echo "Error 515-2 updating Municipio". $mysqli->error;

				}
			}else{
				echo "Error 515-1";
			}
			mysqli_close($mysqli);
			break;
// TIPO NOTA
		case 16: if(isset($datos['tipo'])){
			$id = $datos['tipo']['idTipoNota'];
			$nombre = $datos['tipo']['nombre'];
			if($mysqli->query("UPDATE tipoNota 
				set nombreTipoNota = '$nombre' 
				where idTipoNota = $id ")===TRUE){
						echo 1;
				}else{
					echo "Error 516-2 updating tipoNota ". $mysqli->error;
				}
			}else{
				echo "Error 516-1";
			}
			mysqli_close($mysqli);
			break;
	}
?>