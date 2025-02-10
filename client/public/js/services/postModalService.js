// eslint-disable-next-line no-undef
myApp.service('ModalPostService', ['$http', function($http) {
	const baseUrl = 'http://localhost:3000/api';
	const token = localStorage.getItem('authToken');

const config = {
	headers: { Authorization: `Bearer ${token}` }
};

	this.createPost = function(userId, postData) {
		return $http.post(`${baseUrl}/post/create/${userId}`, postData, config);
	};
}]);
