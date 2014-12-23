'use strict';

app.controller('loginCtrl',['$scope','loginService',function($scope,loginService){
		$scope.msgError="";
		$scope.msgStyle="";

	$scope.logIn = function(user){
		loginService.login(user,$scope); //llamando al servicio de login
	}
}]);