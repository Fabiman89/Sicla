 <?php
require_once("../conexion.php");
$sentencia = json_decode(file_get_contents('php://input'), true);
$instruccion = $sentencia['sentencia'];
switch ($instruccion){
// Tipo de nota  (ERROR 301)
	case 1:
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM tipoNota");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 301");
		}
		mysqli_close($mysqli);
		break; 
// MEDIO   (ERROR 302)
	case 2:
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM Medio order by nombreMedio asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 302");
		}
		mysqli_close($mysqli);
		break;
// AUTORES (ERROR 303)
	case 3:
		$idMedio = $sentencia['id'];
		$result=mysqli_query($mysqli,"SELECT a.idAutor, a.nombreAutor,a.generoAutor,c.idMedio, c.idCE 
			FROM Autor a, colabora_en c 
			WHERE c.idMedio= $idMedio 
			and c.idAutor = a.idAutor 
			order by nombreAutor asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 303");
		}
		mysqli_close($mysqli);
		break;
// SECCIONES (ERROR 304)	
	case 4:
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM seccion order by nombreSeccion asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 304");
		}
		mysqli_close($mysqli);
		break;
// PROTAGONISTAS (ERROR 305)
	case 5:
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM Protagonista order by nombreProtagonista asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 305");
		}
		mysqli_close($mysqli);
		break;
// CARGO PROTAGONISTA (ERROR 306)
	case 6:
		$pro = $sentencia['protagonista'];
		$result=mysqli_query($mysqli,
		"SELECT ca.*, pr.idCP, pr.idProtagonista 
		 FROM cargoProtagonista pr, Cargo ca 
		 WHERE pr.idProtagonista=$pro 
		 and pr.idCargo = ca.idCargo
		 order by nombreCargo asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 306");
		}
		mysqli_close($mysqli);
		break;
// AREAS (ERROR 307)
	case 7:
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM Area order by nombreArea asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 307");
		}
		mysqli_close($mysqli);
		break;
// TEMAS (ERROR 308)
	case 8:
		$area = $sentencia['area'];
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM tema 
		 WHERE idArea = $area order by nombreTema asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 308");
		}
		mysqli_close($mysqli);
		break;
// SUBTEMAS (ERROR 309)
	case 9:
		$tema = $sentencia['tema'];
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM subtema 
		 WHERE idTema = $tema order by nombreSubtema asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 309");
		}
		mysqli_close($mysqli);
		break;
// PAIS ERROR (310)
	case 10:
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM pais order by nombrePais asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 310");
		}
		mysqli_close($mysqli);
		break;	
// ESTADOS (ERROR 311)
	case 11:
		$pais = $sentencia['pais'];
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM estado 
		 WHERE idPais = $pais order by nombreEstado asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 311");
		}
		mysqli_close($mysqli);
		break;
// MUNICIPIOS (ERROR 312)
	case 12:
		$estado = $sentencia['estado'];
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM municipio 
		 WHERE idEstado = $estado order by nombreMunicipio asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 312");
		}
		mysqli_close($mysqli);
		break;
//TODOS LOS CARGOS (ERROR 313) 
	case 13:
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM Cargo order by nombreCargo asc");
		$arr = array();
		if($result) {
			 while($row = $result->fetch_assoc()) {
				 $arr[] = $row;
			 }
			 echo json_encode($arr);
			 mysqli_free_result($result);
		}else{
			echo ("Error 313");
		}
		mysqli_close($mysqli);
		break;
//NOT CARGO (ERROR 314)
	case 14:
		$id = $sentencia['protagonista']['idProtagonista'];
		$arr = array();
		$result = $mysqli->query("SELECT * from Cargo where idCargo not in(select idCargo from cargoProtagonista where idProtagonista=$id) order by nombreCargo asc");
		if ($result)
		{
			while($row = mysqli_fetch_assoc($result))
				$arr[] = $row;
			mysqli_free_result($result);	
			echo json_encode($arr);
		}else{
			echo ("Error 314");
		}
		mysqli_close($mysqli);
		break;
//TEMA-AREA (ERROR 315) 
	case 15:
		$area = $sentencia['area'];
		$result = $mysqli->query("SELECT * from tema where idArea = $area order by nombreTema asc");
		$arr = array();
		if($result){
			while($row = mysqli_fetch_assoc($result))
			{
				$arr[] = $row;
			}
			echo json_encode($arr);
			mysqli_free_result($result);
		}else {
			echo("Error 315");
		}
		mysqli_close($mysqli);
		break;

