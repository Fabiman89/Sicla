  siclaApp.controller('editMedioCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
    $scope.editAviable = true;
    $scope.medio = {};

    $http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(medios){
      $scope.medio = medios;
    }); 

    $scope.getAutores = function(medio){
      $scope.nmMedio = medio.nombreMedio;
      $scope.medioSeleccionado = medio.idMedio;
      $http.post("data/consultas/consultasAdmin.php",{'sentencia':3,'id':medio.idMedio}).success(function(autores){
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
                  console.log(data);
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
                console.log(val);
                  switch (val[1]) { 
                    case 1:
                      $scope.tipo = 'Medio';
                      $scope.nm = val[0].nombreMedio;
                      $scope.idDato = val[0].idMedio;
                      $scope.eliminaMedio = function (){
                          $http.post("data/borrar/deleteAdmin.php",{'sentencia':1,"medio":val[0]}).success(function(rMedio){
                          console.log(rMedio);
                          if(rMedio==1){
                            //Control de Success aqui!
                            $http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(rMedio2){
                              respuesta = [];
                              respuesta.push(1,rMedio2);
                              $modalInstance.close(respuesta);
                            });
                          }else{
                            //control de errores aqui!
                            console.log("Error Al Eliminar Medios");
                            $modalInstance.close();
                          }
                          //$modalInstance.close(rMedio);
                        }); 
                      };
                      break;
                    case 2:
                      $scope.tipo = 'Autor';
                      $scope.nm = val[0].nombreAutor;
                      console.log(val);
                      $scope.idm = val[0].idMedio;
                      console.log($scope.idm);
                      $scope.eliminaAutor = function (){
                          $http.post("data/borrar/deleteAdmin.php",{'sentencia':3,"autor":val[0]}).success(function(rAutor){
                          console.log(rAutor);
                          if(rAutor==1){
                            //Control de Success aqui!
                            $http.post("data/consultas/consultasAdmin.php",{'sentencia':3,'id':$scope.idm}).success(function(rAutor2){
                              console.log(rAutor2);
                              respuesta = [];
                              respuesta.push(2,rAutor2);
                              $modalInstance.close(respuesta);
                            });
                          }else{
                            //control de errores aqui!
                            console.log("Error Al Eliminar Autores");
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
                  console.log(data[0].urlMedio);
                  if(data != undefined ){
                    if(data[0].urlMedio != undefined){
                      console.log("aqui 1");
                      $scope.medio = data;
                      delete($scope.autores);
                    }else{
                      $scope.autores = data;
                      console.log($scope.autores);
                    }
                  }
                });
              };

              var mediosModalCtrl = function($scope,$modalInstance,val) {
                  $scope.valor = val[1];
                  $scope.nm = {};
                  //$scope.cambios = val[0];
                  switch (val[1]) {
                    case 1:
                      $scope.cambios = {"nombre":val[0].nombreMedio,"url":val[0].urlMedio,"idMedio":val[0].idMedio}
                      $scope.url= val[0].urlMedio;
                      $scope.nm = val[0].nombreMedio;
                      $scope.textoH4 = "Editando Medio";
                      $scope.actualizaMedio = function(cambiosMedio){
                        $scope.medio = {"idMedio":cambiosMedio.idMedio,"nombreMedio":cambiosMedio.nombre,"urlMedio":cambiosMedio.url };
                        console.log($scope.medio);
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':1,"medio":$scope.medio}).success(function(rMedio){
                          console.log(rMedio); 
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
                              success: function(ev) {       
                                console.log(ev);  
                                $modalInstance.close(ev);
                                }
                            });
                          }else
                            $modalInstance.close(rMedio);
                        }); 
                      };
                      break;
                    case 2: 
                      $scope.actualizaAutor = function(cambiosAutor){
                        console.log(cambiosAutor);
                        console.log(val[0].idMedio);
                        $scope.autor = {"idAutor":val[0].idAutor,"nombreAutor":cambiosAutor.nombre,"generoAutor":cambiosAutor.genero};
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':4,"autor":$scope.autor,"medio":val[0].idMedio}).success(function(rAutor){
                          console.log(rAutor);
                          $modalInstance.close(rAutor);
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

    siclaApp.controller('editAreaCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
          $scope.editAviable = true;
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(area){
            $scope.areas = area;
          }); 

          $scope.getTemas = function(area){
            $scope.nmArea = area.nombreArea;
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':8,'area':area.idArea}).success(function(respuestaTema){
              $scope.temas = respuestaTema;
            }); 
            if($scope.subtemas){
              delete ($scope.subtemas);
            };
          };

          $scope.getSubs = function(tema){
            $scope.nmTema = tema.nombreTema;
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':9,'tema':tema.idTema}).success(function(respuestaSubs){
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
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':10,"area":$scope.area}).success(function(rArea){
                            if(rArea==1){
                              $http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(rArea2){
                                respuesta = [];
                                respuesta.push(1,rArea2);
                                $modalInstance.close(respuesta);
                              });
                            }else{
                              console.log(rArea);
                            }

                        });
                      };                      
                      break;
                    case 2: 
                      $scope.actualizaTema = function(cambiosT){
                        tema = {"idTema":val[0].idTema,"nombre":cambiosT.nombre};
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':11,"tema":tema}).success(function(rTema){
                          if(rTema==1){
                            $http.post("data/consultas/consultasAdmin.php",{'sentencia':8,'area':val[0].idArea}).success(function(rTema2){
                              respuesta = [];
                              respuesta.push(2,rTema2);
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
                        $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':12,'subtema':subtema}).success(function(rSubtema){
                          if(rSubtema==1){
                            $http.post("data/consultas/consultasAdmin.php",{'sentencia':9,'tema':val[0].idTema}).success(function(rSubtema2){
                              respuesta = [];
                              respuesta.push(3,rSubtema2);
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
              $scope.modalBorrar = function(tipo,nombre,id){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/eliminarTemas.html',
                    controller: deleteModalCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                          datos = [];
                          datos.push(tipo,nombre,id);
                          return datos;
                      } 
                    }
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

              var deleteModalCtrl = function($scope,$modalInstance,val) {
                $scope.tipo = val[0];
                $scope.idDato = val[2];
                $scope.nm = val[1];

                $scope.borrarArea = function (){
                  // EL ID A BORRAR ESTA EN LA VARIABLE $scope.idDato
                  console.log(val);
                };
                $scope.borrarTema = function(){
                  console.log(val);
                };
                $scope.borrarSubtema = function(){
                  console.log(val);
                };


                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };
        }]);


/**************************************************** CONTROLADOR EDICION PROTAGONISTA  ***************************************/

    siclaApp.controller('editProtagonistaCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
          $scope.editAviable = true;
          $scope.protagonistas = {};
          $scope.cargos = {};

          $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(prot){
            $scope.protagonistas = prot;
          }); 

          $http.post("data/consultas/consultasAdmin.php",{'sentencia':13}).success(function(carg){
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
 
                  });
              };

              var modalBorrarCtrl = function($scope,$modalInstance,val) {
                
                switch(val[1]){
                  case 1:
                   $scope.tipo="Protagonista";
                   $scope.nm = val[0].nombreProtagonista;
                   $scope.idDato = val[0].idProtagonista;
                   $scope.borrarProtagonista = function (){
                    // EL ID A BORRAR ESTA EN LA VARIABLE $scope.idDato
                    console.log(val[0]);
                  };                 
                    break;
                  case 2:
                    $scope.idDato = val[0].idCP;
                    $scope.tipo="CP";
                    $scope.prot= val[2];
                    $scope.nm = val[0].nombreCargo;
                    $scope.borrarCP = function(){
                      console.log(val[0]);
                    };
                    break;
                  case 3:
                    $scope.idDato = val[0].idCargo;
                    $scope.tipo="Cargo";
                    $scope.nm = val[0].nombreCargo;
                    $scope.borrarCargo = function(){
                      console.log(val[0]);
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
              $scope.eliminaPaises = function(tipo,nombre,id){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/eliminarPaises.html',
                    controller: eliminaPaisesCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                          datos = [];
                          datos.push(tipo,nombre,id);
                          return datos;
                      } 
                    }
                  });

                  modalInstance.result.then(function(data) {

                  });
              };

              var eliminaPaisesCtrl = function($scope,$modalInstance,val) {
                $scope.tipo = val[0];
                $scope.idDato = val[2];
                $scope.nm = val[1];

                $scope.borrarPais = function (){
                  // EL ID A BORRAR ESTA EN LA VARIABLE $scope.idDato
                  console.log(val);
                };
                $scope.borrarEstado = function(){
                  console.log(val);
                };
                $scope.borrarMunicipio = function(){
                  console.log(val);
                };


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
              $scope.eliminaSeccion = function(tipo,nombre){
                  var modalInstance = $modal.open({
                    templateUrl: 'partials/admin/editar/eliminarSeccion.html',
                    controller: eliminaSeccionCtrl,
                    size: 'md',
                    resolve: {
                      val: function () {
                          datos = [];
                          datos.push(tipo,nombre);
                          return datos;
                      } 
                    }
                  });

                  modalInstance.result.then(function(data) {

                  });
              };

              var eliminaSeccionCtrl = function($scope,$modalInstance,val) {
                switch (val[1]){
                  case 1:
                    $scope.cambios = val[0];
                    $scope.tipo = 'Seccion';
                    $scope.nm = val[0].nombreSeccion;
                    $scope.idDato = val[0].idSeccion;
                    $scope.borrarSeccion = function (){
                      // EL ID A BORRAR ESTA EN LA VARIABLE $scope.idDato
                      console.log(val);
                    };
                    break;
                  case 2:
                    $scope.cambios= val[0];
                    $scope.tipo = 'Tipo de Nota';
                    $scope.nm = val[0].nombreTipoNota;
                    $scope.idDato = val[0].idTipoNota;                    
                    $scope.borrarTipoNota = function(){
                      console.log(val);
                    };
                    break;
                }
                $scope.cancel = function () {
                  $modalInstance.close();
                }; 
              };

        }]);