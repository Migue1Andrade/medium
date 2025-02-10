myApp.service('EditPostService', ['$http', function($http) {
	const baseUrl = 'http://localhost:3000/api';
	const token = localStorage.getItem('authToken');

	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};

	this.getPost = function(postId) {
		return $http.get(`${baseUrl}/send/post/${postId}`, config);
	};

	this.updatePost = function(postId, updatedPost) {
		return $http.put(`${baseUrl}/update/post/${postId}`, updatedPost, config);
	};
}]);
