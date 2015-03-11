/* *********************************************************************************/
// *****    CONTROLADOR PARA EDITAR NOTA
/* *********************************************************************************/

    siclaApp.controller('EdicionNotasCtrl',['$scope','$http','$routeParams','$modal','$filter', '$route','Request',
      function($scope,$http,$routeParams,$modal,$filter, $route,$window,Request){
    $http.post("data/consultas/consultasAdmin.php",{'sentencia':16,'id':$routeParams.idNota}).success(function(dataEdicion){
        var i, j, auxj;
        var con1=false, con2=false, con3=false, con4 = false, con5 = false, con6=0, con7=0, con8=0;
        console.log(dataEdicion);
        $scope.imgActual = dataEdicion[0].imagenNota;
        $scope.nota = {};
        $scope.master = {};
        $scope.auxiliarST = [0];
        $scope.auxiliarPT = [0];
        $scope.nota.pagina = parseInt(dataEdicion[0].paginaNota);
        $scope.nota.num = parseInt(dataEdicion[0].numeroPeriodico);
        $scope.nota.otros = [];    
        $scope.nota.otrosSub = [];
        $scope.opcionesOtroTema = [];
        $scope.opcionesOtroSub = [];        
        $scope.opcionesMedios = {};
        $scope.opcionesMunicipios = {};
        $scope.opcionesAutores = {};
        $scope.opcionesTema = {};
        $scope.opcionesArea = {};
        $scope.nota.otrosPT = [];
        $scope.nota.fecha = dataEdicion[0].fecha;
        $scope.opcionesNota={};
        $scope.nota.posneg = dataEdicion[0].Clasificacion;
        $scope.opcionesPT = [];
        $scope.opcionesEstado=[];
        $scope.nota.otrosCargo = [];
        $scope.nota.otraArea = [];
        $scope.nota.otroTema = [];
        $scope.nota.otroSubtema = [];        
        $scope.opcionesSeccion = {};
        $scope.opcionesPais = {};
        $scope.datosNota = {};
        $scope.nota.tipo=  {};
        $scope.nota.url=dataEdicion[0].urlNota;
        $scope.nota.titulo=dataEdicion[0].tituloNota;
        $scope.nota.texto=dataEdicion[0].texto;
        $scope.nota.sintesis=dataEdicion[0].sintesis;
        $scope.nota.idNota = $routeParams.idNota;
        $scope.alerta = {"tipo":"","mensaje":""};
        $scope.permitir = false;

/**** SECCIONES    ***/
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':4}).success(function(dataSecciones){
          $scope.opcionesSeccion = dataSecciones;
          console.log($scope.opcionesSeccion);
          for(i=0;i<$scope.opcionesSeccion.length;i++){
            if($scope.opcionesSeccion[i].idSeccion == dataEdicion[0].idSeccion){
              $scope.nota.seccion = $scope.opcionesSeccion[i]; 
            }
          }
        });

/**** PAIS    ***/
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(dataPais){
          $scope.opcionesPais = dataPais;
          console.log($scope.opcionesPais);
          for(i=0;i<$scope.opcionesPais.length;i++){
            if($scope.opcionesPais[i].idPais == dataEdicion[0].idPais){
              $scope.nota.pais = $scope.opcionesPais[i]; 
            }
          }          
        });

/**** GET CARGO    ***/
        $scope.getCargo = function(id){
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':6,'protagonista':id}).success(function(data){
            console.log(data);
            $scope.opcionesCargo = data;
            $('select[ng-model="nota.cargo"] option[value=""]').text("Seleccione"); 
            if (!con1)
            {
            	for(i=0;i<$scope.opcionesCargo.length;i++)
              		if($scope.opcionesCargo[i].idCP == dataEdicion[0].idCP)
                		$scope.nota.cargo = $scope.opcionesCargo[i];
              	con1 = true;
            }          
          });
         };

/**** GET SUBTEMA    ***/
        $scope.getSubtema = function(id){
         $http.post("data/consultas/consultasAdmin.php",{'sentencia':9,'tema':id}).success(function(data){
          console.log(data);
          $scope.opcionesSubtema = data;  
          $('select[ng-model="nota.subtema"] option[value=""]').text("Seleccione");
          if(!con2)
          {
          		for(i=0;i<$scope.opcionesSubtema.length;i++)
                  if($scope.opcionesSubtema[i].idSubtema == dataEdicion[1][0].idSubtema)
                  {
                   	$scope.nota.subtema = $scope.opcionesSubtema[i];
                    console.log("valor subtema");
                  }
                 con2 = true;
           }          
         });
         };
         
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

