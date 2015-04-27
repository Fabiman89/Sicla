	siclaApp.controller('edtiUsrCtrl', ['$scope', '$http', '$modal', function($scope, $http, $modal) {					
		var abrir = true;
		$http.post('data/consultas/consultasAdmin.php',{'sentencia':26}).success(function(usr) {
			$scope.users = usr;
		});
		
		$http.post('data/consultas/consultasAdmin.php',{'sentencia':19}).success(function(tp) {
			$scope.opcionesTipo = tp;
		});
		
		$scope.getData = function(usr, index) {
			if(abrir)
			{			
				$scope.user = angular.copy(usr);
				$scope.user.index = index;
				for (var i=0; i<$scope.opcionesTipo.length; i++)
					if(usr.nombreTipoUsuario == $scope.opcionesTipo[i].nombreTipoUsuario)
						$scope.user.tipo = $scope.opcionesTipo[i];
			}
		};
		
		$scope.modalActualizar = function(data, index) {
			var modalInstance = $modal.open({
				templateUrl : "partials/admin/modals/modalActualizar.html",
				controller : ModalCtrl,
				size : "md",
				resolve : {
					val : function() { 
						var arr = [];
						arr.push(data,data.index);
						return arr;
					}
				}
			});
			
			modalInstance.result.then(function(arr) {				
				if (arr != undefined)
				{			
	
					var i = arr[1];	
					delete arr[0].index;				
					$scope.users[i] = angular.copy(arr[0]);					
				}
				$scope.user = undefined;
			});
		};
		
		$scope.modalEliminar = function(data, index) {	
			abrir = false;		
			var modalInstance = $modal.open({
				templateUrl : "partials/admin/modals/modalEliminar.html",
				controller : ModalCtrl,
				size : "md",
				resolve : {
					val : function() { 
						var arr = [];
						arr.push(data,index);
						return arr;
					}
				}
			});
			
			modalInstance.result.then(function(arr) {
				abrir = true;
				if (arr != undefined)
				{
					var i = arr[1];
					$scope.users.splice(i, 1);					
				}								
			});
		};
		
		var ModalCtrl = function($scope, $http, $modalInstance, val) {
			$scope.usr = val[0];
			$scope.guardarUsuario = function() {
				$http.post('data/actualizar/actualizacionAdmin.php',{'sentencia':17, 'usuario': val[0]}).success(function(data) {
					if(data == 1)
						$modalInstance.close(val);	
					else
					{
						$scope.alerta.mensaje = "Error al actualizar";
						$scope.alerta.tipo = "alert alert-danger";
					}
				});								
			};
					
			$scope.eliminarUsuario = function() {
				$http.post('data/actualizar/actualizacionAdmin.php',{'sentencia':18, 'usuario': val[0]}).success(function(data) {
					if(data == 1)
						$modalInstance.close(val);	
					else
					{
						$scope.alerta.mensaje = "Error al eliminar";
						$scope.alerta.tipo = "alert alert-danger";
					}
				});
			};
			
			$scope.cancel = function() {
				$modalInstance.close();				
			};
		};
		
	}]);

  siclaApp.controller('editMedioCtrl', ['$scope','$http','$modal', 'localData',function($scope,$http,$modal, localData) {
    $scope.editAviable = true;
    $scope.medio = {};

    localData.getMedio().then(function(medios){
      $scope.medio = medios;
    }); 

    $scope.getAutores = function(medio){
      $scope.nmMedio = medio.nombreMedio;
      $scope.medioSeleccionado = medio.idMedio;
      localData.getAutor(medio.idMedio).then(function(autores){   		  
              $scope.autores = autores;    
      });
    }
   /*--------------------------------------------- Eliminar Medio------------------------------------------------*/                              
              
              $scope.eliminarMedio = function(dato,query){
                var modalInstance = $modal.open({
                templateUrl: 'partials/admin/editar/eliminarMedio.html',
                controller: eliminarMedioCtrl,
                size: 'md',
                resolve: {
                  val: function () {
                    datos = [];
                    datos.push(dato,query);
                    return datos;
                  } 
                }

              });
                modalInstance.result.then(function(data) {
                  if(data != undefined ){
                    switch (data[0]){
                      case 1:
                        $scope.medio = data[1];
                        delete($scope.autores);                      
                        break;
                      case 2:
                        $scope.autores = data[1];
                        break;
                    }
                  }
                });
              };

              var eliminarMedioCtrl = function($scope,$modalInstance,val) {
                  switch (val[1]) { 
                    case 1:
                      $scope.tipo = 'Medio';
                      $scope.nm = val[0].nombreMedio;
                      $scope.idDato = val[0].idMedio;
                      $scope.eliminaMedio = function (){
                          localData.deleteMdio(val[0]).then(function(rMedio){                          
                          if(rMedio[0]==1){
                            //Control de Success aqui!                            
                              var respuesta = [1,rMedio[1]];
                              $modalInstance.close(respuesta);
                          }else{
                            //control de errores aqui!
                            console.log("Error Al Eliminar Medios");
                            console.log(rMedio[1]);
                            $modalInstance.close();
                          }
                        }); 
                      };
                      break;
                    case 2:
                      $scope.tipo = 'Autor';
                      $scope.nm = val[0].nombreAutor;
                      $scope.idm = val[0].idMedio;
                      $scope.eliminaAutor = function (){
                          localData.deleteAutor(val[0]).then(function(rAutor){
                          if(rAutor==1){
                            //Control de Success aqui!                            
                              var respuesta = [2,rAutor[1]];
                              $modalInstance.close(respuesta);
                          }else{
                            //control de errores aqui!
                            console.log("Error Al Eliminar Autores");
                            console.log(rAutor[1]);
                            $modalInstance.close();
                          }
                          //$modalInstance.close(rMedio);
                        }); 
                      };                    
                      break;
                  }
                  $scope.cancel = function () {
                    $modalInstance.close();
                  };

              };
   /*--------------------------------------------- Editar Medio------------------------------------------------*/                              
              $scope.modalMedios = function(dato,query){
                var modalInstance = $modal.open({
                templateUrl: 'partials/admin/editar/editMedioModal.html',
                controller: mediosModalCtrl,
                size: 'md',
                resolve: {
                  val: function () {
                    datos = [];
                      datos.push(dato,query);
                         return datos;
                  } 
                }

              });
                modalInstance.result.then(function(data) {
                  if(data != undefined ){
                    if(data[0].urlMedio != undefined){
                      $scope.medio = data;
                      delete($scope.autores);
                    }else{
                      $scope.autores = data;
                    }
                  }
                });
              };

              var mediosModalCtrl = function($scope,$modalInstance,val) {
                  $scope.valor = val[1];
                  $scope.nm = {};
                  switch (val[1]) {
                    case 1:
                      $scope.cambios = {"nombre":val[0].nombreMedio,"url":val[0].urlMedio,"idMedio":val[0].idMedio}
                      $scope.url= val[0].urlMedio;
                      $scope.nm = val[0].nombreMedio;
                      $scope.textoH4 = "Editando Medio";
                      $scope.actualizaMedio = function(cambiosMedio){
                        $scope.medio = {"idMedio":cambiosMedio.idMedio,"nombreMedio":cambiosMedio.nombre,"urlMedio":cambiosMedio.url };
                        localData.updateMedio($scope.medio).then(function(rMedio){ 
                          if (rMedio == 1)
                          {
	                          if (document.getElementById("exampleInputFile").value != "")
	                          {                         
	                            var file = document.getElementById("exampleInputFile"), formData = new FormData();
	                            formData.append("imagen", file.files[0]);
	                            formData.append("medio",cambiosMedio.idMedio);                          
	                            $.ajax({
	                              url:'data/actualizar/actualizarLogo.php',
	                              type: 'POST',
	                              data: formData,
	                              processData: false,
	                              contentType: false,
	                              dataType: 'json',
	                              success: function() {       
	                              	localData.refreshMedios().then(function(data) 
                              		{
                              			$modalInstance.close(data);
                              		});  	                                
	                              }
	                            });
	                          }else
	                          	localData.refreshMedios().then(function(data) 
	                          	{
	                          		$modalInstance.close(data);
	                          	});
	                   	  }else
	                   	  {
	                   	  	console.log(rMedio);
	                   	  	$modalInstance.close();
	                   	  }                         
                        }); 
                      };
                      break;
                    case 2: 
                      $scope.actualizaAutor = function(cambiosAutor){
                        $scope.autor = {"idAutor":val[0].idAutor,"nombreAutor":cambiosAutor.nombre,"generoAutor":cambiosAutor.genero};
                        localData.updateAutor($scope.autor).then(function(rAutor){
                          if(rAutor == 1)
                          	localData.refreshAutores().then(function() 
                          	{
                          		localData.getAutor(val[0].idMedio).then(function(data) 
                          		{
                          			$modalInstance.close(data);                          
                          		});
                          	});                          	
                          else
                          	$modalInstance.close();
                        });
                      };
                      $scope.cambios = {"nombre":val[0].nombreAutor,"genero":val[0].generoAutor,"idAutor":val[0].idAutor}
                      $scope.generoActual = val[0].generoAutor;
                      $scope.nm = val[0].nombreAutor;
                      $scope.textoH4 = "Editando Autor";
                      break;
                  }
                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };


  }]);

