myApp.controller('EditPostModalController', ['$scope', '$uibModalInstance', 'EditPostService',
	function($scope, $uibModalInstance, EditPostService) {
		const postId = localStorage.getItem('postId');

		$scope.editPost = {
			title: '',
			text: '',
			summary: '',
			image: ''
		};

		$scope.editImage = false;
		$scope.imageUrlInput = false;

		$scope.toggleInput = function() {
			$scope.imageUrlInput = !$scope.imageUrlInput;
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
			localStorage.removeItem('postId');
		};

		EditPostService.getPost(postId)
			.then(function(response) {
				const post = response.data;
				$scope.editPost.title = post.title;
				$scope.editPost.text = post.text;
				$scope.editPost.summary = post.summary;
				$scope.editPost.image = post.post_img;
			})
			.catch(function(error) {
				console.error('Erro ao carregar os dados do post:', error);
			});

		$scope.sendUpdate = function() {
			const updatedPost = {
				title: $scope.editPost.title,
				text: $scope.editPost.text,
				summary: $scope.editPost.summary,
				image: $scope.editPost.image
			};

			EditPostService.updatePost(postId, updatedPost)
				.then(function(response) {
					alert('Post atualizado com sucesso!');
					$uibModalInstance.close(response.data);
				})
				.catch(function(error) {
					console.error('Erro ao atualizar o post:', error);
				});
		};
	}
]);
