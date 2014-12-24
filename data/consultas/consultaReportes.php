<?php  
	require_once("../conexion.php");
	$datos = json_decode(file_get_contents('php://input'), true);
	if($datos['medio'][0]==1 || $datos['autor'][0]==1 || $datos['protagonista'][0]==1 || $datos['tema'][0]==1 || $datos['medio'][0]==2 || $datos['autor'][0]==2 || $datos['protagonista'][0]==2 || $datos['tema'][0]==2 || $datos['clasificacion'][0]==1 || $datos['clasificacion'][0]==2)
	{
		$resultado = [];
		$medio = [];
		$autor = [];
		$protagonista = [];
		$subtema = [];
		$clasificacion = [];
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
		if (count($datos['tema'])>1)
		{
			for ($i = 1; $i<count($datos['tema']); $i++)
				$subtema[] = $datos['tema'][$i]['idSubtema'];
		}
		if (count($datos['clasificacion'])>1)
		{
			for ($i = 1; $i<count($datos['clasificacion']); $i++)
				$clasificacion[] = $datos['clasificacion'][$i];
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
		if($datos['tema'][0]==2)
		{
			$result = $mysqli->query("select idSubtema from subtema");
			while($row = mysqli_fetch_assoc($result))
				$subtema[] = $row['idSubtema'];
		}
		if ($datos['clasificacion'][0]==2)
		{
			$clasificacion[0] = "positiva";
			$clasificacion[1] = "negativa";
		}
		$auxa = 0;
		$auxp = 0;
		$auxs = 0;
		$auxc = 0;
		$total = [];
		if (count($medio)>0)
		{		
			for ($i = 0; $i<count($medio); $i++)
			{
				$auxa = 0;
				$auxp = 0;
				$auxs = 0;
				$auxc = 0;			
				$sql = "select count(distinct n.idNota) as total 
					from Nota n, colabora_en ce, Medio m, cargoProtagonista cp, notaProtagonista np, trata_de td
					where ce.idCE = n.idCE and cp.idCP = np.idCP and np.idNota = n.idNota and td.idNota_ = n.idNota ";
				$sqla = "and ce.idMedio = ".$medio[$i]." ";	
				$sql = $sql . $sqla;				
				$resultado['medio']=$medio[$i];
				if(count($clasificacion) == 1)
				{
					$sqla = "and np.Clasificacion = ".$clasificacion[0]." ";
					$sql = $sql . $sqla;
					$resultado['clasificacion']=$clasificacion[0];	
				}
				$asql1 = $sql;	
				if ($auxa < count($autor) || $auxp < count($protagonista) || $auxs < count($subtema) || (count($clasificacion)==2 && $auxc < count($clasificacion)))
				{						
					while($auxa < count($autor) || $auxp < count($protagonista) || $auxs < count($subtema) || (count($clasificacion)==2 && $auxc < count($clasificacion)))
					{
						$sql = $asql1;
						$auxp = 0;
						$auxs = 0;
						$auxc = 0;																	
						if($auxa < count($autor))
						{
							$sqla = "and ce.idAutor = ".$autor[$auxa]." ";	
							$sql = $sql . $sqla;
							$resultado['autor']=$autor[$auxa];
							$auxa++;								
						}
						$asql2 = $sql;
						if($auxp < count($protagonista) || $auxs < count($subtema) || (count($clasificacion)==2 && $auxc < count($clasificacion)))
						{
							while($auxp < count($protagonista) || $auxs < count($subtema) || (count($clasificacion)==2 && $auxc < count($clasificacion)))
							{
								$sql = $asql2;					
								$auxs = 0;
								$auxc = 0;
								if($auxp < count($protagonista))
								{
									$sqla = "and cp.idProtagonista = ".$protagonista[$auxp]." ";	
									$sql = $sql . $sqla;
									$resultado['protagonista']=$protagonista[$auxp];
									$auxp++;						
								}
								$asql3 = $sql;
								if ($auxs < count($subtema) || (count($clasificacion)==2 && $auxc < count($clasificacion)))
								{
									while($auxs < count($subtema)|| (count($clasificacion)==2 && $auxc < count($clasificacion)))
									{
										$sql = $asql3;
										$auxc = 0;
										if($auxs < count($subtema))
										{
											$sqla = "and td.idSubtema = ".$subtema[$auxs]." ";	
											$sql = $sql . $sqla;
											$resultado['subtema']=$subtema[$auxs];
											$auxs++;						
										}
										$asql4 = $sql;
										if(count($clasificacion)==2 && $auxc < count($clasificacion))
										{
											while(count($clasificacion)==2 && $auxc < count($clasificacion))
											{
												$sql = $asql4;
												$sqla = "and np.Clasificacion = ".$clasificacion[$auxc]." ";
												$sql = $sql . $sqla;
												$resultado['clasificacion']=$clasificacion[$auxc];
												$auxc++;
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
		else
		{
			while($auxa < count($autor) || $auxp < count($protagonista) || $auxs < count($subtema) || count($clasificacion)>$auxc)
			{
				$auxp = 0;
				$auxs = 0;
				$auxc = 0;
				$sql = "select count(distinct n.idNota) as total 
					from Nota n, colabora_en ce, Medio m, cargoProtagonista cp, notaProtagonista np, trata_de td
					where ce.idCE = n.idCE and cp.idCP = np.idCP and np.idNota = n.idNota and td.idNota_ = n.idNota ";
				$auxsql = $sql;
				if(count($clasificacion) == 1)
				{
					$sqla = "and np.Clasificacion = ".$clasificacion[0]." ";
					$sql = $sql . $sqla;
					$resultado['clasificacion']=$clasificacion[0];	
				}				
				if($auxa < count($autor))
				{
					$sqla = "and ce.idAutor = ".$autor[$auxa]." ";	
					$sql = $sql . $sqla;
					$resultado['autor']=$autor[$auxa];
					$auxa++;								
				}
				$asql1 = $sql;
				if($auxp < count($protagonista) || $auxs < count($subtema) || (count($clasificacion)==2 && $auxc < count($clasificacion)))
				{
					while($auxp < count($protagonista) || $auxs < count($subtema) || (count($clasificacion)==2 && $auxc < count($clasificacion)))
					{
						$sql = $asql1;					
						$auxs = 0;
						$auxc = 0;
						if($auxp < count($protagonista))
						{
							$sqla = "and cp.idProtagonista = ".$protagonista[$auxp]." ";	
							$sql = $sql . $sqla;
							$resultado['protagonista']=$protagonista[$auxp];
							$auxp++;						
						}
						$asql2 = $sql;
						if ($auxs < count($subtema) || (count($clasificacion)==2 && $auxc < count($clasificacion)))
						{
							while($auxs < count($subtema)|| (count($clasificacion)==2 && $auxc < count($clasificacion)))
							{
								$sql = $asql2;
								$auxc = 0;
								if($auxs < count($subtema))
								{
									$sqla = "and td.idSubtema = ".$subtema[$auxs]." ";	
									$sql = $sql . $sqla;
									$resultado['subtema']=$subtema[$auxs];
									$auxs++;						
								}
								$asql3 = $sql;
								if(count($clasificacion)==2 && $auxc < count($clasificacion))
								{
									while(count($clasificacion)==2 && $auxc < count($clasificacion))
									{
										$sql = $asql3;
										$sqla = "and np.Clasificacion = ".$clasificacion[$auxc]." ";
										$sql = $sql . $sqla;
										$resultado['clasificacion']=$clasificacion[$auxc];
										$auxc++;
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
							//$resultado['sql'] = $sql;
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