/**** GET AUTOR    ***/
        $scope.getAutor=function(medio){
          console.log(medio);
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':3,'id':medio}).success(
          function(data2){
          $('select[ng-model="nota.autor"] option[value=""]').text("Seleccione");
              $scope.opcionesAutores = data2;
              console.log($scope.opcionesAutores);
              if(!con3)
              {
              		for(i=0;i<$scope.opcionesAutores.length;i++)
                		if($scope.opcionesAutores[i].idCE == dataEdicion[0].idCE)
                  			$scope.nota.autor = $scope.opcionesAutores[i];                
                  	con3 = true;
              }
           });
          };

/**** GET TEMA Y SUBTEMA   ***/
        $scope.getSubtema(dataEdicion[1][0].idTema);

        $scope.getTema = function(area) {
         $http.post("data/consultas/consultasAdmin.php",{'sentencia':8,'area':area}).success(function(data) {
            console.log(data);
            $scope.opcionesTema = data;
            if(!con4)
            {
            		for(i=0;i<$scope.opcionesTema.length;i++)
                    	if($scope.opcionesTema[i].idTema == dataEdicion[1][0].idTema)
                    	{
                     		$scope.nota.tema = $scope.opcionesTema[i];
                      		console.log("valor tema");
                    	}
                    con4=true;
			}
          });
         };

/**** MUNICIPIO    ***/
        $scope.getMunicipio = function(estado){
          console.log(estado);
          $http.post("data/consultas/consultasAdmin.php",{'sentencia':12,'estado':estado}).success(
                function(dataMunicipio){
                    $scope.opcionesMunicipios=angular.copy($scope.master);
                    $scope.opcionesMunicipios = dataMunicipio;
                    console.log(dataMunicipio);
                    if(!con5)
                    {
                    	for(i=0;i<$scope.opcionesMunicipios.length;i++)
                            if($scope.opcionesMunicipios[i].idMunicipio == dataEdicion[0].idMunicipio)
                            {
                             	$scope.nota.municipio = $scope.opcionesMunicipios[i];
                              	console.log("valor muun");
                            }
						con5 = true;
					}                    
                });
           };

/**** AUTO GETS   ***/
        $scope.getMunicipio(dataEdicion[0].idEstado);
        $scope.getTema(dataEdicion[1][0].idArea);
        $scope.getCargo(dataEdicion[0].idProtagonista);
        $scope.getAutor(dataEdicion[0].idMedio);               

/**** MEDIOS    ***/        
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(dataMedios){
           // $('select[ng-model="nota.medio"] option[value=""]').text("Seleccione");
            $scope.opcionesMedios = dataMedios;
            console.log($scope.opcionesMedios);
            for(i=0;i<$scope.opcionesMedios.length;i++){
              if($scope.opcionesMedios[i].idMedio == dataEdicion[0].idMedio){
                $scope.nota.medio = $scope.opcionesMedios[i];

              }
            }            
/**** TIPO NOTA    ***/            
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(dataTipoNota){
          $scope.opcionesNota = dataTipoNota;  
          console.log($scope.opcionesNota);
          for(i=0;i<$scope.opcionesNota.length;i++){
            if($scope.opcionesNota[i].idTipoNota == dataEdicion[0].idTipoNota){
             $scope.nota.tipo = $scope.opcionesNota[i];
              
            }
          }
          
          $scope.getOTema = function(area, index) {
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':8,'area':area['idArea']}).success(function(data) {
              console.log(area);
              $scope.opcionesOtroTema[index] = data;
              j = index + 1;
              if(dataEdicion[1].length > 1 && dataEdicion[1].length > j && con6 <= dataEdicion[1].length)
              {
                for (i=0; i<data.length; i++)
                  if(data[i].idTema == dataEdicion[1][j].idTema)
                    $scope.nota.otroTema[index] = data[i];
                con6++;
			  }
            });
            
          };
          
          //Opciones para Otros Subtemas
                $scope.getSub = function(tema,index) {
                console.log(tema);
                  $http.post("data/consultas/consultasAdmin.php",{'sentencia':9,'tema':tema['idTema']}).success(function(data){
                      $scope.opcionesOtroSub[index] = data;   
                      j = index + 1;
                      if(dataEdicion[1].length > 1 && dataEdicion[1].length > j && con7 <= dataEdicion[1].length)
                      {
                        for (i=0; i<data.length; i++)
                          if(data[i].idSubtema == dataEdicion[1][j].idSubtema)
                            $scope.nota.otroSubtema[index] = data[i];  
                        con7++;
                      }
                  });
                };            

