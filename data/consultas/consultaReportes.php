<?php  
	require_once("../conexion.php");
	$datos = json_decode(file_get_contents('php://input'), true);
	//$datos["reporte"] = 1;
	if($datos['medio'][0]==1 || $datos['autor'][0]==1 || $datos['protagonista'][0]==1 || $datos['tema'][0]==1 || $datos['medio'][0]==2 || $datos['autor'][0]==2 || $datos['protagonista'][0]==2 || $datos['tema'][0]==2 || $datos['clasificacion'][0]==1 || $datos['clasificacion'][0]==2 || $datos['fecha'][0]==1 || $datos['fecha'][0]==2 || $datos['tipo'][0]==1 || $datos['tipo'][0]==2 || $datos['seccion'][0]==1 || $datos['seccion'][0]==2 || ($datos['genero'][0]>=1 && $datos['genero'][0]<=6) || $datos['pais'][0]==1 || $datos['pais'][0]==2 || $datos['estado'][0]==1 || $datos['estado'][0]==2 || $datos['subtema'][0]==1 || $datos['subtema'][0]==2 || $datos['area'][0]==1 || $datos['area'][0]==2 || $datos['cargo'][0]==1 || $datos['cargo'][0]==2 || $datos['municipio'][0]==1 || $datos['municipio'][0]==2)
	{
		if(!isset($datos["reporte"]))
			$datos["reporte"] = 1;
		$tablaux = "";
		$whereaux = "";		
		$resultado = array();
		$medio = array();
		$autor = array();
		$protagonista = array();
		$subtema = array();
		$clasificacion = array();
		$fecha = array();
		$tipo = array();
		$seccion = array();
		$genero = array();
		$pais = array();
		$estado = array();
		$municipio = array();
		$tema = array();
		$area = array();
		$cargo = array();
		switch ($datos['genero'][0]) 
		{
			case 1:	$result = $mysqli->query("select idAutor, nombreAutor from Autor where generoAutor = 'F'");
					while($row = mysqli_fetch_assoc($result))
						$genero[0][] = $row;
					$result = $mysqli->query("select idProtagonista, nombreProtagonista from Protagonista where genero = 'F'");
					while($row = mysqli_fetch_assoc($result))
						$genero[1][] = $row;
					$resultado['genero'] = "Femenino";
					break;
			case 2:	$result = $mysqli->query("select idAutor, nombreAutor from Autor where generoAutor = 'M'");
					while($row = mysqli_fetch_assoc($result))
						$genero[0][] = $row;
					$result = $mysqli->query("select idProtagonista, nombreProtagonista from Protagonista where genero = 'M'");
					while($row = mysqli_fetch_assoc($result))
						$genero[1][] = $row;
					$resultado['genero'] = "Masculino";
					break;
			case 3:	$result = $mysqli->query("select idAutor, nombreAutor from Autor where generoAutor = 'F'");
					while($row = mysqli_fetch_assoc($result))
						$genero[0][] = $row;
					$resultado['genero'] = "AutorFemenino";
					$genero[1] = array();
					break;
			case 4:	$result = $mysqli->query("select idProtagonista, nombreProtagonista from Protagonista where genero = 'F'");
					while($row = mysqli_fetch_assoc($result))
						$genero[1][] = $row['idProtagonista'];
					$resultado['genero'] = "ProtagonistaFemenino";
					$genero[0] = array();
					break;
			case 5:	$result = $mysqli->query("select idAutor, nombreAutor from Autor where generoAutor = 'M'");
					while($row = mysqli_fetch_assoc($result))
						$genero[0][] = $row;
					$resultado['genero'] = "AutorMasculino";
					$genero[1] = array();
					break;
			case 6:	$result = $mysqli->query("select idProtagonista, nombreProtagonista from Protagonista where genero = 'M'");
					while($row = mysqli_fetch_assoc($result))
						$genero[1][] = $row;
					$resultado['genero'] = "ProtagonistaMasculino";
					$genero[0] = array();
					break;		
		}
		if ($datos['clasificacion'][0]==1)
		{
			$clasificacion[0] = $datos['clasificacion'][1];
		}		
		if ($datos['pais'][0]==1)
		{
			for ($i = 1; $i<count($datos['pais']); $i++)			
				$pais[] = $datos['pais'][$i];
		}
		if ($datos['estado'][0]==1)
		{			
			for ($i = 1; $i<count($datos['estado']); $i++)
				$estado[] = $datos['estado'][$i];
		}
		if ($datos['municipio'][0]==1)
		{			
			for ($i = 1; $i<count($datos['municipio']); $i++)
				$municipio[] = $datos['municipio'][$i];
		}
		if ($datos['area'][0]==1)
		{			
			for ($i = 1; $i<count($datos['area']); $i++)
				$area[] = $datos['area'][$i];
		}
		if ($datos['tema'][0]==1)
		{			
			for ($i = 1; $i<count($datos['tema']); $i++)
				$tema[] = $datos['tema'][$i];
		}
		if ($datos['medio'][0]==1 )
		{
			for ($i = 1; $i<count($datos['medio']); $i++)
				$medio[] = $datos['medio'][$i];
		}
		if ($datos['autor'][0]==1)
		{
			for ($i = 1; $i<count($datos['autor']); $i++)
				$autor[] = $datos['autor'][$i];
		}
		if ($datos['protagonista'][0]==1)
		{
			for ($i = 1; $i<count($datos['protagonista']); $i++)
				$protagonista[] = $datos['protagonista'][$i];
		}
		if ($datos['subtema'][0]==1)
		{
			for ($i = 1; $i<count($datos['subtema']); $i++)
				$subtema[] = $datos['subtema'][$i];
		}
		if (count($datos['fecha'])>1)
		{
			for ($i = 1; $i<count($datos['fecha']); $i++)
				$fecha[] = $datos['fecha'][$i];
		}
		if ($datos['tipo'][0]==1)
		{
			for ($i = 1; $i<count($datos['tipo']); $i++)
				$tipo[] = $datos['tipo'][$i];
		}
		if ($datos['seccion'][0]==1)
		{
			for ($i = 1; $i<count($datos['seccion']); $i++)
				$seccion[] = $datos['seccion'][$i];
		}
		if ($datos['cargo'][0]==1)
		{
			for ($i = 1; $i<count($datos['cargo']); $i++)
				$cargo[] = $datos['cargo'][$i];
		}
		if($datos['medio'][0]==2)
		{
			$result = $mysqli->query("select idMedio, nombreMedio from Medio");
			while($row = mysqli_fetch_assoc($result))
				$medio[] = $row;
		}
		if($datos['autor'][0]==2)
		{
			$aMedio = (isset($datos['medio'][1]["idMedio"]))? $datos['medio'][1]["idMedio"]: "ce.idMedio";
			$result = $mysqli->query("select distinct a.idAutor, a.nombreAutor from Autor a, colabora_en ce where a.idAutor = ce.idAutor and ce.idMedio = ".$aMedio);
			while($row = mysqli_fetch_assoc($result))
				$autor[] = $row;
		}
		if($datos['protagonista'][0]==2)
		{
			$result = $mysqli->query("select idProtagonista, nombreProtagonista from Protagonista");
			while($row = mysqli_fetch_assoc($result))
				$protagonista[] = $row;
		}
		if($datos['subtema'][0]==2)
		{
			$atema = $datos['tema'][1]['idTema'];
			$result = $mysqli->query("select idSubtema, nombreSubtema from subtema where idTema = $atema");
			while($row = mysqli_fetch_assoc($result))
				$subtema[] = $row;
		}
		if($datos['seccion'][0]==2)
		{
			$result = $mysqli->query("select idSeccion, nombreSeccion from seccion");
			while($row = mysqli_fetch_assoc($result))
				$seccion[] = $row;
		}
		if ($datos['clasificacion'][0]==2)
		{
			$clasificacion[0] = "positiva";
			$clasificacion[1] = "negativa";
		} 		
		if ($datos['tipo'][0]==2)
		{
			$result = $mysqli->query("select idTipoNota, nombreTipoNota from tipoNota");
			while($row = mysqli_fetch_assoc($result))
				$tipo[] = $row;
		}		
		if ($datos['pais'][0]==2)
		{
			$result = $mysqli->query("select idPais, nombrePais from pais");
			while($row = mysqli_fetch_assoc($result))
				$pais[] = $row;
		}
		if ($datos['estado'][0]==2)
		{
			$apais = $datos['pais'][1]['idPais'];
			$result = $mysqli->query("select idEstado, nombreEstado from estado where idPais = $apais");
			while($row = mysqli_fetch_assoc($result))
				$estado[] = $row;
		}
		if ($datos['municipio'][0]==2)
		{
			$aestado = $datos['estado'][1]['idEstado'];
			$result = $mysqli->query("select idMunicipio, nombreMunicipio from municipio where idEstado = $aestado");
			while($row = mysqli_fetch_assoc($result))
				$municipio[] = $row;
		}
		if($datos['area'][0]==2)
		{
			$result = $mysqli->query("select idArea, nombreArea from Area");
			while($row = mysqli_fetch_assoc($result))
				$area[] = $row;
		}
		if($datos['tema'][0]==2)
		{
			$aarea = $datos['tema'][1]['idArea'];
			$result = $mysqli->query("select idTema, nombreTema from tema where idArea = $atema");
			while($row = mysqli_fetch_assoc($result))
				$tema[] = $row;
		}
		if ($datos['cargo'][0]==2)
		{
			$aprot = $datos['protagonista'][1]['idProtagonista'];
			$result = $mysqli->query("select c.idCargo, c.nombreCargo from cargoProtagonista cp, Cargo c where cp.idProtagonista = $aprot and cp.idCargo = c.idCargo");
			while($row = mysqli_fetch_assoc($result))
				$cargo[] = $row;
		}
		if ($datos['reporte'] == 1)
			$rep = "count(distinct n.idNota) as total";
		else
			$rep = "distinct n.idNota";			
		$auxa = 0;
		$auxp = 0;
		$auxs = 0;
		$auxc = 0;
		$auxtp = 0;
		$auxsc = 0;
		$auxg = 0;
		$auxf = 0;
		$auxps = 0;
		$auxe = 0;
		$auxmu = 0;
		$auxt = 0;
		$auxaa = 0;		
		$auxcg = 0;			
		$auxm = 0;
		$total = array();		
		while($auxf < count($fecha) || $auxg < count($genero) || $auxm < count($medio) || $auxa < count($autor) || $auxp < count($protagonista) || $auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
		{
			$tablaux = "";
			$whereaux = "";					
			$auxa = 0;
			$auxp = 0;
			$auxs = 0;
			$auxc = 0;
			$auxtp = 0;
			$auxsc = 0;
			$auxg = 0;
			$auxf = 0;
			$auxps = 0;
			$auxe = 0;
			$auxmu = 0;
			$auxt = 0;
			$auxaa = 0;		
			$auxcg = 0;	
			if($auxm < count($medio))
			{
				$tablaux = (strpos($tablaux, "colabora_en ce") !== false) ? $tablaux : $tablaux.", colabora_en ce";
				$whereaux .= "and ce.idMedio = ".$medio[$auxm]['idMedio']." ";
				$whereaux = (strpos($whereaux, "ce.idCE = n.idCE") !== false) ? $whereaux : $whereaux."and ce.idCE = n.idCE ";									
				$resultado['medio']=$medio[$auxm]['nombreMedio'];	
				$auxm++;
			}
			if(count($clasificacion) == 1)
			{				
				$whereaux .= "and n.Clasificacion = '".$clasificacion[0]."' ";
				$resultado['clasificacion']=$clasificacion[0];
				$auxc++;	
			}
			if(count($fecha)>0)
			{
				if(count($fecha) == 1)
				{
					$whereaux .= "and n.fecha = '".$fecha[0]."' ";					
					$resultado['fecha'] = $fecha[0];
					$auxf = 1;
				}
				if(count($fecha) == 2)
				{
					$datetime1 = date_create($fecha[0]);
					$datetime2 = date_create($fecha[1]);
					$afecha1 = ($datetime1 < $datetime2) ? $fecha[0] : $fecha[1];
					$afecha2 = ($datetime1 < $datetime2) ? $fecha[1] : $fecha[0];
					$whereaux .= "and n.fecha between '".$afecha1."' and '".$afecha2."' ";
					$resultado['fecha'] = $afecha1." - ".$afecha2;
					$auxf =2;
				}
			}
			if(0 < count($genero))
			{
				$tablaux = (strpos($tablaux, "notaProtagonista np") !== false) ? $tablaux : $tablaux.", notaProtagonista np";
				$tablaux = (strpos($tablaux, "cargoProtagonista cp") !== false) ? $tablaux : $tablaux.", cargoProtagonista cp";
				$tablaux = (strpos($tablaux, "colabora_en ce") !== false) ? $tablaux : $tablaux.", colabora_en ce";
				$whereaux .= "and ( ";
				for($i=0; $i<count($genero[0]); $i++)
					if($i == 0)
						$whereaux .= "ce.idAutor = ".$genero[0][$i]['idAutor']." ";
					else	
						$whereaux .= "or ce.idAutor = ".$genero[0][$i]['idAutor']." ";
				for($i=0; $i<count($genero[1]); $i++)
					if($i==0 && count($genero[0])==0)
						$whereaux .= "cp.idProtagonista = ".$genero[1][$i]['idProtagonista']." ";
					else
						$whereaux .= "or cp.idProtagonista = ".$genero[1][$i]['idProtagonista']." ";
				$whereaux .= ") ";
				$whereaux = (strpos($whereaux, "cp.idCP = np.idCP") !== false) ? $whereaux : $whereaux."and cp.idCP = np.idCP ";
				$whereaux = (strpos($whereaux, "n.idNota = np.idNota") !== false) ? $whereaux : $whereaux."and n.idNota = np.idNota ";
				$whereaux = (strpos($whereaux, "ce.idCE = n.idCE") !== false) ? $whereaux : $whereaux."and ce.idCE = n.idCE ";	
				$auxg = 2;
			}	
			$tablaux1 = $tablaux;
			$whereaux1 = $whereaux;
			if ($auxa < count($autor) || $auxp < count($protagonista) || $auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
			{						
				while($auxa < count($autor) || $auxp < count($protagonista) || $auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
				{
					$tablaux = $tablaux1;
					$whereaux = $whereaux1;
					$auxp = 0;
					$auxs = 0;
					$auxc = 0;
					$auxtp = 0;
					$auxsc = 0;
					$auxps = 0;
					$auxe = 0;
					$auxmu = 0;
					$auxt = 0;
					$auxaa = 0;
					$auxcg = 0;																	
					if($auxa < count($autor))
					{
						$tablaux = (strpos($tablaux, "colabora_en ce") !== false) ? $tablaux : $tablaux.", colabora_en ce";
						$whereaux .= "and ce.idAutor = ".$autor[$auxa]['idAutor']." ";	
						$whereaux = (strpos($whereaux, "ce.idCE = n.idCE") !== false) ? $whereaux : $whereaux."and ce.idCE = n.idCE ";	
						$resultado['autor']=$autor[$auxa]['nombreAutor'];
						$auxa++;								
					}
					$tablaux2 = $tablaux;
					$whereaux2 = $whereaux;
					if($auxp < count($protagonista) || $auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
					{
						while($auxp < count($protagonista) || $auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
						{
							$tablaux = $tablaux2;
							$whereaux = $whereaux2;
							$auxs = 0;
							$auxc = 0;
							$auxtp = 0;
							$auxsc = 0;
							$auxps = 0;
							$auxe = 0;
							$auxmu = 0;
							$auxt = 0;
							$auxaa = 0;
							$auxcg = 0;
							if($auxp < count($protagonista))
							{
								$tablaux = (strpos($tablaux, "cargoProtagonista cp") !== false) ? $tablaux : $tablaux.", cargoProtagonista cp";
								$tablaux = (strpos($tablaux, "notaProtagonista np") !== false) ? $tablaux : $tablaux.", notaProtagonista np";
								$whereaux .= "and cp.idProtagonista = ".$protagonista[$auxp]['idProtagonista']." ";
								$whereaux = (strpos($whereaux, "cp.idCP = np.idCP") !== false) ? $whereaux : $whereaux."and cp.idCP = np.idCP ";	
								$whereaux = (strpos($whereaux, "n.idNota = np.idNota") !== false) ? $whereaux : $whereaux."and n.idNota = np.idNota ";
								$resultado['protagonista']=$protagonista[$auxp]['nombreProtagonista'];
								$auxp++;						
							}
							$tablaux3 = $tablaux;
							$whereaux3 = $whereaux;
							if ($auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
							{
								while($auxs < count($subtema)|| $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
								{
									$tablaux = $tablaux3;
									$whereaux = $whereaux3;
									$auxc = 0;
									$auxtp = 0;
									$auxsc = 0;
									$auxps = 0;
									$auxe = 0;
									$auxmu = 0;
									$auxt = 0;
									$auxaa = 0;
									$auxcg = 0;
									if($auxs < count($subtema))
									{
										$tablaux = (strpos($tablaux, "trata_de td") !== false) ? $tablaux : $tablaux.", trata_de td";
										$whereaux .= "and td.idSubtema = ".$subtema[$auxs]['idSubtema']." ";	
										$whereaux = (strpos($whereaux, "td.idNota_ = n.idNota") !== false) ? $whereaux : $whereaux."and td.idNota_ = n.idNota ";	
										$resultado['subtema']=$subtema[$auxs]['nombreSubtema'];
										$auxs++;						
									}
									$tablaux4 = $tablaux;
									$whereaux4 = $whereaux;
									if($auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
									{
										while($auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
										{
											$tablaux = $tablaux4;
											$whereaux = $whereaux4;
											$auxtp = 0;
											$auxsc = 0;
											$auxps = 0;
											$auxe = 0;
											$auxmu = 0;
											$auxt = 0;
											$auxaa = 0;
											if($auxc < count($clasificacion))
											{
												$whereaux .= "and n.Clasificacion = ".$clasificacion[$auxc]." ";
												$resultado['clasificacion']=$clasificacion[$auxc];
												$auxc++;
											}
											$tablaux5 = $tablaux;
											$whereaux5 = $whereaux;
											if($auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
											{
												while($auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
												{
													$tablaux = $tablaux5;
													$whereaux = $whereaux5;
													$auxsc = 0;
													$auxps = 0;
													$auxe = 0;
													$auxmu = 0;
													$auxt = 0;
													$auxaa = 0;
													$auxcg = 0;
													if($auxtp <count($tipo))
													{														
														$whereaux .= "and n.idTipoNota = ".$tipo[$auxtp]['idTipoNota']." ";
														$resultado['tipo']=$tipo[$auxtp]['nombreTipoNota'];
														$auxtp++;
													}
													$tablaux6 = $tablaux;
													$whereaux6 = $whereaux;
													if($auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
													{
														while($auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
														{
															$tablaux = $tablaux6;
															$whereaux = $whereaux6;
															$auxps = 0;
															$auxe = 0;
															$auxmu = 0;
															$auxt = 0;
															$auxaa = 0;
															$auxcg = 0;
															if($auxsc < count($seccion))
															{
																$whereaux .= "and n.idSeccion = ".$seccion[$auxsc]['idSeccion']." ";
																$resultado['seccion']=$seccion[$auxsc]['nombreSeccion'];
																$auxsc++;
															}
															$tablaux7 = $tablaux;
															$whereaux7 = $whereaux;
															if($auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
															{
																while($auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
																{
																	$tablaux = $tablaux7;
																	$whereaux = $whereaux7;
																	$auxe = 0;
																	$auxmu = 0;
																	$auxt = 0;
																	$auxaa = 0;
																	$auxcg = 0;
																	if($auxps<count($pais))
																	{
																		$tablaux = (strpos($tablaux, "pais p") !== false) ? $tablaux : $tablaux.", pais p";
																		$tablaux = (strpos($tablaux, "estado e") !== false) ? $tablaux : $tablaux.", estado e";
																		$tablaux = (strpos($tablaux, "municipio m") !== false) ? $tablaux : $tablaux.", municipio m";
																		$whereaux .= "and p.idPais = ".$pais[$auxps]['idPais']." ";
																		$whereaux = (strpos($whereaux, "p.idPais = e.idPais") !== false) ? $whereaux : $whereaux."and p.idPais = e.idPais ";	
																		$whereaux = (strpos($whereaux, "e.idEstado = m.idEstado") !== false) ? $whereaux : $whereaux."and e.idEstado = m.idEstado ";
																		$whereaux = (strpos($whereaux, "m.idMunicipio = n.idMunicipio") !== false) ? $whereaux : $whereaux."and m.idMunicipio = n.idMunicipio ";	
																		$resultado['pais']=$pais[$auxps]['nombrePais'];
																		$auxps++;	
																	}
																	$tablaux8 = $tablaux;
																	$whereaux8 = $whereaux;
																	if($auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
																	{
																		while($auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
																		{
																			$tablaux = $tablaux8;
																			$whereaux = $whereaux8;
																			$auxmu = 0;
																			$auxt = 0;
																			$auxaa = 0;
																			$auxcg = 0;
																			if($auxe < count($estado))
																			{
																				$tablaux = (strpos($tablaux, "estado e") !== false) ? $tablaux : $tablaux.", estado e";
																				$tablaux = (strpos($tablaux, "municipio m") !== false) ? $tablaux : $tablaux.", municipio m";
																				$whereaux .= "and e.idEstado = ".$estado[$auxe]['idEstado']." ";
																				$whereaux = (strpos($whereaux, "e.idEstado = m.idEstado") !== false) ? $whereaux : $whereaux."and e.idEstado = m.idEstado ";
																				$whereaux = (strpos($whereaux, "m.idMunicipio = n.idMunicipio") !== false) ? $whereaux : $whereaux."and m.idMunicipio = n.idMunicipio ";
																				$resultado['estado']=$estado[$auxe]['nombreEstado'];
																				$auxe++;	
																			}
																			$tablaux9 = $tablaux;
																			$whereaux9 = $whereaux;
																			if($auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
																			{
																				while($auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
																				{
																					$tablaux = $tablaux9;
																					$whereaux = $whereaux9;
																					$auxt = 0;
																					$auxaa = 0;
																					$auxcg = 0;
																					if($auxmu < count($municipio))
																					{																					
																						$whereaux .= "and n.idMunicipio = ".$municipio[$auxmu]['idMunicipio']." ";
																						$resultado['municipio']=$municipio[$auxmu]['nombreMunicipio'];
																						$auxmu++;	
																					}
																					$tablaux10 = $tablaux;
																					$whereaux10 = $whereaux;
																					if($auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
																					{
																						while($auxt < count($tema) || $auxaa < count($area) || $auxcg < count($cargo))
																						{
																							$tablaux = $tablaux10;
																							$whereaux = $whereaux10;
																							$auxt = 0;
																							$auxcg = 0;
																							if($auxaa < count($area))
																							{
																								$tablaux = (strpos($tablaux, "Area a") !== false) ? $tablaux : $tablaux.", Area a";
																								$tablaux = (strpos($tablaux, "tema t") !== false) ? $tablaux : $tablaux.", tema t";
																								$tablaux = (strpos($tablaux, "subtema st") !== false) ? $tablaux : $tablaux.", subtema sb";
																								$tablaux = (strpos($tablaux, "trata_de td") !== false) ? $tablaux : $tablaux.", trata_de td";
																								$whereaux .= "and a.idArea = ".$area[$auxaa]['idArea']." ";
																								$whereaux = (strpos($whereaux, "a.idArea = t.idArea") !== false) ? $whereaux : $whereaux."and a.idArea = t.idArea ";
																								$whereaux = (strpos($whereaux, "t.idTema = sb.idTema") !== false) ? $whereaux : $whereaux."and t.idTema = sb.idTema ";
																								$whereaux = (strpos($whereaux, "sb.idSubtema = td.idSubtema") !== false) ? $whereaux : $whereaux."and sb.idSubtema = td.idSubtema ";
																								$whereaux = (strpos($whereaux, "td.idNota_ = n.idNota") !== false) ? $whereaux : $whereaux."and td.idNota_ = n.idNota ";
																								$resultado['area']=$area[$auxaa]['nombreArea'];
																								$auxaa++;
																							}
																							$tablaux11 = $tablaux;
																							$whereaux11 = $whereaux;
																							if($auxt < count($tema) || $auxcg < count($cargo))
																							{
																								while($auxt < count($tema) || $auxcg < count($cargo))
																								{
																									$auxcg = 0;
																									$tablaux = $tablaux11;
																									$whereaux = $whereaux11;
																									if($auxt < count($tema))
																									{
																										$tablaux = (strpos($tablaux, "tema t") !== false) ? $tablaux : $tablaux.", tema t";
																										$tablaux = (strpos($tablaux, "subtema st") !== false) ? $tablaux : $tablaux.", subtema sb";
																										$tablaux = (strpos($tablaux, "trata_de td") !== false) ? $tablaux : $tablaux.", trata_de td";
																										$whereaux .= "and t.idTema = ".$tema[$auxt]['idTema']." ";
																										$whereaux = (strpos($whereaux, "t.idTema = sb.idTema") !== false) ? $whereaux : $whereaux."and t.idTema = sb.idTema ";
																										$whereaux = (strpos($whereaux, "sb.idSubtema = td.idSubtema") !== false) ? $whereaux : $whereaux."and sb.idSubtema = td.idSubtema ";
																										$whereaux = (strpos($whereaux, "td.idNota_ = n.idNota") !== false) ? $whereaux : $whereaux."and td.idNota_ = n.idNota ";
																										$resultado['tema']=$tema[$auxt]['nombreArea'];
																										$auxt++;	
																									}
																									$tablaux12 = $tablaux;
																									$whereaux12 = $whereaux;
																									if($auxcg < count($cargo))
																									{
																										while($auxcg < count($cargo))
																										{
																											$tablaux = $tablaux12;
																											$whereaux = $whereaux12;
																											$tablaux = (strpos($tablaux, "cargoProtagonista cp") !== false) ? $tablaux : $tablaux.", cargoProtagonista cp";
																											$tablaux = (strpos($tablaux, "notaProtagonista np") !== false) ? $tablaux : $tablaux.", notaProtagonista np";
																											$whereaux .= "and cp.idCargo = ".$cargo[$auxcg]['idCargo']." ";
																											$whereaux = (strpos($whereaux, "cp.idCP = np.idCP") !== false) ? $whereaux : $whereaux."and cp.idCP = np.idCP ";	
																											$whereaux = (strpos($whereaux, "n.idNota = np.idNota") !== false) ? $whereaux : $whereaux."and n.idNota = np.idNota ";
																											$resultado['cargo']=$cargo[$auxcg]['nombreCargo'];
																											$auxcg++;
																											$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;	
																											$result = $mysqli->query($sql);
																											$row = mysqli_fetch_assoc($result);	
																											$resultado['sql']=$sql;
																											if (isset ($row["total"]))									
																											{									
																												$resultado['dato'] = ($row['total'] > 0) ? true:false;
																												$resultado['total'] = $row["total"];
																											}
																											$total[] = $resultado;
																										}
																									}
																									else
																									{
																										$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
																										$result = $mysqli->query($sql);
																										$row = mysqli_fetch_assoc($result);
																										$resultado['sql']=$sql;
																										if (isset ($row["total"]))									
																										{									
																											$resultado['dato'] = ($row['total'] > 0) ? true:false;
																											$resultado['total'] = $row["total"];
																										}
																										$total[] = $resultado;
																									}
																								}
																							}
																							else	
																							{
																								$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
																								$result = $mysqli->query($sql);
																								$row = mysqli_fetch_assoc($result);
																								$resultado['sql']=$sql;
																								if (isset ($row["total"]))									
																								{									
																									$resultado['dato'] = ($row['total'] > 0) ? true:false;
																									$resultado['total'] = $row["total"];
																								}
																								$total[] = $resultado;
																							}
																						}
																					}
																					else
																					{
																						$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
																						$result = $mysqli->query($sql);
																						$row = mysqli_fetch_assoc($result);
																						$resultado['sql']=$sql;
																						if (isset ($row["total"]))									
																						{									
																							$resultado['dato'] = ($row['total'] > 0) ? true:false;
																							$resultado['total'] = $row["total"];
																						}
																						$total[] = $resultado;
																					}
																				}
																			}
																			else
																			{
																				$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
																				$result = $mysqli->query($sql);
																				$row = mysqli_fetch_assoc($result);
																				$resultado['sql']=$sql;
																				if (isset ($row["total"]))									
																				{									
																					$resultado['dato'] = ($row['total'] > 0) ? true:false;
																					$resultado['total'] = $row["total"];
																				}
																				$total[] = $resultado;
																			}
																		}
																	}
																	else
																	{
																		$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
																		$result = $mysqli->query($sql);
																		$row = mysqli_fetch_assoc($result);
																		$resultado['sql']=$sql;
																		if (isset ($row["total"]))									
																		{									
																			$resultado['dato'] = ($row['total'] > 0) ? true:false;
																			$resultado['total'] = $row["total"];
																		}
																		$total[] = $resultado;
																	}
																}
															}
															else 
															{
																$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
																$result = $mysqli->query($sql);
																$row = mysqli_fetch_assoc($result);
																$resultado['sql']=$sql;
																if (isset ($row["total"]))									
																{									
																	$resultado['dato'] = ($row['total'] > 0) ? true:false;
																	$resultado['total'] = $row["total"];
																}
																$total[] = $resultado;	
															}															
														}
													}
													else
													{
														$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
														$result = $mysqli->query($sql);
														$row = mysqli_fetch_assoc($result);														
														$resultado['sql']=$sql;
														if (isset ($row["total"]))									
														{									
															$resultado['dato'] = ($row['total'] > 0) ? true:false;
															$resultado['total'] = $row["total"];
														}
														$total[] = $resultado;
													}
												}
											}
											else
											{
												$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
												$result = $mysqli->query($sql);
												$row = mysqli_fetch_assoc($result);
												$resultado['sql']=$sql;
												if (isset ($row["total"]))									
												{									
													$resultado['dato'] = ($row['total'] > 0) ? true:false;
													$resultado['total'] = $row["total"];
												}
												$total[] = $resultado;
											}
										}
									}
									else 
									{
										$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
										$result = $mysqli->query($sql);
										$row = mysqli_fetch_assoc($result);
										$resultado['sql']=$sql;
										if (isset ($row["total"]))									
										{									
											$resultado['dato'] = ($row['total'] > 0) ? true:false;
											$resultado['total'] = $row["total"];
										}
										$total[] = $resultado;
									}																				
								}
							}
							else
							{
								$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
								$result = $mysqli->query($sql);
								$row = mysqli_fetch_assoc($result);
								$resultado['sql']=$sql;
								if (isset ($row["total"]))									
								{									
									$resultado['dato'] = ($row['total'] > 0) ? true:false;
									$resultado['total'] = $row["total"];
								}
								$total[] = $resultado;
							}
						}							
					}
					else 
					{
						$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
						$result = $mysqli->query($sql);
						$row = mysqli_fetch_assoc($result);
						$resultado['sql']=$sql;
						if (isset ($row["total"]))
						{									
							$resultado['dato'] = ($row['total'] > 0) ? true:false;
							$resultado['total'] = $row["total"];
						}
						$total[] = $resultado;
					}
				}
			}
			else 
			{
				$sql = "select ".$rep." from Nota n".$tablaux." where n.idNota = n.idNota ".$whereaux;
				$result = $mysqli->query($sql);
				$row = mysqli_fetch_assoc($result);				
				$resultado['sql']=$sql;
				if (isset ($row["total"]))
				{									
					$resultado['dato'] = ($row['total'] > 0) ? true:false;
					$resultado['total'] = $row["total"];
				}			
				$total[] = $resultado;
			}
		}
		if($datos['reporte'] == 2)
		{	
			$notas = array();		
			for($i = 0; $i < count($total); $i++)
			{		
				$aux = $total[$i]["sql"];
				$result = $mysqli->query($aux);
				while($row = mysqli_fetch_assoc($result))
					$notas[] = $row;
			}
			$total = array();
			for($i = 0; $i < count($notas); $i++)
			{				
				$nota = $notas[$i]["idNota"];
				$sql = "SELECT n.tituloNota as titulo, n.fecha, n.sintesis, n.urlNota as url, tp.nombreTipoNota as 'tipo de nota', p.nombreProtagonista as protagonista, m.nombreMedio as medio, a.nombreArea as area
										from Nota n, tipoNota tp, trata_de td, subtema sb, tema t, Area a, colabora_en ce, Medio m, notaProtagonista np, cargoProtagonista cp, Protagonista p
										where n.idTipoNota = tp.idTipoNota and n.idCE = ce.idCE and ce.idMedio = m.idMedio and np.idNota = n.idNota and np.tipoProtagonista = 1 and np.idCP = cp.idCP and cp.idProtagonista = p.idProtagonista
										and td.idNota_ = n.idNota and td.idSubtema = sb.idSubtema and sb.idTema = t.idTema and t.idArea = a.idArea and n.idNota = $nota";
				if($result = $mysqli->query($sql))
				{
					$row = mysqli_fetch_assoc($result);
					if(isset($row['titulo']))
					{
						$row["dato"] = true;
						$total[] = $row;					
					}
				}
			}
		}
	}
	else
	{
		//Caso de que todo sea en general	
		$result = $mysqli->query("select count(*) as total from Nota");
		$row = mysqli_fetch_assoc($result);
		$total[0]['total'] = $row['total'];
		$total[0]['dato'] = ($row['total'] > 0) ? true:false;
	}
	echo json_encode($total);
?>