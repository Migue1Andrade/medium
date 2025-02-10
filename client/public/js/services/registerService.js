// eslint-disable-next-line no-undef
myApp.service('RegisterService', ['$http', function($http) {
	const baseUrl = 'http://localhost:3000/api';

	this.registerUser = function(userData) {
		return $http.post(`${baseUrl}/user/create`, userData);
	};
}]);
