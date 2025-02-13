myApp.controller('ProfileController', ['$scope', '$location', 'ProfileService',
	function ($scope, $location, ProfileService) {
		const userId = localStorage.getItem('userId');

		$scope.showPasswordChange = false;
		$scope.showPosts = false;

		$scope.user = {
			profilePicture: '',
			name: '',
			email: '',
			posts: []
		};

		$scope.passwords = {
			current: '',
			new: ''
		};

		$scope.goBack = () => $location.path('home');

		$scope.togglePasswordChange = () => {
			$scope.showPasswordChange = !$scope.showPasswordChange;
			$scope.passwords = { current: '', new: '' };
		};

		ProfileService.getUserProfile(userId)
			.then(function (response) {
				const userData = response.data;
				$scope.user.name = userData.name;
				$scope.user.email = userData.email;
				$scope.user.profilePicture = userData.profile_img;
			})
			.catch(function (error) {
				console.error('Erro ao buscar dados do usuário:', error);
			});

		$scope.saveChanges = () => {
			const data = {
				name: $scope.user.name,
				email: $scope.user.email,
				currentPassword: $scope.passwords.current || null,
				newPassword: $scope.passwords.new || null
			};

			ProfileService.updateUserProfile(userId, data)
				.then(function () {
					alert('Alterações salvas com sucesso!');
					$scope.togglePasswordChange();
				})
				.catch(function () {
					alert('Erro ao salvar alterações');
				});
		};

		const formatDate = (date) => {
			date = new Date(date);

			const day = date.getDate().toString().padStart(2, '0');
			const year = date.getFullYear();
			const mounth = [
				"jan", "fev", "mar", "abr", "mai", "jun",
				"jul", "ago", "set", "out", "nov", "dez"
			];

			return `${day} ${mounth[date.getMonth()]}, ${year}`;
		};

		$scope.loadPosts = () => {
			if ($scope.showPosts) {
				$scope.showPosts = false;
			} else {
				ProfileService.getUserPosts(userId)
					.then(function (res) {
						$scope.user.posts = res.data.map(post => ({
							profileImage: post.user.profile_img,
							title: post.title,
							name: post.user.name,
							summary: post.summary,
							post_at: formatDate(post.post_at),
							post_likes: post.post_likes,
							comments: post.comments,
							postImg: post.post_img,
							id: post.id,
							email: post.user.email,
						}));
						$scope.showPosts = true;
					})
					.catch(function (error) {
						console.error('Erro ao buscar os posts:', error);
					});
			}
		};
	}
]);
