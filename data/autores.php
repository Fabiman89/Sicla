<?php
require_once("conexion.php");
$idMedio = $_GET['id'];
$arr = array();
$result=mysqli_query($mysqli,"SELECT a.idAutor, a.nombre, c.idCE FROM Autor a, colabora_en c WHERE c.idMedio=$idMedio and c.idAutor = a.idAutor");
if($result->num_rows > 0) {
 while($row = $result->fetch_assoc()) {
 $arr[] = $row;
 }
 mysqli_free_result($result);
}
echo json_encode($arr);
mysqli_close($mysqli);
?>
