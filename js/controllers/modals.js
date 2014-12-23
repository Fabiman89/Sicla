
          var autorModalCtrl = function ($scope, $modalInstance){

          $scope.actualizaMedios = function (){
            $http.get("data/medios.php").success(
            function(data) {
              $scope.opcionesMedios = data;
              console.log(data);
            });
          };

            $scope.opcionesMedios = "hola";
            $scope.autors = {};
            $scope.alerta = {"tipo":"","mensaje":""};
           $scope.updateAutor=function(autor){
              console.log(autor);
              var $promise = $http.post("data/inserciones/insercionAutor.php",autor);
              $promise.then(function(msg) {
                console.log(msg);
              });
              $scope.autors = angular.copy($scope.master);
              $scope.formAutor = angular.copy(autor);
              $scope.alerta.tipo = "alert alert-success";
              $scope.alerta.mensaje =" Autor almacenado exitosamente";
            };
            $scope.cancel = function () {
              $modalInstance.close();
            };

            $scope.ok = function () {
              $modalInstance.close();
            };

          };