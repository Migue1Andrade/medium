/* eslint-disable no-undef */
const myApp = angular.module("mediumApp", ['ui.router', 'ui.bootstrap']);
const baseUrl = 'http://localhost:8080/public';

myApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'views/home.html',
			controller: 'HomeController',
		})
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.state('register', {
			url: '/login/register',
			templateUrl: 'views/register.html',
			controller: 'RegisterController'
		})
		.state('page',{
			url: '/home/page',
			templateUrl: 'views/page.html',
			controller: 'PageController',
		})
		.state('modal', {
			templateUrl: 'views/modal.html',
			controller: 'ModalPost',
			onEnter: isAuthorized
		})
		.state('editModal', {
			templateUrl: 'views/EditPostModal.html',
			controller: 'EditPostModalController',
			onEnter: isAuthorized
		})
		.state('profile', {
			url: '/home/profile',
			templateUrl: 'views/profile.html',
			controller: 'ProfileController',
		});
});

const isAuthorized = ($state, $rootScope) => {
	const isLogged = localStorage.getItem("token");

	if (!isLogged) { $state.go('login'); return }

	$rootScope.isLogged = true;
};
