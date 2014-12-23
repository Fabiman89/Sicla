'use strict';
app.controller('homeCtrl',['$scope','$http','$modal', function($scope,$http,$modal){
 // $http.get("data/consultas/Columnas.php").success(function(Columnas){
  $http.post("data/consultas/consultas.php",{'sentencia':1}).success(function(Columnas){ 
   $http.post("data/consultas/consultas.php",{'sentencia':2}).success(function(Medios){ 
        $scope.angMedios=Medios;
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
    console.log(usrData); 
    $http.post("data/consultas/consultasLogin.php",{'sentencia':1,"correo":usrData.correo,"password":usrData.password}).success(function(msg){ 
			$scope.alerta.tipo = "alert alert-success";
			$scope.alerta.mensaje =" Exito ";
			console.log(msg[0].idTipoUsr); 
			if(msg[0].idTipoUsr == 1){
            	window.location.assign("admin.html");
          	}
          	if(msg[0].idTipoUsr == 4){
            	$location.path("/usuario");
            	$modalInstance.close();
          	}
     });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  }
/*====================================*/


}]);




app.controller('homeUserCtrl',['$scope','$http','$modal','$log', function($scope,$http,$modal,$log){
   $http.post("data/consultas/consultas.php",{'sentencia':1}).success(function(Columnas){ 
   $http.post("data/consultas/consultas.php",{'sentencia':2}).success(function(Medios){ 
        $scope.angMedios=Medios;
        $scope.angColumnas=Columnas;
        console.log(Columnas);

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