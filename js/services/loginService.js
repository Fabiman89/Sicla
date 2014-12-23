'use strict';

app.factory('loginService',function($http,$location,sessionService){
	return{
		login:function(data,scope){
			console.log(data);
			var $promise=$http.post('data/user.php',data);
			$promise.then(function(msg){
				var uid = msg.data;			

				if(uid){
					//sessionService.set('uid',uid);
					//$location.path('/home');
					window.location.assign("admin.html");
				}
				else {
					scope.msgError='Información Incorrecta';
					scope.msgStyle='alert alert-danger'
					$location.path('/login');
				}
			});
		},
		logout:function(){
			sessionService.destroy('uid');
			$location.path('/login');
		},
		islogged:function(){
			var $checkSessionServer = $http.post('data/check_session.php');
			return $checkSessionServer;
		}
	}
});