'use strinct';
app.factory("Request",['$http','$q',function($http,$q){
	var servicio = {};
	var opcionesMedios = 1;
	var opcionesAutores = 1;
	var opcionesTipos = 1;
	 

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

	servicio.getTipos = function(){
		var sync = $q.defer();
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(dataTipos){
            opcionesTipos = dataTipos;
            sync.resolve();
          });	
          return sync.promise;   
	}
	servicio.checkTipos = function(){
		return opcionesTipos;
	}

		servicio.getAutores = function(){
			var sync = $q.defer();
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':21}).success(function(dataAutores){
            opcionesAutores = dataAutores;
            sync.resolve();
          });	
          return sync.promise;   
	}
	servicio.checkAutores = function(){
		return opcionesAutores;
	}


	return servicio;


} ]);
