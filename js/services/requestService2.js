'use strinct';
app.factory("Request",['$http','$q',function($http,$q){
	var servicio = {};
	var opcionesMedios = 1;
	var opcionesProtagonista = 1;
	var opcionesTemas = 1;
	var opcionesPais = 1;
	var opcionesAreas = 1;
	var opcionesSubtemas = 1;
	var opcionesEstados = 1;
	 

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
	servicio.insert_protagonista = function(protagonista){
		var sync = $q.defer();
		$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':6,'protagonista':protagonista}).success(function(dataProt){ 
			opcionesProtagonista = dataProt;
			sync.resolve();
		});
		return sync.promise;
	}
	


	servicio.getAllCargos = function(){
		var sync = $q.defer();
		 $http.post("data/consultas/consultasAdmin.php",{'sentencia':13}).success(function(dataAllCargos){
		 	opcionesAllCargos = dataAllCargos;
		 	sync.resolve();
		 });
		 return sync.promise;
	}
	servicio.checkAllCargos = function(){
		return opcionesAllCargos;
	}

	servicio.getAllCargos();

	servicio.getCargo = function(id){
		var sync = $q.defer();
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':6,'protagonista':id}).success(function(dataCargo){
          opcionesCargo = dataCargo;
        sync.resolve();
        });	

		 return sync.promise;   
	}
	servicio.checkCargo = function(){
		return opcionesCargo;
	}; 
	servicio.insert_cargo = function(cargo){
		var sync = $q.defer();
		$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':7,'cargo':cargo}).success(function(dataCargo){
			opcionesCargo = dataCargo;
			sync.resolve();
		});
		return sync.promise;
	}
	servicio.asigna_cargo = function(prot,carg){
		var sync = $q.defer();
		$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':8,prot:prot,car:carg}).success(function(dataCargo){
			opcionesCargo = dataCargo
			sync.resolve();
        });
		return sync.promise;
	}


	servicio.getAreas = function(){
		var sync = $q.defer();
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(dataArea){
            opcionesAreas = dataArea;
            sync.resolve();
          });	
          return sync.promise;   
	}
	servicio.checkAreas = function(){
		return opcionesAreas;
	}
	servicio.insert_area = function(area){
		var sync = $q.defer();
		 $http.post('data/inserciones/insercionesAdmin.php',{'sentencia':9,'nombre':area.nombre}).success(function(dataArea) {
		 	opcionesAreas = dataArea;
		 	sync.resolve();
		 });
		 return sync.promise;
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
	servicio.insert_tema = function (tema){
		var sync = $q.defer();
		$http.post('data/inserciones/insercionesAdmin.php',{'sentencia':10,'datos':tema}).success(function(nuevoArray) {
		opcionesTemas = nuevoArray;
			sync.resolve();
		});
		return sync.promise;
	};




	servicio.getSubtemas = function(){
		var sync = $q.defer();
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':23}).success(function(dataSub){
            opcionesSubtemas = dataSub;
            console.log(dataSub);
            sync.resolve();
          });	
          return sync.promise;   
	}
	servicio.checkSubtemas = function(){
		return opcionesSubtemas;
	}
	servicio.insert_subtema = function (subtema){
		var sync = $q.defer();
		$http.post('data/inserciones/insercionesAdmin.php',{'sentencia':11,'subtema':subtema}).success(function(nuevoArray) {
			opcionesSubtemas = nuevoArray;
			sync.resolve();
		});
		return sync.promise;
	};



	servicio.getPais = function (){
		var sync = $q.defer();
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(dataPais){
            opcionesPais = dataPais;
            sync.resolve();
          });	
          return sync.promise;   	
	}
	servicio.checkPais = function(){
		return opcionesPais;
	};

	servicio.insert_pais = function(pais){
		var sync = $q.defer();
		$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':12,'nombre':pais.nombre}).success(function(nuevoArray) {
          opcionesPais = nuevoArray;
          sync.resolve();
        });	

		return sync.promise;
	};

	servicio.getEstado = function(idPais){
		var sync = $q.defer();
       $http.post("data/consultas/consultasAdmin.php",{'sentencia':11,'pais':idPais}).success(function(dataEstados){
          opcionesEstado = dataEstados;
          sync.resolve();
       });	
       return sync.promise;	
	}
	servicio.checkEstado = function(){
		return opcionesEstado;
	}

	servicio.insert_estado = function(estado){
		var sync = $q.defer();
		$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':13 ,'estado':estado}).success(function(nuevoArray) {
          opcionesEstado = nuevoArray;
          sync.resolve();
        });	
        return sync.promise; 			
	};

	servicio.getMunicipio = function(estado){
		var sync = $q.defer();
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':12,'estado':estado}).success(function(dataMunicipio){
        	opcionesMunicipio = dataMunicipio;
       		sync.resolve();
        });	
		 return sync.promise; 	
	}

	servicio.checkMunicipio = function (estado){
		return opcionesMunicipio;
	}

	servicio.insert_Municipio = function (municipio){
		var sync = $q.defer();
		$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':14,'municipio':municipio}).success(function(nuevoArray) {
          opcionesMunicipio = nuevoArray;
          sync.resolve();
        });	
        return sync.promise; 	
	}

/*
	servicio.insert_Municipio = function (municipio){
		var sync = $q.defer();
		$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':14,'municipio':municipio}).success(function(nuevoArray) {
          opcionesMunicipio = nuevoArray;
          sync.resolve();
        });	
        return sync.promise; 	
	};
*/

return servicio;
} ]);
