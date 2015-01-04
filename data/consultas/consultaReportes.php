<?php  
	require_once("../conexion.php");
	$datos = json_decode(file_get_contents('php://input'), true);
	if($datos['medio'][0]==1 || $datos['autor'][0]==1 || $datos['protagonista'][0]==1 || $datos['tema'][0]==1 || $datos['medio'][0]==2 || $datos['autor'][0]==2 || $datos['protagonista'][0]==2 || $datos['tema'][0]==2 || $datos['clasificacion'][0]==1 || $datos['clasificacion'][0]==2 || $datos['fecha'][0]==1 || $datos['fecha'][0]==2 || $datos['tipo'][0]==1 || $datos['tipo'][0]==2 || $datos['seccion'][0]==1 || $datos['seccion'][0]==2 || ($datos['genero'][0]>=1 && $datos['genero'][0]<=6) || $datos['pais'][0]==1 || $datos['pais'][0]==2 || $datos['estado'][0]==1 || $datos['estado'][0]==2 || $datos['subtema'][0]==1 || $datos['subtema'][0]==2 || $datos['area'][0]==1 || $datos['area'][0]==2)
	{		
		$resultado = [];
		$medio = [];
		$autor = [];
		$protagonista = [];
		$subtema = [];
		$clasificacion = [];
		$fecha = [];
		$tipo = [];
		$seccion = [];
		$genero = [];
		$pais = [];
		$estado = [];
		$municipio = [];
		$tema = [];
		$area = [];
		switch ($datos['genero'][0]) 
		{
			case 1:	$result = $mysqli->query("select idAutor from Autor where generoAutor = 'F'");
					while($row = mysqli_fetch_assoc($result))
						$genero[0][] = $row['idAutor'];
					$result = $mysqli->query("select idProtagonista from Protagonista where genero = 'F'");
					while($row = mysqli_fetch_assoc($result))
						$genero[1][] = $row['idProtagonista'];
					$resultado['genero'] = "Femenino";
					break;
			case 2:	$result = $mysqli->query("select idAutor from Autor where generoAutor = 'M'");
					while($row = mysqli_fetch_assoc($result))
						$genero[0][] = $row['idAutor'];
					$result = $mysqli->query("select idProtagonista from Protagonista where genero = 'M'");
					while($row = mysqli_fetch_assoc($result))
						$genero[1][] = $row['idProtagonista'];
					$resultado['genero'] = "Masculino";
					break;
			case 3:	$result = $mysqli->query("select idAutor from Autor where generoAutor = 'F'");
					while($row = mysqli_fetch_assoc($result))
						$genero[0][] = $row['idAutor'];
					$resultado['genero'] = "AutorFemenino";
					$genero[1] = [];
					break;
			case 4:	$result = $mysqli->query("select idProtagonista from Protagonista where genero = 'F'");
					while($row = mysqli_fetch_assoc($result))
						$genero[1][] = $row['idProtagonista'];
					$resultado['genero'] = "ProtagonistaFemenino";
					$genero[0] = [];
					break;
			case 5:	$result = $mysqli->query("select idAutor from Autor where generoAutor = 'M'");
					while($row = mysqli_fetch_assoc($result))
						$genero[0][] = $row['idAutor'];
					$resultado['genero'] = "AutorMasculino";
					$genero[1] = [];
					break;
			case 6:	$result = $mysqli->query("select idProtagonista from Protagonista where genero = 'M'");
					while($row = mysqli_fetch_assoc($result))
						$genero[1][] = $row['idProtagonista'];
					$resultado['genero'] = "ProtagonistaMasculino";
					$genero[0] = [];
					break;		
		}
		if ($datos['clasificacion'][0]==1)
		{
			$clasificacion[0] = $datos['clasificacion'][1];
		}		
		if ($datos['pais'][0]==1)
		{
			for ($i = 1; $i<count($datos['medio']); $i++)			
				$pais[] = $datos['pais'][$i]['idPais'];
		}
		if ($datos['estado'][0]==1)
		{			
			for ($i = 1; $i<count($datos['medio']); $i++)
				$estado[] = $datos['estado'][$i]['idEstado'];
		}
		if ($datos['municipio'][0]==1)
		{			
			for ($i = 1; $i<count($datos['medio']); $i++)
				$municipio[] = $datos['municipio'][$i]['idMunicipio'];
		}
		if ($datos['area'][0]==1)
		{			
			for ($i = 1; $i<count($datos['medio']); $i++)
				$area[] = $datos['area'][$i]['idArea'];
		}
		if ($datos['tema'][0]==1)
		{			
			for ($i = 1; $i<count($datos['medio']); $i++)
				$tema[] = $datos['tema'][$i]['idTema'];
		}
		if (count($datos['medio'])>1)
		{
			for ($i = 1; $i<count($datos['medio']); $i++)
				$medio[] = $datos['medio'][$i]['idMedio'];
		}
		if (count($datos['autor'])>1)
		{
			for ($i = 1; $i<count($datos['autor']); $i++)
				$autor[] = $datos['autor'][$i]['idAutor'];
		}
		if (count($datos['protagonista'])>1)
		{
			for ($i = 1; $i<count($datos['protagonista']); $i++)
				$protagonista[] = $datos['protagonista'][$i]['idProtagonista'];
		}
		if (count($datos['subtema'])>1)
		{
			for ($i = 1; $i<count($datos['subtema']); $i++)
				$subtema[] = $datos['subtema'][$i]['idSubtema'];
		}
		if (count($datos['fecha'])>1)
		{
			for ($i = 1; $i<count($datos['fecha']); $i++)
				$fecha[] = $datos['fecha'][$i];
		}
		if (count($datos['tipo'])>1)
		{
			for ($i = 1; $i<count($datos['tipo']); $i++)
				$tipo[] = $datos['tipo'][$i];
		}
		if (count($datos['seccion'])>1)
		{
			for ($i = 1; $i<count($datos['seccion']); $i++)
				$seccion[] = $datos['seccion'][$i]['idSeccion'];
		}
		if($datos['medio'][0]==2)
		{
			$result = $mysqli->query("select idMedio from Medio");
			while($row = mysqli_fetch_assoc($result))
				$medio[] = $row['idMedio'];
		}
		if($datos['autor'][0]==2)
		{
			$result = $mysqli->query("select idAutor from Autor");
			while($row = mysqli_fetch_assoc($result))
				$autor[] = $row['idAutor'];
		}
		if($datos['protagonista'][0]==2)
		{
			$result = $mysqli->query("select idProtagonista from Protagonista");
			while($row = mysqli_fetch_assoc($result))
				$protagonista[] = $row['idProtagonista'];
		}
		if($datos['subtema'][0]==2)
		{
			$atema = $datos['tema'][1]['idTema'];
			$result = $mysqli->query("select idSubtema from subtema where idTema = $atema");
			while($row = mysqli_fetch_assoc($result))
				$subtema[] = $row['idSubtema'];
		}
		if($datos['seccion'][0]==2)
		{
			$result = $mysqli->query("select idSeccion from seccion");
			while($row = mysqli_fetch_assoc($result))
				$seccion[] = $row['idSeccion'];
		}
		if ($datos['clasificacion'][0]==2)
		{
			$clasificacion[0] = "positiva";
			$clasificacion[1] = "negativa";
		} 		
		if ($datos['tipo'][0]==2)
		{
			$result = $mysqli->query("select idTipoNota from tipoNota");
			while($row = mysqli_fetch_assoc($result))
				$tipo[] = $row['idTipoNota'];
		}		
		if ($datos['pais'][0]==2)
		{
			$result = $mysqli->query("select idPais from pais");
			while($row = mysqli_fetch_assoc($result))
				$pais[] = $row['idPais'];
		}
		if ($datos['estado'][0]==2)
		{
			$apais = $datos['pais'][1]['idPais'];
			$result = $mysqli->query("select idEstado from estado where idPais = $apais");
			while($row = mysqli_fetch_assoc($result))
				$estado[] = $row['idEstado'];
		}
		if ($datos['municipio'][0]==2)
		{
			$aestado = $datos['estado'][1]['idEstado'];
			$result = $mysqli->query("select idMunicipio from municipio where idEstado = $aestado");
			while($row = mysqli_fetch_assoc($result))
				$municipio[] = $row['idMunicipio'];
		}
		if($datos['area'][0]==2)
		{
			$result = $mysqli->query("select idArea from Area");
			while($row = mysqli_fetch_assoc($result))
				$area[] = $row['idArea'];
		}
		if($datos['tema'][0]==2)
		{
			$aarea = $datos['tema'][1]['idArea'];
			$result = $mysqli->query("select idTema from tema where idArea = $atema");
			while($row = mysqli_fetch_assoc($result))
				$tema[] = $row['idTema'];
		}
		$auxm = 0;
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
		$total = [];		
		while($auxf < count($fecha) || $auxg < count($genero) || $auxm < count($medio) || $auxa < count($autor) || $auxp < count($protagonista) || $auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
		{
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
			$sql = "select count(distinct n.idNota) as total 
				from Nota n, colabora_en ce, Medio m, cargoProtagonista cp, notaProtagonista np, trata_de td, pais p, estado e, municipio mu, Area a, tema t, subtema sb
				where ce.idCE = n.idCE and cp.idCP = np.idCP and np.idNota = n.idNota and td.idNota_ = n.idNota and n.idMunicipio = mu.idMunicipio and mu.idEstado = e.idEstado and e.idPais = p.idPais and td.idSubtema = sb.idSubtema and sb.idTema = t.idTema and t.idArea = a.idArea";
			if($auxm < count($medio))
			{
				$sqla = "and ce.idMedio = ".$medio[$auxm]." ";	
				$sql = $sql . $sqla;				
				$resultado['medio']=$medio[$auxm];	
				$auxm++;
			}
			if(count($clasificacion) == 1)
			{
				$sqla = "and np.Clasificacion = '".$clasificacion[0]."' ";
				$sql = $sql . $sqla;
				$resultado['clasificacion']=$clasificacion[0];
				$auxc++;	
			}
			if(count($fecha)>0)
			{
				if(count($fecha) == 1)
				{
					$sqla = "and np.fecha = '".$fecha[0]."' ";
					$sql = $sql . $sqla;
					$resultado['fecha'] = $fecha[0];
					$auxf = 1;
				}
				if(count($fecha) == 2)
				{
					$sqla = "and np.fecha between '".$fecha[0]."' and '".$fecha[1]."' ";
					$sql = $sql . $sqla;
					$resultado['fecha'] = $fecha[0]." - ".$fecha[1];
					$auxf =2;
				}
			}
			if(0 < count($genero))
			{
				$sqla = "";
				for($i=0; $i<count($genero[0]); $i++)
					$sqla = $sqla . "or ce.idAutor = ".$genero[0][$i]." ";
				for($i=0; $i<count($genero[1]); $i++)
					$sqla = $sqla . "or np.idProtagonista = ".$genero[1][$i]." ";
				$sql = $sql . $sqla;
				$auxg = 2;
			}	
			$asql1 = $sql;
			if ($auxa < count($autor) || $auxp < count($protagonista) || $auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
			{						
				while($auxa < count($autor) || $auxp < count($protagonista) || $auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
				{
					$sql = $asql1;
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
					if($auxa < count($autor))
					{
						$sqla = "and ce.idAutor = ".$autor[$auxa]." ";	
						$sql = $sql . $sqla;
						$resultado['autor']=$autor[$auxa];
						$auxa++;								
					}
					$asql2 = $sql;
					if($auxp < count($protagonista) || $auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
					{
						while($auxp < count($protagonista) || $auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
						{
							$sql = $asql2;					
							$auxs = 0;
							$auxc = 0;
							$auxtp = 0;
							$auxsc = 0;
							$auxps = 0;
							$auxe = 0;
							$auxmu = 0;
							$auxt = 0;
							$auxaa = 0;
							if($auxp < count($protagonista))
							{
								$sqla = "and cp.idProtagonista = ".$protagonista[$auxp]." ";	
								$sql = $sql . $sqla;
								$resultado['protagonista']=$protagonista[$auxp];
								$auxp++;						
							}
							$asql3 = $sql;
							if ($auxs < count($subtema) || $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
							{
								while($auxs < count($subtema)|| $auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
								{
									$sql = $asql3;
									$auxc = 0;
									$auxtp = 0;
									$auxsc = 0;
									$auxps = 0;
									$auxe = 0;
									$auxmu = 0;
									$auxt = 0;
									$auxaa = 0;
									if($auxs < count($subtema))
									{
										$sqla = "and td.idSubtema = ".$subtema[$auxs]." ";	
										$sql = $sql . $sqla;
										$resultado['subtema']=$subtema[$auxs];
										$auxs++;						
									}
									$asql4 = $sql;
									if($auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
									{
										while($auxc < count($clasificacion) || $auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
										{
											$sql = $asql4;
											$auxtp = 0;
											$auxsc = 0;
											$auxps = 0;
											$auxe = 0;
											$auxmu = 0;
											$auxt = 0;
											$auxaa = 0;
											if($auxc < count($clasificacion))
											{
												$sqla = "and np.Clasificacion = ".$clasificacion[$auxc]." ";
												$sql = $sql . $sqla;
												$resultado['clasificacion']=$clasificacion[$auxc];
												$auxc++;
											}
											$asql5 = $sql;
											if($auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
											{
												while($auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
												{
													$sql = $asql5;
													$auxsc = 0;
													$auxps = 0;
													$auxe = 0;
													$auxmu = 0;
													$auxt = 0;
													$auxaa = 0;
													if($auxtp <count($tipo) || $auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
													{														
														$sqla = "and np.idTipoNota = ".$tipo[$auxtp]." ";
														$sql = $sql . $sqla;
														$resultado['tipo']=$tipo[$auxtp];
														$auxtp++;
													}
													$asql6 = $sql;
													if($auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
													{
														while($auxsc < count($seccion) || $auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
														{
															$sql = $asql6;
															$auxps = 0;
															$auxe = 0;
															$auxmu = 0;
															$auxt = 0;
															$auxaa = 0;
															if($auxsc < count($seccion))
															{
																$sqla = "and np.idSeccion = ".$seccion[$auxsc]." ";
																$sql = $sql . $sqla;
																$resultado['seccion']=$seccion[$auxsc];
																$auxsc++;
															}
															$asql7 = $sql;
															if($auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
															{
																while($auxps<count($pais) || $auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
																{
																	$sql = $asql7;
																	$auxe = 0;
																	$auxmu = 0;
																	$auxt = 0;
																	$auxaa = 0;
																	if($auxps<count($pais))
																	{
																		$sqla = "and p.idPais = ".$pais[$auxps]." ";
																		$sql = $sql . $sqla;
																		$resultado['pais']=$pais[$auxps];
																		$auxps++;	
																	}
																	$asql8 = $sql;
																	if($auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
																	{
																		while($auxe < count($estado) || $auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
																		{
																			$sql = $asql8;
																			$auxmu = 0;
																			$auxt = 0;
																			$auxaa = 0;
																			if($auxe < count($estado))
																			{
																				$sqla = "and e.idEstado = ".$estado[$auxe]." ";
																				$sql = $sql . $sqla;
																				$resultado['estado']=$estado[$auxe];
																				$auxe++;	
																			}
																			$asql9 = $sql;
																			if($auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
																			{
																				while($auxmu < count($municipio) || $auxt < count($tema) || $auxaa < count($area))
																				{
																					$sql = $asql9;
																					$auxt = 0;
																					$auxaa = 0;
																					if($auxmu < count($municipio))
																					{
																						$sqla = "and m.idMunicpio = ".$municipio[$auxmu]." ";
																						$sql = $sql . $sqla;
																						$resultado['municipio']=$municipio[$auxmu];
																						$auxmu++;	
																					}
																					$asql10 = $sql;
																					if($auxt < count($tema) || $auxaa < count($area))
																					{
																						while($auxt < count($tema) || $auxaa < count($area))
																						{
																							$sql = $asql10;
																							$auxt = 0;
																							if($auxaa < count($area))
																							{
																								$sqla = "and a.idArea = ".$area[$auxaa]." ";
																								$sql = $sql . $sqla;
																								$resultado['area']=$area[$auxaa];
																								$auxaa++;
																							}
																							$asql11 = $sql;
																							if($auxt < count($tema))
																							{
																								while($auxt < count($tema))
																								{
																									$sql = $asql11;
																									$sqla = "and t.idTema = ".$tema[$auxt]." ";
																									$sql = $sql . $sqla;
																									$resultado['tema']=$tema[$auxt];
																									$auxt++;	
																									$result = $mysqli->query($sql);
																									$row = mysqli_fetch_assoc($result);
																									$resultado['total']=$row['total'];
																									$total[] = $resultado;
																								}
																							}
																							else	
																							{
																								$result = $mysqli->query($sql);
																								$row = mysqli_fetch_assoc($result);
																								$resultado['total']=$row['total'];
																								$total[] = $resultado;
																							}
																						}
																					}
																					else
																					{
																						$result = $mysqli->query($sql);
																						$row = mysqli_fetch_assoc($result);
																						$resultado['total']=$row['total'];
																						$total[] = $resultado;
																					}
																				}
																			}
																			else
																			{
																				$result = $mysqli->query($sql);
																				$row = mysqli_fetch_assoc($result);
																				$resultado['total']=$row['total'];
																				$total[] = $resultado;
																			}
																		}
																	}
																	else
																	{
																		$result = $mysqli->query($sql);
																		$row = mysqli_fetch_assoc($result);
																		$resultado['total']=$row['total'];
																		$total[] = $resultado;
																	}
																}
															}
															else {
																$result = $mysqli->query($sql);
																$row = mysqli_fetch_assoc($result);
																$resultado['total']=$row['total'];
																$total[] = $resultado;	
															}															
														}
													}
													else
													{
														$result = $mysqli->query($sql);
														$row = mysqli_fetch_assoc($result);
														$resultado['total']=$row['total'];
														$total[] = $resultado;
													}
												}
											}
											else
											{
												$result = $mysqli->query($sql);
												$row = mysqli_fetch_assoc($result);
												$resultado['total']=$row['total'];
												$total[] = $resultado;
											}
										}
									}
									else 
									{
										$result = $mysqli->query($sql);
										$row = mysqli_fetch_assoc($result);
										$resultado['total']=$row['total'];
										$total[] = $resultado;
									}																				
								}
							}
							else
							{
								$result = $mysqli->query($sql);
								$row = mysqli_fetch_assoc($result);
								$resultado['total']=$row['total'];
								$total[] = $resultado;
							}
						}							
					}
					else 
					{
						$result = $mysqli->query($sql);
						$row = mysqli_fetch_assoc($result);
						$resultado['total']=$row['total'];
						$total[] = $resultado;
					}
				}
			}
			else 
			{
				$result = $mysqli->query($sql);
				$row = mysqli_fetch_assoc($result);
				$resultado['total']=$row['total'];
				$total[] = $resultado;
			}
		}									
	}
	else
	{
		//Caso de que todo sea en general	
		$result = $mysqli->query("select count(*) as total from Nota");
		$row = mysqli_fetch_assoc($result);
		$total[0]['total'] = $row['total'];
	}
	echo json_encode($total);
?>