<?php
	require_once("../conexion.php");
	$sentencia = json_decode(file_get_contents('php://input'), true);
	$instruccion = $sentencia['sentencia'];
	switch ($instruccion) 
	{
		case 1:
			$result = mysqli_query($mysqli, "Select idMedio, count(idMedio) as total from Medio where nombreMedio = '".$sentencia['medio']."'");
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idMedio'];
			else
			{				
				$result = mysqli_query($mysqli, "Select idMedio, count(idMedio) as total from Medio where nombreMedio like '%".$sentencia['medio']."%'");
				$row = mysqli_fetch_assoc($result);
				if ($row['total'] == 1)
					echo $row['idMedio'];
				else
					echo 0;
			}			
			break;	
		case 2:
			$result = mysqli_query($mysqli, "Select idAutor, count(idAutor) as total from Autor where nombreAutor = '".$sentencia['autor']."'");
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idAutor'];
			else			
			{
				$result = mysqli_query($mysqli, "Select idAutor, count(idAutor) as total from Autor where nombreAutor like '%".$sentencia['autor']."%'");
				$row = mysqli_fetch_assoc($result);
				if ($row['total'] == 1)
					echo $row['idAutor'];
				else
					echo 0;
			}					
			break;		
		case 3:
			$result = mysqli_query($mysqli, "Select idSeccion, count(idSeccion) as total from Seccion where nombreSeccion = '".$sentencia['seccion']."'");
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idSeccion'];
			else
			{
				$result = mysqli_query($mysqli, "Select idSeccion, count(idSeccion) as total from Seccion where nombreSeccion like '%".$sentencia['seccion']."%'");
				$row = mysqli_fetch_assoc($result);
				if ($row['total'] == 1)
					echo $row['idSeccion'];
				else
					echo 0;	
			}
			break;	
		case 4:
			$result = mysqli_query($mysqli, "Select idTipoNota, count(idTipoNota) as total from tipoNota where nombreTipoNota = '".$sentencia['tipo']."'");
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idTipoNota'];
			else
			{
				$result = mysqli_query($mysqli, "Select idTipoNota, count(idTipoNota) as total from tipoNota where nombreTipoNota like '%".$sentencia['tipo']."%'");
				$row = mysqli_fetch_assoc($result);
				if ($row['total'] == 1)
					echo $row['idTipoNota'];
				else
					echo 0;	
			}
			break;		
		case 5:
			$result = mysqli_query($mysqli, "Select idMunicipio, count(idMunicipio) as total from Municipio where nombreMunicipio = '".$sentencia['municipio']."'");
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idMunicipio'];
			else
			{
				$result = mysqli_query($mysqli, "Select idMunicipio, count(idMunicipio) as total from Municipio where nombreMunicipio like '%".$sentencia['municipio']."%'");
				$row = mysqli_fetch_assoc($result);
				if ($row['total'] == 1)
					echo $row['idMunicipio'];
				else
					echo 0;
			}		
			break;
		case 6:
			$result = mysqli_query($mysqli, "Select idProtagonista, count(idProtagonista) as total from Protagonista where nombreProtagonista = '".$sentencia['protagonista']."'");
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idProtagonista'];
			else
			{
				$result = mysqli_query($mysqli, "Select idProtagonista, count(idProtagonista) as total from Protagonista where nombreProtagonista like '%".$sentencia['protagonista']."%'");
				$row = mysqli_fetch_assoc($result);
				if ($row['total'] == 1)
					echo $row['idProtagonista'];
				else
					echo 0;			
			}
			break;
		case 7:
			$result = mysqli_query($mysqli, "Select idCargo, count(idCargo) as total from Cargo where nombreCargo = '".$sentencia['cargo']."'");
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idCargo'];
			else
			{
				$result = mysqli_query($mysqli, "Select idCargo, count(idCargo) as total from Cargo where nombreCargo like '%".$sentencia['cargo']."%'");
				$row = mysqli_fetch_assoc($result);
				if ($row['total'] == 1)
					echo $row['idCargo'];
				else
					echo 0;						
			}						
			break;		
		case 8:
			$result = mysqli_query($mysqli, "Select idArea, count(idArea) as total from Area where nombreArea = '".$sentencia['area']."'");
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idArea'];
			else
			{
				$result = mysqli_query($mysqli, "Select idArea, count(idArea) as total from Area where nombreArea like '%".$sentencia['area']."%'");
				$row = mysqli_fetch_assoc($result);
				if ($row['total'] == 1)
					echo $row['idArea'];
				else
					echo 0;						
			}					
			break;	
		case 9:
			$result = mysqli_query($mysqli, "Select idTema, idArea, count(idTema) as total from Tema where nombreTema = '".$sentencia['tema']."' and idArea = ".$sentencia['area']);
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idTema'];
			else
			{
				$result = mysqli_query($mysqli, "Select idTema, idArea, count(idTema) as total from Tema where nombreTema like '%".$sentencia['tema']."%' and idArea = ".$sentencia['area']);
				$row = mysqli_fetch_assoc($result);
				if ($row['total'] == 1)
					echo $row['idTema'];
				else
					echo 0;						
			}
			break;
		case 10:
			$result = mysqli_query($mysqli, "Select idTema, idSubtema, count(idSubtema) as total from Subtema where nombreSubtema = '".$sentencia['subtema']."' and idTema = ".$sentencia['tema']);
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idSubtema'];
			else
			{
				$result = mysqli_query($mysqli, "Select idTema, idSubtema, count(idSubtema) as total from Subtema where nombreSubtema like '%".$sentencia['subtema']."%' and idTema = ".$sentencia['tema']);
				$row = mysqli_fetch_assoc($result);
				if ($row['total'] == 1)
					echo $row['idSubtema'];
				else
					echo 0;						
			}
			break;
		case 11:
			$result = mysqli_query($mysqli, "Select idCE, count(idCE) as total from colabora_en where idMedio = '".$sentencia['medio']."' and idAutor = ".$sentencia['autor']);
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idCE'];
			else
				echo 0;		
			break;
		case 12:
			$result = mysqli_query($mysqli, "Select idCP, count(idCP) as total from cargoProtagonista where idCargo = '".$sentencia['cargo']."' and idProtagonista = ".$sentencia['protagonista']);
			$row = mysqli_fetch_assoc($result);
			if ($row['total'] == 1)
				echo $row['idCP'];
			else
				echo 0;		
			break;
		case 13:
			if (mysqli_query($mysqli, "update nota set imagenNota = '".$sentencia['imagen']."' where idNota = ".$sentencia['nota']))
				echo 1;
			else
				echo 0;
			break;
	}
?>