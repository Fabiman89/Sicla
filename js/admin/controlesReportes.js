
  siclaApp.controller('reportCtrl', ['$scope','$http','$modal','$filter','PdfService' ,function($scope,$http,$modal,$filter,PdfService) {
// PRIMERA PROPUESTA
    $scope.previewArray = [];
    $scope.previewSize = 0;
    $scope.Areas = {};

        $scope.init = function(arr,obj){
            console.log(arr);
            nar = [];
            nar.push(obj);
            for (i=0;i<arr.length;i++){
                nar.push(arr[i]);
            }
            return nar;
        };

    // Autor
        $scope.getAutorIf = function (){
            if($scope.query[0]==1 && ($scope.query[1].medio.idMedio != undefined || 0) ){
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':3,"id":$scope.query[1].medio.idMedio}).success(function(rOp){
                    objt= {'nombreAutor':'Sin Considerar','idAutor':0}
                    $scope.Autores = $scope.init(rOp,objt);
                 });   
            }else{
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':21}).success(function(rOp){
                    objt= {'nombreAutor':'Sin Considerar','idAutor':0}
                    $scope.Autores = $scope.init(rOp,objt);
                 });   
            }        
        };

    // Medios
        $scope.getMedios= function (){

                $http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(rOp){
                  objt = {"nombreMedio":"Sin Considerar","idMedio":0};
                  $scope.Medios = $scope.init(rOp,objt);
                });

        };


    // AREAS   
            $scope.getArea = function(){
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(rOp){
                  objt = {"nombreArea":"Sin Considerar","idArea":0};
                  $scope.Areas = $scope.init(rOp,objt);
                });
            };
    // TEMAS
            $scope.getTema = function ()
            {
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':22}).success(function(rOp){
                  objt = {"nombreTema":"Sin Considerar","idTema":0};
                  $scope.Temas = $scope.init(rOp,objt);
                });
            };
    // SUBTEMAS
            $scope.getSubtema = function(){
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':23}).success(function(rOp){
                  objt = {"nombreSubtema":"Sin Considerar","idSubtema":0};
                  $scope.Subtemas = $scope.init(rOp,objt);
                });
            };
            


    // PAIS
            $scope.getPais = function(){
                        $http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(rOp){
                           objt = {"nombrePais":"Sin Considerar","idPais":0}; 
                          $scope.Paises = $scope.init(rOp,objt);
                        });   
            };
    // Estados
            $scope.getEstado = function (){

                        $http.post("data/consultas/consultasAdmin.php",{'sentencia':24}).success(function(rOp){
                            objt = {"nombreEstado":"Sin Considerar","idEstado":0};
                          $scope.Estados = $scope.init(rOp,objt);
                        });
                    };
    // Municipios
            $scope.getMunicipio = function (){
                        $http.post("data/consultas/consultasAdmin.php",{'sentencia':25}).success(function(rOp){
                          objt = {"nombreMunicipio":"Sin Considerar","idMunicipio":0};
                          $scope.Municipios = $scope.init(rOp,objt);
                        });
                    };


    // PORTAGONISTA
            $scope.getProtagonista = function (){

                    $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(rOp){
                        objt = {"nombreProtagonista":"Sin Considerar","idProtagonista":0};
                      $scope.Protagonistas = $scope.init(rOp,objt);
                    });

            };
    // TIPO DE NOTA
            $scope.getTipo = function (){
                    $http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(rOp){
                            objt = {"nombreTipoNota":"Sin Considerar","idTipoNota":0};
                          $scope.tipoNotas = $scope.init(rOp,objt);

                        });                    
            };
    
    //Seccion
            $scope.getSeccion = function(){
                    $http.post("data/consultas/consultasAdmin.php",{'sentencia':4}).success(function(rOp){
                        objt = {"nombreSeccion":"Sin Considerar","idSeccion":0};
                      $scope.Seccion = $scope.init(rOp,objt);
                    });
            };



    //Control de preview
        $scope.createVar=function(x){
            if(x==1)
                $scope.tituloTemp = "";
            if(x==2)
                $scope.textoTemp = "";
        };

