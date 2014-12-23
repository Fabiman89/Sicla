<?php 
	require_once("../conexion.php");
	$dato = json_decode(file_get_contents('php://input'), true);
	$idMedio = $dato['medio']['id'];
	$nombre = $dato['nombre'];
	$genero = $dato['genero'];
	$result = $mysqli->query("select count(*) as total from Autor where nombre ='$nombre'");
	$row = mysqli_fetch_assoc($result);
	if($row['total']>0)
	{	
		$result = $mysqli->query("select * from Autor where nombre ='$nombre'");	
		$autor = mysqli_fetch_assoc($result);
		$idAutor = $autor['idAutor'];
	}else{		
		$mysqli->query("INSERT INTO Autor VALUES(null,'$nombre', '$genero')");
		$idAutor = $mysqli->insert_id;		
	}

	$mysqli->query("insert into colabora_en values (null,$idAutor, $idMedio)");
	$query = $mysqli->query("select * from autor"); 
	$arr = array();
	while ($row = mysqli_fetch_assoc($query)) 
			$arr[] = $row;
	echo json_encode($arr);
		echo json_encode($idAutor);
	mysqli_free_result($query);
	mysqli_close($mysqli);
?>