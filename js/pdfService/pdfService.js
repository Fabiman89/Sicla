'use strinct';
siclaApp.factory('PdfService', ['$http',function($http){
	var servicio = {};
	var array = [];

	var tipo3 = {};
	tipo3.tipo = 3;
	tipo3.data = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula";



	var tipo2 = {};
	tipo2.tipo=2;
	tipo2.data= "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. enean commodo ligula eget dolor. Aenean massa. Cum sociis natoq ";

	var tipo1 = {};
	tipo1.tipo = 1;
	tipo1.titulo=" - ";
	tipo1.data = [];


	var tipo4 = {};
	tipo4.tipo = 4;
	tipo4.data = [];




	var objeto1 = {};
	objeto1.medio="Local";
	objeto1.fecha = "2015-01-07";
	objeto1.sintesis = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula";
	objeto1.protagonista = "Juan Rulfo";
	objeto1.tipo = "Nota";
	objeto1.url = "www.sicla.com";
	objeto1.area = "Agrarios";
	objeto1.titulo="Problemas en casa";


	var objeto3 = {};
	objeto3.autor = "Otro Autor";
	objeto3.medio = "Medio 3";
	objeto3.total = 100;

	var objeto2 = {};
	objeto2.autor = "este es un Autore";
	objeto2.medio = "Medio 2";
	objeto2.total = 100;

	tipo1.data.push(objeto3);
	//tipo1.data.push(objeto2);
	//tipo1.data.push(objeto3);
	tipo1.data.push(objeto2);

	tipo4.data.push(objeto1);
	array.push(tipo2);
	array.push(tipo3);
	array.push(tipo4);
	array.push(tipo1);

	//array.push(tipo2);
	//array.push(tipo3);

	servicio.test = function(BigData){
		console.log(BigData);
		$http.post("js/pdfService/pdfClass.php",{"sentencia":BigData});//.success(function(respuesta){	console.log(respuesta);		});
	};
	return servicio;
}]);