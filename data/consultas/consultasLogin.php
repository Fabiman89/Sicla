<?php
session_start();
require_once("../conexion.php");
$sentencia = json_decode(file_get_contents('php://input'), true);
$instruccion = $sentencia['sentencia'];
switch ($instruccion){
// LOGIN Y REGISTRO    Error 1
	case 1:
		$email = $sentencia["correo"];
		$password = $sentencia["password"];
		$result=mysqli_query($mysqli,"SELECT * FROM user WHERE correo = '$email' and password = '$password' ");
		$arr = array();
		if($result->num_rows > 0) {
			$row = mysqli_fetch_assoc($result);
			$id = $row['idUsuario'];
			$name = $row['nombreUsuario'];
			$_SESSION['uid'] = $id;
			$_SESSION['unm'] = $name;
			mysqli_free_result($result);
			$arr[] = $row;
			echo json_encode($arr);
		}else{
			echo ("Error 201");
		}
		mysqli_close($mysqli);
		break;
//Chequeo de sesion
	case 2:
		if (isset($_SESSION['unm']))
		{
			echo $_SESSION['unm'];
		} else{
			//echo $_SESSION['unm'];
			echo ("Error 202");
		}
		break;
// Cerrar Session
	case 3:
		$_SESSION = array();
		session_destroy();
		echo ("Session Closed");
		break;

	default:
	echo json_encode("Error Logins");
	break;
}
?>
