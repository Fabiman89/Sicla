<?php
require_once("../conexion.php");
$result=mysqli_query($mysqli,
"select n.idNota, n.fecha, n.imagenNota as img8col, n.sintesis, n.texto, t.idTipoNota as tipo,  n.tituloNota, m.urlMedio as idPeriodico, a.nombreAutor as autor, 
		m.nombreMedio, m.imagenMedio as imagen
from Nota n,colabora_en ce, Medio m, Autor a ,tiponota t
where ce.idCE = n.idCE and ce.idMedio = m.idMedio and m.idMedio = ce.idMedio and a.idAutor = ce.idAutor");
$arr = array();
if($result) {
 while($row = $result->fetch_assoc()) {
 $arr[] = $row;
 }
}
echo json_encode($arr);
 mysqli_free_result($result);
  mysqli_close($mysqli);
?>
