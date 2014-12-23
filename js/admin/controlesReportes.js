  siclaApp.controller('reportCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
    $scope.medios = {};
    $scope.autores = {};  
    $scope.areas = {};
    $http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(rOp){
      $scope.medios = rOp;
      console.log($scope.medios);
    });

    $scope.getAutores = function(idMedio){
      
      $http.post("data/consultas/consultasAdmin.php",{'sentencia':3,'id':idMedio}).success(function(rOp){
        $scope.autores = rOp;
        console.log($scope.autores);
      });      
    }

    $http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(rOp){
      $scope.areas = rOp;
    });

    $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(rOp){
      $scope.protagonistas = rOp;
    });

}]);