// EDITAR NOTA (ERROR 316)	
		case 16:
			$id = $sentencia['id'];
			$result = $mysqli->query("select n.idNota, n.tituloNota, n.fecha, n.paginaNota, n.idTipoNota, n.Clasificacion, n.sintesis, n.texto, n.numeroPeriodico, n.urlNota, n.imagenNota, n.idMunicipio, n.idSeccion, n.idCE, m.idMedio, p.idPais, es.idEstado, pt.idProtagonista, cp.idCP
			from Nota n, Medio m, Autor a, colabora_en ce, municipio mu, estado es, pais p, seccion se, tipoNota tp, notaProtagonista np, cargoProtagonista cp, Cargo c, Protagonista pt 
			where n.idNota = $id and n.idCE = ce.idCE and ce.idAutor = a.idAutor and ce.idMedio = m.idMedio and n.idMunicipio = mu.idMunicipio and mu.idEstado = es.idEstado and es.idPais = p.idPais and n.idSeccion = se.idSeccion and n.idTipoNota = tp.idTipoNota and np.idNota = n.idNota and np.tipoProtagonista = 1 and np.idCP = cp.idCP and cp.idProtagonista = pt.idProtagonista and cp.idCargo = c.idCargo");
			$arr = array();
			$aux = array();
			if ($result)
			{
				$row = mysqli_fetch_assoc($result); 
				$arr[] = $row;	
				$result = $mysqli->query("select sb.idSubtema, t.idTema, a.idArea
				from trata_de td, subtema sb, tema t, Area a
				where td.idNota_ = $id and td.idSubtema = sb.idSubtema and sb.idTema = t.idTema and t.idArea = a.idArea");
				if ($result)
				{
					while($row = mysqli_fetch_assoc($result))
						$aux[] = $row;
					$arr[] = $aux;
				}else 
					echo "Error 316-2";
				$result = $mysqli->query("select count(*) as total from notaProtagonista where idNota = $id and tipoProtagonista = 2");
				$row = mysqli_fetch_assoc($result); 				
				if ($row['total']>0)
				{
					$aux = array();
					$result = $mysqli->query("select pt.idProtagonista, cp.idCP
					from notaProtagonista np, cargoProtagonista cp, Cargo c, Protagonista pt 
					where np.idNota = $id and np.tipoProtagonista = 2 and np.idCP = cp.idCP and cp.idProtagonista = pt.idProtagonista and cp.idCargo = c.idCargo");
					if ($result)
					{
						while ($row = mysqli_fetch_assoc($result))
							$aux[] = $row;
						$arr[] = $aux;
						mysqli_free_result($result);
					}else
						echo "Error 316-3";
				}
			}else
				echo "Error 316-1";
			echo json_encode($arr);
			mysqli_close($mysqli);
			break;

//  NOTAS RECIENTES  (ERROR 317)
			case 17:
				$result = $mysqli->query("SELECT n.idNota, n.idNota, n.tituloNota as titulo, m.nombreMedio, t.nombreTipoNota as tipo, u.nombreUsuario as usuario 
					from Nota n, Medio m, user u, tipoNota t, colabora_en ce 
					where n.idCE= ce.idCE and ce.idMedio = m.idMedio and n.idAdmin = u.idUsuario and n.idTipoNota = t.idTipoNota 
					order by n.idNota 
					desc limit 30");
				$arr = array();
				if($result)
				{
					while ($row = mysqli_fetch_assoc($result)) 
						$arr[] = $row;	
					echo json_encode($arr);
					mysqli_free_result($result);
				}else{
					echo ("ERROR 317");
				} 
				mysqli_close($mysqli);
				break;

//  ENCONTRAR NOTAS  (ERROR 318)
			case 18:
				$result = $mysqli->query("SELECT n.idNota, n.tituloNota as titulo, m.nombreMedio, t.nombreTipoNota as tipo, u.nombreUsuario as usuario 
							from Nota n, Medio m, user u, tipoNota t, colabora_en ce 
							where n.idCE = ce.idCE and ce.idMedio = m.idMedio and n.idAdmin = u.idUsuario and n.idTipoNota = t.idTipoNota 
							order by n.idNota desc");
				$arr = array();
				if($result)
				{
					while ($row = mysqli_fetch_assoc($result)) 
						$arr[] = $row;	
					echo json_encode($arr);
					mysqli_free_result($result);
				}else{
					echo ("ERROR 318");
				} 
				mysqli_close($mysqli);
				break;

// tipo usuario (ERROR 319) 
	case 19:

		$result = $mysqli->query("SELECT * from TipoUsr order by nombreTipoUsuario asc");
		$arr = array();
		if($result){
			while($row = mysqli_fetch_assoc($result))
			{
				$arr[] = $row;
			}
			echo json_encode($arr);
			mysqli_free_result($result);
		}else {
			echo("Error 319");
		}
		mysqli_close($mysqli);
		break;

//TODOS LOS AUTORES
		case 20:
			$idMedio = $sentencia['idMedio'];
			$result=mysqli_query($mysqli,
					"SELECT * 
					 FROM Autor where idAutor not in (select idAutor
					 								  from colabora_en 
					 								  where idMedio=$idMedio) 
					 order by nombreAutor asc
					 ");
			$arr = array();
			if($result) {
				 while($row = $result->fetch_assoc()) {
					 $arr[] = $row;
				 }
				 echo json_encode($arr);
				 mysqli_free_result($result);
			}else{
				echo ("Error 320");
			}
			mysqli_close($mysqli);			
			break;
// Toos autores
		case 21:
			$result=mysqli_query($mysqli,
					"SELECT * 
					 FROM Autor  
					 order by nombreAutor asc
					 ");
			$arr = array();
			if($result) {
				 while($row = $result->fetch_assoc()) {
					 $arr[] = $row;
				 }
				 echo json_encode($arr);
				 mysqli_free_result($result);
			}else{
				echo ("Error 321");
			}
			mysqli_close($mysqli);			
			break;

//RESPUESTA DEFAULT
	default:
		echo json_encode("Error 300 Admin Querys");
		break;



}
?>
