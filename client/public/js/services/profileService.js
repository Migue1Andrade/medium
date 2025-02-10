// eslint-disable-next-line no-undef
myApp.service('ProfileService', ['$http', function($http) {
	const baseUrl = 'http://localhost:3000/api';
	const token = localStorage.getItem('authToken');

	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};

	this.getUserProfile = (userId) => {
		return $http.get(`${baseUrl}/user/${userId}`, config);
	};

	this.updateUserProfile = (userId, data) => {
		return $http.put(`${baseUrl}/update/user/${userId}`, data, config);
	};

	this.getUserPosts = (userId) =>{
		return $http.get(`${baseUrl}/post/${userId}`);
	};
}]);
