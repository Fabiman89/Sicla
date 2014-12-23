<?php
require_once("conexion.php");
$nota = $_GET['Id'];
$result=mysqli_query($mysqli,"SELECT * FROM noticias where idNoticia='$nota'");
$arr = array();
if($result->num_rows > 0) {
 while($row = $result->fetch_assoc()) {
 $arr[] = $row;
 }
}
echo json_encode($arr);
 mysqli_free_result($result);
  mysqli_close($mysqli);
?>
