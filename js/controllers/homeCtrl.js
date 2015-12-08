'use strict';
app.controller('homeCtrl',['$scope','$http','$modal', function($scope,$http,$modal){
 // $http.get("data/consultas/Columnas.php").success(function(Columnas){
  $http.post('data/inserciones/insercionContador.php',{'Sitio':'Visitas'});
  $http.post("data/consultas/consultas.php",{'sentencia':1}).success(function(Columnas){ 
   $http.post("data/consultas/consultas.php",{'sentencia':2}).success(function(Medios){ 
        $scope.angMedios=Medios;
        console.log($scope.angMedios);
        $scope.angColumnas=Columnas;
        console.log(Columnas);
        // $scope.predicate = "";
         $scope.pre= function(index){
          $scope.predicate = angular.copy(index);
          console.log($scope.predicate);
         };
         $scope.notaVista="";
         $scope.datosModal= function(index){
          $scope.notaVista=angular.copy(index);
            var modalInstance = $modal.open({
            templateUrl: 'partials/modalsNotas.html',
            controller: notaUsrCtrl,
            size: 'lg',
            resolve: {
              notaVista: function () {
                   return $scope.notaVista;
              }
            }
          });
         }
        var notaUsrCtrl = function($scope, $modalInstance, notaVista) {
          $scope.dt = notaVista;
          $scope.txt = $scope.dt.texto;
            console.log($scope.txt);
          $scope.cancel = function () {
            $modalInstance.close();
          };

          $scope.ok = function () {
            $modalInstance.close();
          };
        };
    });
  });
}]);




app.controller('homeCtrl2',['$location','$scope','$http','$modal','$log', function($location,$scope,$http,$modal,$log){    
    
  $scope.user = {};
  $scope.open1 = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/modalsRegistro.html',
      controller: altaUsrCtrl,
      size: size,
      resolve: {
        items: function () {
        }
      }
    });
  };
    $scope.open2 = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'partials/modalsLogin.html',
      controller: loginUsrCtrl,
      size: size,
      resolve: {
        items: function () {
          
        }
      }
    });
  };



  var altaUsrCtrl = function($scope, $modalInstance, items) {
    $scope.master = {};
    $scope.usuario = {};
    $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
    $scope.insertUsr=function(newUsr){
      console.log(newUsr);   
      $http.post("data/inserciones/insercionUsrs.php",newUsr).success(function(msg){
          console.log(msg.data);  
          $modalInstance.dismiss('cancel');
          //$scope.alerta.tipo = "alert alert-success";
          //$scope.alerta.mensaje =" Dato almacenado en base de datos";
     });
   };
  };

  var loginUsrCtrl = function($scope, $modalInstance, items,$location) {
   $scope.alerta = {"tipo":"","mensaje":""};

  $scope.logIn = function(usrData){
    $scope.master = {};
    var route = [];
    $http.post("data/consultas/consultasLogin.php",{'sentencia':1,"correo":usrData.correo,"password":usrData.password}).success(function(msg){ 
      if(msg["mensaje"]=="A201")
      {              
        $scope.alerta.tipo = "alert alert-success";
        $scope.alerta.mensaje =" Exito ";        
         route = msg[0].idTipoUsr;
          console.log(route);

          if(route==1 || route ==2){
          	$modalInstance.close();
            window.location.assign("admin.html");            
          }
          if(route==3 || route>4 && route<=9){
          	  	$modalInstance.close();
              $location.path("/premium/");              
          }
          if(route==4){
          	  $modalInstance.close();
              $location.path("/usuario");              
          }
       }else {
       		$scope.alerta.tipo = "alert alert-danger";
       		$scope.alerta.mensaje =" Comprueba los datos de acceso "; 
       }

     });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  }
/*====================================*/


}]);


app.service('RegisterService',['$http', function($http){
    var usr = 0;
    var periodicos = [];
    var medios = [];
    this.getNotes = function (){
          $http.post("data/consultas/consultas.php",{'sentencia':4 ,'tipo':4}).success(function(info){ 
            periodicos = info[1];
          });
     };

    this.getMedios = function (){
        $http.post("data/consultas/consultas.php",{'sentencia':2}).success(function(Medios){ 
          medios = Medios;
        });
        return medios;
    };




}]);


app.controller('notaEsCtrl',['$scope','$http','$routeParams', function($scope,$http,$routeParams){
	$scope.no = false;
	if($routeParams.idNota != undefined)
	{
		$http.post('data/consultas/consultas.php', {'sentencia':5, 'idNota':$routeParams.idNota}).then(function(nota) {
			if (nota.data != "Error 105")				
				if(nota.data.length > 0)
					$scope.dt = nota.data[0];
				else
				{
					$scope.txt = "No existe la nota solicitada.";
					$scope.no = true;
				}
			else
			{
				$scope.txt = "Hubo un error en el servidor.";
				$scope.no = true;
			}								
		});
	}else
		$location.path("/inicio");              	
}]);