/**************************************************** CONTROLADOR EDICION AREAS  ***************************************/

    siclaApp.controller('editAreaCtrl', ['$scope','$http','$modal', 'localData', function($scope,$http,$modal, localData) {
          $scope.editAviable = true;
          localData.getArea().then(function(area){
            $scope.areas = area;
          }); 

          $scope.getTemas = function(area){
            $scope.nmArea = area.nombreArea;
            localData.getTema(area.idArea).then(function(respuestaTema){
              $scope.temas = respuestaTema;
            }); 
            if($scope.subtemas){
              delete ($scope.subtemas);
            };
          };

          $scope.getSubs = function(tema){
            $scope.nmTema = tema.nombreTema;
            localData.getSubtema(tema.idTema).then(function(respuestaSubs){
              $scope.subtemas = respuestaSubs;
            });
          };

   /*--------------------------------------------- Editar Area------------------------------------------------*/                              
              
              $scope.modalEdita = function(dato,query){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/editTemasModal.html',
                    controller: editModalCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                        datos = [];
                        datos.push(dato,query);
                        return datos;
                      } 
                    }
                  });
                  modalInstance.result.then(function(data) {
                    if(data != undefined){
                      switch (data[0]){
                        case 1: //area
                          $scope.areas = data[1];
                          if($scope.temas){
                            delete($scope.temas);
                            if($scope.subtemas){
                              delete($scope.subtemas);
                            }
                          }
                          break;
                        case 2: //tema
                          $scope.temas = data[1];
                          if($scope.subtemas){
                            delete($scope.subtemas);
                          }
                          break;
                        case 3: // subtema
                          $scope.subtemas = data[1];
                          break;
                      }
                    }
                  });
              };

              var editModalCtrl = function($scope,$modalInstance,val) {
                $scope.valor = val[1];
                  switch (val[1]) {
                    case 1: // Areas
                      $scope.cambios = {"nombre":val[0].nombreArea};
                      $scope.nm= val[0].nombreArea;
                      $scope.textoH4 = "Editando Area";

                      $scope.actualizaArea = function(cambiosA){
                        $scope.area = {"idArea":val[0].idArea,"nombre":cambiosA.nombre};
                        localData.updateArea($scope.area).then(function(rArea){
                            if(rArea[0]==1){                              
                                var respuesta = [1,rArea[1]];
                                $modalInstance.close(respuesta);
                            }else{
                              console.log(rArea[1]);
                              $modalInstance.close();
                            }

                        });
                      };                      
                      break;
                    case 2: 
                      $scope.actualizaTema = function(cambiosT){
                        tema = {"idTema":val[0].idTema,"nombre":cambiosT.nombre};
                        localData.updateTema(tema).then(function(rTema){
                          if(rTema==1){
                            localData.getTema(val[0].idArea).then(function(rTema2){
                              var respuesta = [2,rTema2];
                              $modalInstance.close(respuesta);
                             });
                          }else{
                            // errores aqui
                            console.log(rTema);
                          }
                        });
                      };
                      $scope.nm= val[0].nombreTema;
                      $scope.cambios = {"nombre":val[0].nombreTema};
                      $scope.textoH4 = "Editando Tema";
                      break;
                    case 3:
                      $scope.cambios = {"nombre":val[0].nombreSubtema};
                      $scope.nm= val[0].nombreSubtema;
                      $scope.textoH4 = "Editando Subtema";
                      $scope.actualizaSubtema = function(cambiosS){
                        subtema = {"nombre":cambiosS.nombre,"idSubtema":val[0].idSubtema};
                        localData.updateSubtema(subtema).then(function(rSubtema){
                          if(rSubtema==1){
                            localData.getSubtema(val[0].idTema).then(function(rSubtema2){
                              var respuesta = [3,rSubtema2];
                              $modalInstance.close(respuesta);
                            });
                          }else{
                            //Errores aqui
                            console.log(rSubtema);
                          
                          }
                        });
                      };
                      break;

                  }
                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };
     /*---------------------------------------------  Borrar ------------------------------------------------*/                              
              $scope.modalBorrar = function(dato,query){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/eliminarTemas.html',
                    controller: deleteModalCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                          datos = [];
                          datos.push(dato,query);
                          return datos;
                      } 
                    }
                  });

                  modalInstance.result.then(function(data) {
                    if (data != undefined)
                    {
                      switch(data[1]){
                        case 1:
                          $http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(response){
                            $scope.areas = response;
                            if($scope.temas)
                              delete($scope.temas);
                              if($scope.subtemas);
                                delete($scope.subtemas);
                          });
                          break;
                        case 2:
                          $http.post("data/consultas/consultasAdmin.php",{'sentencia':8,'area':data[0].idArea}).success(function(response){
                            $scope.temas = response;
                              if($scope.subtemas);
                                delete($scope.subtemas);
                          });
                          break;
                        case 3:
                          $http.post("data/consultas/consultasAdmin.php",{'sentencia':9,'tema':data[0].idTema}).success(function(response){
                            $scope.subtemas = response;
                          });
                          break;
                      }
                    }
                  });
              };

              var deleteModalCtrl = function($scope,$modalInstance,val) {
                console.log(val);
                switch(val[1]){
                  case 1: 
                    console.log(val[0]);
                    $scope.tipo = "Area";
                    $scope.nm = val[0].nombreArea;
                    $scope.borrarArea = function (){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':4,'id':val[0].idArea}).success(function(respuesta){
                        if(respuesta==1){
                          $modalInstance.close(val);
                        }
                      });
                      };
                    break;
                  case 2:
                    console.log(val[0]);
                    $scope.tipo = "Tema";
                    $scope.nm = val[0].nombreTema;
                    $scope.borrarTema = function (){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':5,'id':val[0].idTema}).success(function(respuesta){
                        if(respuesta==1){
                          $modalInstance.close(val);
                        }
                      });
                      };
                    break;
                  case 3:
                    console.log(val[0]);
                    $scope.tipo = "Subtema";
                    $scope.nm = val[0].nombreSubtema;
                    $scope.borrarSubtema = function (){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':6,'id':val[0].idSubtema}).success(function(respuesta){
                        if(respuesta==1){
                          $modalInstance.close(val);
                        }
                      });
                      };
                    break;  
                } 
                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };
        }]);


