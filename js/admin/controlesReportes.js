
  siclaApp.controller('reportCtrl', ['$scope','$http','$modal','$filter',function($scope,$http,$modal,$filter) {
// PRIMERA PROPUESTA
    $scope.previewArray = [];
    $scope.previewSize = 0;

    $scope.reporte = {};
    $scope.sup = {}; //support
    $scope.sup.fecha=0;
    $scope.sup.medio = 0;
    $scope.sup.autor=0;
    $scope.sup.tipo=0;
    $scope.sup.area=0;
    $scope.sup.pais=0;
    $scope.sup.clasificacion = 0;
    $scope.sup.seccion = 0;
    $scope.sup.protagonista = 0;
    $scope.reporte.clasificacion = 0;
    $scope.reporte.genero=0;
    $scope.reporte.medio = {"nombreMedio":"Sin Considerar","idMedio":0};
    $scope.reporte.autor = {'nombreAutor':'Sin Considerar','idAutor':0};
    $scope.reporte.area = {"nombreArea":"Sin Considerar","idArea":0};
    $scope.reporte.tema = {"nombreTema":"Sin Considerar","idTema":0};
    $scope.reporte.subtema = {"nombreSubtema":"Sin Considerar","idSubtema":0};
    $scope.reporte.pais= {"nombrePais":"Sin Considerar","idPais":0}; 
    $scope.reporte.estado ={"nombreEstado":"Sin Considerar","idEstado":0};
    $scope.reporte.municipio={"nombreMunicipio":"Sin Considerar","idMunicipio":0};
    $scope.reporte.protagonista = {"nombreProtagonista":"Sin Considerar","idProtagonista":0};
    $scope.reporte.tipoNota = {"nombreTipoNota":"Sin Considerar","idTipoNota":0};
    $scope.reporte.seccion = {"nombreSeccion":"Sin Considerar","idSeccion":0};
    $scope.reporte.fecha1 = $filter("date")(Date.now(), 'yyyy-MM-dd');
    $scope.selec = "Seleccionar";    	    	

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
            if($scope.sup.medio==1 && ($scope.reporte.medio.idMedio != undefined || 0) ){
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':3,"id":$scope.reporte.medio.idMedio}).success(function(rOp){
                    objt= {'nombreAutor':'Sin Considerar','idAutor':0}
                    $scope.Autores = $scope.init(rOp,objt);
                    $scope.reporte.autor= $scope.Autores[0];
                 });   
            }else{
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':21}).success(function(rOp){
                    objt= {'nombreAutor':'Sin Considerar','idAutor':0}
                    $scope.Autores = $scope.init(rOp,objt);
                    $scope.reporte.autor= $scope.Autores[0];
                 });   
            }        
        };

    // Medios

        $scope.getMedios= function (){
            if($scope.sup.medio!=1){
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(rOp){
                  objt = {"nombreMedio":"Sin Considerar","idMedio":0};
                  $scope.Medios = $scope.init(rOp,objt);
                  $scope.reporte.medio= $scope.Medios[0];
                });
            }
        };


    // AREAS   
            $scope.getArea = function(){
                if($scope.sup.area!=1 ){
                        $http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(rOp){
                          objt = {"nombreArea":"Sin Considerar","idArea":0};
                          $scope.Areas = $scope.init(rOp,objt);
                          $scope.reporte.area = $scope.Areas[0];
                          $scope.reporte.tema = {"nombreTema":"Sin Considerar","idTema":0};
                          $scope.reporte.subtema = {"nombreSubtema":"Sin Considerar","idSubtema":0};
                        });
                        }     

            };
            $scope.getTema = function (id)
            {
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':8,'area':id}).success(function(rOp){
                  objt = {"nombreTema":"Sin Considerar","idTema":0};
                  $scope.Temas = $scope.init(rOp,objt);
                  $scope.reporte.tema= $scope.Temas[0];
                });
            };

            $scope.getSubtema = function(id){
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':9,'tema':id}).success(function(rOp){
                  objt = {"nombreSubtema":"Sin Considerar","idSubtema":0};
                  $scope.Subtemas = $scope.init(rOp,objt);
                  $scope.reporte.subtema = $scope.Subtemas[0];
                  console.log($scope.Subtemas)
                });
            };
            


    // PAIS
            $scope.getPaises = function(){
                if($scope.sup.pais!=1 ){
                        $http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(rOp){
                           objt = {"nombrePais":"Sin Considerar","idPais":0}; 
                          $scope.Paises = $scope.init(rOp,objt);
                          $scope.reporte.pais = $scope.Paises[0];
                          $scope.reporte.estado = {"nombreEstado":"Sin Considerar","idEstado":0};
                          $scope.reporte.municipio = {"nombreMunicipio":"Sin Considerar","idMunicipio":0}
                        });   
                        }     

            };

            $scope.getEstado = function (id){
                console.log("trigered")
                        $http.post("data/consultas/consultasAdmin.php",{'sentencia':11,'pais':id}).success(function(rOp){
                            objt = {"nombreEstado":"Sin Considerar","idEstado":0};
                          $scope.Estados = $scope.init(rOp,objt);
                          $scope.reporte.estado= $scope.Estados[0];
                        });
                    };
            $scope.getMunicipio = function (id){
                        $http.post("data/consultas/consultasAdmin.php",{'sentencia':12,'estado':id}).success(function(rOp){
                          objt = {"nombreMunicipio":"Sin Considerar","idMunicipio":0};
                          $scope.Municipios = $scope.init(rOp,objt);
                          $scope.reporte.municipio= $scope.Municipios[0];
                        });
                    };


    // PORTAGONISTA
            $scope.getProtagonista = function (){
                if($scope.sup.protagonista!=1 ){
                    $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(rOp){
                        objt = {"nombreProtagonista":"Sin Considerar","idProtagonista":0};
                      $scope.Protagonistas = $scope.init(rOp,objt);
                      $scope.reporte.protagonista = $scope.Protagonistas[0];
                    });
                }
            };
    // TIPO DE NOTA
            $scope.getTipo = function (){
                if($scope.sup.tipoNota!=1){
                    $http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(rOp){
                            objt = {"nombreTipoNota":"Sin Considerar","idTipoNota":0};
                          $scope.tipoNotas = $scope.init(rOp,objt);
                          $scope.reporte.tipoNota = $scope.tipoNotas[0];

                        });                    
                }
            };
    
    //Seccion
            $scope.getSeccion = function(){
                if($scope.sup.seccion!=1){
                    $http.post("data/consultas/consultasAdmin.php",{'sentencia':4}).success(function(rOp){
                        objt = {"nombreSeccion":"Sin Considerar","idSeccion":0};
                      $scope.Seccion = $scope.init(rOp,objt);
                      $scope.reporte.seccion = $scope.Seccion[0]; 
                    });
                }
            };

    //Reporte 
         	$scope.getReporte = function() 
         	{
         		var areas=[], autores=[], medios=[], protagonistas=[], clasificacion=[], fecha=[], tipo = [], seccion = [], genero = [];
         		var subtemas = [], paises = [], estados = [], municipios = [], temas = [], cargos = [];
         		cargos.push(0);    		
         		areas.push($scope.sup.area);
         		autores.push($scope.sup.autor);
         		medios.push($scope.sup.medio);
         		protagonistas.push($scope.sup.protagonista);
         		clasificacion.push($scope.sup.clasificacion);    		
         		tipo.push($scope.sup.tipo);
         		seccion.push($scope.sup.seccion);    		
         		paises.push(parseInt($scope.sup.pais));
         		subtemas.push($scope.reporte.subtema.idSubtema);
         		temas.push($scope.reporte.tema.idTema);
         		estados.push($scope.reporte.estado.idEstado);
         		municipios.push($scope.reporte.municipio.idMunicipio);    		    		    		
         		if($scope.reporte.genero == 1)
         		{
         			switch ($scope.reporte.generoTipo) 
         			{
         				case 0:	genero.push(1);
         						break;	
         				case 1:	genero.push(4);
         						break;
         				case 2:	genero.push(3);
         						break;;
         			}
         		}
         		else 
         		{
         			if($scope.reporte.genero == 2)
         			{
         				switch ($scope.reporte.generoTipo) 
         				{
         					case 0:	genero.push(2);
         							break;	
         					case 1:	genero.push(6);
         							break;
         					case 2:	genero.push(5);
         							break;;
         				}
         			}
         			else 
         				genero.push(0);
         		}
         		if($scope.sup.fecha == 0)    	
         			fecha.push(1,$scope.reporte.fecha1);
         		else
         			fecha.push(2,$scope.reporte.fecha1,$scope.reporte.fecha2);
         		if(medios[0] == 1 )
         			medios.push($scope.reporte.medio);
         		if(protagonistas[0] == 1)
         			protagonistas.push($scope.reporte.protagonista);
         		if(autores[0] == 1)
         			autores.push($scope.reporte.autor);
         		if(areas[0] == 1)
         			areas.push($scope.reporte.area);
         		if(clasificacion[0] == 1 )
         			clasificacion.push($scope.reporte.clasificacion);
         		if(tipo[0] == 1)
         			tipo.push($scope.reporte.tipoNota);
         		if(seccion[0] == 1)
         			seccion.push($scope.reporte.seccion);
         		if(paises[0] == 1)
         			paises.push($scope.reporte.pais);
         		if(temas[0] != 0 )
         		{
         			temas[0] = 1;
         			temas.push($scope.reporte.tema);
         		}
         		if(subtemas[0] != 0)
         		{
         			subtemas[0] = 1;
         			subtemas.push($scope.reporte.subtema);
         		}
         		if(estados[0] != 0)
         		{
         			estados[0] = 1;
         			estados.push($scope.reporte.estado);
         		}
         		if(municipios[0] != 0)
         		{
         			municipios[0] = 1;
         			municipios.push($scope.reporte.municipio);
         		}
         		$http.post("data/consultas/consultaReportes.php",
         		{'autor':autores, 'medio':medios, 'protagonista':protagonistas, 'tema':temas, 'clasificacion':clasificacion,'fecha':fecha, 'tipo':tipo, 'seccion':seccion,'genero':genero, 'cargo':cargos, 'area':areas, 'pais':paises, 'subtema':subtemas, 'estado':estados, 'municipio':municipios}).success(function(data) {
         			$scope.prueba = data;
         			console.log(data);
         		});    	
         	};  


    //Control de preview

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
                $scope.sup ={}
                $scope.reporte = {};
                
                $scope.sup.fecha = 0;


                $scope.op1 = false;
                

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

 $scope.getMedios();
 $scope.getAutorIf();
 $scope.getSeccion();
 $scope.getArea();
 $scope.getPaises();
 $scope.getTipo();
 $scope.getProtagonista();

}]);