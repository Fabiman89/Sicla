'use strict';



app.controller('UsersCtrl',['$scope','loginService','$http', function($scope,loginService,$http){
 $document.ready(function () {
          console.log('Hello World');
         });

  $http.get("data/consultas/Columnas.php").success(function(Columnas){
    $http.get("data/consultas/Notas.php").success(function(Notas){
      $http.get("data/consultas/medios.php").success(function(Medios){
        
        console.log(Medios);
        console.log(Columnas);
        console.log(Notas);
        $scope.angNotas=Notas;
        $scope.angColumnas=Columnas;
        $scope.angMedios=Medios;
         $scope.predicate="";
         $scope.pre= function(index){
          $scope.predicate=angular.copy(index);
         }













      });
    });
  });
}]);

app.controller('navCtrl',['$scope','loginService','$http', function($scope,loginService,$http){

}]);





app.controller('homeCtrl',['$scope','loginService', function($scope,loginService){
	$scope.txt = 'Home';
	$scope.logout = function(){
		loginService.logout();
	}
  
}]);


app.controller('colCtrl',['$scope','$http', function($scope,$http){
 $http.get("data/bdDefault8col.php").success(function(OchoCol){
  $scope.Ocol = OchoCol;
  console.log($scope.Ocol);
});
}]);






app.controller('inicioCtrl', ['$scope','$http',
  function($scope,$http) {
      $http.get("data/bdNotasSimple2.php").success(function(data4){
      $scope.notasDefault = data4;
      $uiViewScrollProvider.useAnchorScroll().
      console.log(data4);
  });
  }]);




app.controller('altaUsrCtrl', ['$scope','$http',
  function($scope,$http) {
    $scope.Usr ={};
    $scope.insertUsr=function(newUsr){
        console.log(newUsr);   
    var $promise= $http.post("data/inserciones/insercionUsrs.php",newUsr);
     $promise.then(function(msg){
      console.log(msg.data);  
          //$scope.alerta.tipo = "alert alert-success";
          //$scope.alerta.mensaje =" Dato almacenado en base de datos";
     });
   };
     // $http.get("data/bdNotasSimple2.php").success(function(data4){
     // $scope.notasDefault = data4;
     // console.log(data4);
  }]);
  







 function imagenesPeriodicosCtrl($scope,$http){
  $http.get("data/consultas/periodicosHoy.php")
          .success(function(varMedio){
            console.log(varMedio);
           // $scope.q = {};
            $scope.totalMedios = angular.copy(varMedio);
            $scope.medioSelect = varMedio[0];   
            $http.get("data/consultas/notasHoy.php?fecha="+$scope.medioSelect.fecha+"&idMedio="+$scope.medioSelect.idMedio)
              .success(function(varNotas){
                $scope.notasMedio = angular.copy(varNotas); 
                console.log($scope.notasMedio);       
                $scope.updateNotas = function(fecha,idMedio){  
                  $http.get("data/consultas/notasHoy.php?fecha="+fecha+"&idMedio="+idMedio)
                  .success(function(actualizacion){
                      $scope.notasMedio = angular.copy(actualizacion);
                      console.log($scope.notasMedio);  
                      console.log($scope.medioSelect);  
                  });
                }
              });
          });
 }

app.controller('sliderPeriodicos', ['$scope','$http',
  function($scope,$http){
    $scope.varPeriodicoActivo;
    $scope.varNotas = {};
    var resultado;
    var llamada;
    var actualizaNotas = function(resultado){
      $http.get("data/consultas/notasRecientes.php")
        .success(function(notasHoy){
          resultado=notasHoy;
          console.log(notasHoy);
          console.log(resultado);
        });
      return resultado;
    }

    console.log(actualizaNotas); 
    console.log(llamada);
    $http.get("data/consultas/medios.php")
    .success(function(medios){
        $scope.varPeriodicos=angular.copy(medios);
        console.log($scope.varPeriodicos);
        $http.get("data/consultas/notasRecientes.php")
        .success(function(notasHoy){
            var nslide = notasHoy.length;
           // $scope.varNotas= notasHoy;
            var slides = $scope.slides = [];



            $scope.addSlide = function(img,txt,id,fecha) {
              slides.push({
                image: img,
                text: txt,
                id:id,
                fecha:fecha
              });
            };
            for (var i=0; i< nslide; i++) {
             // $scope.addSlide($scope.notas8col[i].img8col,$scope.notas8col[i].titulo,$scope.notas8col[i].idNoticia,$scope.notas8col[i].fecha);
            }

        });  
    }); 
}]);


  function CarouselDemoCtrl ($scope,$http) {
    $http.get("data/bdDefault8col.php").success(function(col){
      $scope.notas8col = col;
      var nslide = col.length;
      console.log(col);
        $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function(img,txt,id,fecha) {
    slides.push({
      image: img,
      text: txt,
      id:id,
      fecha:fecha
    });
  };
  for (var i=0; i< nslide; i++) {
    $scope.addSlide($scope.notas8col[i].img8col,$scope.notas8col[i].titulo,$scope.notas8col[i].idNoticia,$scope.notas8col[i].fecha);
  } 
    });

}

function controlTest($scope,$http){
  $http.get("data/consultas/medios.php")
          .success(function(varMedio){
            $scope.slideMedios = varMedio;
          });
}