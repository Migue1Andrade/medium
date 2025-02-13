myApp.controller('HomeController', ['$scope', '$location', '$window', 'PostService',
	function($scope, $location, $window, PostService) {
		$scope.isEditVisible = {};
		$scope.dropdownPosition = {};

		angular.element(document.querySelector('.modal-backdrop')).remove();
		angular.element(document.querySelector('.modal')).remove();

		$scope.like = (postId, event) => {
			event.stopPropagation();
			PostService.likePost(postId)
				.then(() => {
					alert('Post liked successfully');
					$scope.reload();
				})
				.catch(error => console.error('Error liking post:', error));
		};

		$scope.onEditModal = (postId, event) => {
			event.stopPropagation();
			localStorage.setItem('postId', postId);

			PostService.openEditModal()
			.then(() => $window.location.reload())
			.catch(reason => console.log('Modal rejeitado:', reason));
		};

		$scope.removePost = (postId, event) => {
			event.stopPropagation();
			PostService.removePost(postId)
				.then(() => {
					const confirmDelete = confirm('quer mesmo deletar esse post');

					if (!confirmDelete) return;

					$scope.reload();
				})
				.catch(error => console.error('Error deleting post:', error));
		};

		const formatDate = (date) => {
			date = new Date(date);
			const day = date.getDate().toString().padStart(2, '0');
			const year = date.getFullYear();
			const mounth = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
			return `${day} ${mounth[date.getMonth()]}, ${year}`;
		};

		$scope.reload = () => {
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

		$scope.goPage = (postId) => {
			localStorage.setItem('pagePostId', postId);
			$location.path('/home/page');
		};
	}
]);