/**** AREAS    ***/        
         $http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(dataAreas) {
            $scope.opcionesArea = dataAreas;
            console.log(dataAreas);
            for(i=0;i<$scope.opcionesArea.length;i++){
              if($scope.opcionesArea[i].idArea == dataEdicion[1][0].idArea){
               $scope.nota.area = $scope.opcionesArea[i];
              }
            }
            
            if(dataEdicion[1].length > 1)
            {
              for (i = 1; i < dataEdicion[1].length; i++) 
              {
                auxj = i -1;
                if(i!=1)
                	$scope.auxiliarST.push(i);
                for(j=0; j<dataAreas.length; j++)
                  if (dataAreas[j].idArea == dataEdicion[1][i].idArea)
                    $scope.nota.otraArea[auxj] = dataAreas[j];
                $scope.getOTema(dataEdicion[1][i], auxj);
                $scope.getSub(dataEdicion[1][i], auxj);
              }
            }

/**** ESTADOS    ***/         
            $http.post("data/consultas/consultasAdmin.php",{'sentencia':11,'pais':dataEdicion[0].idPais}).success(function(dataEstados) {
                  $scope.opcionesEstado = dataEstados;
                  console.log($scope.opcionesEstado);
                  for(i=0;i<$scope.opcionesEstado.length;i++){
                          if($scope.opcionesEstado[i].idEstado == dataEdicion[0].idEstado){
                           $scope.nota.estado = $scope.opcionesEstado[i];
                            console.log("valor estado");
                          }
                        }
        //Opciones para Otros Cargos
            $scope.getoCar = function(Prot,index){
              $http.post("data/consultas/consultasAdmin.php",{'sentencia':6, "protagonista":Prot.idProtagonista}).success(function(data){
                  	$scope.opcionesPT[index]=data;
          			if(dataEdicion.length>2)
            			if (dataEdicion[2].length > index && con8 < dataEdicion[2].length)
            			{
              				for(i=0;i<data.length;i++)
                				if(data[i].idCP == dataEdicion[2][index].idCP)
                  					$scope.nota.otrosCargo[index] = data[i];
                  			con8++;
                  		}
              });
            };                                                             
                
            
            //Añade una nueva fila para otros protagonistas    
             $scope.masPT = function(){
                 var auxi = $scope.auxiliarPT.length;
                 $scope.auxiliarPT.push(auxi);                     
             };
             
             //Añade una nueva fila para otros temas    
             $scope.masST = function(){
                 var auxi = $scope.auxiliarST.length;
                 $scope.auxiliarST.push(auxi);                     
             };                 
                  
/**** PROTAGONISTA    ***/
        $http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(dataProtagonista){
            $scope.opcionesProtagonsita = dataProtagonista;
            console.log($scope.opcionesProtagonsita); 
            for(i=0;i<$scope.opcionesProtagonsita.length;i++){
              if($scope.opcionesProtagonsita[i].idProtagonista == dataEdicion[0].idProtagonista){
                  $scope.nota.protagonista = $scope.opcionesProtagonsita[i]; 
              }                        
            }
          
          if(dataEdicion.length == 3)
          {
            for (i=0; i<dataEdicion[2].length; i++)
            {
              j = i +1;
              if (i!=0)
              	$scope.auxiliarPT.push(j);
              for (j=0; j<dataProtagonista.length; j++)             
                if(dataProtagonista[j].idProtagonista == dataEdicion[2][i].idProtagonista)
                  $scope.nota.otrosPT[i] = dataProtagonista[j];
              $scope.getoCar(dataEdicion[2][i], i);
            }
          }           
                                         
            
/**** FORS    ***/

    /*----------------------------------------------Modal Vista Previa-----------------------------------------------*/ 


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

//  ---------------------------  MODAL Error / success     ----------*//  

        $scope.modalAlerta = function(R){
          var modalInstance = $modal.open({ 
            templateUrl: 'partials/admin/editar/alertaModal.html',
            controller: modalAlertaCtrl,
            size: 'md',
            resolve: {
              tipo : function() {
                return R;
              }       
           }
          });

          modalInstance.result.then(function(){
            window.location.reload();
          });
        };

        var modalAlertaCtrl = function($scope,$modalInstance, tipo){

          if(tipo==1){
            $scope.varClass = "Success";
            $scope.titulo = "Exito"
          }else{
            $scope.varClass = "danger";
            $scope.titulo = "Error "
          }
            $scope.cancel = function () {
              $modalInstance.close();
            };
        };


    $scope.vistaPrevia = function (nota){
      $scope.permitir = true;
      $scope.modalVista(nota);
    }




}); }); }); }); }); 
      });

              $scope.updateNota = function(nota){
                console.log(nota);
                $http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':9,'nota':nota}).success(function(respuesta){

                  if (document.getElementById("exampleInputFile").value != "")
                  {
                    var file = document.getElementById("exampleInputFile"), formData = new FormData();
                    formData.append("imagen", file.files[0]);
                    formData.append("nota",nota.idNota);
                    $.ajax({
                      url:'data/actualizar/actualizacionPortada.php',
                      type: 'POST',
                      data: formData,
                      processData: false,
                      contentType: false,
                      dataType: 'json',
                      success: function(ev) {       
                        console.log(ev);  
                      }
                    });
                  }
                  $scope.modalAlerta(respuesta);
                  if(respuesta==1){
                    
                   // 
                  }
                  
                }); 
              };