/**************************************************** CONTROLADOR EDICION PROTAGONISTA  ***************************************/

    siclaApp.controller('editProtagonistaCtrl', ['$scope','$http','$modal', 'localData',function($scope,$http,$modal,localData) {
          $scope.editAviable = true;
          $scope.protagonistas = {};
          $scope.cargos = {};

          $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(prot){
            $scope.protagonistas = prot;
          }); 

          localData.getAllCargos().then(function(carg){
            $scope.cargos = carg;
          }); 

          $scope.getCargos = function(prot){
            $scope.nombreP = prot.nombreProtagonista;
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':6,'protagonista':prot.idProtagonista}).success(function(respuestaCargo){
              $scope.cargosProtagonista = respuestaCargo;
            }); 
          };

   /*--------------------------------------------- Editar Protagonista ------------------------------------------------*/                              
              
              $scope.modalEdita = function(dato,query){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/editProtagonistaModal.html',
                    controller: editModalCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                        datos = [];
                        datos.push(dato,query);
                        return datos;
                      } 
                    }
                  });
                  modalInstance.result.then(function(data) {
                    if(data != undefined){
                      switch(data[0]){
                        case 1:
                          $scope.protagonistas = data[1];
                          if($scope.cargosProtagonista){
                            delete($scope.cargosProtagonista);
                          }
                          break;
                        case 2:
                          $scope.cargosProtagonista = data[1];
                          $http.post("data/consultas/consultasAdmin.php",{"sentencia":13}).success(function(rc){
                            $scope.cargos = rc;
                          });
                          break;
                          case 3:
                            $scope.cargos = data[1];
                            if($scope.cargosProtagonista){
                              delete($scope.cargosProtagonista);
                            }
                            break;
                      }
                    }
                  });
              };

              var editModalCtrl = function($scope,$modalInstance,val) {
                $scope.valor = val[1];
                 $scope.master = {};
                 $scope.medio = {};
                  $scope.textoBoton = {};
                  switch (val[1]) {
                    case 1:
                      $scope.cambios = {"nombre":val[0].nombreProtagonista,"genero":val[0].genero};
                      $scope.nm = val[0].nombreProtagonista;
                      $scope.textoH4 = "Editando Protagonista";
                      $scope.actualizaProtagonista = function(cambiosP){
                        protagonista = {"nombreProtagonista":cambiosP.nombre,"idProtagonista":val[0].idProtagonista,"generoProtagonista":cambiosP.genero};
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':5,"protagonista":protagonista}).success(function(rProt){
                            if(rProt==1){
                              $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(rProt2){
                                respuesta = [];
                                respuesta.push(1,rProt2);
                                $modalInstance.close(respuesta);
                              });
                            }else{
                              console.log(rProt);
                            }

                        });
                      };
                      break;
                    case 2: 
                      $scope.actualizaCargo = function(cambiosC){
                        cargo = {"idCargo":val[0].idCargo,"nombre":cambiosC.nombre};
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':6,"cargo":cargo}).success(function(rCargo){
                            if(rCargo==1){
                              if(val[0].idProtagonista){
                                $http.post("data/consultas/consultasAdmin.php",{'sentencia':6,"protagonista":val[0].idProtagonista}).success(function(rCargo2){
                                  respuesta = [];
                                  respuesta.push(2,rCargo2);
                                  $modalInstance.close(respuesta);
                                });
                              }else{
                                $http.post("data/consultas/consultasAdmin.php",{'sentencia':13}).success(function(rCargo2){
                                  respuesta = [];
                                  respuesta.push(3,rCargo2);
                                  $modalInstance.close(respuesta);
                                });
                              }
                            }else{
                              console.log(rCargo);
                            }

                        });                        
                      };
                      $scope.cambios = {"nombre":val[0].nombreCargo};
                      $scope.nm = val[0].nombreCargo;
                      $scope.textoH4 = "Editando Cargo";
                      break;
                    case 3:

                      break;

                  }
                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };
