 <?php
require_once("../conexion.php");
$sentencia = json_decode(file_get_contents('php://input'), true);
$instruccion = $sentencia['sentencia'];
switch ($instruccion){
// Tipo de nota  (ERROR 301)
	case 1:
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM tipoNota order by nombreTipoNota asc");
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
		$result=mysqli_query($mysqli,"SELECT a.idAutor, a.nombreAutor,a.generoAutor,c.idMedio, c.idCE 
			FROM Autor a, colabora_en c 
			WHERE c.idAutor = a.idAutor 
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
		$result=mysqli_query($mysqli,
		"SELECT ca.*, pr.idCP, pr.idProtagonista 
		 FROM cargoProtagonista pr, Cargo ca 
		 WHERE pr.idCargo = ca.idCargo
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
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM tema 
		 order by nombreTema asc");
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
		 $result=mysqli_query($mysqli,
		 "SELECT * 
		  FROM subtema 
		  order by nombreSubtema asc");
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
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM estado 
		 order by nombreEstado asc");
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
		$result=mysqli_query($mysqli,
		"SELECT * 
		 FROM municipio 
		 order by nombreMunicipio asc");
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
			$result = $mysqli->query("select n.idNota, n.tituloNota, n.fecha, n.paginaNota, n.idTipoNota, n.Clasificacion, n.sintesis, n.texto, n.numeroPeriodico, n.urlNota, n.imagenNota, n.idMunicipio, n.idSeccion, n.idCE, ce.idMedio
			from Nota n, colabora_en ce
			where n.idNota = $id and n.idCE = ce.idCE");
			$arr = array();
			$aux = array();
			if ($result)
			{
				$row = mysqli_fetch_assoc($result); 
				$arr[] = $row;
				if(isset($row["idMunicipio"]))
				{
					$mun = $row["idMunicipio"];
					$result = $mysqli->query("select e.idPais, e.idEstado from estado e, municipio m where m.idMunicipio = $mun and m.idEstado = e.idEstado");
					$row = mysqli_fetch_assoc($result);
					$arr[0]["idPais"] = $row["idPais"];
					$arr[0]["idEstado"] = $row["idEstado"];
				}
				else {
					$arr[0]['idPais'] = 0;
					$arr[0]['idEstado'] = 0;
				}	
				$result = $mysqli->query("select sb.idSubtema, t.idTema, a.idArea
				from trata_de td, subtema sb, tema t, Area a
				where td.idNota_ = $id and td.idSubtema = sb.idSubtema and sb.idTema = t.idTema and t.idArea = a.idArea");
				if ($result)
				{
					while($row = mysqli_fetch_assoc($result))
						$aux[] = $row;
					if(isset($aux[0]['idSubtema']))
						$arr[] = $aux;
					else {
						$arr[1][0]["idSubtema"] = 0;
						$arr[1][0]["idTema"] = 0;
						$arr[1][0]["idArea"] = 0;
					}
				}else 
					echo "Error 316-2";
				$result = $mysqli->query("select count(*) as total from notaProtagonista where idNota = $id");
				$row = mysqli_fetch_assoc($result); 				
				if ($row['total']>0)
				{
					$aux = array();
					$result = $mysqli->query("select cp.idProtagonista, cp.idCP, np.tipoProtagonista
					from notaProtagonista np, cargoProtagonista cp
					where np.idNota = $id and np.idCP = cp.idCP");
					if ($result)
					{
						while ($row = mysqli_fetch_assoc($result))
							if($row['tipoProtagonista'] == 2)
								$aux[] = $row;
							else
							{
								$arr[0]["idProtagonista"] = $row["idProtagonista"];
								$arr[0]["idCP"] = $row["idCP"];	
							}
						$arr[] = $aux;
						mysqli_free_result($result);
					}else
						echo "Error 316-3";
				}
				else {
					$arr[0]["idProtagonista"] =0;
					$arr[0]["idCP"] = "";
				}
			}else
				echo "Error 316-1";
			echo json_encode($arr);
			mysqli_close($mysqli);
			break;

//  NOTAS RECIENTES  (ERROR 317)
			case 17:
				$result = $mysqli->query("SELECT n.idNota, n.idNota, n.tituloNota as titulo, n.fecha, m.nombreMedio, t.nombreTipoNota as tipo, u.nombreUsuario as usuario 
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
				$result = $mysqli->query("SELECT n.idNota, n.tituloNota as titulo, n.fecha, t.nombreTipoNota as tipo, u.nombreUsuario as usuario, m.nombreMedio
							from Nota n 
							Left Join user u on n.idAdmin = u.idUsuario
							Left Join tipoNota t on n.idTipoNota = t.idTipoNota
							Join colabora_en ce on n.idCE = ce.idCE
							Join Medio m on ce.idMedio = m.idMedio
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
// Todos los Temas
case 22:
			$result=mysqli_query($mysqli,
					"SELECT * 
					 FROM tema
					 order by nombreTema asc
					 ");
			$arr = array();
			if($result) {
				 while($row = $result->fetch_assoc()) {
					 $arr[] = $row;
				 }
				 echo json_encode($arr);
				 mysqli_free_result($result);
			}else{
				echo ("Error 322");
			}
			mysqli_close($mysqli);		
	break;
case 23:
//Todos los Subtemas
			$result=mysqli_query($mysqli,
					"SELECT * 
					 FROM subtema
					 order by nombreSubtema asc
					 ");
			$arr = array();
			if($result) {
				 while($row = $result->fetch_assoc()) {
					 $arr[] = $row;
				 }
				 echo json_encode($arr);
				 mysqli_free_result($result);
			}else{
				echo ("Error 323");
			}
			mysqli_close($mysqli);		
	break;
//Todos los Estados
		case 24:
					$result=mysqli_query($mysqli,
							"SELECT * 
							 FROM estado
							 order by nombreEstado asc
							 ");
					$arr = array();
					if($result) {
						 while($row = $result->fetch_assoc()) {
							 $arr[] = $row;
						 }
						 echo json_encode($arr);
						 mysqli_free_result($result);
					}else{
						echo ("Error 324");
					}
					mysqli_close($mysqli);	


			break;
// Todos los Municipios
		case 25:
					$result=mysqli_query($mysqli,
							"SELECT * 
							 FROM municipio
							 order by nombreMunicipio asc
							 ");
					$arr = array();
					if($result) {
						 while($row = $result->fetch_assoc()) {
							 $arr[] = $row;
						 }
						 echo json_encode($arr);
						 mysqli_free_result($result);
					}else{
						echo ("Error 325");
					}
					mysqli_close($mysqli);	
			break;
// Todos los usuarios
		case 26:
			$result = mysqli_query($mysqli, "Select u.idUsuario, u.nombreUsuario, u.apellidoUsuario, u.correo, t.nombreTipoUsuario from user u, TipoUsr t where u.idTipoUsr = t.idTipoUsr and u.idUsuario > 1 order by u.nombreUsuario asc, u.apellidoUsuario asc");
			$arr = array();
			if($result)
			{
				while ($row = mysqli_fetch_assoc($result)) 
					$arr[] = $row;
				echo json_encode($arr);
				mysqli_free_result($result);
			}else
				echo("Error 326");
			mysqli_close($mysqli);
			break;
//RESPUESTA DEFAULT
	default:
		echo json_encode("Error 300 Admin Querys");
		break;



}
?>