// Medios /
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

// Autores /
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

// Tipo de Nota/
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

// Secciones /
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
// Secciones /
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

// Protagonistas /
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
                  
        var protModalCtrl = function ($scope,$modalInstance,Request){
            Request.getAllCargos().then(function(){
                $scope.cargos = Request.checkAllCargos();
             });
                $scope.master = {};
              $scope.protagonista = {};
              $scope.updateProtagonista=function(protagonista){
              Request.insert_protagonista(protagonista).then(function(){
              var data = Request.checkProtagonista();
              $modalInstance.close(data);                           
          });
        };
        
        $scope.cancel = function () {
            $modalInstance.close();
          };
                      
          
        };         

//Cargos/
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

//Areas / 
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
        var areaModalCtrl = function ($scope,$modalInstance,Request){      
          $scope.master = {};
          $scope.updateArea=function(area){   
            Request.insert_area(area).then(function(){
              var data = Request.checkAreas();
              $modalInstance.close(data);        
            });         
          };
          $scope.cancel = function () {
            $modalInstance.close();
          }
        };


// Temas /
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
        var temaModalCtrl = function($scope,$modalInstance, notaArea,Request){
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
          Request.insert_tema(tema).then(function(){
            var data = Request.checkTemas();
            $modalInstance.close(data);       
          });
          };       
            
            $scope.cancel = function () {
              $modalInstance.close();
            };

        };


// Subtemas /
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
        var subtemaModalCtrl = function($scope,$modalInstance, notaOpc,Request){
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
              Request.insert_subtema(subtema).then(function(){
                var data = Request.checkSubtemas();
                console.log(data);
                $modalInstance.close(data);            
              });
            };
            $scope.cancel = function () {
              $modalInstance.close();
            };      
        };


// Paises/ 
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
        var paisModalCtrl = function($scope,$modalInstance, Request ){
            $scope.updatePais = function(pais) {
              Request.insert_pais(pais).then(function(){
                var data = Request.checkPais();
                $modalInstance.close(data);
              });
            }; 
          
        $scope.cancel = function () {
              $modalInstance.close();
            };
        };

// Estados /
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
        var estadoModalCtrl = function($scope,$modalInstance,notaPais,Request){
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
              Request.insert_estado(estado).then(function(){
                var data = Request.checkEstado();
                console.log(data);
                $modalInstance.close(data);
              });
              
        };
        $scope.cancel = function () {
          $modalInstance.close();
        };
              
        };

// Municipios /
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

        var municipioModalCtrl = function($scope,$modalInstance,notaOpc,Request){
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
          var data;
          Request.insert_Municipio(municipio).then(function(){
           data = Request.checkMunicipio();
           $modalInstance.close(data);
          });
        };
        
        $scope.cancel = function () {
          $modalInstance.close();
        };            
        };





      }]);