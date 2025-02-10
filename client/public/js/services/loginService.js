myApp.service('LoginService', ['$http', function($http) {
	const baseUrl = 'http://localhost:3000/api';

	this.login = (userData) => {
		return $http.post(`${baseUrl}/login`, userData);
	};
}]);
