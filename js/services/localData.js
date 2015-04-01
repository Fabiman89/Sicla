'use strict';

siclaApp.factory('localData', ['$http', '$q', function($http, $q) 
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
		tpNota = [];
		
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
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':11}).success(function(dataEstados)
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
	
	servicio.getMunicipio = function(id) 
	{
		var sync = $q.defer(),
			auxMun = [], i;
		if (muni.length == 0)
		{
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':12}).success(function(dataMunicipio)
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
				sync.resolve(dataProtagonista);
			});
		}
		else
			sync.resolve(dataProtagonista);
		return sync.promise;
	};
	
	servicio.getCargo = function(id) 
	{
		var sync = $q.defer(),
			auxCg = [], i;
		if(cargo.length == 0)
		{
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':6}).success(function(dataCargo)
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
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':3}).success(function(dataAutores)
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
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':8}).success(function(dataTema)
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
	
	servicio.getSubtema = function(id) 
	{
		var sync = $q.defer(),
			auxsbTema = [], i;
		if(sbma.length == 0)
		{
			$http.post("data/consultas/consultasAdmin.php",{'sentencia':9}).success(function(dataSubtema)
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
	
	return servicio;	
}]);