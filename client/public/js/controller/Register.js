myApp.controller('RegisterController', ['$scope', '$location', 'RegisterService',
	function($scope, $location, RegisterService) {
		$scope.user = {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
		$scope.errorMessage = '';
		$scope.successMessage = '';

		$scope.goBack = () => $location.path('login');

		$scope.register = () => {
			const { name, email, password, confirmPassword } = $scope.user;

			if (password !== confirmPassword) {
				$scope.errorMessage = 'As senhas não coincidem.';
				$scope.successMessage = '';
				return;
			}

			RegisterService.registerUser({ name, password, email })
				.then(function() {
					$scope.successMessage = 'Cadastro realizado com sucesso!';
					$scope.errorMessage = '';
					$location.path('login');
				})
				.catch(function(error) {
					$scope.errorMessage = 'Erro ao realizar cadastro: ' + (error.data.message || 'Tente novamente.');
					$scope.successMessage = '';
				});
		};
	}
]);
