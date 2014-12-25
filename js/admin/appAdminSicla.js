'use strict';

/* App Module */
//cuando loguea un admin, se utiliza una estructura nueva, por eso tenemos una variable de este tipo otra ves, es equivalente al app 


var siclaApp = angular.module('siclaApp', [
  'ngRoute',
  'ui.bootstrap'    
 // 'siclaAdminControllers',
 // 'siclaServices'
  //'siclaFilters'
]);

siclaApp.config(['$routeProvider',
  function ($routeProvider){
    $routeProvider.when('/reportes/todos', {
        templateUrl: 'partials/admin/reportes.html',
        controller: 'reportCtrl'
      }).when('/editar/areas&temas', {
        templateUrl: 'partials/admin/editar/editarArea.html',
        controller: 'editAreaCtrl'
      }).when('/Editar/Nota/:idNota', {
        templateUrl: 'partials/admin/editarNota.html',
        controller: 'EdicionNotasCtrl'
      }).when('/Buscar/Nota', {
        templateUrl: 'partials/admin/TodasLasNotas.html',
        controller: 'EncontrarNotasCtrl'
      }).when('/Editar/Notas', {
        templateUrl: 'partials/homeError.html',
        controller: ''
      }).when('/altas/nota', {
        templateUrl: 'partials/admin/altaNotas.html',
        controller: 'FormNotasCtrl'
    }).when('/altas/recientes', {
    	templateUrl: 'partials/admin/notasRecientes.html',
    	controller: 'TblRecientesCtrl'
    }).when('/editar/medios', {
    	templateUrl: 'partials/admin/editar/editarMedios.html',
    	controller: 'editMedioCtrl'
    }).when('/altas/administradores', {
        templateUrl: 'partials/admin/altaAdmin.tpl.html',
        controller: 'altaAdmin'
    }).when('/editar/protagonistas', {
        templateUrl: 'partials/admin/editar/editarProtagonista.html',
        controller: 'editProtagonistaCtrl'
    }).when('/editar/pais', {
        templateUrl: 'partials/admin/editar/editarPais.html',
        controller: 'editPaisCtrl'
    }).when('/editar/otros', {
        templateUrl: 'partials/admin/editar/editarSeccion.html',
        controller: 'editSeccionCtrl'
    }).otherwise({
        redirectTo: '/altas/nota'
      });
}]);
