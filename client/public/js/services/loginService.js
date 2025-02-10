myApp.service('LoginService', ['$http', function($http) {
	const baseUrl = 'http://localhost:3000/api';

	this.login = function(userData) {
		return $http.post(`${baseUrl}/login`, userData);
	};
}]);
