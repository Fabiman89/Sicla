<?php
require_once("conexion.php");

$result=mysqli_query($mysqli,"SELECT * FROM noticias t1 
							   INNER JOIN periodicos t2
							   ON 
							   t1.periodico=t2.id
							   and t1.tipo='0'
							   ");
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
