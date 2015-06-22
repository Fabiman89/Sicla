'use strict';

app.factory('localData', ['$http', '$q', function($http, $q) 
{
	var servicio = {};
		var sec = [],
			area = [],
			tema = [],
			sbma = [],
			pais = [],
			esta = [],
			muni = [],
			medio = [],
			autor = [],
			prota = [],
			cargo = [],
			cargos = [],		
			tpNota = [],
			autores = [];
		var refresh = false;
		
		if (!refresh)
		{
			refresh = true;
			setInterval(function() 
			{
				servicio.refreshSubtemas();
				servicio.refreshTemas();
				servicio.refreshAreas();
				servicio.refreshCargo();
				servicio.refreshMedios();
				servicio.refreshAutores();
				servicio.refreshTipoNotas();
				servicio.refreshProtagonistas();
				servicio.refreshMunicipios();
				servicio.refreshEstados();
				servicio.refreshPaises();
				servicio.refreshSecciones();
			}, 1200000);
		}
		
		servicio.refreshSecciones = function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':4}).success(function(dataSecciones)
			{
				sec = dataSecciones;
				sync.resolve(sec);
			});
			return sync.promise;
		};
		
		servicio.refreshPaises = function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(dataPais)
			{
				pais = dataPais;
				sync.resolve(pais);
			});
			return sync.promise;
		};
		
		servicio.refreshEstados= function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':24}).success(function(dataEstados)
			{
				esta = dataEstados;
				sync.resolve(esta);
			});		
			return sync.promise;
		};
		
		servicio.refreshMunicipios = function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':25}).success(function(dataMunicipio)
			{
				muni = dataMunicipio;
				sync.resolve(muni);
			});
			return sync.promise;
		};
		
		servicio.refreshProtagonistas = function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(dataProtagonista)
			{
				prota = dataProtagonista;
				sync.resolve(prota);
			});
			return sync.promise;
		};
		servicio.refreshTipoNotas = function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(data)
			{
				tpNota = data;
				sync.resolve(tpNota);	
			});
			return sync.promise;
		};
		
		servicio.refreshSubtemas = function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':23}).success(function(dataSubtema)
			{
				sbma = dataSubtema;
				sync.resolve(sbma);	
			});
			return sync.promise;
		};
		
		servicio.updateSubtema = function(subtema) 
		{
			var sync = $q.defer();
			$http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':12,'subtema':subtema}).success(function(data){
				servicio.refreshSubtemas().then(function() 
				{
					sync.resolve(data);
				});
			});
			return sync.promise;
		};
		
		servicio.refreshTemas = function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':22}).success(function(dataTema)
			{
				tema = dataTema;
				sync.resolve(tema);
			});	
			return sync.promise;
		};
				
		servicio.updateTema = function(tema) 
		{
			var sync = $q.defer();
			$http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':11,"tema":tema}).success(function(data){
				servicio.refreshTemas().then(function() 
				{
					sync.resolve(data);
				});			
			});
			return sync.promise;
		};
			
		servicio.refreshAreas = function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(dataArea)
			{				
				area = dataArea;
				sync.resolve(area);
			});
			return sync.promise;
		};
		
		servicio.updateArea = function(area) 
		{
			var sync = $q.defer();
			$http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':10,"area":area}).success(function(data){
				if (data == 1)
					servicio.refreshAreas().then(function(data1) 
					{
						var aux = [1,data1];
						sync.resolve(aux);
					});
				else
				{
					var aux = [0,data];
					sync.resolve(aux);
				}		
			});
			return sync.promise;
		};
			
		servicio.updateAutor = function(autor) 
		{
			var sync = $q.defer();
			$http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':4,"autor":autor}).success(function(data){			
				sync.resolve(data);
			});
			return sync.promise;
		};
			
		servicio.updateMedio = function(medio) 
		{
			var sync = $q.defer();
			$http.post("data/actualizar/actualizacionAdmin.php",{'sentencia':1,"medio":medio}).success(function(data){
				sync.resolve(data);			
			});
			return sync.promise;
		};
			
		servicio.insertMunicipio = function(municipio) 
		{
			var sync = $q.defer(),
				i, auxMn = [];
			$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':14,'municipio':municipio}).success(function(data) 
			{
				muni = data;
				for(i=0; i< muni.length; i++)
					if(muni[i].idEstado == municipio.estado.idEstado)
						auxMn.push(muni[i]);
				sync.resolve(auxMn);
			});
			return sync.promise;
		};
			
		servicio.insertEstado = function(estado) 
		{
			var sync = $q.defer(),
				i, auxEs = [];
			$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':13 ,'estado':estado}).success(function(data) 
			{
				esta = data;
				for(i=0; i<esta.length; i++)
					if(esta[i].idPais == estado.pais.idPais)
				 		auxEs.push(esta[i]);
				 sync.resolve(auxEs);			
			});
			return sync.promise;
		};
			
		servicio.insertPais = function(np) 
		{
			var sync = $q.defer();
			$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':12,'nombre':np.nombre}).success(function(data) 
			{	
				pais = data;
				sync.resolve(pais);
			});
			return sync.promise;
		};
			
		servicio.insertSubtema = function(sb) 
		{
			var sync = $q.defer();
			$http.post('data/inserciones/insercionesAdmin.php',{'sentencia':11,'subtema':sb}).success(function(data) 
			{
				var i, auxSb = [];
				sbma = data;
				for (i=0; i<sbma.length; i++)
					if (sb.tema.idTema == sbma[i].idTema)
						auxSb.push(sbma[i]);
				sync.resolve(auxSb);
			});
			return sync.promise;
		};	
			
		servicio.insertTema = function(temn) 
		{
			var sync = $q.defer(),
				auxTm = [],i;
			$http.post('data/inserciones/insercionesAdmin.php',{'sentencia':10,'datos':temn}).success(function(data) 
			{
				tema = data;
				for(i=0; i<tema.length; i++)
					if(tema[i].idArea == temn.area.idArea)
						auxTm.push(tema[i]);
				sync.resolve(auxTm);
			});
			return sync.promise;
		};
			
		servicio.insertArea = function(arn) 
		{
			var sync = $q.defer();
			$http.post('data/inserciones/insercionesAdmin.php',{'sentencia':9,'nombre':arn.nombre}).success(function(data) 
			{
				area = data;
				sync.resolve(area);
			});
			return sync.promise;
		};
		
		servicio.addCargo2Prot = function(prot, car) 
		{
			var sync = $q.defer();
			$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':8,prot:prot,car:car}).success(function(data)
			{
				var i, auxCg = [],
					id = prot.idProtagonista;
				cargo = data;
				for(i=0; i<cargo.length; i++)
					if(cargo[i].idProtagonista == id)
						auxCg.push(cargo[i]);
				sync.resolve(auxCg);
			});
			return sync.promise;
		};
			
		servicio.insertCargo = function(carn) 
		{
			var sync = $q.defer();
			$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':7,'cargo':carn}).success(function(data)
			{
				var i, auxCg = [],
					id = carn.prot.idProtagonista;
				cargo = data;
				for(i=0; i<cargo.length; i++)
					if(cargo[i].idProtagonista == id)
						auxCg.push(cargo[i]);
				sync.resolve(auxCg);
			});
			return sync.promise;
		};
			
		servicio.refreshCargo = function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':13}).success(function(dataCargo)
			{
				cargo = dataCargo;						
				sync.resolve(cargo);
			});
			return sync.promise;
		};		
			
		servicio.insertProtagonista = function(protagonista) 
		{
			var sync = $q.defer();
			$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':6,'protagonista':protagonista}).success(function(data)
			{
				prota = data;
				servicio.refreshCargo().then(function() {
					sync.resolve(prota);
				});				
			});
			return sync.promise;
		};		
			
		servicio.insertSeccion = function(secn) 
		{
			var sync = $q.defer();
			$http.post('data/inserciones/insercionesAdmin.php',{'sentencia':5,'nombre':secn.nombre}).success(function(data) 
			{
				sec = data;
				sync.resolve(sec);
			});
			return sync.promise;
		};
		
		servicio.insertTipoNota = function(tpn) 
		{
			var sync = $q.defer();
			$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':4,'nombre':tpn.nombre}).success(function(data)
			{
				tpNota = data;
				sync.resolve(tpNota);
			});
			return sync.promise;
		};					
			
		servicio.insertMedio = function(med) 
		{
			var sync = $q.defer();
			$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':2,'nombre':med.nombre,'url':med.url}).success(function(data) 
			{
				sync.resolve(data);		
			});
			return sync.promise;
		};
		
		servicio.refreshMedios = function() 
		{
			var sync = $q.defer();
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(data1) 
			{
				medio = data1;
				sync.resolve(medio);
			});
			return sync.promise;
		};
		
		servicio.deleteMedio = function(medio) 
		{
			var sync = $q.defer();
			$http.post("data/borrar/deleteAdmin.php",{'sentencia':1,"medio":medio}).success(function(data){
				if (data == 1)
					servicio.refreshMedios().then(function(data1) 
					{
						var aux = [1,data1];
						sync.resolve(aux);
					});
				else
				{
					var aux = [0,data];
					sync.resolve(aux);
				}
			});
			return sync.promise;
		};
		
		servicio.getPais = function() 
		{
			var sync = $q.defer();
			if(pais.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':10}).success(function(dataPais)
				{
					pais = dataPais;
					sync.resolve(pais);
				});
			}
			else
				sync.resolve(pais);
			return sync.promise;
		};
		
		servicio.getEstado = function(id) 
		{
			var sync = $q.defer(),
				auxEst = [], i;
			if(esta.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':24}).success(function(dataEstados)
				{
					esta = dataEstados;
					for(i=0; i<esta.length; i++)
						if(esta[i].idPais == id)
							auxEst.push(esta[i]);
					sync.resolve(auxEst);
				});
			}
			else 
			{
				for(i=0; i<esta.length; i++)
					if(esta[i].idPais == id)
						auxEst.push(esta[i]);
				sync.resolve(auxEst);
			}
			return sync.promise;
		};
	
		servicio.getAllEstados = function()
		{
			var sync = $q.defer();
			if(esta.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':24}).success(function(dataEstados)
				{
					esta = dataEstados;				
					sync.resolve(esta);
				});
			}
			else
				sync.resolve(esta);
			return sync.promise;
		};
		
		servicio.getMunicipio = function(id) 
		{
			var sync = $q.defer(),
				auxMun = [], i;
			if (muni.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':25}).success(function(dataMunicipio)
				{
					muni = dataMunicipio;
					for(i=0; i<muni.length; i++)
						if(muni[i].idEstado == id)
							auxMun.push(muni[i]);
					sync.resolve(auxMun);
				});
			}
			else 
			{
				for(i=0; i<muni.length; i++)
					if(muni[i].idEstado == id)
						auxMun.push(muni[i]);
				sync.resolve(auxMun);
			}
			return sync.promise;
		};
	
		servicio.getAllMunicipios = function()
		{
			var sync = $q.defer();
			if(muni.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':25}).success(function(dataMunicipio)
				{
					muni = dataMunicipio;				
					sync.resolve(muni);
				});
			}
			else
				sync.resolve(muni);
			return sync.promise;
		};
			
		servicio.getSeccion = function() 
		{
			var sync = $q.defer();
			if(sec.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':4}).success(function(dataSecciones)
				{
					sec = dataSecciones;
					sync.resolve(sec);
				});
			}
			else
				sync.resolve(sec);
			return sync.promise;
		};
			
		servicio.getTipoNota = function() 
		{
			var sync = $q.defer();
			if(tpNota.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':1}).success(function(data)
				{
					tpNota = data;
					sync.resolve(tpNota);	
				});
			}
			else
				sync.resolve(tpNota);	
			return sync.promise;
		};
		
		servicio.getProtagonista = function() 
		{
			var sync = $q.defer();
			if(prota.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':5}).success(function(dataProtagonista)
				{
					prota = dataProtagonista;
					sync.resolve(prota);
				});
			}
			else
				sync.resolve(prota);
			return sync.promise;
		};
		
		servicio.getCargo = function(id) 
		{
			var sync = $q.defer(),
				auxCg = [], i;
			if(cargo.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':13}).success(function(dataCargo)
				{
					cargo = dataCargo;
					for(i=0; i<cargo.length; i++)
						if(cargo[i].idProtagonista == id)
							auxCg.push(cargo[i]);
					sync.resolve(auxCg);
				});
			}	
			else 
			{
				for(i=0; i<cargo.length; i++)
					if(cargo[i].idProtagonista == id)
						auxCg.push(cargo[i]);
				sync.resolve(auxCg);
			}
			return sync.promise;
		};
		
		servicio.getAllCargos = function() 
		{
			var sync = $q.defer();			
			if(cargos.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':13}).success(function(data)
				{
					var i, auxCG = [];
					for (i=0; i<data.length; i++)					
						if (auxCG.indexOf(data[i]["nombreCargo"]) == -1)
						{
							auxCG.push(data[i]["nombreCargo"]);				
							cargos.push({idCargo :data[i]["idCargo"], nombreCargo :data[i]["nombreCargo"]});
						}
					sync.resolve(cargos);
				});
			}
			else 
				sync.resolve(cargos);		
			return sync.promise;
		};
			
		servicio.getMedio = function() 
		{
			var sync = $q.defer();
			if(medio.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':2}).success(function(dataMedios)
				{
					medio = dataMedios;
					sync.resolve(medio);
				});
			}
			else 
				sync.resolve(medio);
			return sync.promise;		
		};
		
		servicio.getAutor = function(id) 
		{
			var sync = $q.defer(),
				auxAu = [], i;
			if(autor.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':21}).success(function(dataAutores)
				{
					autor = dataAutores;
					for(i=0; i<autor.length; i++)
						if(autor[i].idMedio == id)
							auxAu.push(autor[i]);
					sync.resolve(auxAu);
				});
			}
			else 
			{
				for(i=0; i<autor.length; i++)
					if(autor[i].idMedio == id)
						auxAu.push(autor[i]);
				sync.resolve(auxAu);
			}
			return sync.promise;
		};
		
		servicio.refreshAutores = function() 
		{
			var sync = $q.defer();			
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':21}).success(function(dataAutores)
			{
				autor = dataAutores;			
				sync.resolve(autor);
			});
			return sync.promise;
		};
		
		servicio.deleteAutor = function(autor) 
		{
			var sync = $q.defer();
			$http.post("data/borrar/deleteAdmin.php",{'sentencia':3,"autor":autor}).success(function(data){
				if(data == 1)
					servicio.refreshAutores().then(function() 
					{
						servicio.getAutor(autor.idMedio).then(function(data1) 
						{
							var aux = [1,data1];
							sync.resolve(aux);
						});					
					});					
				else 
				{
					var aux = [0,data];
					sync.resolve(aux);	
				}
			});
			return sync.promise;
		};
	
		servicio.getAllAutores = function()
		{
			var sync = $q.defer();
			if(autores.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':21}).success(function(dataAutores)
				{
					var i, auxAU = [];
					for (i=0; i<dataAutores.length; i++)
						if (auxAU.indexOf(dataAutores[i]["nombreAutor"]) == -1)
						{
							auxAU.push(dataAutores[i]["nombreAutor"]);
							autores.push({
								idAutor : dataAutores[i]["idAutor"],
								nombreAutor : dataAutores[i]["nombreAutor"]
							});
						}				
					sync.resolve(autores);
				});
			}
			else
				sync.resolve(autores);
			return sync.promise;
		};
		
		servicio.insertAutor = function(aun) 
		{
			var sync = $q.defer();
			$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':3,'autor':aun}).success(function(data) 
			{
				autor = data;		
				servicio.getAutor(aun.medio.idMedio).then(function(data1) 
				{
					sync.resolve(data1);
				});
			});
			return sync.promise;
		};
		
		servicio.addAutor2Medio = function(aun) 
		{
			var sync = $q.defer();
			$http.post("data/inserciones/insercionesAdmin.php",{'sentencia':3,'autor2':aun}).success(function(data) 
			{
				autor = data;
				servicio.getAutor(aun.medio.idMedio).then(function(data1) 
				{
					sync.resolve(data1);
				});
			});
			return sync.promise;
		};
		
		servicio.getArea = function() 
		{
			var sync = $q.defer();
			if(area.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':7}).success(function(dataArea)
				{				
					area = dataArea;
					sync.resolve(area);
				});
			}
			else 
				sync.resolve(area);		
			return sync.promise;
		};
		
		servicio.getTema = function(id) 
		{
			var sync = $q.defer(),
				auxTema = [], i;
			if (tema.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':22}).success(function(dataTema)
				{
					tema = dataTema;
					for(i = 0; i<tema.length; i++)
						if(tema[i].idArea == id)
							auxTema.push(tema[i]);
					sync.resolve(auxTema);
				});	
			}
			else 
			{
				for(i = 0; i<tema.length; i++)
					if(tema[i].idArea == id)
						auxTema.push(tema[i]);
				sync.resolve(auxTema);	
			}
			return sync.promise;
		};
	
		servicio.getAllTemas = function()
		{
			var sync = $q.defer();
			if(tema.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':22}).success(function(dataTema)
				{
					tema = dataTema;				
					sync.resolve(tema);
				});	
			}
			else
				sync.resolve(tema);
			return sync.promise;
		};
		
		servicio.getSubtema = function(id) 
		{
			var sync = $q.defer(),
				auxsbTema = [], i;
			if(sbma.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':23}).success(function(dataSubtema)
				{
					sbma = dataSubtema;
					for(i = 0; i<sbma.length; i++)
						if(sbma[i].idTema == id)
							auxsbTema.push(sbma[i]);
					sync.resolve(auxsbTema);	
				});
			}
			else 
			{
				for(i = 0; i<sbma.length; i++)
					if(sbma[i].idTema == id)
						auxsbTema.push(sbma[i]);
				sync.resolve(auxsbTema);	
			}
			return sync.promise;
		};
	
		servicio.getAllSubtemas = function()
		{
			var sync = $q.defer();
			if(sbma.length == 0)
			{
				$http.post("data/consultas/consultasAdmin.php",{'sentencia':23}).success(function(dataSubtema)
				{
					sbma = dataSubtema;				
					sync.resolve(sbma);	
				});
			}
			else
				sync.resolve(sbma);
			return sync.promise;
		};
		
		return servicio;	
}]);