'use strict';

app.controller('notaCtrl', ['$scope','$http','$stateParams',
  function($scope,$http, $routeParams) {
     // $scope.perio=$routeParams.id;
     console.log($routeParams.idNoticia);
      $http.get("data/consultaNota.php?Id="+$stateParams.idNoticia).success(function(data2){
      $scope.nota = data2;
      console.log($scope.nota);
    });
  }]);



app.controller('usrDisplayCtrl', ['$scope','$http','$stateParams',
  function($scope,$http, $routeParams) {
     // $scope.perio=$routeParams.id;
      $http.get("data/bdNotasSimple2.php").success(function(data2){
      $scope.notas = data2;
      console.log($scope.notas);
    });
  }]);
