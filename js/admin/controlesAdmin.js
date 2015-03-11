  siclaApp.controller('UsrCtrl', ['$scope','$http',
  function($scope,$http) {
    var nm="";
    $http.post("data/consultas/consultasLogin.php",{'sentencia':2}).success(function(data){ 
      if (data != "Error 202")
      { 
            nm = data; 
            $scope.usr = {"nombre":nm,"mensaje":""};    
      }
      else{ 
        window.location.assign("index.html");
      }
    });   
    
    $scope.Out = function(){
       $http.post("data/consultas/consultasLogin.php",{'sentencia':3});
       window.location.assign("index.html");     
    };
    }]);

//0*****  CONTROLADOR ALTA NOTAS


    siclaApp.controller('FormNotasCtrl',['$scope','$http','$filter','$modal',function($scope,$http,$filter,$modal){
        $scope.nota={};  
        $scope.keep = {};
        $scope.notaCopy={};   
        //$scope.nota.fecha = date();
        $scope.auxiliarST = [0];
        $scope.auxiliarPT = [0];
        $scope.nota.pagina = 1;
        $scope.nota.num = 1;    
        $scope.nota.otroSubtema = [];
        $scope.nota.otraArea = [];
        $scope.nota.otroTema = [];
        $scope.opcionesOtroSub = [];
        $scope.opcionesOtroTema = [];
        $scope.opcionesSubtema = {};
        $scope.opcionesMedios = {};
        $scope.cargoValido = false;
        //$scope.opcionesCargo ={};
        //$scope.keep.medio = false;
        $scope.medioRecuerdo=1;
        $scope.opcionesSeccion = {};
        $scope.opcionesArea = {};
        $scope.nota.otrosPT = [];
        $scope.opcionesPT = [];
        $scope.nota.otrosCargo = [];
        $scope.notaCopy.fecha = $filter("date")(Date.now(), 'yyyy-MM-dd');
        $scope.nota.fecha = $filter("date")(Date.now(), 'yyyy-MM-dd');
        $scope.alerta = {"tipo":"","mensaje":""};
        $scope.permitir = false;
        $scope.master = angular.copy($scope.nota);
         //opciones para tipos de nota
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(data){
          $scope.opcionesNota = data;
          console.log(data);
        });

$scope.validarCargo = function(id){
  $scope.getCargo(id);
  $scope.cargoValido = true;
};

$scope.invalidaCargo = function(){
  $scope.cargoValido = false;
};


 $scope.changeType = function(s){
  if(s==1)
    {$scope.cls = "fa fa-square-o";}
  else
    {$scope.cls = "fa fa-check-square-o";}
 }

    // OPCIONES PARA MEDIOS
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(dataMedios){
           // $('select[ng-model="nota.medio"] option[value=""]').text("Seleccione");
            $scope.opcionesMedios = dataMedios;
            console.log($scope.opcionesMedios);
          });

    // OPCIONES PARA AUTOR
            $scope.getAutor=function(medio){
              console.log(medio);
              //$http.get("data/autores.php?id="+medio).success(function(data2){
              $http.post("data/consultas/consultasAdmin.php",{'sentencia':3,'id':medio}).success(function(dataAutores){
              $('select[ng-model="nota.autor"] option[value=""]').text("Seleccione");
                  $scope.opcionesAutores = dataAutores;
                  console.log($scope.opcionesAutores);
              });
            }

    // SECCIONES 
              $http.post("data/consultas/consultasAdmin.php",{'sentencia':4}).success(function(dataSecciones){
                $scope.opcionesSeccion = dataSecciones;
                console.log($scope.opcionesSeccion);
              });

    // PROTAGONISTAS
              //$http.get("data/consultas/protagonistas.php").success(function(data){
              $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(dataProtagonista){
                $scope.opcionesProtagonsita = dataProtagonista;
                console.log($scope.opcionesProtagonsita);  
              });

    // CARGOS
              $scope.getCargo = function(id){
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':6,'protagonista':id.idProtagonista}).success(function(dataCargo){
                  $scope.opcionesCargo = dataCargo;
                  $('select[ng-model="nota.cargo"] option[value=""]').text("Seleccione"); 
                  console.log($scope.opcionesCargo);
                });
              };

    // AREAS
              $http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(dataArea){
                $scope.opcionesArea = dataArea;
                console.log($scope.opcionesArea);
              });

    // TEMAS
              $scope.getTema = function(area) {
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':8,'area':area}).success(function(dataTema){
                  $scope.opcionesTema = dataTema;
                  console.log($scope.opcionesTema);
                });
              };

    // SUBTEMAS
              $scope.getSubtema = function(id){
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':9,'tema':id}).success(function(dataSubtema){
                  $scope.opcionesSubtema = dataSubtema; 
                  console.log($scope.opcionesSubtema); 
                  $('select[ng-model="nota.subtema"] option[value=""]').text("Seleccione");
                });
              };

    // PAIS
              $http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(dataPais){
                $scope.opcionesPais = dataPais;
                console.log($scope.opcionesPais);
              });

    // ESTADOS
              $scope.getEstados = function(idPais){
               $http.post("data/consultas/consultasAdmin.php",{'sentencia':11,'pais':idPais}).success(function(dataEstados){
                  $scope.opcionesEstado = dataEstados;
                  console.log($scope.opcionesEstado);
               });
              };

    // MUNICIPIO
              $scope.getMunicipio = function(estado){
                console.log(estado);
                $http.post("data/consultas/consultasAdmin.php",{'sentencia':12,'estado':estado}).success(function(dataMunicipio){
                          $scope.opcionesMunicipios = dataMunicipio;
                          console.log(dataMunicipio);
                      });
              };

    // GUARDAR NOTA

              $scope.updateNota = function(nota,k){
                if( nota!=undefined ){
                console.log(nota);
                $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':1,'nota':nota}).success(function(nota){
                  console.log(nota);
                  if(nota != "error"){
                    if (document.getElementById("exampleInputFile").value != "")
                      {
                        var file = document.getElementById("exampleInputFile"), formData = new FormData();
                        formData.append("imagen", file.files[0]);
                        formData.append("nota",nota);
                        $.ajax({
                          url:'data/inserciones/insercionPortada.php',
                          type: 'POST',
                          data: formData,
                          processData: false,
                          contentType: false,
                          dataType: 'json',
                          success: function(ev) {       
                            console.log(ev); 
                            document.getElementById("exampleInputFile").value = "";                                              
                          }
                        });
                      console.log("IMAGEN RECONOSIDA");
                      }  

                    $scope.resetFields(k);
                  }else{
                    console.log("99999999999999999999");
                  }                         
                         $scope.permitir = false; 
                         $scope.auxiliarST = [0];
                         $scope.auxiliarPT = [0];                    
                }); 
}else{
  console.log("nota no definida");
}
              };
              
    //Opciones para Otros Temas
    	$scope.getOTema = function(area, index) {
    		$http.post("data/consultas/consultasAdmin.php",{'sentencia':8,'area':area['idArea']}).success(function(data) {
    			$scope.opcionesOtroTema[index] = data;
    		});
    		
    	};
    //Opciones para Otros Subtemas
      $scope.getSub = function(tema,index) {
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':9,'tema':tema['idTema']}).success(function(data){
          	console.log(data);
          	$scope.opcionesOtroSub[index] = data;     
        });
      };      

    //Opciones para Otros Cargos
        $scope.getoCar = function(Prot,index){
          console.log(Prot);
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':6, "protagonista":Prot.idProtagonista}).success(function(data){
              console.log(data);
              $scope.opcionesPT[index]=data;
          });
        };


    /*----------------------------------------------Modal Medios------------------------------------------------*/                              
              
              $scope.modalMedios = function(){
                var modalInstance = $modal.open({
                templateUrl: 'partials/admin/modals/altaMedio.html',
                controller: medioModalCtrl,
                size: 'md'
              });
                modalInstance.result.then(function(data) {
                  if (data != undefined)
                  {
                    $scope.opcionesMedios = data;
                    var i = $scope.opcionesMedios.length -1;
                    $scope.nota.medio = data[i];
                    $scope.opcionesAutores = [];
                  }
                });
              };

              var medioModalCtrl = function($scope,$modalInstance) {
                 $scope.master = {};
                 $scope.medio = {};
                 $scope.alerta = {"tipo":"","mensaje":""};
                      $scope.updateMedio=function(m){
                       $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':2,'nombre':m.nombre,'url':m.url }).success(function(msg){
                         console.log(msg);
                          if ($('input[ng-model="medio.imagen"]')[0].files.length >0)
                          {
                            var file = $('input[ng-model="medio.imagen"]')[0].files[0], formData = new FormData();
                            formData.append("imagen",file);
                            formData.append("medio",msg);                        
                            $.ajax({
                              url:'data/inserciones/insercionLogo.php',
                              type: 'POST',
                              data: formData,
                              processData: false,
                              contentType: false,
                              dataType: 'json',
                              success: function(ev) {       
                                console.log(ev);  
                                $modalInstance.close(ev);
                              }
                            });
                          }else {
                            $http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(data) {
                                $modalInstance.close(data);
                            });
                          }            
                        });
                      };
              $scope.cancel = function () {
                $modalInstance.close();
              };            
              };

    /*----------------------------------------------Modal Autores------------------------------------------------*/ 
      $scope.modalAutores = function(datos){
                  var modalInstance = $modal.open({
                  templateUrl: 'partials/admin/modals/altaAutor.html',
                  controller: autorModalCtrl,
                  size: 'md',
                  resolve: {
                    notaDatos: function () {
                         return datos;
              }
                  }
                });
                  modalInstance.result.then(function(data) {
                    if (data != undefined)
                      $scope.opcionesAutores = data;
                  });
                };
      
                var autorModalCtrl = function ($scope,$modalInstance,notaDatos){
                   $scope.opcionesMedios = {};
                   $scope.opcionesAutores = {};
                   $http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(dataMedios){
                        var i, aux;
                        $scope.opcionesMedios = dataMedios;
                        for (i=0; i<dataMedios.length;i++)
                            if (dataMedios[i]['idMedio'] == notaDatos['idMedio'])
                              aux = i;                                        
                            $scope.autors.medio = $scope.opcionesMedios[aux];
                    });

                   $scope.buscaDisponibles = function(dis){
	                   $http.post("data/consultas/consultasAdmin.php",{'sentencia':20,'idMedio':dis}).success(function(dataAutores){
	                   		$scope.opcionesAutores = dataAutores;
	                   });
                   };
                  $scope.autors = {};
                  $scope.alerta = {"tipo":"","mensaje":""};
                    $scope.updateAutor= function(autor){
                      console.log(autor);
                      $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':3,'autor':autor}).success(
                      function(msg) {
                        console.log(msg);
                        notaDatos = msg;
                        $modalInstance.close(notaDatos);                
                      });
                    };

                   $scope.updateAutorMedio= function(autor2){
                      console.log(autor2);
                      $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':3,'autor2':autor2}).success(
                      function(msg) {
                        console.log(msg);
                        notaDatos = msg;
                        $modalInstance.close(notaDatos);                
                      });
                    };


                  $scope.cancel = function () {
                    $modalInstance.close();
                  };           
                };

    /*----------------------------------------------Modal Tipo de Nota------------------------------------------------*/  

        $scope.modalTipoNota = function(){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/altaTipoNota.html',
            controller: tipoModalCtrl,
            size: 'md'
          });
          
          modalInstance.result.then(function(data) {
              if (data != undefined)
                $scope.opcionesNota = data;
          });
        };

        var tipoModalCtrl = function($scope,$modalInstance){
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(data){
            $scope.opcionesNotas = data;
            console.log($scope.opcionesNotas);
          }); 
            
            $scope.updatetipo = function(tp){
              $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':4,'nombre':tp.nombre}).success(function(data){
                console.log(data);
                $modalInstance.close(data);        
              });
            };
            
            $scope.cancel = function () {
              $modalInstance.close();
            };
        };



    /*----------------------------------------------Modal Vista Previa-----------------------------------------------*/ 
      //modal 

        $scope.modalVista = function(nota){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/vistaPrevia.html',
            controller: modalVistaCtrl,
            size: 'md',
            resolve: {
              notaView : function() {
                return nota;
              }       
           }
          });
        };

        var modalVistaCtrl = function($scope,$modalInstance, notaView){
          $scope.notaView = notaView;
          console.log($scope.notaView);
            $scope.cancel = function () {
              $modalInstance.close();
            };
        };
      //vista previa

      $scope.vistaPrevia = function(n,k){
        $scope.modalVista(n);
      //  $scope.resetFields(k);
      };


        $scope.resetFields = function (k){
          //$scope.permitir = true;
          if( k.medio == false||k.medio == undefined)
          {
            delete($scope.nota.medio); 
            if($scope.nota.autor){
              delete($scope.nota.autor);
              if($scope.keep.autor)
                delete($scope.keep.autor);
            }
          }
          if( k.autor == false||k.autor == undefined)
            delete($scope.nota.autor);
          if( k.fecha == false||k.fecha == undefined)
            $scope.nota.fecha = $filter("date")(Date.now(), 'yyyy-MM-dd'); // MEJORAR
          if( k.tipo == false||k.tipo == undefined)
            delete($scope.nota.tipo);
          if( k.seccion == false||k.seccion == undefined)
            delete($scope.nota.seccion);
          if( k.protagonista == false||k.protagonista == undefined)
          {
            delete($scope.nota.protagonista);
            if($scope.nota.cargo)
              {
                delete($scope.nota.cargo);
                if($scope.keep.cargo)
                  delete($scope.keep.cargo);
              } 
          }
          if( k.cargo == false||k.cargo == undefined)
            delete($scope.nota.cargo);
          if( k.area == false||k.area == undefined)
            {
              delete($scope.nota.area);

              delete($scope.nota.tema);
              delete($scope.nota.subtema);
            }
          if( k.tema == false||k.tema == undefined)
          {
            delete($scope.nota.tema);
            delete($scope.nota.subtema);
          }
          if( k.subtema == false||k.subtema == undefined)
            delete($scope.nota.subtema);
          if( k.pais == false||k.pais == undefined)
          {
            delete($scope.nota.pais);
            delete($scope.nota.estado);
            delete($scope.nota.municipio);
          }
          if( k.estado == false||k.estado == undefined)
          {
            delete($scope.nota.estado);
            delete($scope.nota.municipio);
          }
          if( k.municipio == false||k.municipio == undefined)
            delete($scope.nota.municipio);
          if( k.titulo == false||k.titulo == undefined)
            delete($scope.nota.titulo);
          if( k.sintesis == false||k.sintesis == undefined)
            delete($scope.nota.sintesis);
          if( k.texto == false||k.texto == undefined)
            delete($scope.nota.texto);     

          $scope.nota.pagina=1;
          $scope.nota.num = 1;      
          $scope.nota.otrosPT = [] ;
          $scope.nota.otrosCargo= [] ;
          $scope.nota.posneg = "positiva";
          $scope.nota.otraArea=[];
          $scope.nota.otroTema=[];
          $scope.nota.otroSubtema=[];
          delete($scope.nota.url);

        };


    /*----------------------------------------------Modal Sección------------------------------------------------*/ 

        $scope.modalSeccion = function(){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/altaSeccion.html',
            controller: seccionModalCtrl,
            size: 'md',
          });
          
          modalInstance.result.then(function(data) {
              if(data != undefined)
                $scope.opcionesSeccion = data;        
          });
        }
        var seccionModalCtrl = function($scope,$modalInstance){
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':4}).success(function(data){
            $scope.opcionesSeccion = data;
            console.log(data);
          }); 
          
            $scope.updateSeccion = function(sec) {
              $http.post('data/inserciones/insercionesAdmin.php',{'sentencia':5,'nombre':sec.nombre}).success(function(data) {
                console.log(data);
                $modalInstance.close(data);
              });
            };

            $scope.cancel = function () {
              $modalInstance.close();
            };
        };
              

    /*----------------------------------------------Modal Protagonista------------------------------------------------*/  

        $scope.modalProt = function(index){
          var modalInstance = $modal.open({
            templateUrl: 'partials/admin/modals/altaProtagonista.html',
            controller: protModalCtrl,
            size: 'md'
          });
                    
          modalInstance.result.then(function(data) {
          	if (data != undefined && index != undefined)
          	{
          		var aux, i, j, auxi = [];
          		aux = $scope.nota.protagonista;
          		for (i = 0; i< $scope.nota.otrosPT.length; i++)
          			auxi[i] = $scope.nota.otrosPT[i];
          		$scope.opcionesProtagonsita = data; 
          		for (j=0; j<data.length; j++)
          			if (data[j].idProtagonista == aux.idProtagonista)           
						$scope.nota.protagonista = data[j];        
				for (i = 0; i< $scope.nota.otrosPT.length; i++)
					if (i != index)
						for (j=0; j<data.length; j++)
							if (data[j].idProtagonista == auxi[i].idProtagonista)           								
								$scope.nota.otrosPT[i] = data[j];
          	}else 
            if (data != undefined && index == undefined)
              $scope.opcionesProtagonsita = data;            
          });
        };
                  
        var protModalCtrl = function ($scope,$modalInstance){
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':13}).success(function(data){
              console.log(data);
              $scope.cargos = data;  
             });
                $scope.master = {};
          $scope.protagonista = {};
              $scope.updateProtagonista=function(protagonista){
          $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':6,'protagonista':protagonista}).success(function(data){
            	console.log(data);   
            	$modalInstance.close(data);                           
          });
        };
        
        $scope.cancel = function () {
            $modalInstance.close();
          };
                      
          
        };         

    /*----------------------------------------------Modal Cargo------------------------------------------------*/

              $scope.modalCargo = function(datos, index){
                var modalInstance = $modal.open({
                templateUrl: 'partials/admin/modals/altaCargo.html',
                controller: cargoModalCtrl,
                size: 'md',
                resolve: {
                  notaProt: function () {
                       return datos;
                  }
                }
                });
                
                modalInstance.result.then(function(data) {
                  if (data != undefined && index == undefined)
                  {
                    $scope.opcionesCargo = data;
                    $scope.nota.cargo = null;
                  }else if (data != undefined && index != undefined) {
                  	$scope.opcionesPT[index] = data;
                  	$scope.nota.otrosCargo[index] = null;
                  }
                });
              };
              var cargoModalCtrl = function ($scope,$modalInstance, notaProt){
                 $scope.alerta = {"tipo":"","mensaje":""};
                 var regreso = [];
                 $scope.cargo = {};
                 $http.post("data/consultas/consultasAdmin.php",{'sentencia':13}).success(function(data){
                  console.log(data);
                  $scope.cargos = data;  
                 });
              $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(data1){
                  var aux;
                  console.log(data1);
                   $scope.protagonistas = data1;
                   for (var i = 0; i<data1.length; i++)
                      if (data1[i]['idProtagonista'] == notaProt['idProtagonista'])
                        aux = i;
                    $scope.prot = data1[aux];
                    $scope.cargo.prot = notaProt;
                    $http.post("data/consultas/consultasAdmin.php",{'sentencia':14, 'protagonista':notaProt}).success(function(data) {
                    	$scope.crg = data;
                    });              
                 });
                  $scope.updateCargo = function(cargo){
                    $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':7,'cargo':cargo}).success(function(data){
                      console.log(data); 
                      $modalInstance.close(data);
                    });
                  };

                  $scope.getCargo = function(protagonista){
                    $http.post("data/consultas/consultasAdmin.php",{'sentencia':14,'protagonista':protagonista}).success(function(ev){
                      console.log(ev);
                      $scope.crg = ev;  
                    });
                  };
                  $scope.updateProt = function(prot,carg){
                    $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':8,prot:prot,car:carg}).success(function(data){
                      console.log(data);   
                      $modalInstance.close(data);
                    });
                  };

                  $scope.cancel = function () {
                    $modalInstance.close();
                  }
              };

    /*----------------------------------------------Modal Area------------------------------------------------*/

        $scope.modalArea = function(index){
          var modalInstance = $modal.open({
            templateUrl: 'partials/admin/modals/altaArea.html',
            controller: areaModalCtrl,
            size: 'md'
          });
          
          modalInstance.result.then(function(data) {
          		if (data != undefined && index != undefined)
          		{
          			var aux, i, j, auxi = [];
          			aux = $scope.nota.area;
          			for (i = 0; i< $scope.nota.otraArea.length; i++)
          				auxi[i] = $scope.nota.otraArea[i];
          			$scope.opcionesArea = data;
          			for (j=0; j<data.length; j++)
          				if (data[j].idArea == aux.idArea)            
          					$scope.nota.area = data[j];        
          			for (i = 0; i< $scope.nota.otraArea.length; i++)
          				if (i != index)
          					for (j=0; j<data.length; j++)
          						if (data[j].idArea == auxi[i].idArea)                      							
          							$scope.nota.otraArea[i] = data[j];
          		}else 
				if(data != undefined && index == undefined)
                	$scope.opcionesArea = data;
          });
        };
        var areaModalCtrl = function ($scope,$modalInstance){      
          $scope.master = {};
          $scope.updateArea=function(area){
            console.log(area);      
            $http.post('data/inserciones/insercionesAdmin.php',{'sentencia':9,'nombre':area.nombre}).success(function(data) {
              console.log(data);
              $modalInstance.close(data);        
            });         
          };
          $scope.cancel = function () {
            $modalInstance.close();
          }
        };

    /*----------------------------------------------Modal Tema------------------------------------------------*/

        $scope.modalTema = function(datos, index){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/altaTema.html',
            controller: temaModalCtrl,
            size: 'md',
            resolve: {
          		notaArea : function() {
            		return datos;
          		}       
           }
          });
          
          modalInstance.result.then(function(data) {
              if (data != undefined && index == undefined)
                $scope.opcionesTema = data;
              else if(data != undefined && index != undefined)
              {
              	$scope.opcionesOtroTema[index] = data;
              	$scope.nota.otroTema[index] = null;
              }
          });
        };
        var temaModalCtrl = function($scope,$modalInstance, notaArea){
        	$scope.tema = {};
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(data){
                var i, aux;
                $scope.opcionesArea = data;
                for (i=0; i<data.length; i++)
                  if (data[i]['idArea'] == notaArea['idArea'])
                    aux = i;
                $scope.tema.area = data[aux];
            });        
        $scope.updateTema=function(tema){      
         console.log(tema);
          $http.post('data/inserciones/insercionesAdmin.php',{'sentencia':10,'datos':tema}).success(function(data) {
            console.log(data);
            $modalInstance.close(data);       
          });
          };       
            
            $scope.cancel = function () {
              $modalInstance.close();
            };

        };

      /*----------------------------------------------Modal Subtema------------------------------------------------*/

        $scope.modalSubtema = function(datos1,datos2,index){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/altaSubtema.html',
            controller: subtemaModalCtrl,
            size: 'md',
            resolve: {
            notaOpc: function() {
              datos = [];
              datos.push(datos1,datos2);
              return datos;
            }
            }
          });
          
          modalInstance.result.then(function(data) {
              if(data != undefined && index == undefined)              
                $scope.opcionesSubtema = data;
              else if (data != undefined && index != undefined)
              {
              	$scope.opcionesOtroSub[index] = data;
              	$scope.nota.otroSubtema[index] = null;
              }
          });
        };
        var subtemaModalCtrl = function($scope,$modalInstance, notaOpc){
          console.log(notaOpc);
          $scope.subtema = {};
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':8,'area':notaOpc[0]}).success(function(data1){
            	var j, auxi;
            	$scope.opcionesTema = data1;
            	for (j=0; j<data1.length; j++)
              		if (data1[j]['idTema'] == notaOpc[1]['idTema'])
                		auxi = j;
            	$scope.subtema.tema = data1[auxi];
          });

        
          
        $scope.updateSubtema=function(subtema){
              console.log(subtema);
              $http.post('data/inserciones/insercionesAdmin.php',{'sentencia':11,'subtema':subtema}).success(function(data) {
                console.log(data);
                $modalInstance.close(data);            
              });
            };
            $scope.cancel = function () {
              $modalInstance.close();
            };      
        };

    /*----------------------------------------------Modal Pais------------------------------------------------*/

        $scope.modalPais = function(){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/altaPais.html',
            controller: paisModalCtrl,
            size: 'md'
          });
          
          modalInstance.result.then(function(data) {
            if(data != undefined)
              $scope.opcionesPais = data;
          });
        };
        var paisModalCtrl = function($scope,$modalInstance){
            $scope.updatePais = function(pais) {
              $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':12,'nombre':pais.nombre}).success(function(data) {
                console.log(data);
                $modalInstance.close(data);
              });
            }; 
          
        $scope.cancel = function () {
              $modalInstance.close();
            };
        };

    /*----------------------------------------------Modal Estado------------------------------------------------*/

        $scope.modalEstado = function(datos){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/altaEstado.html',
            controller: estadoModalCtrl,
            size: 'md',
            resolve: {
          notaPais : function() {
            return datos;
          }
          }});
          
          modalInstance.result.then(function(data) {
              if(data != undefined)
                $scope.opcionesEstado = data;
          });
        };
        var estadoModalCtrl = function($scope,$modalInstance,notaPais){
        	$scope.estado = {};
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(data){ 
                console.log(data);       
                var i, aux;
                $scope.opcionesPais = data;
                for (i=0; i<data.length; i++)
                  if(data[i]['idPais'] == notaPais['idPais'])                
                    aux = i;
                $scope.estado.pais = data[aux];
            });
          
        $scope.updateEstado = function(estado) {
            console.log(estado);
            $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':13 ,'estado':estado}).success(function(data) {
              console.log(data);
              $modalInstance.close(data);
            });     
        };
        $scope.cancel = function () {
          $modalInstance.close();
        };
              
        };

    /*----------------------------------------------Modal Municipio------------------------------------------------*/

        $scope.modalMunicipio = function(dato1,dato2){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/altaMunicipio.html',
            controller: municipioModalCtrl,
            size: 'md',
            resolve: {
          notaOpc : function() {
              var datos = [];
              datos.push(dato1,dato2);
              return datos;  
          }
            }
          });
          
          modalInstance.result.then(function(data) {
          		if(data != undefined)
          			$scope.opcionesMunicipios = data;
          });
        };
        var municipioModalCtrl = function($scope,$modalInstance,notaOpc){
          console.log(notaOpc);
          $scope.municipio = {};
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':11,'pais': notaOpc[0]}).success(function(data){
              var i, aux;
              $scope.opcionesEstados = data;          
              for (i=0; i<data.length; i++)
                if (data[i]['idEstado'] == notaOpc[1]['idEstado'])
                  aux = i;
              $scope.municipio.estado = data[aux];
        });
       
        $scope.updateMunicipio = function(municipio){
            $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':14,'municipio':municipio}).success(function(data) {
              console.log(data);
              $modalInstance.close(data);
            });
        };
        
        $scope.cancel = function () {
          $modalInstance.close();
        };            
        };

    /*----------------------------------------------Añade otro protagonista------------------------------------------------*/    
        //Añade una nueva fila para otros temas    
         $scope.masPT = function(){
             var auxi = $scope.auxiliarPT.length;
             $scope.auxiliarPT.push(auxi);                     
         };
         
    /*----------------------------------------------Añade otro tema------------------------------------------------*/     
         $scope.masST = function(){
             var auxi = $scope.auxiliarST.length;
             $scope.auxiliarST.push(auxi);                     
         }; 
    }]);




