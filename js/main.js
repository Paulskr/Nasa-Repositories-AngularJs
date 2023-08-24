var app = angular.module('app', ['ngRoute', 'ngAnimate']);

// Original API Users Gihub Link - https://api.github.com/users/nasa

app.config(function($routeProvider, $locationProvider) {
		$routeProvider

		.when('/', {
			templateUrl: 'partials/about.html',
			controller: 'homeCtrl'
		})
		.when('/repositories', {
			templateUrl: 'partials/repositories.html',
			controller: 'repositoriesGitHubCtrl',
		})
		.when('/contributors', {
			templateUrl: 'partials/contributors.html',
			controller: 'contributorsCtrl',
			resolve: {
				contributors: function (contrFactory) {
					return contrFactory.getFunction()
					.then(function (response) {
						return response.data;

						console.log(response);

				    }, function (response) {
				        console.log(response);
				    });
				}
			}
		})

		.otherwise({
			redirectTo: '/'
		});

		 // Remove Hashtag in Url
		// $locationProvider.html5Mode(true);
});

// Footer
app.controller('footerMain', function($scope) {
	$scope.date = new Date();

});

// Header Logo
app.controller('headerMain', function($scope) {
	$scope.logo = 'img/logo.png'
});

// Home Page
app.controller('homeCtrl', function($scope) {
	$scope.story = 'We Are';
	$scope.about = 'Space Technologies, is a private aerospace manufacturer and space transportation services company';

});

// Contributors Page
app.factory('contrFactory', function($http) {
	return {
		getFunction: function () {
			return $http.get('database/contributors.json');
		}
	}
});
app.controller('contributorsCtrl', function($scope, contributors) {
	$scope.getContr = contributors;

	$scope.sortType = '';
	$scope.sortReverse = false;
	$scope.searchFilter = '';
});

// Repositories Page
app.controller('repositoriesGitHubCtrl', function($scope, $http) {
		$scope.repositories = 'nasa/repos';
		$scope.username = 'nasa';


		$http.get('https://api.github.com/users/' + $scope.repositories)
			.then(function (response) {
				$scope.gitRepo = response.data;
				console.log(response);

	    }, function (response) {
	      console.log(response);
    	});


		$http.get('https://api.github.com/users/' + $scope.username)
			.then(function (response) {
				console.log(response);
				$scope.gitName = response.data;

	    }, function (response) {
	        console.log(response);
	    });
});


// Add Toogle To Menu
app.controller('navClass', function ($scope) {
   	$scope.class = "addclass";

	$scope.toggleClass = function() {
		if ($scope.class === "addclass") {
			$scope.class = null;
		} else {
			$scope.class = "addclass";
		}
	};


});
