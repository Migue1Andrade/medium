myApp.directive('headerDirective', function($location, PostService) {
	return {
		restrict: 'E',
		replace: false,
		templateUrl: 'views/templates/header.html',
		scope: {
			userId: '=',
		},
		link: function(scope) {
				scope.options = ["profile", "oi", "sign out"];
				scope.isSelectVisible = false;

				scope.toggleSelect = function(event) {
					event.stopPropagation();
					scope.isSelectVisible = !scope.isSelectVisible;
				};

				scope.selectOption = function(option, event) {
					event.stopPropagation();
					scope.isSelectVisible = false;

					if (option === "sign out") {
						PostService.logout();
					} else if (option === "profile") {
						$location.path('/home/profile');
					}
				};

				scope.openModal = function(event) {
					event.stopPropagation();
					PostService.openPostModal()
						.then(() => console.log('Modal aberto'))
						.catch(reason => console.log('Modal rejeitado:', reason));
				}
		}
	}
});
