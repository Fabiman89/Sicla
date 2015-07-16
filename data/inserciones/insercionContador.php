<?php  
	require_once("../conexion.php");
	$datos = json_decode(file_get_contents('php://input'), true);
	if(isset($_SERVER['HTTP_CLIENT_IP']))
		$ip = $_SERVER["HTTP_CLIENT_IP"];
	else
	if(isset($_SERVER['REMOTE_ADDR']))
		$ip = $_SERVER["REMOTE_ADDR"];
	$fecha = date('Y-m-d H:i:s');
	$adt = date_create_from_format("Y-m-d H:i:s", $fecha);
	$adt = date_sub($adt, new DateInterval("PT1H"));
	if ($datos['Sitio'] == 'Logueado')
	{
		session_start();
		$id = $_SESSION['uid'];
		$result = mysqli_query($mysqli, "Select concat_ws(' ',nombreUsuario, apellidoUsuario) as nombre from user where idUsuario = $id");
		$row = mysqli_fetch_assoc($result);
		if (isset($row['nombre']))
			$usuario = $row['nombre'];
		else
			return;
	}
	else
		$usuario = "Visitante";
	if (isset($ip))
	{
		$result = mysqli_query($mysqli, "Select Fecha from Visita where IP = '$ip' and Fecha >= '".date_format($adt,'Y-m-d H:i:s')."' and Usuario = '$usuario'");
		$row = mysqli_fetch_assoc($result);
		if (!isset($row["Fecha"]))
			mysqli_query($mysqli, "Insert into Visita values('$ip','$fecha', '$usuario')");						
	}	
?>