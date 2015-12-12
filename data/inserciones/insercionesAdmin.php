<?php
require_once("../conexion.php");
$sentencia = json_decode(file_get_contents('php://input'), true);
$instruccion = $sentencia['sentencia'];
switch ($instruccion){
// INSERCION NOTA  (ERROR 401)
	case 1:
	session_start();
	$usr = (isset($_SESSION['uid'])) ? $_SESSION['uid'] : "null";
	$datos = $sentencia['nota'];
	$autor = $datos['autor']['idCE'];
	$titulo = $datos['titulo'];
	$sintesis = $datos['sintesis'];
	$texto = $datos['texto'];
	$tipo = (isset($datos['tipo']['idTipoNota'])) ? $datos['tipo']['idTipoNota']: "null";
	$pagina = (isset($datos['pagina'])) ? $datos['pagina'] : "null";
	$fecha = (isset($datos['fecha'])) ? $datos['fecha'] : "null";	
	$cargo = (isset($datos['cargo']['idCP'])) ? $datos['cargo']['idCP'] : "null";
	$pos = (isset($datos['posneg'])) ? $datos['posneg'] : "null";	
	$subtema = (isset($datos['subtema']['idSubtema'])) ? $datos['subtema']['idSubtema'] : "null";
	$otroSB = $datos['otroSubtema'];
	$otrosCG = $datos['otrosCargo'];
	$seccion = (isset($datos['seccion']['idSeccion'])) ? $datos['seccion']['idSeccion'] : "null";
	$municipio = (isset($datos['municipio']['idMunicipio'])) ? $datos['municipio']['idMunicipio'] : "null";
	$url = $datos['url'];
	$per = (isset($datos['num'])) ? $datos['num'] : "null";
	if($mysqli->query("insert into Nota values(null,'$titulo','$fecha',$pagina,$tipo,'$pos','$sintesis','$texto',$per,'$url',null,$municipio,$usr,$autor,$seccion)"))
	{
		$nota = mysqli_insert_id($mysqli);
		$mysqli->query("insert into trata_de values($nota,$subtema)");
		$mysqli->query("insert into notaProtagonista values($nota,$cargo,1)");
		for ($i = 0; $i < count($otroSB);$i++)
			if ($otroSB[$i]!=null)
			{
				$aux = $otroSB[$i]['idSubtema'];
				$mysqli->query("insert into trata_de values($nota,$aux)");
			}
		for ($i=0; $i < count($otrosCG); $i++)
			if($otrosCG[$i]!=null)
			{
				$aux = $otrosCG[$i]['idCP'];
				$mysqli->query("insert into notaProtagonista values($nota,$aux,2)");
			}
		echo $nota;	
	}
	else {
		echo "error de insercion: ".$mysqli->error;
	}
	mysqli_close($mysqli);
	break; 

// MEDIO   (ERROR 402)
	case 2:
		$name = $sentencia['nombre']; // paso los valores a variables porque no pude hacer inserciones desde el $data->value
		$url2 = $sentencia['url'];
		mysqli_query($mysqli,
		"INSERT INTO Medio 
		 VALUES (null,'$name','$url2',null)");
		$medio = mysqli_insert_id($mysqli);
		echo $medio;
		mysqli_close($mysqli);
		break;
// AUTORES (ERROR 403)
	case 3:
		//
		if(isset($sentencia['autor'])){
				$dato = $sentencia['autor'];
				$idMedio = $dato['medio']['idMedio'];
				$nombre = $dato['nombre'];
				$genero = $dato['genero'];
				$result = $mysqli->query("select count(*) as total from Autor where nombreAutor ='$nombre'");
				$row = mysqli_fetch_assoc($result);
				if($row['total']>0)
				{	
					$result = $mysqli->query("select * from Autor where nombreAutor ='$nombre'");	
					$autor = mysqli_fetch_assoc($result);
					$idAutor = $autor['idAutor'];
				}else{		
					$mysqli->query("INSERT INTO Autor VALUES(null,'$nombre', '$genero')");
					$idAutor = $mysqli->insert_id;		
				}
		}elseif(isset($sentencia['autor2'])) {
			$dato = $sentencia['autor2'];
			$idMedio = $dato['medio']['idMedio'];
			$idAutor = $dato['autor']['idAutor'];
		}else{
			echo ("ERROR 403");
			break;
		}
		$mysqli->query("insert into colabora_en values (null,$idAutor, $idMedio)");
		$query = $mysqli->query("SELECT a.idAutor, a.nombreAutor,a.generoAutor,c.idMedio, c.idCE 
			FROM Autor a, colabora_en c 
			WHERE c.idAutor = a.idAutor 
			order by nombreAutor asc");
		$arr = array();
		while ($row = mysqli_fetch_assoc($query)) 
				$arr[] = $row;
		echo json_encode($arr);
		mysqli_free_result($query);
		mysqli_close($mysqli);
	break;
// TIPO NOTA (ERROR 404)	
	case 4:
		$nombre = $sentencia['nombre'];
		$mysqli->query("insert into tipoNota values (null,'$nombre')");
		$result = $mysqli->query("select * from tipoNota order by nombreTipoNota asc");
		$arr = array();
		if ($result)
		{
			while($row = mysqli_fetch_assoc($result))
				$arr[] = $row;
			mysqli_free_result($result);
			echo json_encode($arr);
		}else {
			echo ("Error 404");
		}	
			mysqli_close($mysqli);
		break;
// SECCION (ERROR 405)
	case 5:
		$nombre = $sentencia['nombre'];
		$mysqli->query("insert into seccion values (null,'$nombre')");
		$result = $mysqli->query("select * from seccion order by nombreSeccion asc");
		$arr = array();
		if ($result)
		{
			while($row = mysqli_fetch_assoc($result))
				$arr[] = $row;
			mysqli_free_result($result);
			echo json_encode($arr);
		}else {
			echo ("Error 405");
		}	
			mysqli_close($mysqli);
		break;
// PROTAGONISTA (ERROR 406)
	case 6:
	$dato = $sentencia['protagonista'];
    $nombre = $dato['nombre'];	
	$gen = $dato['genero'];
	$mysqli->query("insert into Protagonista values(null,'$nombre','$gen')");
	$id = mysqli_insert_id($mysqli);
	if (isset($dato['cargo']['idCargo']))
		$mysqli->query("insert into cargoProtagonista values(null,".$dato['cargo']['idCargo'].",$id)");
	$result = $mysqli->query("select * from Protagonista order by nombreProtagonista asc");
	$arr = array();
	if($result)
	{
		while($row = mysqli_fetch_assoc($result))
			$arr[] = $row;
		mysqli_free_result($result);
		echo json_encode($arr);
	} else {
		echo ("Error 406");
	}
		mysqli_close($mysqli);
		break;
// CARGO (ERROR 407)
	case 7:
		$dato = $sentencia['cargo'];
		$nombre = $dato['nombre'];
		$prot = $dato['prot']['idProtagonista'];
		$mysqli->query("insert into Cargo values (null,'$nombre')");
		$cargo = mysqli_insert_id($mysqli);
		$mysqli->query("insert into cargoProtagonista values (null,$cargo,$prot)");
		$result = $mysqli->query("select ca.*, cp.idCP, cp.idProtagonista from Cargo ca, cargoProtagonista cp where cp.idCargo = ca.idCargo order by ca.nombreCargo asc");
		$arr = array();
		if($result)
		{
			while($row = mysqli_fetch_assoc($result))
				$arr[] = $row;
			mysqli_free_result($result);
			echo json_encode($arr);
		}else{
			echo ("Error 407");
		}
		mysqli_close($mysqli);
		break;
// CARGO-PROTAGONISTA(ERROR 408)
	case 8:
		$Prot = $sentencia["prot"]["idProtagonista"];
		$Carg = $sentencia["car"]["idCargo"];
		$mysqli->query("insert into cargoProtagonista values (null, $Carg, $Prot)");
		$result = $mysqli->query("select ca.*, cp.idCP, cp.idProtagonista from Cargo ca, cargoProtagonista cp where cp.idCargo = ca.idCargo order by ca.nombreCargo asc");
		$arr = array();
		if ($result)
		{
			while($row = mysqli_fetch_assoc($result))
				$arr[] = $row;
			echo json_encode($arr);
			mysqli_free_result($result);	
		}else{
			echo ("Error 408");
		}
		mysqli_close($mysqli);
		break;
// AREA (ERROR 409)
	case 9:
		$nom = $sentencia['nombre'];
		$mysqli->query("insert into Area values (null,'$nom')");
		$result = $mysqli->query("select * from  Area order by nombreArea asc");
		$arr = array();
		if ($result){
			while ($row = mysqli_fetch_assoc($result))
				$arr[] = $row;
			echo json_encode($arr);			
			mysqli_free_result($result);
		}else {
			echo ("Error 409");
		}
		mysqli_close($mysqli);
		break;
// TEMA ERROR (410)
	case 10:
		$dato = $sentencia['datos'];
		$area = $dato['area']['idArea'];
		$nom = $dato['nombre'];
		$mysqli->query("insert into tema values (null, $area, '$nom')");
		$result = $mysqli->query("select * from tema order by nombreTema");
		$arr = array();
		if($result){
			while ($row = mysqli_fetch_assoc($result)) 
			{
				$arr[] = $row;	
			}	
			echo json_encode($arr);
			mysqli_free_result($result);
		}else{
			echo ("Error 410");
		}
		mysqli_close($mysqli);
		break;	

//  Subtema (ERROR 411)
	case 11:
		$datos = $sentencia['subtema'];
		$tema = $datos['tema']['idTema'];
		$nombre = $datos['nombre'];
		$mysqli->query("insert into subtema values(null,'$tema','$nombre')");
		$arr = array();
		$result = $mysqli->query("select * from subtema order by nombreSubtema");
		if($result)
		{
			while($row = mysqli_fetch_assoc($result))
				$arr[] = $row;
			echo json_encode($arr);
			mysqli_free_result($result);
		}else {
			echo ("Error 412");
		}
		mysqli_close($mysqli);
		break;
// PAIS (ERROR 412)
	case 12:
		$nom = $sentencia['nombre'];
		$mysqli->query("insert into pais values (null,'$nom')");
		$result = $mysqli->query("select * from  pais order by nombrePais");
		$arr = array();
		if ($result){
		while ($row = mysqli_fetch_assoc($result))
			{
				$arr[] = $row;
			}
			echo json_encode($arr);
			mysqli_free_result($result);
		}else {
			echo ("Error 412");
		}
		mysqli_close($mysqli);
		break;

// ESTADO  (ERROR 413)
	case 13:
		$datos = $sentencia['estado'];
		$pais = $datos['pais']['idPais'];
		$nombre = $datos['nombre'];
		$mysqli->query("insert into estado values(null,'$nombre','$pais')");
		$arr = array();
		$result = $mysqli->query("select * from estado order by nombreEstado");
		if($result)
		{
			while($row = mysqli_fetch_assoc($result))
				$arr[] = $row;
			mysqli_free_result($result);
			echo json_encode($arr);
		} else{
			echo("ERROR 413");
		}
		mysqli_close($mysqli);
		break;


// MUNICIPIO (ERROR 414)
	case 14:
		$datos = $sentencia['municipio'];
		$nombre = $datos['nombre'];
		$id = $datos['estado']['idEstado'];
		$mysqli->query("insert into municipio values(null,'$nombre',$id)");
		$arr = array();
		$result = $mysqli->query("select * from municipio order by nombreMunicipio");
		if ($result)
		{
			while($row = mysqli_fetch_assoc($result))
				$arr[] = $row;
			mysqli_free_result($result);
			echo json_encode($arr);
		}else{
			echo ("ERROR 414");
		}
		mysqli_close($mysqli);
		break;

	case 15:
		$datos=$sentencia['newAdmn'];
		$nombre = $datos['nombre']; // paso los valores a variables porque no pude hacer inserciones desde el $data->value
		$apellido = $datos['apellido'];
		$correo = $datos['correo'];
		$password = $datos['password'];
		$tipo = $datos['tipo']['idTipoUsr'];
		mysqli_query($mysqli, "INSERT INTO user (nombreUsuario,apellidoUsuario,correo,password,idTipoUsr) VALUES ('$nombre', '$apellido', '$correo','$password',$tipo)"); // query qe inserta
		$result=mysqli_query($mysqli,"SELECT * FROM user");  //este query lo puse para que veas que se pueden hacer varios querys, uno por uno pero asi de simple, recupero los valores que acabo de insertar y los imprimo en consola 
		//desde la linea anterior ya no es nesesario lo demas, como ya dije es solo para poder regresar algo a consola de navegador y dar seguimiento sin entrar a php myadmin porque me quita tiempo
		$arr=array();
		if($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
		 $arr[] = $row;
		 }
		  print json_encode($arr);   // con el echo no me funciono, con esto regresas el json de el ultimo query, si solo son inserciones no es nesesario, es solo para corroborar en consola que si se paso algo en bd
		  mysqli_free_result($result);
		}else{
			echo ('ERROR 415');
		}

		break;


	default:
		echo json_encode("Error 400 Admin Querys");
		break;
}
?>