$scope.appendTitle = function(data){
    $scope.addToPreview(2,data);
    delete($scope.tituloTemp);
};
$scope.appendText = function(data){
    $scope.addToPreview(3,data);
    delete($scope.textoTemp);
};

        $scope.appendVar = function(objt){
            $scope.previewArray.push(objt)
        };

        $scope.deleting = function(este){
            var array = [];
            if($scope.previewArray.length>0){
                for(i=0;i<$scope.previewArray.length;i++){
                    if(i==este){
                        console.log(i);
                    }else{
                        array.push($scope.previewArray[i]);
                        console.log($scope.previewArray[i]);
                    }
                }
            }
            $scope.previewArray = array;
        };


        $scope.deleteFromPreview = function (toDelete){
            $scope.deleting(toDelete);
        };

        $scope.addToPreview = function(type,data){
            var objeto = {};
            switch(type){
                case 1: //Anexa Tablas
                    objeto.tipo = 1;
                    objeto.titulo = data.titulo;
                    objeto.data = data.data;
                    $scope.appendVar(objeto);
                    break;
                case 2:// Anexa Titulos
                    objeto.tipo = 2;
                    objeto.data = data;
                    $scope.appendVar(objeto);
                    break;
                case 3: // Anexa Textos
                    objeto.tipo=3;
                    objeto.data = data;
                    $scope.appendVar(objeto);
                    break;
                case 4:
                    objeto.tipo=4;
                    objeto.data =  data.data;
                    $scope.appendVar(objeto);
                    break;
            }
            //console.log($scope.previewSize);
            //$scope.previewArray = $scope.appendVar($scope.previewArray,obj,$scope.previewSize);
            
        };
    
        $scope.saveToPDF = function(){
            $scope.pdf = $scope.previewArray;
        };

    // MODAL GRAFICA DE PIE
        $scope.modalPie = function(responce){
              var modalInstance = $modal.open({ 
                templateUrl: 'partials/admin/modals/reportes/reporteQuery.html',
                controller: statsCtrl,
                size: 'lg',
                resolve: {
                data: function() {
                  //datos = [];
                  //datos.push(datos1,datos2);
                  return responce;
                }
                }
              });
              
              modalInstance.result.then(function(data) {
                if(data!=undefined){
                    //console.log(data.data[0]);
                    if(data.data[0].Síntesis!=undefined){
                        $scope.addToPreview(4,data);
                    }else{
                        $scope.addToPreview(1,data);
                    }
                }
              });
            };

            var statsCtrl = function($filter,$scope,$modalInstance, data){
                $scope.tabla = {};
                $scope.title = "Tabla de Estadisticas";
                $scope.borrar = function(toDelete){
                    var array = [];
                    if($scope.tablas.length>0){
                        for(i=0;i<$scope.tablas.length;i++){
                            if(i==toDelete){
                            }else{
                                array.push($scope.tablas[i]);
                            }
                        }
                    }
                    $scope.tablas = array;        
                };
        $scope.pushToTable = function(n){
            $scope.tablas = [];
            if(n==1)
                var array = $scope.aceptados;
            if(n==2)
                var array = $scope.todas;
            for(a=0;a<array.length;a++){
                $scope.tablas.push(array[a]);
            }
            if(n==2)
                $scope.rechasados = [];

        };
      $scope.processData = function (objt){
        $scope.aceptados = [];
        $scope.rechasados = [];
        $scope.values = [];
        var aux = objt;
        for (i in objt){
           if( objt[i].dato==true){ 
            delete(aux[i].dato);
            delete(aux[i].sql);
            $scope.aceptados.push(aux[i]);
            }else{
            delete(aux[i].dato);
            delete(aux[i].sql);
            $scope.rechasados.push(aux[i]);
            }

        }
            console.log($scope.rechasados);
            console.log($scope.aceptados);
      };
    $scope.cancel = function () {
      $modalInstance.close();
    };      
    $scope.setTitles = function(x){
        $scope.title = x;
    }

    $scope.aceptar = function (){
      var tables = {};
      if($scope.title==undefined){
        tables.data = $scope.tablas;

      }else{
        if($scope.title.length>0){
            tables.titulo = $scope.title;
            tables.data = $scope.tablas;
        }else{
            tables.data = $scope.tablas;
        }
      }
        $modalInstance.close(tables);
    };


$scope.processData(data);
$scope.pushToTable(1);
                };
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




