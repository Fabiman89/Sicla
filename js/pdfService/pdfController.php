 <?php
require("../../pdf/fpdf.php");
class PDF extends FPDF
{

	/*
// Cabecera de página
function Header()
{
    // Logo
    $this->Image('../../lib/img/logos/logo.png',10,8,33);
    // Arial bold 15
    $this->SetFont('Arial','B',15);
    // Movernos a la derecha
    $this->Cell(80);
    // Título
    $this->Cell(30,10,'Reporte',1,0,'C');
     // Movernos a la derecha
    $this->Cell(50);
    // Salto de línea
	$this->Cell(30,10,date("d-m-y"),0,0);

    $this->Ln(20);
}


// Pie de página
function Footer()
{
    // Posición: a 1,5 cm del final
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Número de página
    $this->Cell(0,10,'Pagina '.$this->PageNo(),0,0,'C');

      $this->SetY(-100);
}
*/
function BasicTable($header, $data)
{
    // Cabecera
    $this->Cell(80,7,$header,1);
    $this->Ln();
    // Datos
    foreach($data as $key => $value)
    {	
    	//print_r($data);
            $this->Cell(40,6,'$key',1);
            $this->Cell(40,6,'$value',1);
        $this->Ln();
    }
}

//procesado de tablas

function maquila($doc,$pdf){
	for($i=0;$i<count($doc);$i++){
		if($doc[$i]['tipo']==3){
			$this->tablas($doc[$i],$pdf);
		}
	}
}

	function tablas($array,$builder){
        $litleTables = $array['data'];
        //print_r($litleTables);
        $tabla = array();
        $header = $array['titulo'];
        for($i=0;$i<count($litleTables);$i++){
        	$count=0;
        	$row = array();
        	foreach($litleTables[$i] as $key => $value){
 					$builder->Cell(40,6,'$key',1);
            		$builder->Cell(40,6,$value,1);
            		$builder->Ln();			

 //       		$row[$count]=array($key,$value);
 //       		print_r(1);
 //       		print_r($row[$count]);
 //1       		$count = $count+1;
        	}
        	
        	
     //   	$this->BasicTable($header,$row);
        }
	}


		}



?>