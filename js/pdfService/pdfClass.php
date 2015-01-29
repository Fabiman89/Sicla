<?php
require("../../pdf/fpdf.php");
//require("pdfController.php");
class pdf extends fpdf{
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
	$this->Cell(120,9,$title,1,1,'C');
}

function celda($txt1,$txt2){
	print_r($txt2);
	$this->Cell(60,9,$txt1,1,0,'C');
	$this->Cell(60,9,$txt2,1,0,'C');
}

function Crea($titulo,$tbl){

		//$this->tituloTbl($titulo);
		
		
		

}

function desglosa($array){
	$p=$array[0];
	//echo 'LA';
	//if(isset($p['autor']) ){
		$nombre = "";
		$nombre .= $p['autor'];
		$this->celda("Autor",$nombre);
	//}


}
}
$sentencia = json_decode(file_get_contents('php://input'), true);
$bigArray = $sentencia['sentencia'];
$objetos = $bigArray[0]['data'];

$pdf = new PDF('P','mm','Legal');
$pdf->SetFont('Arial','B',16);
$pdf->AddPage();
$pdf->desglosa($objetos);

//$pdf->Crea("Titulo","This","That");
//$pdf->Ln();
//$pdf->Crea("Titulo","This","That");
$pdf->Output();
?>