//////// VERCION 3
$scope.query= {};

$scope.arrayCero = [{"nombre":"Sin considerar","value":0},{"nombre":"Particular","value":1},{"nombre":"Todos","value":2}];
$scope.arrayCeroF = [{"nombre":"Sin considerar","value":0},{"nombre":"Especifica","value":1},{"nombre":"Periodo","value":2}];

$scope.getResume = function (n,data){
    var reporte = 1;
    if(n==1){
        reporte = 1;
    }else{
        reporte = 2;
    }
    $http.post("data/consultas/consultaReportes.php",
                {'reporte':reporte,'autor':data.autores, 'medio':data.medios, 'protagonista':data.protagonistas, 'tema':data.temas, 'clasificacion':data.clasificacion,'fecha':data.fecha, 'tipo':data.tipo, 'seccion':data.seccion,'genero':data.genero, 'cargo':data.cargos, 'area':data.areas, 'pais':data.paises, 'subtema':data.subtemas, 'estado':data.estados, 'municipio':data.municipios}).success(function(r) {
                    $scope.prueba = r;
                   console.log(r);
                    $scope.modalPie(r);
                    $scope.resetQuery();
                    //$scope.processData(r);
                   //console.log(r);
                });  
};


$scope.addOtro = function (arr){
    arr.push(arr.length);
    return arr;
};


    $scope.resetQuery = function() {
        $scope.query = {
            fecha:[0],
            areas:[0,1],
            autores:[0,1],
            medios:[0,1],
            protagonistas:[0,1],
            clasificacion:[0],
            tipo:[0,1],
            seccion:[0,1],
            temas:[0,1],
            subtemas:[0,1],
            genero:[0],
            cargos:[0,1],
            paises:[0,1],
            estados:[0,1],
            municipios:[0,1],
        };
$scope.aux1 = [];
$scope.aux2 = []; 
$scope.aux3 = [];
$scope.aux4 = [];
$scope.aux5 = [];   
$scope.aux6 = [];   
    };


 
 

$scope.getter = function (i,val){
    switch(i){
        case 1:
            if(val==1){
                $scope.getMedios();
            }
        break;
        case 2:
            if(val==1){
              $scope.getAutorIf();  
            }
        break;
        case 3:
            if(val==1){
                $scope.getTipo();
            }
        break;
        case 4:
            if(val==1){
                $scope.getSeccion();
            }
        break;

        case 5:
            if(val==1){
                $scope.getTema();
            }
        break;
        case 6:
            if(val==1){
                $scope.getSubtema();
            }
        break;
        case 7:
            if(val==1){
                $scope.getPais();
            }
        break;
        case 8:
            if(val==1){
                $scope.getEstado();
            }
        break;
        case 9:
            if(val==1){
                $scope.getMunicipio();
            }
        break;
        case 10:
            if(val==1){
                $scope.getProtagonista();
            }
        break;     
        case 11:
            if(val==1){
                $scope.getArea();
            }
        break;   
    }
};

$scope.repo = function(ary){
    PdfService.test(ary);
};

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

 $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
        console.log($event);
    $scope.opened = true;
  };

  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };


  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

$scope.resetQuery();
}]);