/* *********************************************************************************/
//      CONTROLADOR NOTAS RECIENTES

    siclaApp.controller('TblRecientesCtrl', ['$scope', '$http', '$modal',
    function($scope, $http, $modal) {
    	$scope.notas={};
    	$http.post('data/consultas/consultasAdmin.php',{'sentencia':17}).success(function(data) {
    		$scope.notas = data;
    		console.log(data);
    	});
    	
    	$scope.modalEliminar = function(data) {
    		var modalInstance = $modal.open({
    			templateUrl: 'partials/admin/modals/eliminarNota.html',
    			controller: eliminarModalCtrl,
    			size: 'md',
    			resolve:{
    				notaEliminar : function(){
    					return data;
    				}
    			}
    		});    		
    		
    		modalInstance.result.then(function(data) {
    			if (data != undefined)
    			$scope.notas = data;
    		});
    	
    	};
    	
    	var eliminarModalCtrl = function($scope, $modalInstance, notaEliminar) {
    		$scope.info = notaEliminar;
    		$scope.eliminar = function () {
    			$http.post('data/actualizar/eliminarNota.php',notaEliminar).success(function(data) {
    				$modalInstance.close(data);		
    			});
    			//$modalInstance.close([]);		
    		};
    		
    		$scope.cancel = function () {
    		  $modalInstance.close();
    		};
    	};
    }]);
