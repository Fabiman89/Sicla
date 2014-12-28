  siclaApp.controller('reportCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
    $scope.medios = {};
    $scope.autores = {};  
    $scope.areas = {};
    $scope.rArea = 0;
    $scope.rAutor = 0;
    $scope.rMedio = 0;
    $scope.op0 = false;
    $scope.op1 = false;
    $scope.op2 = false;
    $scope.op3 = false;
    $scope.op4 = false;
    $scope.op5 = false;
    $scope.rProtagonista = 0;

$scope.add1 = function(){
    console.log($scope.op1);
    $scope.op1= $scope.op1+1;
}

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
    
    $scope.getReporte = function(area,autor,medio,protagonista) 
    {
    	var areas=[], autores=[], medios=[], protagonistas=[], clasificacion=[];
    	areas.push(0);
    	autores.push(autor);
    	medios.push(medio);
    	protagonistas.push(protagonista);
    	clasificacion.push(0);
    	if(medio == 1 )
    		medios.push($scope.thisMedio);
    	if(protagonista == 1)
    		protagonistas.push($scope.thisProt);
    	if(autor == 1)
    		autores.push($scope.thisAutor);
    	if(area == 1)
    		areas.push($scope.thisArea)
    	$http.post("data/consultas/consultaReportes.php",
    	{'autor':autores, 'medio':medios, 'protagonista':protagonistas, 'tema':areas, 'clasificacion':clasificacion}).success(function(data) {
    		console.log(data);
    	});    	
    };

}]);