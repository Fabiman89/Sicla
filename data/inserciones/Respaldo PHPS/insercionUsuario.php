<?php
require_once("../conexion.php");
$datos = json_decode(file_get_contents('php://input'),true);  //obteniendo JSON
$nombre = $datos['nombre']; // paso los valores a variables porque no pude hacer inserciones desde el $data->value
$apellido = $datos['apellido'];
$correo = $datos['correo'];
$password = $datos['password'];
$tipo = $datos['tipo']['idTipoUsr'];
mysqli_query($mysqli, "INSERT INTO user (nombre,apellido,correo,password,idTipoUsr) VALUES ('$nombre', '$apellido', '$correo','$password',$tipo)"); // query qe inserta
$result=mysqli_query($mysqli,"SELECT * FROM user");  //este query lo puse para que veas que se pueden hacer varios querys, uno por uno pero asi de simple, recupero los valores que acabo de insertar y los imprimo en consola 
//desde la linea anterior ya no es nesesario lo demas, como ya dije es solo para poder regresar algo a consola de navegador y dar seguimiento sin entrar a php myadmin porque me quita tiempo
$arr=array();
if($result->num_rows > 0) {
 while($row = $result->fetch_assoc()) {
 $arr[] = $row;
 }
}
print json_encode($arr);   // con el echo no me funciono, con esto regresas el json de el ultimo query, si solo son inserciones no es nesesario, es solo para corroborar en consola que si se paso algo en bd
mysqli_free_result($result);
mysqli_close($mysqli);
?>
