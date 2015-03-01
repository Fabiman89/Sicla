'use strinct';
app.factory("Request",['$http','$q',function($http,$q){
	var servicio = {};
	var opcionesMedios = 1;
	var opcionesProtagonista = 1;
	var opcionesTemas = 1;
	var opcionesSubtemas = 1;
	 

	servicio.getMedios = function(){
			var sync = $q.defer();
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(dataMedios){
            opcionesMedios = dataMedios;
            sync.resolve();
          });	
          return sync.promise;   
	}
	servicio.checkMedios = function(){
		return opcionesMedios;
	}

	servicio.getSubtemas = function(){
		var sync = $q.defer();
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':23}).success(function(dataSub){
            opcionesSubtemas = dataSub;
            sync.resolve();
          });	
          return sync.promise;   
	}
	servicio.checkSubtemas = function(){
		return opcionesSubtemas;
	}

		servicio.getTemas = function(){
			var sync = $q.defer();
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':22}).success(function(dataTemas){
            opcionesTemas = dataTemas;
            sync.resolve();
          });	
          return sync.promise;   
	}

	servicio.checkTemas = function(){
		return opcionesTemas;
	}

		servicio.getProtagonista = function(){
			var sync = $q.defer();
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(dataProtagonista){
            opcionesProtagonista = dataProtagonista;
            sync.resolve();
          });	
          return sync.promise;   
	}

	servicio.checkProtagonista = function(){
		return opcionesProtagonista;
	}

	return servicio;


} ]);