app.controller('homeUserCtrl',['$scope','$http','$modal','$log', function($scope,$http,$modal,$log){
   $http.post('data/inserciones/insercionContador.php',{'Sitio':'Logueado'});
   $http.post("data/consultas/consultas.php",{'sentencia':1}).success(function(Columnas){ 
   $http.post("data/consultas/consultas.php",{'sentencia':2}).success(function(Medios){ 
        $scope.angMedios=Medios;
        $scope.angColumnas=Columnas;

       });
      });

         $scope.notaVista="";
         $scope.datosModal= function(index){
          $scope.notaVista=angular.copy(index);
            var modalInstance = $modal.open({
            templateUrl: 'partials/modalsNotas.html',
            controller: notaUsrCtrl,
            size: 'lg',
            resolve: {
              notaVista: function () {
                   return $scope.notaVista;
              }
            }
          });
         }
        var notaUsrCtrl = function($scope, $modalInstance, notaVista) {
          $scope.dt = notaVista;

          $scope.cancel = function () {
            $modalInstance.close();
          };

          $scope.ok = function () {
            $modalInstance.close();
          };
        };




}]);



app.service('PremiumService',['$http', function($http){
      var periodicos = {};   
    this.getData = function(){
      return periodicos;
      console.log(periodicos)
    }

    this.getNotes = function (){
          $http.post("data/consultas/consultas.php",{'sentencia':4 ,'tipo':3}).success(function(info){ 
            periodicos = info;
          });
          
     }

}]);


app.controller('PremiumCtrl',['$scope','$http','$modal','PremiumService','Request','$q', 'localData',function($scope,$http,$modal,PremiumService,Request,$q, localData){
          $http.post('data/inserciones/insercionContador.php',{'Sitio':'Logueado'});
          localData.getProtagonista().then(function(data) {
          		$scope.Protagonista = data;
          });
          localData.getMedio().then(function(data) {
          		$scope.Medios = data;
          });
          localData.getAllSubtemas().then(function(data) {
				$scope.Subtemas = data;          
          });
          localData.getAllTemas().then(function(data) {
				$scope.Temas = data;
          });
          $scope.Medios = {};
          $scope.Autores = {};
          $scope.Tipos={};
          var ad = false, bqAvd;
          $scope.changePage = function(numPage){
          		if (!ad)
	          		$http.post("data/consultas/consultas.php",{'sentencia':4 ,'tipo':3,'page':numPage}).success(function(info){ 
	                     $scope.angColumnas  = info[1];
	                    $scope.bigTotalItems = info[0];
	                });
	            else
	            {
	            	var auxcol = [], i=0;
	            	for (i=(numPage-1)*25; i<((numPage-1)*25)+25; i++)
	            		if (i<bqAvd.length)
	            			auxcol.push(bqAvd[i]);
	            	$scope.angColumnas = auxcol;
	            }
	            	
          };
                 $scope.changePage(1);
                 $scope.maxSize = 5;
                 $scope.bigCurrentPage = 1;
//global medios
         $scope.busquedaAvanzada = function() 
         {
         	var auxTema = [], auxST = [], auxMedio = [], auxPro = [], auxFecha = [], auxTotal;
         	if ($scope.search.nombreProtagonista != undefined && $scope.search.nombreProtagonista != "")
     			auxPro.push(1,$scope.search.nombreProtagonista);
     		else
     			auxPro.push(0);
     		if ($scope.search.fecha != undefined && $scope.search.fecha != "")
     			auxFecha.push(1,$scope.search.fecha);     		
     		else
     			auxFecha.push(0);	
     		if ($scope.search.nombreMedio != undefined && $scope.search.nombreMedio != "")
     			auxMedio.push(1,$scope.search.nombreMedio);
     		else
     			auxMedio.push(0);
     		if ($scope.search.nombreTema != undefined && $scope.search.nombreTema != "")
     			auxTema.push(1,$scope.search.nombreTema);
     		else
     			auxTema.push(0);
     		if ($scope.search.nombreSubtema != undefined && $scope.search.nombreSubtema != "")
     			auxST.push(1,$scope.search.nombreSubtema);
     		else
     			auxST.push(0);
			$http.post('data/consultas/consultaAvanzada.php', {medio:auxMedio, protagonista:auxPro, tema:auxTema, subtema:auxST, fecha:auxFecha, reporte:2, autor:[0], clasificacion:[0], tipo:[0], seccion:[0], genero:[0], pais:[0], estado:[0], area:[0], cargo:[0], municipio:[0]}).success(function(data2) 
			{
				ad = true;
				bqAvd = data2;
				var auxcol = [], i=0;
				for (i=0; i<25; i++)
					if (i<data2.length)
						auxcol.push(data2[i]);									
				$scope.angColumnas = auxcol;
				$scope.bigTotalItems = data2.length;
				$scope.bigCurrentPage = 1;
			});	
         };
         
         $scope.notaVista="";
         $scope.datosModal= function(index){
          $scope.notaVista=angular.copy(index);
            var modalInstance = $modal.open({
            templateUrl: 'partials/modalsNotas.html',
            controller: notaUsrCtrl,
            size: 'lg',
            resolve: {
              notaVista: function () {
                   return $scope.notaVista;
              }
            }
          });
         }
        var notaUsrCtrl = function($scope, $modalInstance, notaVista) {
          $scope.dt = notaVista;

          $scope.cancel = function () {
            $modalInstance.close();
          };

          $scope.ok = function () {
            $modalInstance.close();
          };
        };




}]);