/* *********************************************************************************/
// *****    CONTROLADOR PARA EDITAR NOTA
/* *********************************************************************************/

  
// *****    CONTROLADOR PARA ENCONTRAR NOTAS

 siclaApp.controller('EncontrarNotasCtrl',['$scope','$http','$filter','$modal',
  function($scope,$http,$filter,$modal){
    $scope.notasArray = {};
    $http.post("data/consultas/consultasAdmin.php",{'sentencia':18}).success(function(respuesta){
      $scope.notasArray = respuesta;
      console.log($scope.notasArray);
      $scope.modalEliminar = function(data) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/admin/modals/eliminarNota.html',
          controller: eliminarModalCtrl,
          size: 'md',
          resolve:{
            notaEliminar : function(){
              return data;
            }
          }
        });       
        
        modalInstance.result.then(function(data) {
          if (data != undefined)
          $scope.notas = data;
        });
      
      };
      
      var eliminarModalCtrl = function($scope, $modalInstance, notaEliminar) {
        $scope.info = notaEliminar;
        $scope.eliminar = function () {
          $http.post('data/actualizar/eliminarNota.php',notaEliminar).success(function(data) {
            $modalInstance.close(data);   
          });
          //$modalInstance.close([]);   
        };
        
        $scope.cancel = function () {
          $modalInstance.close();
        };
      };

    });



  }]);
   

/* *********************************************************************************/
// ALTA ADMIN
    siclaApp.controller('altaAdmin', ['$scope','$http',
      function($scope,$http) {
        $scope.alerta = {"tipo":"","mensaje":""};
        $scope.usuario ={};
        $scope.master = {};
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':19}).success(function(data){
          $scope.opcionesTipo=data;
          console.log(data);
        });
        $scope.insertAdmin=function(newAdmn){
          usuario = angular.copy(newAdmn);

            console.log(usuario);   
        $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':15,'newAdmn':usuario}).success(function(msg){
          console.log(msg);  
              $scope.usuario = angular.copy($scope.master);
              $scope.alerta.tipo = "alert alert-success";
              $scope.alerta.mensaje =" Dato almacenado en base de datos";
         });
       };
         // $http.get("data/bdNotasSimple2.php").success(function(data4){
         // $scope.notasDefault = data4;
         // console.log(data4);
    
      }]);