myApp.controller('PageController', ['$scope', '$location', 'PageService',
	function($scope, $location, PageService) {
		const postId = localStorage.getItem('pagePostId');
		const userId = localStorage.getItem('userId');

		$scope.goBack = () => $location.path('home');
		$scope.options = ['Edit Profile', 'Settings', 'sign out'];
		$scope.isSelectVisible = false;

		const formatDate = (date) => {
			const parsedDate = new Date(date);
			const day = parsedDate.getDate().toString().padStart(2, '0');
			const year = parsedDate.getFullYear();
			const mounth = [
				"jan", "fev", "mar", "abr", "mai", "jun",
				"jul", "ago", "set", "out", "nov", "dez"
			];

			return `${day} ${mounth[parsedDate.getMonth()]}, ${year}`;
		};

		$scope.toggleSelect = () => $scope.isSelectVisible = !$scope.isSelectVisible;

		$scope.like = () => {
			if (!userId) return;

			PageService.likePost(postId, userId)
				.then(response => {
					console.log(response.data);
					$scope.reload();
				})
				.catch(error => {
					console.error('Error liking post:', error);
				});
		};

		$scope.selectOption = (option) => {
			if (option === 'sign out') {
				alert('Signed Out!');
			}
		};

		$scope.openModal = () => alert('Write Modal Opened');

		$scope.post = {
			profileImage: '',
			title: '',
			name: '',
			post_at: '',
			text: '',
			date: ''
		};

		$scope.reload = () => {
			PageService.getPostWithUser(postId)
				.then(function(res) {
					const post = Array.isArray(res.data) ? res.data[0] : res.data;
			
					$scope.post = {
						profileImage: post.user.profile_img,
						title: post.title,
						name: post.user.name,
						post_at: formatDate(post.post_at),
						text: post.text,
						date: formatDate(post.post_at),
					};
					$scope.isLiked = post.isLiked;
				})
				.catch(function(error) {
					console.error('Erro ao buscar dados do post:', error);
				});
		};
		$scope.reload();
	}
]);
