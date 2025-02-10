myApp.controller('HomeController', ['$scope', '$location', '$window', 'PostService',
	function($scope, $location, $window, PostService) {
		$scope.isEditVisible = {};
		$scope.dropdownPosition = {};

		angular.element(document.querySelector('.modal-backdrop')).remove();
		angular.element(document.querySelector('.modal')).remove();

		$scope.like = function(postId, event) {
			event.stopPropagation();
			PostService.likePost(postId)
				.then(() => {
					alert('Post liked successfully');
					$scope.reload();
				})
				.catch(error => console.error('Error liking post:', error));
		};

		$scope.editModal = function(event) {
			event.stopPropagation();
			PostService.openEditModal()
				.then(() => $window.location.reload())
				.catch(reason => console.log('Modal rejeitado:', reason));
		};

		$scope.toggleEdit = function(postId, event) {
			event.stopPropagation();
			localStorage.setItem('postId', postId);
			$scope.isEditVisible[postId] = !$scope.isEditVisible[postId];

			if (event) {
				const rect = event.target.getBoundingClientRect();
				$scope.dropdownPosition[postId] = {
					top: rect.bottom + window.scrollY - 160 + 'px',
					left: rect.left + window.scrollX - 420 + 'px'
				};
			}
		};

		$scope.selectPtionEdit = function(option, postId) {
			$scope.isEditVisible[postId] = false;
			if (option === "edit") $scope.editModal(postId);
		};

		$scope.removePost = function(postId, event) {
			event.stopPropagation();
			PostService.removePost(postId)
				.then(() => {
					alert('Post deleted successfully');
					$scope.reload();
				})
				.catch(error => console.error('Error deleting post:', error));
		};

		const formatDate = (date) => {
			date = new Date(date);
			const dia = date.getDate().toString().padStart(2, '0');
			const ano = date.getFullYear();
			const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
			return `${dia} ${meses[date.getMonth()]}, ${ano}`;
		};

		$scope.reload = function() {
			PostService.getPosts()
				.then(res => {
					$scope.posts = res.data.map(post => ({
						profileImage: post.user.profile_img,
						title: post.title,
						name: post.user.name,
						summary: post.summary,
						post_at: formatDate(post.post_at),
						post_likes: post.likes, 
						comments: post.comments,
						postImg: post.post_img,
						id: post.id
					}));
				});
		};

		$scope.reload();

		$scope.goPage = function(postId) {
			localStorage.setItem('pagePostId', postId);
			$location.path('/home/page');
		};
	}
]);
