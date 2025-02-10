myApp.controller('PostModalController', ['$scope', '$uibModalInstance', 'PostService',
	function ($scope, $uibModalInstance, PostService) {
		const user_id = localStorage.getItem('userId');

		$scope.newPost = {
			title: '',
			text: '',
			summary: '',
			postImg: '',
		};

		$scope.imageUrlInput = false;

		$scope.cancel = function () {
			$scope.newPost = {};
			$uibModalInstance.dismiss('cancel');
		};

		$scope.toggleInput = function () {
			$scope.imageUrlInput = !$scope.imageUrlInput;
		};

		$scope.register = function () {
			if (!user_id) return;

			PostService.createPost(user_id, $scope.newPost)
				.then(function (response) {
					console.log('Postagem criada com sucesso:', response.data);
					alert('Postagem criada com sucesso!');
					$uibModalInstance.close();
				})
				.catch(function (error) {
					console.error('Erro ao criar postagem:', error.data);
					alert('Erro ao criar postagem. Tente novamente.');
				});
		};
	}
]);
