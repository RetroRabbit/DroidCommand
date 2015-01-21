angular.module('driodCommand', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise('/odyssey');
        // ODYSSEY STATE ========================================
        $stateProvider.state('odyssey', {
            url: '/odyssey',
                templateUrl: 'views/main.html'
        })
        // ROBOTCONTROL STATE ========================================
            .state('robotControl', {
                url: '/robotControl',
                templateUrl: 'views/robotControl.html'
            })
            // nested list with custom controller
            .state('robotControl.list', {
                url: '/list',
                templateUrl: 'views/home-list.html',
                controller: function ($scope) {
                    $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
                }
            })

            // nested list with just some random string data
            .state('robotControl.paragraph', {
                url: '/paragraph',
                template: 'I could sure use a drink right now.'
            })
        // GAMES STATE ========================================
            .state('games', {
                url: '/games',
                templateUrl: 'views/games.html'

            })
        // CENTRAL STATE ========================================
            .state('central', {
                url: '/central',
                templateUrl: 'views/central.html'

            })
        // DROIDWARS STATE ========================================
            .state('droidWars', {
                url: '/droidWars',
                templateUrl: 'views/droidWars.html'
            });
    });
