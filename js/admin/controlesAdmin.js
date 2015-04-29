  siclaApp.controller('UsrCtrl', ['$scope','$http',
  function($scope,$http) {
    var nm="";
    $http.post("data/consultas/consultasLogin.php",{'sentencia':2}).success(function(data){ 
      if (data != "Error 202")
      { 
            nm = data; 
            $scope.usr = {"nombre":nm.nombre,"mensaje":"", tipo: nm.tipo};    
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


    siclaApp.controller('FormNotasCtrl',['$scope','$http','$filter','$modal','localData',function($scope,$http,$filter,$modal, localData){
        $scope.nota={};  
        $scope.keep = {};
        $scope.notaCopy={};   
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

		$scope.validarCargo = function(id){
		  $scope.getCargo(id);
		  $scope.cargoValido = true;
		};
		
		$scope.invalidaCargo = function(){
		  $scope.cargoValido = false;
		};


		$scope.changeType = function(s){
		  if(s==1)
		    $scope.cls = "fa fa-square-o";
		  else
		    $scope.cls = "fa fa-check-square-o";
		}
 	//Opciones para Tipos de Nota
	 	localData.getTipoNota().then(function(data){
	 	  $scope.opcionesNota = data;
	 	});

    // OPCIONES PARA MEDIOS
		localData.getMedio().then(function(dataMedios){
			$scope.opcionesMedios = dataMedios;
		});

    // OPCIONES PARA AUTOR
        $scope.getAutor=function(medio){
          localData.getAutor(medio).then(function(dataAutores){
              $scope.opcionesAutores = dataAutores;
          });
        }

    // SECCIONES 
			  localData.getSeccion().then(function(dataSecciones){
                $scope.opcionesSeccion = dataSecciones;
              });

    // PROTAGONISTAS
              localData.getProtagonista().then(function(dataProtagonista){
                $scope.opcionesProtagonsita = dataProtagonista;
              });

    // CARGOS
              $scope.getCargo = function(id){              	
				localData.getCargo(id.idProtagonista).then(function(dataCargo){
                  $scope.opcionesCargo = dataCargo;
                });
              };

    // AREAS             
              localData.getArea().then(function(data)
              {
              	$scope.opcionesArea = data;              	
              });

    // TEMAS
              $scope.getTema = function(area) {                
                localData.getTema(area).then(function(data) 
                {
                	$scope.opcionesTema = data;                	
                });
              };

    // SUBTEMAS
              $scope.getSubtema = function(id){                
                localData.getSubtema(id).then(function(data) 
                {
                	$scope.opcionesSubtema = data;                 	
                });
              };

    // PAIS
              localData.getPais().then(function(dataPais){
                $scope.opcionesPais = dataPais;
              });

    // ESTADOS
              $scope.getEstados = function(idPais){
	               localData.getEstado(idPais).then(function(dataEstados){
	                  $scope.opcionesEstado = dataEstados;
	               });
              };

    // MUNICIPIO
              $scope.getMunicipio = function(estado){
                	  localData.getMunicipio(estado).then(function(dataMunicipio){
                          $scope.opcionesMunicipios = dataMunicipio;;
                      });
              };

    // GUARDAR NOTA

              $scope.updateNota = function(nota,k){
                if( nota!=undefined )
                {                	
					var modalInstance = $modal.open({ 
						templateUrl: 'partials/admin/modals/carga.html',
						controller: cargaModalCtrl,
						size: 'md',
						resolve: {
							notaOpc : function() {
							  	return nota;  
							}
						}
					});
					
					modalInstance.result.then(function(data) {
						if(data != undefined)
							if (data == 1)
							{
								$scope.resetFields(k);
								document.getElementById("exampleInputFile").value = "";
								$scope.permitir = false; 
								$scope.auxiliarST = [0];
								$scope.auxiliarPT = [0];
							}
					});         										                	
				}else{
				  console.log("nota no definida");
				}
              };
              
              var cargaModalCtrl = function($scope, $modalInstance, $http, notaOpc) 
              {
              	$scope.cancel = function() 
              	{
              		$modalInstance.close();
              	};
              	
              	$scope.master = {};
              	var con = true;
              	$scope.resultado = "";
              	if (document.getElementById("exampleInputFile").value != "")
              	{
              		var nom = document.getElementById("exampleInputFile").value,
              			ind = nom.lastIndexOf(".") + 1,
              			name = nom.slice(ind);
              		if (name.toLowerCase() != "png" && name.toLowerCase() != "jpg" && name.toLowerCase() != "jpeg")
              		{
              			$scope.resultado = "La extensión "+name+" no está permitida";
              			con = false;
              		}								
              	}
              	if (con)
              		$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':1,'nota':notaOpc}).success(function(nota)
                  	{
                            if(nota.toString().indexOf("error de insercion") == -1)
                            {
                            	$scope.state="La nota se guardó correctamente. Se está subiendo la imagen";
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
                                      if(ev == 1)
                                      	$modalInstance.close(ev);
                                      else
                                      	$scope.resultado = ev;
                                    }
                                  });
                              }
                              else
                              	$modalInstance.close(1);	  
                            }else{
                            	//Error aqui
                            	$scope.resultado = nota;	
                            }                         			                                     
                		}); 	
              };
              
    //Opciones para Otros Temas
    	$scope.getOTema = function(area, index) {
    		localData.getTema(area.idArea).then(function(data) 
    		{
    			$scope.opcionesOtroTema[index] = data;
    		});
    		
    	};
    //Opciones para Otros Subtemas
      $scope.getSub = function(tema,index) {
        localData.getSubtema(tema.idTema).then(function(data) 
        {
          	$scope.opcionesOtroSub[index] = data;     
        });
      };      

    //Opciones para Otros Cargos
        $scope.getoCar = function(Prot,index){
          localData.getCargo(Prot.idProtagonista).then(function(dataCargo){          
              $scope.opcionesPT[index]=dataCargo;
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
                  	var i, aux;
                    $scope.opcionesMedios = data[0];
                    aux = data[0];
                    for (i=0; i<aux.length; i++)
                    	if(aux[i].nombreMedio == data[1].nombre)
                    	{
                    		$scope.nota.medio = aux[i];
                    		break;	
                    	}
                    $scope.opcionesAutores = [];
                  }
                });
              };

              var medioModalCtrl = function($scope,$modalInstance) {
                 $scope.master = {};
                 $scope.medio = {};
                 $scope.alerta = {"tipo":"","mensaje":""};
                      $scope.updateMedio=function(m){
                       localData.insertMedio(m).then(function(msg) 
                       {
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
                              success: function() {       
                                localData.refreshMedios().then(function(ev) {
                                	var aux = [ev,m];
                                	$modalInstance.close(aux);                                	
                                });
                              }
                            });
                          }else {
                          	localData.refreshMedios().then(function(ev) {
                          		var aux = [ev,m];
                          		$modalInstance.close(aux);                               	
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
                    	if(data[0].medio.idMedio == data[2])
                    	{
                    		var i, aux = data[1], nom;
                    		if (data[0].nombre != undefined)
                    			nom = data[0].nombre;
                    		else
                    			nom = data[0].autor.nombreAutor;
                    		$scope.opcionesAutores = data[1];
                    		for (i=0; i<aux.length; i++)
                    			if(nom == aux[i].nombreAutor)
                    			{
                    				$scope.nota.autor = aux[i];
                    				break;
                    			}
                    	}
                  });
                };
      
                var autorModalCtrl = function ($scope,$modalInstance,notaDatos){
                   $scope.opcionesMedios = {};
                   $scope.opcionesAutores = {};
                   localData.getMedio().then(function(dataMedios){
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
                      localData.insertAutor(autor).then(function(msg) {
                      		var aux = [autor, msg, notaDatos.idMedio];
                      		$modalInstance.close(aux);              
                      });
                    };

                   $scope.updateAutorMedio= function(autor2){
                      localData.addAutor2Medio(autor2).then(function(msg) {
							var aux = [autor2, msg, notaDatos.idMedio];
							$modalInstance.close(aux);              							
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
              {
              	var aux = data[1], i;
                $scope.opcionesNota = data[1];
                for (i=0; i<aux.length; i++)
                	if(aux[i].nombreTipoNota == data[0].nombre)	
                	{
                		$scope.nota.tipo = aux[i];
                		break;
                	}
              }
          });
        };

        var tipoModalCtrl = function($scope,$modalInstance){
          localData.getTipoNota().then(function(data){
            $scope.opcionesNotas = data;
          }); 
            
            $scope.updatetipo = function(tp){
              localData.insertTipoNota(tp).then(function(data)
              {
              	var aux = [tp, data];	
                $modalInstance.close(aux);        
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
              {
              	var aux = data[1], i;              	
                $scope.opcionesSeccion = data[1];
                for(i=0; i<aux.length; i++)
                	if(aux[i].nombreSeccion == data[0].nombre)
                	{
                		$scope.nota.seccion = aux[i];
                		break;
                	}        
              }
          });
        }
        var seccionModalCtrl = function($scope,$modalInstance){
          localData.getSeccion().then(function(data){
            $scope.opcionesSeccion = data;
          }); 
          
            $scope.updateSeccion = function(sec) {
              localData.insertSeccion(sec).then(function(data) {
              	var aux = [sec, data];
                $modalInstance.close(aux);
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
            if (data != undefined)
              $scope.opcionesProtagonsita = data;            
          });
        };
                  
        var protModalCtrl = function ($scope,$modalInstance){
			localData.getAllCargos().then(function(data){
				$scope.cargos = data;  
			});
			$scope.master = {};
			$scope.protagonista = {};
			
			$scope.updateProtagonista=function(protagonista){
				localData.insertProtagonista(protagonista).then(function(data){
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
					
					localData.getAllCargos().then(function(data){
						$scope.cargos = data;  
					});
					
					localData.getProtagonista().then(function(data1){
						var aux;
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
						localData.insertCargo(cargo).then(function(data){
							$modalInstance.close(data);
						});
					};
					
					$scope.getCargo = function(protagonista){
						$http.post("data/consultas/consultasAdmin.php",{'sentencia':14,'protagonista':protagonista}).success(function(ev){
							$scope.crg = ev;  
						});
					};
					
					$scope.updateProt = function(prot,carg){
						localData.addCargo2Prot(prot,carg).then(function(data){
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
            localData.insertArea(area).then(function(data) {
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
            localData.getArea().then(function(data){
                var i, aux;
                $scope.opcionesArea = data;
                for (i=0; i<data.length; i++)
                  if (data[i]['idArea'] == notaArea['idArea'])
                    aux = i;
                $scope.tema.area = data[aux];
            });        
	        $scope.updateTema=function(tema){      
	          localData.insertTema(tema).then(function(data) {
	            $modalInstance.close(data);       
	          });
	        };       
            
            $scope.cancel = function () {
              $modalInstance.close();
            };

        };

      /*----------------------------------------------Modal Subtema------------------------------------------------*/

        $scope.modalSubtema = function(datos1,index){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/altaSubtema.html',
            controller: subtemaModalCtrl,
            size: 'md',
            resolve: {
            notaOpc: function() {              
              return datos1;
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
          $scope.subtema = {};
            localData.getTema(notaOpc.idArea).then(function(data1){
            	var j, auxi;
            	$scope.opcionesTema = data1;
            	for (j=0; j<data1.length; j++)
              		if (data1[j]['idTema'] == notaOpc.idTema)
                		auxi = j;
            	$scope.subtema.tema = data1[auxi];
          });

        
          
        $scope.updateSubtema=function(subtema){
              localData.insertSubtema(subtema).then(function(data) {
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
            {
            	var i, aux = data[1];
              	$scope.opcionesPais = data[1];
              	for(i=0; aux.length; i++)
              		if(aux[i].nombrePais == data[0]['nombre'])
              		{
              			$scope.nota.pais = aux[i];
              			break;
              		}
            }
          });
        };
        var paisModalCtrl = function($scope,$modalInstance){
            $scope.updatePais = function(pais) {
              localData.insertPais(pais).then(function(data) {
              	var aux = [pais, data];
                $modalInstance.close(aux);
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
              {
              	var i, aux = data[1];
                	$scope.opcionesEstado = data[1];
                	for(i=0; aux.length; i++)
                		if(aux[i].nombreEstado == data[0]['nombre'])
                		{
                			$scope.nota.estado = aux[i];
                			break;
                		}
              }
          });
        };
        var estadoModalCtrl = function($scope,$modalInstance,notaPais){
        	$scope.estado = {};
            localData.getPais().then(function(data){     
                var i, aux;
                $scope.opcionesPais = data;
                for (i=0; i<data.length; i++)
                  if(data[i]['idPais'] == notaPais['idPais'])                
                    aux = i;
                $scope.estado.pais = data[aux];
            });
          
        $scope.updateEstado = function(estado) {
            localData.insertEstado(estado).then(function(data) {
            	var aux = [estado, data];
              	$modalInstance.close(aux);
            });     
        };
        $scope.cancel = function () {
          $modalInstance.close();
        };
              
        };

    /*----------------------------------------------Modal Municipio------------------------------------------------*/

        $scope.modalMunicipio = function(dato1){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/modals/altaMunicipio.html',
            controller: municipioModalCtrl,
            size: 'md',
            resolve: {
          notaOpc : function() {
              return dato1;  
          }
            }
          });
          
          modalInstance.result.then(function(data) {
          		if(data != undefined)
          		{
          			var i, aux = data[1];
          		  	$scope.opcionesMunicipios = data[1];
          		  	for(i=0; aux.length; i++)
          		  		if(aux[i].nombreMunicipio == data[0]['nombre'])
          		  		{
          		  			$scope.nota.municipio = aux[i];
          		  			break;
          		  		}
          		}
          });
        };
        var municipioModalCtrl = function($scope,$modalInstance,notaOpc){
          	$scope.municipio = {};
        	localData.getEstado(notaOpc.idPais).then(function(data){
		          var i, aux;
		          $scope.opcionesEstados = data;          
		          for (i=0; i<data.length; i++)
		            if (data[i]['idEstado'] == notaOpc['idEstado'])
		              aux = i;
		          $scope.municipio.estado = data[aux];
        	});
       
        $scope.updateMunicipio = function(municipio){
            localData.insertMunicipio(municipio).then(function(data) {
              var aux = [municipio, data];
              $modalInstance.close(aux);
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
        });
        $scope.insertAdmin=function(newAdmn){
          usuario = angular.copy(newAdmn);
 
        $http.post("data/inserciones/insercionesAdmin.php",{'sentencia':15,'newAdmn':usuario}).success(function(msg){
              $scope.usuario = angular.copy($scope.master);
              $scope.alerta.tipo = "alert alert-success";
              $scope.alerta.mensaje =" Dato almacenado en base de datos";
         });
       };    
    }]);