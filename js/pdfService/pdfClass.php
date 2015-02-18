<?php
session_start();
require("../../pdf/fpdf.php");
//require("pdfController.php");
class pdf1 extends fpdf{


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



function tituloTbl($title){
	$this->SetFillColor(255,106,100);
	$this->SetFont('Arial','B',15);
	$this->Cell(200,9,$title,1,1,'C',true);
	$this->SetFont('Arial','',12);
	$this->SetFillColor(224,235,255);
}

function celda($txt1,$txt2,$turn){

	$this->SetFont('Arial','B',14);
	$this->Cell(100,9,$txt1,"LR",0,'C',$turn);
	$this->SetFont('Arial','',12);
	$this->Cell(100,9,$txt2,"LR",0,'C',$turn);
	
}

function SetTxt($objeto){
	$texto = $objeto['data'];
	$this->MultiCell(0,8,$texto,0);
	$this->Ln();
}

function SetTitl($objeto){
	$this->SetFont('Arial','B',16);
	$titulo = $objeto['data'];
	$this->MultiCell(0,8,$titulo,0,'C');
	$this->Ln();
	$this->SetFont('Arial','',12);
}

function sintesis($txt){
	$this->MultiCell(0,8,$txt,0,'C');
	$this->Ln();
}

function celdaNotas($txt1,$txt2){
	$this->SetFont('Arial','B',10);
	$this->Cell(100,7,$txt1,'L',0,'R',true);
	$this->Cell(100,7,$txt2,'R',0,'L',true);
	$this->SetFont('Arial','',12);
	
}
		function SetNotes($array){
				
				$tbls = $array['data'];
					foreach($tbls as $tbl){
						$this->SetFillColor(255,106,100);
						$this->Cell(200,8,"Fecha:   ".$tbl['fecha'],"TLR",0,'C',true);
						$this->Ln();	
						$this->celdaNotas("Medio   ",$tbl['medio']);
						$this->Ln();
						$this->celdaNotas("Fecha   ",$tbl['fecha']);
						$this->Ln();
						$this->celdaNotas("Tipo de nota   ",$tbl['tipo de nota']);
						$this->Ln();
						$this->celdaNotas("Protagonista   ",$tbl['protagonista']);
						$this->Ln();
						$this->celdaNotas("Area   ",$tbl['area']);
						$this->Ln();
						$this->SetFillColor(224,235,255);
						$this->Cell(200,7,"Sintesis:",'TLRB',0,'C',true);
						$this->Ln();
						$this->SetFont('Arial','B',18);
						$this->MultiCell(200,10,$tbl['titulo'],'LR','C');
						$this->SetFont('Arial','',12);
						//$this->Cell(200,7,"Sintesis",'TB',0,'C');
						$this->MultiCell(200,8,$tbl['sintesis'],'LR','J');
						$this->SetFont('Arial','I',9);		
						//$link = $this->AddLink();
						$this->MultiCell(200,9,"Nota completa: ".$tbl['url'],'LRB','C');
						$this->SetFont('Arial','',12);
						$this->Ln();
					}
				$this->Ln();
								
		}

		function desglosa($array){
				$tbls = $array['data'];
				
					foreach($tbls as $tbl){
						$this->tituloTbl($array['titulo']);
						$fill = false;
						foreach($tbl as $key=>$value){

								$this->celda($key,$value,$fill);
								$this->Ln();	
								$fill = !$fill;
							
						}
						$this->Cell(200,10,'','T',0,'C');
						$this->Ln();

					}
				$this->Ln();			
		}
}
$sentencia = json_decode(file_get_contents('php://input'), true);
if(!isset($_SESSION['array'])){
	$_SESSION['array'] = $sentencia['sentencia'];
}else{
	
	$bigArray = $_SESSION['array'];
	$pdf = new pdf1('P','mm','Legal');
	$pdf->SetFont('Arial','',12);
	$pdf->AddPage();
	$pdf->SetFillColor(224,235,255);

for($i = 0;$i<count($bigArray);$i++){
	if($bigArray[$i]['tipo']==1){
		$pdf->desglosa($bigArray[$i]);
	}if($bigArray[$i]['tipo']==2){
		$pdf->SetTitl($bigArray[$i]);
	}if($bigArray[$i]['tipo']==3){
		$pdf->SetTxt($bigArray[$i]);
	}if($bigArray[$i]['tipo']==4){
		$pdf->SetNotes($bigArray[$i]);
		$pdf->Ln();
	}
}
$pdf->Output();

}

?>