  siclaApp.controller('reportCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
// PRIMERA PROPUESTA


    $scope.medios = {};
    $scope.autores = {};  
    $scope.areas = {};
    $scope.rArea = 0;
    $scope.rAutor = 0;
    $scope.rMedio = 0;
    $scope.grafica = 0;
    $scope.op0 = false;
    $scope.op1 = false;
    $scope.op2 = false;
    $scope.op3 = false;
    $scope.op4 = false;
    $scope.op5 = false;
    $scope.rProtagonista = 0;

    $scope.selec = "Seleccionar";

    $scope.periodos = [{"name":"Histórico","val":0},{name:'Anual',val:1},{"name":" en rango","val":2}];

        $scope.Sustituye = function(a,d){
                a = angular.copy(d);
                return a;
        };


        $scope.DropdownCtrl = function (){

        };
        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
          };


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

//  SEGUNDA PROPUESTA  
    $scope.previewArray = [];
    $scope.previewSize = 0;










    $scope.appendVar = function(arr,objt,size){
        array = [];
        console.log(arr);
        if(size>0){
            for(i=0;i<size;i++){
                array.push(arr[i]);
                console.log("pushing");
            }   
        }
        array.push(objt);
       
        return array;
    };

    $scope.deleting = function(arr,este,size){
        array = [];
        if(size>0){
            for(i=0;i<size;i++){
                if(i==este){
                    console.log(i);
                }else{
                    array.push(arr[i]);
                }
            }
        }
        $scope.previewSize = $scope.previewSize - 1;
        return array;

    };






$scope.deleteFromPreview = function (toDelete){
    console.log(toDelete);
    $scope.previewArray = $scope.deleting($scope.previewArray,toDelete,$scope.previewSize);
};




    $scope.addToPreview = function(obj){
        switch(obj){
            case 1:
                variableTemporal="\nGenerar grafica de PIE\n\n";
                $scope.previewArray = $scope.appendVar($scope.previewArray,variableTemporal,$scope.previewSize);
                $scope.previewSize = $scope.previewSize + 1 ;
                $scope.modalPie();
                break;
            case 2:
            
                $scope.modalTexto();
                break;
            case 3:
                variableTemporal="Generar grafica de Barras";
                $scope.previewArray =  $scope.appendVar($scope.previewArray,variableTemporal,$scope.previewSize);
                $scope.previewSize = $scope.previewSize + 1 ;
                break;
        }
        //console.log($scope.previewSize);
        //$scope.previewArray = $scope.appendVar($scope.previewArray,obj,$scope.previewSize);
        
    };
    
    $scope.saveToPDF = function(){
        $scope.pdf = $scope.previewArray;
    };






    // MODAL GRAFICA DE PIE
    $scope.modalPie = function(){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/reportes/reportePie.html',
            controller: pieCtrl,
            size: 'lg',
            resolve: {
            notaOpc: function() {
              //datos = [];
              //datos.push(datos1,datos2);
              //return datos;
            }
            }
          });
          
          modalInstance.result.then(function(data) {
            //
          });
        };

        var pieCtrl = function($filter,$scope,$modalInstance, notaOpc){
            hoy = $filter("date")(Date.now(), 'yyyy-MM-dd');
            $scope.permiso = false;
            $scope.sup = {}; //support
            $scope.reporte = {};
            $scope.reporte.fecha1 = $filter("date")(Date.now(), 'yyyy-MM-dd');
            $scope.sup.fecha = 0;


            $scope.op1 = false;
            $scope.checkState = function(value){
                switch(value){
                //FECHA
                    case 1:
                        console.log("checked");
                        if( $scope.sup.fecha==0 && $scope.reporte.fecha2){
                            delete($scope.reporte.fecha2);
                        }
                        break;
                // MEDIO
                    case 2:
                        if($scope.sup.medio==0 && $scope.op1){
                            $scope.reporte.medio=0;
                        }
                        if (!$scope.op1) {
                            delete($scope.reporte.medio);
                        }
                        break;

                    
                }
            };

            $scope.borrar = function(obj){
                if($scope.reporte.obj){
                    delete($scope.reporte.obj);
                };
            };

            $scope.cancel = function () {
              $modalInstance.close();
            };      


}
////  Modal Texto
$scope.modalTexto = function(){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/reportes/reporteTxt.html',
            controller: txtCtrl,
            size: 'lg',
            resolve: {
            notaOpc: function() {
              //datos = [];
              //datos.push(datos1,datos2);
              //return datos;
            }
            }
          });
          
          modalInstance.result.then(function(data) {
            console.log(data);
            if(data!=undefined){
                dTos = data;
                $scope.previewArray = $scope.appendVar($scope.previewArray,dTos,$scope.previewSize);
                $scope.previewSize = $scope.previewSize + 1 ;
            }
          });

        };

        var txtCtrl = function($filter,$scope,$modalInstance, notaOpc){
            $scope.txt = "";
            $scope.aceptar = function(txto){
                $modalInstance.close(txto);
            };

            $scope.cancel = function () {
              $modalInstance.close();
            };      
        };






}]);