/*---------------------------------------------  Borrar ------------------------------------------------*/                              

              $scope.modalBorrar = function(dato,query,nombre){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/eliminarProtagonista.html',
                    controller: modalBorrarCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                          datos = [];
                          datos.push(dato,query,nombre);
                          return datos;
                      } 
                    }
                  });

                  modalInstance.result.then(function(data) {
                    switch(data[1]){
                      case 1:
                        $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(respuesta){
                          $scope.protagonistas=respuesta;
                          if($scope.cargosProtagonista)
                            delete($scope.cargosProtagonista);
                        });
                        break;
                      case 2:
                        $http.post("data/consultas/consultasAdmin.php",{'sentencia':6,'protagonista':data[0].idProtagonista}).success(function(respuesta){
                          $scope.cargosProtagonista=respuesta;
                        });                      
                        break;
                      case 3:
                        $http.post("data/consultas/consultasAdmin.php",{'sentencia':13}).success(function(respuesta){
                          $scope.cargos=respuesta;
                        });                      
                        break;
                    }
                  });
              };

              var modalBorrarCtrl = function($scope,$modalInstance,val) {
                switch(val[1]){
                  case 1:
                   $scope.tipo="Protagonista";
                   $scope.nm = val[0].nombreProtagonista;
                   $scope.borrarProtagonista = function (){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':13,'id':val[0].idProtagonista}).success(function(response){
                        if(response==1){
                          $modalInstance.close(val);
                        }
                      });
                    console.log(val[0]);
                  };                 
                    break;
                  case 2:
                    $scope.idDato = val[0].idCP;
                    $scope.tipo="CP";
                    $scope.prot= val[2];
                    $scope.nm = val[0].nombreCargo;
                    $scope.borrarCP = function(){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':15,'id':val[0].idCP}).success(function(response){
                        if(response==1){
                          $modalInstance.close(val);
                        }
                      });
                    };
                    break;
                  case 3:
                    $scope.idDato = val[0].idCargo;
                    $scope.tipo="Cargo";
                    $scope.nm = val[0].nombreCargo;
                    $scope.borrarCargo = function(){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':14,'id':val[0].idCargo}).success(function(response){
                        if(response==1){
                          $modalInstance.close(val);
                        }
                      });
                    };
                    break;
                }

                
                


                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };


        }]);


  /**************************************************** CONTROLADOR EDICION PAIS  ***************************************/

    siclaApp.controller('editPaisCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
          $scope.editAviable = true;
          $scope.paises = {};

          $http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(pai){
            $scope.paises = pai;
          }); 


          $scope.getEstados = function(pais){
            $scope.nmPais = pais.nombrePais;
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':11,'pais':pais.idPais}).success(function(respuestaEstado){
              $scope.estados = respuestaEstado;
            }); 
          };

          $scope.getMunicipios = function(estado){
            $scope.nmEstado = estado.nombreEstado;
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':12,'estado':estado.idEstado}).success(function(respuestaMunicipio){
              $scope.municipios = respuestaMunicipio;
            }); 
          };

   /*--------------------------------------------- Editar Paises / Estados / Municipios ------------------------------------------------*/                              
              
              $scope.modalPaises = function(dato,query){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/editPaisesModal.html',
                    controller: modalPaisesCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                        datos = [];
                        datos.push(dato,query);
                        return datos;
                      } 
                    }
                  });
                  modalInstance.result.then(function(data) {
                    if(data != undefined){
                      switch(data[0]){
                        case 1:
                          $scope.paises = data[1];
                          if($scope.municipios){
                            delete($scope.municipios);
                            if($scope.estados){
                              delete($scope.estados);
                            }
                          }
                          break;
                        case 2:
                          $scope.estados = data[1];
                          if($scope.municipios){
                            delete($scope.municipios);
                          }
                          break;
                        case 3:
                          $scope.municipios = data[1];
                          break;
                      }
                    }
                  });
              };

              var modalPaisesCtrl = function($scope,$modalInstance,val) {
                $scope.valor = val[1];
                 $scope.master = {};
                 $scope.cambios = val[0];
                  $scope.textoBoton = {};
                  switch (val[1]) {
                    case 1:
                      $scope.cambios = {"nombre":val[0].nombrePais};
                      $scope.nm = val[0].nombrePais;
                      $scope.textoH4 = "Editando Pais";
                      $scope.actualizaP = function(cambiosP){
                        pais = {"nombre":cambiosP.nombre,"idPais":val[0].idPais};
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':13,'pais':pais}).success(function(rPais){
                          if(rPais==1){
                            $http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(rPais2){
                              respuesta = [];
                              respuesta.push(1,rPais2);
                              $modalInstance.close(respuesta);
                            });
                          }else{
                            console.log(rPais);
                          }
                        });
                      };
                      break;
                    case 2: 
                      $scope.actualizaE = function(cambiosE){
                        estado = {"nombre":cambiosE.nombre,"idEstado":val[0].idEstado};
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':14 ,'estado':estado}).success(function(rEstado){
                          if(rEstado==1){
                            $http.post("data/consultas/consultasAdmin.php",{'sentencia':11,"pais":val[0].idPais}).success(function(rEstado2){
                              respuesta = [];
                              respuesta.push(2,rEstado2);
                              $modalInstance.close(respuesta);
                            });
                          }else{
                            console.log(rEstado);
                          }
                        });                        
                      };
                      console.log(val);
                      $scope.cambios = {"nombre":val[0].nombreEstado};
                      $scope.nm = val[0].nombreEstado;
                      $scope.textoH4 = "Editando Estado";
                      break;
                    case 3:
                      $scope.cambios = {"nombre":val[0].nombreMunicipio};
                      $scope.nm = val[0].nombreMunicipio;     
                      $scope.textoH4 = "Editando Municipio";
                      $scope.actualizaM = function(cambiosM){
                        municipio = {"nombre":cambiosM.nombre,"idMunicipio":val[0].idMunicipio};
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':15 ,'municipio':municipio}).success(function(rMunicipio){
                          if(rMunicipio==1){
                            $http.post("data/consultas/consultasAdmin.php",{'sentencia':12,"estado":val[0].idEstado}).success(function(rMunicipio2){
                              respuesta = [];
                              respuesta.push(3,rMunicipio2);
                              $modalInstance.close(respuesta);
                            });
                          }else{
                            console.log(rMunicipio);
                          }
                        });                        

                      };
                      break;

                  }
                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };
     /*---------------------------------------------  Borrar Paises ------------------------------------------------*/                              
              $scope.eliminaPaises = function(dato,query){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/eliminarPaises.html',
                    controller: eliminaPaisesCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                          datos = [];
                          datos.push(dato,query);
                          return datos;
                      } 
                    }
                  });
                  modalInstance.result.then(function(data) {
                    if(data!=undefined){
                      switch(data[1]){
                        case 1:
                          $http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(respuesta){
                              $scope.paises = respuesta;
                              if($scope.estados)
                                delete($scope.estados);
                                if($scope.municipios)
                                  delete($scope.municipios);

                          });
                          break;
                        case 2:
                          $http.post("data/consultas/consultasAdmin.php",{'sentencia':11,'pais':data[0].idPais}).success(function(respuesta){
                              $scope.estados = respuesta;
                              if($scope.municipios)
                                delete($scope.municipios);
                          });
                          break;  
                        case 3:
                          $http.post("data/consultas/consultasAdmin.php",{'sentencia':12,'estado':data[0].idEstado}).success(function(respuesta){
                              $scope.municipios=respuesta;
                          });
                          break;
                      }
                    }
                  });
              };

              var eliminaPaisesCtrl = function($scope,$modalInstance,val) {              
                switch(val[1]){
                  case 1:
                    $scope.tipo = "País";
                    $scope.nm = val[0].nombrePais;
                    $scope.borrarPais = function (){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':8,'id':val[0].idPais}).success(function(respuesta){
                        if(respuesta==1){
                          $modalInstance.close(val);
                        }else{
                          $modalInstance.close();
                        }

                      });
                    };
                    break;
                  case 2:
                  console.log(val);
                    $scope.tipo = "Estado";
                    $scope.nm = val[0].nombreEstado;
                    $scope.borrarEstado = function(){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':9,'id':val[0].idEstado}).success(function(respuesta){
                        if(respuesta==1){
                          $modalInstance.close(val);
                        }else{
                          $modalInstance.close();
                        }
                    });
                    };
                    break;
                  case 3:
                    $scope.tipo = "Municipio";
                    $scope.nm = val[0].nombreMunicipio;
                    $scope.borrarMunicipio = function(){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':10,'id':val[0].idMunicipio}).success(function(respuesta){
                        if(respuesta==1){
                          $modalInstance.close(val);
                        }else{
                          $modalInstance.close();
                        }
                    });
                    };
                    break;
                }




                
                


                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };

        }]);


