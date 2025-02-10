myApp.service('PageService', ['$http', function($http) {
	const baseUrl = 'http://localhost:3000/api';
	const token = localStorage.getItem('authToken');

	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};

	this.getPostWithUser = function(postId) {
		return $http.get(`${baseUrl}/send/post/include/user/${postId}`, config);
	};

	this.likePost = function(postId, userId) {
		return $http.get(`${baseUrl}/get/likes/${postId}/${userId}`, config);
	};
}]);
