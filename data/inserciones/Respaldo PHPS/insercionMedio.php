<?php
require_once("../conexion.php");
$datos = json_decode(file_get_contents('php://input'));  //obteniendo JSON
$name = $datos->nombre; // paso los valores a variables porque no pude hacer inserciones desde el $data->value
$url2 = $datos->url;
mysqli_query($mysqli,"INSERT INTO Medio VALUES (null,'$name', '$url2', null)"); // query qe inserta
$medio = mysqli_insert_id($mysqli);
echo $medio;
mysqli_close($mysqli);
?>

