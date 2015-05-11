<?php  
	require_once("../conexion.php");
	if(isset($_SERVER['HTTP_CLIENT_IP']))
		$ip = $_SERVER["HTTP_CLIENT_IP"];
	else
	if(isset($_SERVER['REMOTE_ADDR']))
		$ip = $_SERVER["REMOTE_ADDR"];
	$fecha = date('Y-m-d H:i:s');
	$adt = date_create_from_format("Y-m-d H:i:s", $fecha);
	$adt = date_sub($adt, new DateInterval("PT1H"));
	if (isset($ip))
	{
		$result = mysqli_query($mysqli, "Select Fecha from Visita where IP = '$ip' and Fecha >= '".date_format($adt,'Y-m-d H:i:s')."'");
		$row = mysqli_fetch_assoc($result);
		if (!isset($row["Fecha"]))
			mysqli_query($mysqli, "Insert into Visita values('$ip','$fecha')");						
	}
	$result = mysqli_query($mysqli, "Select count(IP) as total from Visita");
	$row = mysqli_fetch_assoc($result);
	echo json_encode($row);
?>