/**************************************************** CONTROLADOR SECCIONES  ***************************************/

    siclaApp.controller('editSeccionCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
          $scope.editAviable = true;
          $scope.tipos = {};
          $scope.secciones = {};
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':4}).success(function(sec){
            $scope.secciones = sec;
          }); 

          $http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(tips){
            $scope.tipos = tips;
          }); 

   /*--------------------------------------------- Editar Secciones y Tipos de nota ------------------------------------------------*/                              
              
              $scope.modalSeccion = function(dato,query){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/editSeccionModal.html',
                    controller: modalSeccionCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                        datos = [];
                        datos.push(dato,query);
                        return datos;
                      } 
                    }
                  });
                  modalInstance.result.then(function(data) {
                    if(data != undefined){
                      switch(data[0]){
                        case 1:
                          $scope.secciones = data[1];
                          break;
                        case 2:
                          $scope.tipos = data[1];
                          break;
                      }
                    }
                  });
              };

              var modalSeccionCtrl = function($scope,$modalInstance,val) {
                $scope.valor = val[1];
                  switch (val[1]) {
                    case 1:
                    $scope.cambios= {"nombre":val[0].nombreSeccion};
                      $scope.nm = val[0].nombreSeccion;
                      $scope.textoH4 = "Editando Seccion";
                      $scope.actualizaSeccion = function(cambiosS){
                        seccion = {"nombreSeccion":cambiosS.nombre,"idSeccion":val[0].idSeccion};
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':8 ,'seccion':seccion}).success(function(rSeccion){
                          if(rSeccion==1){
                            $http.post("data/consultas/consultasAdmin.php",{'sentencia':4}).success(function(rSeccion2){
                              respuesta = [];
                              respuesta.push(1,rSeccion2);
                              $modalInstance.close(respuesta);
                            });
                          }else{
                            console.log(rSeccion);
                          }
                        });                        

                      };
                      break;
                    case 2: 
                        $scope.cambios= {"nombre":val[0].nombreTipoNota};
                        $scope.actualizaTipo = function(cambiosT){
                          tipo = {"idTipoNota":val[0].idTipoNota, "nombre":cambiosT.nombre};
                          $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':16,"tipo":tipo}).success(function(rTipo){
                          if(rTipo==1){
                            $http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(rTipo2){
                              respuesta = [];
                              respuesta.push(2,rTipo2);
                              $modalInstance.close(respuesta);
                            });
                          }else{
                            console.log(rTipo);
                          }
                        });
                        };
                        $scope.nm = val[0].nombreTipoNota;
                        $scope.textoH4 = "Editando Tipo de Nota";
                      break;
                  }
                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };
     /*---------------------------------------------  Eliminar Seccion  ------------------------------------------------*/                              
              $scope.eliminaSeccion = function(dato,query){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/eliminarSeccion.html',
                    controller: eliminaSeccionCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                          datos = [];
                          datos.push(dato,query);
                          return datos;
                      } 
                    }
                  });

                  modalInstance.result.then(function(data) {
                    if(data!=undefined){
                      switch(data[1]){
                        case 1:
                          $http.post("data/consultas/consultasAdmin.php",{'sentencia':4}).success(function(respuesta){
                            $scope.secciones=respuesta;
                          });
                          break;
                        case 2:
                          $http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(respuesta){
                            $scope.tipos=respuesta;
                          });
                          break;
                      } 
                    }

                  });
              };

              var eliminaSeccionCtrl = function($scope,$modalInstance,val) {
                switch (val[1]){
                  case 1:
      
                    $scope.tipo = 'Seccion';
                    $scope.nm = val[0].nombreSeccion;
                    $scope.borrarSeccion = function (){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':11,'id':val[0].idSeccion}).success(function(respuesta){
                        if(respuesta==1){
                          $modalInstance.close(val);
                        }
                      });
                    };
                    break;
                  case 2:
                    console.log(val);
                    $scope.tipo = 'Tipo de Nota';
                    $scope.nm = val[0].nombreTipoNota;
                    $scope.borrarTipoNota = function(){
                      $http.post("data/borrar/deleteAdmin.php",{'sentencia':12,'id':val[0].idTipoNota}).success(function(respuesta){
                        if(respuesta==1){
                          $modalInstance.close(val);
                        }else{
                          console.log("rerro")
                        }
                      });
                    };
                    break;
                }
                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };

        }]);