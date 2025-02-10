myApp.service('PostService', ['$http', '$window', '$uibModal', function($http, $window, $uibModal) {
	const baseUrl = 'http://localhost:3000/api';
	const token = localStorage.getItem('authToken');
	const userId = localStorage.getItem('userId');

	const config = {
		headers: { 'Authorization': `Bearer ${token}` }
	};

	this.getPosts = function() {
		return $http.get(`${baseUrl}/post`);
	};

	this.likePost = function(postId) {
		if (!userId) return Promise.reject('Usuário não autenticado');
		return $http.post(`${baseUrl}/user/like/${userId}/${postId}`, {}, config);
	};

	this.removePost = function(postId) {
		if (!userId) return Promise.reject('Usuário não autenticado');
		return $http.delete(`${baseUrl}/remove/post/${userId}/${postId}`, config);
	};

	this.openPostModal = function() {
		return $uibModal.open({
			size: 'lg',
			backdrop: 'static',
			keyboard: false,
			templateUrl: '../../views/postModal.html',
			controller: 'PostModalController'
		}).result;
	};

	this.openEditModal = function() {
		return $uibModal.open({
			size: 'lg',
			backdrop: 'static',
			keyboard: false,
			templateUrl: '../../views/editPostModal.html',
			controller: 'EditPostModalController'
		}).result;
	};

	this.logout = function() {
		localStorage.removeItem('authToken');
		localStorage.removeItem('userId');
		$window.location.href = '/#/login';
	};
}]);
