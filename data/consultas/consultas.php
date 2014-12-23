<?php
require_once("../conexion.php");
$sentencia = json_decode(file_get_contents('php://input'), true);
$instruccion = $sentencia['sentencia'];
switch ($instruccion){
// USUARIO NORMAL - INICIO   ///  checar order by   /// ERROR 1
	case 1:
		$result=mysqli_query($mysqli,
		"SELECT n.idNota, n.fecha, n.imagenNota as img8col, n.sintesis, n.texto, t.idTipoNota as tipo,  n.tituloNota, m.urlMedio as idPeriodico, a.nombreAutor as autor, 
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
		"SELECT DISTINCT m.nombreMedio, m.urlMedio as idPeriodico, m.imagenMedio as imagen
		 from Nota n, colabora_en ce, Medio m
		 where ce.idCE = n.idCE and ce.idMedio = m.idMedio  ORDER BY n.idNota DESC limit 50; ");
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
		$result=mysqli_query($mysqli,"SELECT * FROM user WHERE correo = '$email' and password = '$password' ");
		$arr = array();
		if($result->num_rows > 0) {
			$row = mysqli_fetch_assoc($result);
			$id = $row['idUsuario'];
			$name = $row['nombreUsuario'];
			session_start();
			$_SESSION['uid'] = $id;
			$_SESSION['unm'] = $name;
			mysqli_free_result($result);
			$arr[] = $row;
			echo json_encode($arr);
		}else{
			echo ("Error 3");
		}
		mysqli_close($mysqli);
		break;

	default:
	echo json_encode("Error Default");
	break;
}
?>
