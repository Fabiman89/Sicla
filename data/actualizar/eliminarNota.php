<?php
	require_once("../conexion.php");
	$dato = json_decode(file_get_contents('php://input'), true);
	$id = $dato['idNota'];
	$result = $mysqli->query("select imagenNota from Nota where idNota = $id");
	$row = mysqli_fetch_assoc($result);
	if($row['imagenNota'] != 'null')
		if (!unlink("../../".$row['imagenNota']))
			echo "Error Imagen-5";
	$mysqli->query("delete from notaProtagonista where idNota = $id");
	$mysqli->query("delete from trata_de where nota_fk3 = $id");
	$mysqli->query("delete from Nota where idNota = $id");
	$result = $mysqli->query("SELECT n.idNota, n.tituloNota as titulo, m.nombreMedio, t.nombreTipoNota as tipo, u.nombreUsuario as usuario 
					from Nota n, Medio m, user u, tipoNota t, colabora_en ce 
					where n.idCE= ce.idCE and ce.idMedio = m.idMedio and n.idAdmin = u.idUsuario and n.idTipoNota = t.idTipoNota 
					order by n.fecha 
					desc limit 30");
	$arr = array();
	if ($result)
	{
		while ($row = mysqli_fetch_assoc($result))
			$arr[] = $row;
		mysqli_free_result($result);
	}
	echo json_encode($arr);
	mysqli_close($mysqli);
?>