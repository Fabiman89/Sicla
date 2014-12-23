<?php  
require_once("../conexion.php");
$data = json_decode(file_get_contents('php://input'), true);
$medio = $data['medio']['id'];
$autor = $data['autor']['id'];
$mysqli->query("insert into colabora_en values(null, $autor, $medio)");
$result = $mysqli->query("select * from colabora_en");
$arr = array();
if ($result)
	while ($row = mysqli_fetch_assoc($result))
		$arr[] = $row;
echo json_encode($arr);
?>