<?php
require_once("../conexion.php");
$sentencia = json_decode(file_get_contents('php://input'), true);
$instruccion = $sentencia['sentencia'];
switch ($instruccion){
// USUARIO NORMAL - INICIO   ///  checar order by   /// ERROR 1
	case 1:
		$result=mysqli_query($mysqli,
		"SELECT n.idNota, n.fecha, n.imagenNota as img8col,n.urlNota, n.sintesis, n.texto, t.idTipoNota as tipo,  n.tituloNota, m.urlMedio as idPeriodico, a.nombreAutor as autor, 
				m.nombreMedio, m.imagenMedio as imagen
		from Nota n,colabora_en ce, Medio m, Autor a ,tipoNota t
		where ce.idCE = n.idCE 
		and ce.idMedio = m.idMedio 
		and m.idMedio = ce.idMedio 
		and a.idAutor = ce.idAutor 
		and t.idtiponota = n.idTipoNota
		ORDER BY n.idNota DESC limit 50;");
		$arr = array();
		if($result==true) {
		 while($row = $result->fetch_assoc()) {
		 $arr[] = $row;
		 }
		 echo json_encode($arr);
		 mysqli_free_result($result);
		}else{
		echo ("Error 1");
		}
		mysqli_close($mysqli);
		break; 
//USUARIO NORMAL MEDIOS DE HOY	//    CHECAR ORDER BY   // ERROR2
	case 2:
		$result=mysqli_query($mysqli,
		"SELECT distinct m.nombreMedio, m.urlMedio as idPeriodico, m.imagenMedio as imagen 
		from Medio m, (
			select * 
			from Nota 
			order by Nota.idNota desc 
			limit  50) AS n, colabora_en ce 
		where ce.idCE = n.idCE 
		and ce.idMedio = m.idMedio  
		ORDER BY m.nombreMedio asc");
		$arr = array();
		if($result==true) {
		 while($row = $result->fetch_assoc()) {
		 	$arr[] = $row;
		 }
		 echo json_encode($arr);
		 mysqli_free_result($result);
		}else{
		echo ("Error 2");
		}
		mysqli_close($mysqli);
		break;
// LOGIN Y REGISTRO
	case 3:
		$email = $sentencia["correo"];
		$password = $sentencia["password"];
		$result=mysqli_query($mysqli,"SELECT idUsuario, nombreUsuario, idTipoUsr FROM user WHERE correo = '$email' and password = '$password' ");
		$arr = array();
		if($result->num_rows > 0) {
			$row = mysqli_fetch_assoc($result);
			$id = $row['idUsuario'];
			$name = $row['nombreUsuario'];
			$tipo = $row['idTipoUsr'];
			session_start();
			$_SESSION['uid'] = $id;
			$_SESSION['unm'] = $name;
			$_SESSION['utype'] = $tipo;
			mysqli_free_result($result);
			$arr[] = $row;
			echo json_encode($arr);
		}else{
			echo ("Error 3");
		}
		mysqli_close($mysqli);
	break;

/////
	case 4:
		$tipo = $sentencia["tipo"];
		echo ($tipo);
		switch ($tipo){
			case 3:
				session_start();
				$ipUsr = $_SESSION["utp"];
				$hoy = new DateTime(date("Y-m-d"));
				$restriccion = "n.idNota = n.idNota";
				switch ($ipUsr) 
				{		
					case 3: $hoy->sub(new DateInterval("P15D"));
							$restriccion = "n.Fecha > '".$hoy->format("Y-m-d")."'";
							break;		
					case 5: $hoy->sub(new DateInterval("P3M"));
							$restriccion = "n.Fecha > '".$hoy->format("Y-m-d")."'";
							break;	
					case 6: $hoy->sub(new DateInterval("P1Y"));
							$restriccion = "n.Fecha > '".$hoy->format("Y-m-d")."'";
							break;	
					case 7: $hoy->sub(new DateInterval("P3Y"));
							$restriccion = "n.Fecha > '".$hoy->format("Y-m-d")."'";
							break;	
					case 8: $hoy->sub(new DateInterval("P6Y"));
							$restriccion = "n.Fecha > '".$hoy->format("Y-m-d")."'";
							break;	
				}
				$result = mysqli_query($mysqli,"SELECT min(n.idNota), n.fecha, n.imagenNota as img8col, n.sintesis, n.texto, p.nombreProtagonista, t.nombreTipoNota as tipo, te.nombreTema, su.nombreSubtema, n.tituloNota, m.urlMedio as idPeriodico, a.nombreAutor as autor, 
						m.nombreMedio, m.imagenMedio as imagen
				from Nota n
					 inner Join colabora_en ce on ce.idCE = n.idCE  
					 inner Join Medio m on ce.idMedio = m.idMedio 
					 inner Join Autor a on a.idAutor = ce.idAutor 
					 Left Join tipoNota t on n.idTipoNota = t.idTipoNota
					 Left Join trata_de td on n.idNota = td.idNota_
					 Left Join subtema su on su.idSubtema = td.idSubtema				   					
					 Left Join tema te on te.idTema = su.idSubtema					  
					 Left Join notaProtagonista np on (np.idNota = n.idNota and np.tipoProtagonista = 1)
					 Left Join cargoProtagonista cp on np.idCP = cp.idCP
					 Left Join Protagonista p on cp.idProtagonista = p.idProtagonista
				where $restriccion	
				Group by n.idNota						 					
				ORDER BY n.idNota DESC limit 5000 ");
			break;
			case 4:
				$result=mysqli_query($mysqli,
				"SELECT min(n.idNota), n.fecha, n.imagenNota as img8col, n.sintesis, n.texto, p.nombreProtagonista, t.nombreTipoNota as tipo, te.nombreTema, su.nombreSubtema, n.tituloNota, m.urlMedio as idPeriodico, a.nombreAutor as autor, 
						m.nombreMedio, m.imagenMedio as imagen
				from Nota n
					 inner Join colabora_en ce on ce.idCE = n.idCE  
					 inner Join Medio m on ce.idMedio = m.idMedio 
					 inner Join Autor a on a.idAutor = ce.idAutor 
					 Left Join tipoNota t on n.idTipoNota = t.idTipoNota
					 Left Join trata_de td on n.idNota = td.idNota_
					 Left Join subtema su on su.idSubtema = td.idSubtema				   					
					 Left Join tema te on te.idTema = su.idSubtema					  
					 Left Join notaProtagonista np on (np.idNota = n.idNota and np.tipoProtagonista = 1)
					 Left Join cargoProtagonista cp on np.idCP = cp.idCP
					 Left Join Protagonista p on cp.idProtagonista = p.idProtagonista
				Group by n.idNota						 					
				ORDER BY n.idNota DESC limit 50");				
			break;
		}
		$arr = array();
		if($result==true) {
		 while($row = $result->fetch_assoc()) {
		 	$arr[] = $row;
		 }
		 echo json_encode($arr);
		 mysqli_free_result($result);
		}else{
		echo ("E104");
		}
		mysqli_close($mysqli);
	break;

	default:
	echo json_encode("Error Default");
	break;
}
?>
