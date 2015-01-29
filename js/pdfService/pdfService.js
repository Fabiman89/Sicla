'use strinct';
siclaApp.factory('PdfService', ['$http',function($http){
	var servicio = {};
	var array = [];

	var tipo1 = {};
	tipo1.tipo = 1;
	tipo1.data = "titulo";

	var tipo2 = {};
	tipo2.tipo=2;
	tipo2.data= "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula";

	var tipo3 = {};
	tipo3.tipo = 3;
	tipo3.titulo=" - ";
	tipo3.data = [];

	var objeto1 = {};
	objeto1.autor = "Un wei";
	objeto1.medio = "otro wei";
	objeto1.total = 65;

	var objeto2 = {};
	objeto2.autor = "este es un wei diferente";
	objeto2.medio = "segundo wei";
	objeto2.total = 100;

	tipo3.data.push(objeto1);
	tipo3.data.push(objeto2);

	array.push(tipo3);
	//array.push(tipo2);
	//array.push(tipo3);

	servicio.test = function(){
		console.log(tipo3);
		$http.post("js/pdfService/pdfClass.php",{"sentencia":array}).success(function(respuesta){	console.log(respuesta);		});
	};
	return servicio;
}]);