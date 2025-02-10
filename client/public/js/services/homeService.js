myApp.service('PostService', ['$http', '$window', '$uibModal', function($http, $window, $uibModal) {
	const baseUrl = 'http://localhost:3000/api';
	const token = localStorage.getItem('authToken');
	const userId = localStorage.getItem('userId');

	const config = {
		headers: { 'Authorization': `Bearer ${token}` }
	};

	this.getPosts = () => $http.get(`${baseUrl}/post`);

	this.likePost = (postId) => {
		if (!userId) return Promise.reject('Usuário não autenticado');
		return $http.post(`${baseUrl}/user/like/${userId}/${postId}`, {}, config);
	};

	this.removePost = (postId) => {
		if (!userId) return Promise.reject('Usuário não autenticado');
		return $http.delete(`${baseUrl}/remove/post/${userId}/${postId}`, config);
	};

	this.openPostModal = () => {
		return $uibModal.open({
			size: 'lg',
			backdrop: 'static',
			keyboard: false,
			templateUrl: '../../views/postModal.html',
			controller: 'PostModalController'
		}).result;
	};

	this.openEditModal = () => {
		return $uibModal.open({
			size: 'lg',
			backdrop: 'static',
			keyboard: false,
			templateUrl: '../../views/editPostModal.html',
			controller: 'EditPostModalController'
		}).result;
	};

	this.logout = () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('userId');
		$window.location.href = '/#/login';
	};
}]);
