<?php
	if ($gestor = opendir('imagenes/')) 
	{
		$i = 0;
	    while (false !== ($entrada = readdir($gestor))) 
	        $i++;
    	closedir($gestor);
	}
	if ($i>0)
		$i--;
	else
		$i = 1;
	$data = urldecode($_POST['imageData']);
	list($type, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);
	file_put_contents('imagenes/image'.$i.'.png', $data);
	echo "image$i.png";
?>